import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';

// Initialize our database and AI clients
const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // 1. Extract the file from the request
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Convert the File object into a Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Parse the PDF text
    const pdfData = await pdfParse(buffer);
    let textContent = pdfData.text;

    // Optional: Log the text length to ensure it worked
    console.log(`Extracted ${textContent.length} characters from PDF.`);

    // Safeguard: Limit text length to avoid overloading the AI's context window.
    // 20,000 characters is a safe limit for gpt-4o-mini.
    if (textContent.length > 20000) {
      textContent = textContent.substring(0, 20000);
    }

    // 4. Send the text to OpenAI to generate flashcards
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      // Force the AI to reply ONLY with a JSON object
      response_format: { type: "json_object" }, 
      messages: [
        { 
          role: "system", 
          content: `You are an expert tutor creating study materials. 
          Extract comprehensive flashcards from the provided text. 
          Cover key concepts, definitions, relationships, and edge cases. 
          Do NOT create shallow, one-word answer cards. Explanations should be clear.
          
          You MUST respond in this exact JSON format:
          {
            "cards": [
              { "front": "Question or Concept", "back": "Detailed answer or explanation" }
            ]
          }` 
        },
        { 
          role: "user", 
          content: `Here is the text to convert into flashcards:\n\n${textContent}` 
        }
      ],
    });

    // 5. Parse the AI's JSON response back into a JavaScript object
    const aiResponseText = completion.choices[0].message.content || '{"cards":[]}';
    const generatedData = JSON.parse(aiResponseText);
    const flashcards = generatedData.cards;

    // 6. Save the Deck and Cards to the Database
    // We use a "nested write" to create the deck and cards simultaneously
    const newDeck = await prisma.deck.create({
      data: {
        title: file.name.replace('.pdf', ''), // Use filename as the default deck title
        cards: {
          create: flashcards.map((card: { front: string; back: string }) => ({
            front: card.front,
            back: card.back,
            // The SM-2 fields (interval, repetition, etc.) will automatically 
            // use the defaults we set up in Step 2.
          }))
        }
      }
    });

    // 7. Return success to the frontend, along with the new Deck's ID
    return NextResponse.json({ 
      success: true, 
      deckId: newDeck.id,
      message: `Successfully created ${flashcards.length} cards!`
    });
    
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process the PDF. Please try again." }, 
      { status: 500 }
    );
  }
}

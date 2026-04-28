import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { calculateSM2 } from "@/lib/sm2";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { score } = body;

    // Validate the score
    if (typeof score !== "number" || score < 0 || score > 3) {
      return NextResponse.json(
        { error: "Invalid score. Must be between 0 and 3." },
        { status: 400 }
      );
    }

    // 1. Fetch the existing card to get its current SM-2 stats
    const card = await prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    // 2. Calculate new SM-2 values based on the user's score
    const { nextInterval, nextRepetition, nextEF, nextReviewDate } =
      calculateSM2(score, card.interval, card.repetition, card.easinessFactor);

    // 3. Update the card in the database
    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        interval: nextInterval,
        repetition: nextRepetition,
        easinessFactor: nextEF,
        nextReviewDate: nextReviewDate,
      },
    });

    return NextResponse.json({ success: true, card: updatedCard });
  } catch (error) {
    console.error("Error scoring card:", error);
    return NextResponse.json(
      { error: "Failed to score card" },
      { status: 500 }
    );
  }
}

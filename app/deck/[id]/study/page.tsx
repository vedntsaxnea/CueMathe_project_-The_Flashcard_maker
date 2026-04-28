import { PrismaClient } from '@prisma/client';
import StudySession from '@/components/StudySession';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

// In Next.js App Router, params are passed via props to page components
export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Check if the deck exists
  const deck = await prisma.deck.findUnique({
    where: { id: id }
  });

  if (!deck) {
    notFound(); // Triggers the Next.js 404 page
  }

  // 2. Fetch ONLY the cards that are due.
  // A card is due if its nextReviewDate is less than or equal to the current time.
  const now = new Date();
  
  const dueCards = await prisma.card.findMany({
    where: {
      deckId: id,
      nextReviewDate: {
        lte: now // "lte" means Less Than or Equal to
      }
    },
    // Only select the fields we need to send to the client (security best practice)
    select: {
      id: true,
      front: true,
      back: true,
    },
    // Randomize the order slightly, or order by when they were due
    orderBy: {
      nextReviewDate: 'asc'
    }
  });

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '5rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--primary)', fontWeight: '600' }}>
          &larr; Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>{deck.title}</h1>
        <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>Study Session</p>
      </div>

      {/* Pass the due cards into our client-side state manager */}
      <StudySession deckId={deck.id} initialCards={dueCards} />
    </main>
  );
}

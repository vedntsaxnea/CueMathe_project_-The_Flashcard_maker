"use client";

import { useState } from 'react';
import StudyCard from './StudyCard';
import styles from './StudySession.module.css';

// Define the card shape coming from the database
type DbCard = { id: string; front: string; back: string };

export default function StudySession({ deckId, initialCards }: { deckId: string, initialCards: DbCard[] }) {
  const [cards, setCards] = useState<DbCard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);

  // If there are no cards left to study today
  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <div className={styles.emptyStateContainer}>
        <h2 className={styles.emptyStateTitle}>🎉 All caught up!</h2>
        <p className={styles.emptyStateText}>You have reviewed all due cards in this deck for today.</p>
        <a href="/" className={styles.emptyStateButton}>
          Back to Dashboard
        </a>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progressPercentage = (currentIndex / cards.length) * 100;

  const handleScoreCard = async (score: number) => {
    // 1. Send the score to our backend to calculate the new SM-2 interval
    await fetch(`/api/cards/${currentCard.id}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    });

    // 2. Move to the next card
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.sessionContainer}>
      {/* Header and Progress Bar */}
      <div className={styles.progressHeader}>
        <div className={styles.progressInfo}>
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{Math.round(progressPercentage)}% Completed</span>
        </div>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBarFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Render the active Study Card */}
      <StudyCard card={currentCard} onScore={handleScoreCard} />
    </div>
  );
}

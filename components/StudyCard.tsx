"use client"; // Required because this component uses state and onClick events

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StudyCard.module.css';

// Define the types for our component props
interface CardProps {
  card: { id: string; front: string; back: string };
  onScore: (score: number) => void;
}

export default function StudyCard({ card, onScore }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper function to handle scoring and reset the card for the next one
  const handleScore = (score: number) => {
    onScore(score);
    setIsFlipped(false); // Flip back to the front before the next card loads
  };

  return (
    <div className={styles.container}>
      {/* The 3D Container */}
      <div 
        className={styles.cardContainer}
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        <motion.div
          className={styles.cardInner}
          // Animate the Y-axis rotation. 180 degrees flips it completely around.
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* FRONT OF CARD */}
          <div className={styles.front}>
            <span className={styles.labelFront}>Question</span>
            <h2 className={styles.question}>{card.front}</h2>
            {!isFlipped && (
              <p className={styles.hint}>
                Click to reveal answer
              </p>
            )}
          </div>

          {/* BACK OF CARD (Rotated 180deg by default) */}
          <div className={styles.back}>
             <span className={styles.labelBack}>Answer</span>
            <p className={styles.answer}>{card.back}</p>
          </div>
        </motion.div>
      </div>

      {/* SM-2 Rating Buttons (Only appear after flipping) */}
      <div className={`${styles.controls} ${isFlipped ? styles.controlsVisible : styles.controlsHidden}`}>
        <button onClick={() => handleScore(0)} className={`${styles.btn} ${styles.btnAgain}`}>
          Again
        </button>
        <button onClick={() => handleScore(1)} className={`${styles.btn} ${styles.btnHard}`}>
          Hard
        </button>
        <button onClick={() => handleScore(2)} className={`${styles.btn} ${styles.btnGood}`}>
          Good
        </button>
        <button onClick={() => handleScore(3)} className={`${styles.btn} ${styles.btnEasy}`}>
          Easy
        </button>
      </div>
    </div>
  );
}

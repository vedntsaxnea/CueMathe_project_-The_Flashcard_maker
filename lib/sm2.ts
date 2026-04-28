// Quality: 0 (Again), 1 (Hard), 2 (Good), 3 (Easy)
export function calculateSM2(quality: number, interval: number, repetition: number, easinessFactor: number) {
  let nextInterval = interval;
  let nextRepetition = repetition;
  let nextEF = easinessFactor;

  if (quality >= 2) { // Correct response
    if (repetition === 0) {
      nextInterval = 1;
    } else if (repetition === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(interval * easinessFactor);
    }
    nextRepetition += 1;
  } else { // Incorrect/Hard response
    nextRepetition = 0;
    nextInterval = 1;
  }

  // Adjust Easiness Factor (standard SM-2 formula)
  nextEF = easinessFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
  if (nextEF < 1.3) nextEF = 1.3;

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

  return { nextInterval, nextRepetition, nextEF, nextReviewDate };
}

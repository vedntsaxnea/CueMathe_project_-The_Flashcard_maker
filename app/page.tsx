import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Master Any Subject <br />
            with Flashcard Engine
          </h1>
          <p className={styles.subtitle}>
            The most advanced spaced-repetition system designed for high-performance learners. 
            Science-backed algorithms to ensure you never forget what you learn.
          </p>
          <div className={styles.ctas}>
            <button className={styles.primary}>
              Start Learning Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </button>
            <button className={styles.secondary}>View Documentation</button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className={styles.featureTitle}>Spaced Repetition</h3>
            <p className={styles.featureDescription}>
              Our proprietary algorithm adjusts to your learning pace, showing you cards exactly when you're about to forget them.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3 className={styles.featureTitle}>Active Recall</h3>
            <p className={styles.featureDescription}>
              Force your brain to retrieve information rather than just recognizing it, leading to much stronger neural connections.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
            </div>
            <h3 className={styles.featureTitle}>Rich Media Support</h3>
            <p className={styles.featureDescription}>
              Include images, audio, and code snippets in your flashcards for a multi-sensory learning experience.
            </p>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '6rem', color: 'var(--muted-foreground)', fontSize: '0.875rem', zIndex: 1 }}>
        &copy; {new Date().getFullYear()} Flashcard Engine. Built for thinkers.
      </footer>
    </div>
  );
}

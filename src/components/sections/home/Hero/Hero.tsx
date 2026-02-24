"use client";

import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.videoContainer}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline>
          <source src="/assets/hero_hd.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

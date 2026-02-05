"use client";

import styles from "./HomeBackground.module.scss";

export function HomeBackground() {
  return (
    <div className={styles.background}>
      {/* Grid */}
      <div className={styles.grid} />

      {/* Blurred colored circles - wrapped for proportional mobile scaling */}
      <div className={styles.blobsContainer}>
        <div className={styles.blob} style={{ top: '10%', left: '5%', background: '#D5A8E5' }} />
        <div className={styles.blob} style={{ top: '25%', right: '10%', background: '#A8D5E5' }} />
        <div className={styles.blob} style={{ top: '45%', left: '0%', background: '#A8E5C4' }} />
        <div className={styles.blob} style={{ top: '60%', right: '5%', background: '#E5D5A8' }} />
        <div className={styles.blob} style={{ top: '80%', left: '10%', background: '#F4B4C4' }} />
        <div className={styles.blob} style={{ top: '95%', right: '15%', background: '#D5A8E5' }} />
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section id="hero" className={styles.hero} data-home-section="hero">
      <div className={styles.heroIntro}>
        <h1 className={styles.heroTagline}>
          <span className={styles.heroTaglineAccent}>{t("titleDark")}</span>{" "}
          {t("titleMuted")}{" "}
          <span className={styles.heroTaglineAccent}>{t("subHeadlineAccent")}</span>{" "}
          {t("subHeadlineTail")}
        </h1>
      </div>

      <div className={styles.videoFrame} aria-hidden="true" data-dark-bg="true">
        <video
          className={styles.videoFrameMedia}
          src="/video/hero-video.mp4"
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <span className={styles.videoFramePlaceholder} />
      </div>

      <div className={styles.scrollBar} aria-hidden="true">
        <span className={styles.scrollBarMark}>+</span>
        <span className={styles.scrollBarMark}>+</span>
        <span className={styles.scrollBarLabel}>{t("scrollToExplore")}</span>
        <span className={styles.scrollBarMark}>+</span>
        <span className={styles.scrollBarMark}>+</span>
      </div>
    </section>
  );
}

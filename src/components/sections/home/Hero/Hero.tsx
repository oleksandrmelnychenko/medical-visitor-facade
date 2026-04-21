"use client";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");
  const srTitle = [t("titleDark"), t("titleMuted")].filter(Boolean).join(" ");

  return (
    <section id="hero" className={styles.hero} data-home-section="hero">
      <h1 className={styles.srOnly}>{srTitle}</h1>

      <div className={styles.heroIntro}>
        <h2 className={styles.heroTagline}>
          <span className={styles.heroTaglineAccent}>{t("titleDark")}</span>{" "}
          {t("titleMuted")}{" "}
          <span className={styles.heroTaglineAccent}>{t("subHeadlineAccent")}</span>{" "}
          {t("subHeadlineTail")}
        </h2>
      </div>

      <div className={styles.videoFrame} aria-hidden="true" data-dark-bg="true">
        <video
          className={styles.videoFrameMedia}
          src="/video/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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

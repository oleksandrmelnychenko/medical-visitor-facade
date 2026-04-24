"use client";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

const DESKTOP_VIDEO = "/video/hero-video.mp4";
const MOBILE_VIDEO = "/video/hero-video-mobile.mp4";
const MOBILE_QUERY = "(max-width: 768px)";
const HERO_VIDEO_WIDTH = 1280;
const HERO_VIDEO_HEIGHT = 720;

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section id="hero" className={styles.hero} data-home-section="hero">
      <div className={styles.videoFrame} aria-hidden="true" data-dark-bg="true">
        <video
          className={styles.videoFrameMedia}
          poster="/video/hero-poster.jpg"
          width={HERO_VIDEO_WIDTH}
          height={HERO_VIDEO_HEIGHT}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={MOBILE_VIDEO} type="video/mp4" media={MOBILE_QUERY} />
          <source src={DESKTOP_VIDEO} type="video/mp4" />
        </video>
        <span className={styles.videoFramePlaceholder} />
        <span className={styles.heroAgencyTag}>{t("scrollToExplore")}</span>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

const DESKTOP_VIDEO = "/video/hero-video.mp4";
const MOBILE_VIDEO = "/video/hero-video-mobile.mp4";
const MOBILE_QUERY = "(max-width: 768px)";

export function Hero() {
  const t = useTranslations("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(DESKTOP_VIDEO);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setVideoSrc(mql.matches ? MOBILE_VIDEO : DESKTOP_VIDEO);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    videoRef.current?.load();
  }, [videoSrc]);

  return (
    <section id="hero" className={styles.hero} data-home-section="hero">
      <div className={styles.videoFrame} aria-hidden="true" data-dark-bg="true">
        <video
          ref={videoRef}
          className={styles.videoFrameMedia}
          src={videoSrc}
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className={styles.videoFramePlaceholder} />
        <span className={styles.heroAgencyTag}>{t("scrollToExplore")}</span>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className={styles.hero}>
      <h1 className={styles.srOnly}>{t("title")}</h1>
      <div className={styles.videoContainer}>
        {/* Desktop: full 16:9 video */}
        <video className={`${styles.heroVideo} ${styles.desktopVideo}`} autoPlay muted loop playsInline>
          <source src="/assets/hero_hd.mp4" type="video/mp4" />
        </video>
        {/* Mobile: 1:1 cropped & compressed */}
        <video className={`${styles.heroVideo} ${styles.mobileVideo}`} autoPlay muted loop playsInline>
          <source src="/assets/hero_mobile.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");
  const srTitle = [t("titleDark"), t("titleMuted")].filter(Boolean).join(" ");

  return (
    <section id="hero" className={styles.hero} data-home-section="hero">
      <h1 className={styles.srOnly}>{srTitle}</h1>

      <p className={styles.brandLabel}>{t("brandLabel")}</p>

      <div className={styles.headlineWrap}>
        <h2 className={styles.headline}>
          {t("titleDark")}{" "}
          <span className={styles.headlineMuted}>{t("titleMuted")}</span>
        </h2>
      </div>

      <p className={styles.subHeadline}>{t("subHeadline")}</p>

      <p className={styles.heroCaption}>{t("caption")}</p>
    </section>
  );
}

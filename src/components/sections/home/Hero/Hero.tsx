"use client";

import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");
  const tFooter = useTranslations("footer");
  const srTitle = [t("titleDark"), t("titleMuted")].filter(Boolean).join(" ");

  return (
    <section id="hero" className={styles.hero} data-home-section="hero">
      <h1 className={styles.srOnly}>{srTitle}</h1>

      <p className={styles.brandLabel}>
        <span aria-hidden="true">(</span>
        {tFooter.rich("companyName", {
          accent: (chunks) => <span className={styles.brandAccent}>{chunks}</span>,
        })}
        <span aria-hidden="true">)</span>
      </p>

      <div className={styles.headlineWrap}>
        <h2 className={styles.headline}>
          {t("titleDark")}{" "}
          <span className={styles.headlineMuted}>{t("titleMuted")}</span>
        </h2>
      </div>

      <p className={styles.heroCaption}>Agentur für Patientenbetreuung Heorhii Hudiiev</p>
    </section>
  );
}

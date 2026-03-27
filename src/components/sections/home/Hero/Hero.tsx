import { useTranslations } from "next-intl";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className={styles.hero}>
      <h1 className={styles.srOnly}>{t("title")}</h1>
      <div className={styles.videoContainer}>
        <div className={styles.heroOverlay} aria-hidden="true">
          <div className={styles.heroOverlayStamp}>BE SOON ..</div>
        </div>
      </div>
      <p className={styles.heroCaption}>Agentur für Patientenbetreuung Heorhii Hudiiev</p>
    </section>
  );
}

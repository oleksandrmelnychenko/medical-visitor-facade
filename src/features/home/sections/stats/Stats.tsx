import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "./Stats.module.scss";

export async function Stats() {
  const t = await getTranslations("home.stats");

  return (
    <section
      className={styles.section}
      aria-labelledby="scale-stats-title"
      data-home-section="stats"
    >
      <div className={styles.container}>
        <div className={styles.featureSplit}>
          <div className={styles.splitMedia}>
            <div className={styles.splitSlides} aria-hidden="true">
              <div className={`${styles.splitSlide} ${styles.splitSlidePrimary}`}>
                <Image
                  src="/assets/scale-intro-panorama.webp"
                  alt="Panoramic view of a German city at scale"
                  fill
                  sizes="(max-width: 960px) 100vw, 60vw"
                  className={styles.splitImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.splitCopy}>
            <span className={styles.splitBadge}>{t("introBadge")}</span>
            <p className={styles.splitBody}>{t("introText")}</p>
          </div>
        </div>

        <div className={styles.secondarySplit}>
          <div className={styles.secondaryCopy}>
            <span className={styles.secondaryBadge}>{t("secondaryBadge")}</span>
            <div className={styles.secondaryContent}>
              <p id="scale-stats-title" className={styles.secondaryText}>
                {t("secondaryText")}
              </p>
            </div>
          </div>

          <div className={styles.secondaryMedia}>
            <Image
              src="/assets/scale-balcony-mountains.webp"
              alt="Alpine view from a German medical clinic balcony"
              fill
              sizes="(max-width: 960px) 100vw, 60vw"
              className={styles.secondaryImage}
            />
            <div className={styles.splitStatsOverlay} aria-hidden="true">
              <span className={styles.splitStatLine}>{t("overlayLineOne")}</span>
              <span className={styles.splitStatLine}>{t("overlayLineTwo")}</span>
              <span className={styles.splitStatLine}>{t("overlayLineThree")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

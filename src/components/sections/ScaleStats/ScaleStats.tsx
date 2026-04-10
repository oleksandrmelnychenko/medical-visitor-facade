import { getTranslations } from "next-intl/server";
import styles from "./ScaleStats.module.scss";

export async function ScaleStats() {
  const t = await getTranslations("scaleStats");

  return (
    <section
      className={styles.section}
      aria-labelledby="scale-stats-title"
      data-home-section="scale"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={`${styles.tile} ${styles.tileHeadline}`}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2 id="scale-stats-title" className={styles.headline}>
              {t("headline")}
            </h2>
          </div>

          <div className={styles.tile}>
            <span className={styles.tileValue}>
              {t("yearsValue")}
              <span className={styles.tileValuePlus}>+</span>
            </span>
            <span className={styles.tileLabel}>{t("yearsLabel")}</span>
          </div>

          <div className={styles.tile}>
            <span className={styles.tileValue}>{t("citiesValue")}</span>
            <span className={styles.tileLabel}>{t("citiesLabel")}</span>
          </div>

          <div className={styles.tile}>
            <span className={styles.tileValue}>{t("languagesValue")}</span>
            <span className={styles.tileLabel}>{t("languagesLabel")}</span>
          </div>

          <div className={`${styles.tile} ${styles.tileBrand}`} aria-hidden="true">
            <div className={styles.brandPattern}>
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className={styles.brandDot} />
              ))}
            </div>
            <div className={styles.brandTimeline}>
              <div className={styles.brandTimelineTrack}>
                <span className={styles.brandTimelineFill} />
                <span className={`${styles.brandTimelineTick} ${styles.brandTimelineTickStart}`} />
                <span className={styles.brandTimelineDot} />
                <span className={`${styles.brandTimelineTick} ${styles.brandTimelineTickEnd}`} />
              </div>
              <div className={styles.brandTimelineLabels}>
                <span>2012</span>
                <span>2026</span>
              </div>
            </div>
            <span className={styles.brandMark}>GMED</span>
          </div>
        </div>
      </div>
    </section>
  );
}

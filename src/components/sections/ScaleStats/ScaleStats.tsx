import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "./ScaleStats.module.scss";

export async function ScaleStats() {
  const t = await getTranslations("scaleStats");
  const eyebrow = t("eyebrow");
  const splitSlides = [
    "/assets/scale-intro-panorama.webp",
    "/assets/scale-intro-electric.webp",
  ];

  return (
    <section
      className={styles.section}
      aria-labelledby="scale-stats-title"
      data-home-section="scale"
    >
      <div className={styles.container}>
        <div className={styles.featureSplit}>
          <div className={styles.splitMedia}>
            <div className={styles.splitSlides} aria-hidden="true">
              {splitSlides.map((src, index) => (
                <div
                  key={src}
                  className={`${styles.splitSlide} ${index === 0 ? styles.splitSlidePrimary : styles.splitSlideSecondary}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 960px) 100vw, 60vw"
                    className={`${styles.splitImage} ${index === 0 ? styles.splitImagePrimary : styles.splitImageSecondary}`}
                  />
                </div>
              ))}
            </div>
            <div className={styles.splitStatsOverlay} aria-hidden="true">
              <span className={styles.splitStatLine}>{t("overlayLineOne")}</span>
              <span className={styles.splitStatLine}>{t("overlayLineTwo")}</span>
              <span className={styles.splitStatLine}>{t("overlayLineThree")}</span>
            </div>
          </div>

          <div className={styles.splitCopy}>
            <span className={styles.splitBadge}>{t("introBadge")}</span>
            <p className={styles.splitBody}>{t("introText")}</p>
          </div>
        </div>

        <div className={styles.lowerMedia}>
          <Image
            src="/assets/scale-balcony-tree.png"
            alt=""
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 960px) 70vw, 34vw"
            className={styles.lowerImage}
          />
        </div>

        <div className={styles.grid}>
          <div className={`${styles.tile} ${styles.tileHeadline}`}>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
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
            <span className={styles.tileValue}>{t("supportAreasValue")}</span>
            <span className={styles.tileLabel}>{t("supportAreasLabel")}</span>
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

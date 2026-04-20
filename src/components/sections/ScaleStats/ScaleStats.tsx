import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "./ScaleStats.module.scss";

export async function ScaleStats() {
  const t = await getTranslations("scaleStats");
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
              src="/assets/scale-balcony-mountains.png"
              alt=""
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

"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import styles from "./hero.module.scss";

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className={cn(sectionStyles.section, styles.hero)}>
      <div className={cn(sectionStyles.container, styles.heroContainer)}>
        {/* Video with text overlay - container width */}
        <div className={styles.heroVideoWrapper}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
          >
            <source src="/assets/hero_vid.mp4" type="video/mp4" />
          </video>

          {/* Text overlay on video */}
          <div className={styles.videoOverlay}>
            <div className={styles.heroContent}>
              <motion.p
                className={styles.heroOverline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {t('overline')}
              </motion.p>

              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                {t('title')}
              </motion.h1>

              <motion.p
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                className={styles.heroActions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              >
                <motion.button
                  type="button"
                  className={styles.primaryButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('requestAppointment')}
                </motion.button>
                <motion.button
                  type="button"
                  className={styles.secondaryButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('exploreServices')}
                </motion.button>
              </motion.div>

              <motion.div
                className={styles.heroHighlights}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <div className={styles.heroHighlight}>
                  <span className={styles.highlightLabel}>{t('highlights.responseTime.label')}</span>
                  <span className={styles.highlightValue}>{t('highlights.responseTime.value')}</span>
                </div>
                <div className={styles.heroHighlight}>
                  <span className={styles.highlightLabel}>{t('highlights.careCoordination.label')}</span>
                  <span className={styles.highlightValue}>{t('highlights.careCoordination.value')}</span>
                </div>
                <div className={styles.heroHighlight}>
                  <span className={styles.highlightLabel}>{t('highlights.languages.label')}</span>
                  <span className={styles.highlightValue}>{t('highlights.languages.value')}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

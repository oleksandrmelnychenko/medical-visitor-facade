"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import styles from "./cta.module.scss";

export function CTA() {
  const t = useTranslations('home.cta');

  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <div className={styles.ctaWrapper}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.ctaOverline}>{t('overline')}</p>

            <h2 className={styles.ctaTitle}>{t('title')}</h2>

            <p className={styles.ctaSubtitle}>
              {t('subtitle')}
            </p>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              <motion.div
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.statNumber}>{t('stats.patients.number')}</div>
                <div className={styles.statLabel}>{t('stats.patients.label')}</div>
              </motion.div>

              <motion.div
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={styles.statNumber}>{t('stats.specialists.number')}</div>
                <div className={styles.statLabel}>{t('stats.specialists.label')}</div>
              </motion.div>

              <motion.div
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.statNumber}>{t('stats.support.number')}</div>
                <div className={styles.statLabel}>{t('stats.support.label')}</div>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className={styles.ctaButtons}>
              <motion.button
                className={styles.primaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t('bookConsultation')}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <button className={styles.secondaryButton}>{t('getStarted')}</button>
            </div>

            {/* Office Hours */}
            <div className={styles.ctaFooter}>
              <p>{t('availability')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

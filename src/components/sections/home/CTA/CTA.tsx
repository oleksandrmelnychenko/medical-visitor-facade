"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { Headphones, Activity, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CTA.module.scss";

// Static arrays moved outside component to prevent recreation on each render
const SERVICES = [
  { icon: Headphones, key: 'support', style: { '--hover-color': '#A8D5E5' } as React.CSSProperties },
  { icon: Activity, key: 'monitoring', style: { '--hover-color': '#B5E5B0' } as React.CSSProperties },
  { icon: Video, key: 'consultations', style: { '--hover-color': '#E5D5A8' } as React.CSSProperties },
];

export const CTA = memo(function CTA() {
  const t = useTranslations('home.cta');

  return (
    <section className={styles.section}>
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
          </motion.div>

          <div className={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.key}
                className={styles.serviceCard}
                style={service.style}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.serviceIcon}>
                  <service.icon aria-hidden="true" />
                </div>
                <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                <p className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.ctaFooter}>
            <p>{t('availability')}</p>
          </div>
        </div>
      </div>
    </section>
  );
});

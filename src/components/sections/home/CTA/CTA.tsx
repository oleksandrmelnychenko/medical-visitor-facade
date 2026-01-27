"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Headphones, Activity, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CTA.module.scss";

export function CTA() {
  const t = useTranslations('home.cta');

  const services = [
    { icon: Headphones, key: 'support', color: '#A8D5E5' },
    { icon: Activity, key: 'monitoring', color: '#B5E5B0' },
    { icon: Video, key: 'consultations', color: '#E5D5A8' },
  ];

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
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                className={styles.serviceCard}
                style={{ '--hover-color': service.color } as React.CSSProperties}
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

          <motion.div
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/apply">
              <motion.button
                className={styles.primaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t('bookConsultation')}</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>

          <div className={styles.ctaFooter}>
            <p>{t('availability')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

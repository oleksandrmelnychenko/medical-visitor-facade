"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Office.module.scss";

export function Office() {
  const t = useTranslations('home.office');

  const otherCities = [
    { key: 'berlin', color: '#F4B4C4' },
    { key: 'hamburg', color: '#A8D5E5' },
    { key: 'cologne', color: '#B5E5B0' },
  ];

  return (
    <section className={cn(sectionStyles.section, styles.office)}>
      <div className={sectionStyles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.overline}>{t('overline')}</p>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </motion.div>

        {/* Cities Grid */}
        <div className={styles.citiesGrid}>
          {/* Munich - Main City */}
          <motion.div
            className={styles.mainCity}
            style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.mainCityContent}>
              <h3 className={styles.mainCityName}>{t('cities.munich.name')}</h3>
            </div>
          </motion.div>

          {/* Other Cities */}
          {otherCities.map((city, index) => (
            <motion.div
              key={city.key}
              className={styles.cityCard}
              style={{ '--hover-color': city.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className={styles.cityName}>{t(`cities.${city.key}.name`)}</h3>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <div className={styles.closingLines}>
          <div className={styles.closingLine} />
        </div>
      </div>
    </section>
  );
}

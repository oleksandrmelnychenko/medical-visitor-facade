"use client";

import { memo, useRef } from "react";
import { useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Office.module.scss";

// Static styles moved outside component to prevent recreation on each render
const MUNICH_STYLE = { backgroundColor: '#fcfbf7' };
const OTHER_CITIES = [
  { key: 'berlin', image: '/assets/1_city-berlin.png', style: { backgroundColor: '#f7f9fb' } },
  { key: 'hamburg', image: '/assets/1_city-hamburg.png', style: { backgroundColor: '#fcf8f6' } },
  { key: 'cologne', image: '/assets/1_city-cologne.png', style: { backgroundColor: '#f9f7fb' } },
];

export const Office = memo(function Office() {
  const t = useTranslations('home.office');
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <section className={cn(sectionStyles.section, styles.office)}>
      <div className={sectionStyles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.overline}>{t('overline')}</p>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        {/* Cities Grid */}
        <div className={styles.citiesGrid} ref={gridRef}>
          {/* Munich - Main City */}
          <div className={styles.mainCity} style={MUNICH_STYLE}>
            <div className={styles.mainCityContent}>
              <h3 className={styles.mainCityName}>{t('cities.munich.name')}</h3>
            </div>
            <div className={styles.mainCityImageWrapper}>
              <img
                src="/assets/1_city-munich.png"
                alt="Munich"
                className={cn(styles.cityImageMunich, styles.brushPaint, isInView && styles.brushPaintActive)}
              />
            </div>
          </div>

          {/* Other Cities */}
          {OTHER_CITIES.map((city, index) => (
            <div key={city.key} className={styles.cityCard} style={city.style}>
              <div className={styles.cityImageWrapper}>
                <img
                  src={city.image}
                  alt={city.key}
                  className={cn(styles.cityImage, styles.brushPaint, isInView && styles.brushPaintActive)}
                  style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                />
              </div>
              <h3 className={styles.cityName}>{t(`cities.${city.key}.name`)}</h3>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className={styles.closingLines}>
          <div className={styles.closingLine} />
        </div>
      </div>
    </section>
  );
});

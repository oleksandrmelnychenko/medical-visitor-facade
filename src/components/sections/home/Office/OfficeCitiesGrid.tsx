"use client";

import { type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import styles from "./Office.module.scss";

type City = {
  key: string;
  name: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string;
  imageOverlay?: string;
  style: CSSProperties;
  delayMs: number;
};

type OfficeCitiesGridProps = {
  cities: City[];
  mainCityName: string;
  mainCityStyle: CSSProperties;
};

export function OfficeCitiesGrid({
  cities,
  mainCityName,
}: OfficeCitiesGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.collage}>
      <motion.div
        className={styles.collageMunich}
        data-dark-bg="true"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/assets/1_city-munich.png"
          alt={mainCityName}
          fill
          sizes="(max-width: 767px) 100vw, 40vw"
          className={styles.collageImage}
          style={{ objectPosition: "center 20%" }}
        />
        <div className={styles.collageLabel}>
          <h3 className={styles.collageName}>{mainCityName}</h3>
        </div>
      </motion.div>

      {cities[0] && (
        <motion.div
          className={styles.collageBerlin}
          data-dark-bg="true"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 38 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <Image
            src={cities[0].image}
            alt={cities[0].name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.collageImage}
            style={cities[0].imagePosition ? { objectPosition: cities[0].imagePosition } : undefined}
          />
          {cities[0].imageOverlay && (
            <span className={styles.cityImageOverlay} style={{ background: cities[0].imageOverlay }} />
          )}
          <div className={styles.collageLabel}>
            <h3 className={styles.collageName}>{cities[0].name}</h3>
          </div>
        </motion.div>
      )}

      {cities[1] && (
        <motion.div
          className={styles.collageHamburg}
          data-dark-bg="true"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 42 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        >
          <Image
            src={cities[1].image}
            alt={cities[1].name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.collageImage}
            style={cities[1].imagePosition ? { objectPosition: cities[1].imagePosition } : undefined}
          />
          {cities[1].imageOverlay && (
            <span className={styles.cityImageOverlay} style={{ background: cities[1].imageOverlay }} />
          )}
          <div className={styles.collageLabel}>
            <h3 className={styles.collageName}>{cities[1].name}</h3>
          </div>
        </motion.div>
      )}

      {cities[2] && (
        <motion.div
          className={styles.collageCologne}
          data-dark-bg="true"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 34 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Image
            src={cities[2].image}
            alt={cities[2].name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.collageImage}
            style={cities[2].imagePosition ? { objectPosition: cities[2].imagePosition } : undefined}
          />
          {cities[2].imageOverlay && (
            <span className={styles.cityImageOverlay} style={{ background: cities[2].imageOverlay }} />
          )}
          <div className={styles.collageLabel}>
            <h3 className={styles.collageName}>{cities[2].name}</h3>
          </div>
        </motion.div>
      )}
    </div>
  );
}

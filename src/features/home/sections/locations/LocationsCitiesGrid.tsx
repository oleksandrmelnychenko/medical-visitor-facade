"use client";

import { type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib/cn";
import styles from "./Locations.module.scss";

type City = {
  key: string;
  name: string;
  image: string;
  delayMs: number;
};

type LocationsCitiesGridProps = {
  cities: City[];
  mainCityName: string;
  mainCityStyle: CSSProperties;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function LocationsCitiesGrid({
  cities,
  mainCityName,
  mainCityStyle,
}: LocationsCitiesGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.collage}>
      <motion.article
        className={styles.heroCard}
        style={mainCityStyle}
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 44, scale: 0.965 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: EASE }}
      >
        <motion.h3
          className={styles.heroCardName}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
        >
          {mainCityName}
        </motion.h3>
        <div className={styles.heroCardMedia}>
          <motion.div
            className={styles.heroCardMediaInner}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.08 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.18 }}
          >
            <Image
              src="/assets/city-munich-watercolor.png"
              alt={mainCityName}
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
              className={cn(styles.cityImage, styles.heroImageMunich)}
            />
          </motion.div>
        </div>
      </motion.article>

      <div className={styles.gridRow}>
        {cities.map((city, idx) => (
          <motion.article
            key={city.key}
            data-city={city.key}
            className={cn(styles.tile, city.key === "cologne" && styles.tileCologne)}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 56, scale: 0.92 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.82,
              ease: EASE,
              delay: 0.55 + idx * 0.14,
            }}
          >
            <div className={cn(styles.tileMedia, city.key === "cologne" && styles.tileMediaCologne)}>
              <motion.h4
                className={cn(styles.tileName, city.key === "cologne" && styles.tileNameCologne)}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: 0.95 + idx * 0.14,
                }}
              >
                {city.name}
              </motion.h4>
              <motion.div
                style={{ position: "absolute", inset: 0 }}
                initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.1 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1.15,
                  ease: EASE,
                  delay: 0.7 + idx * 0.14,
                }}
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(max-width: 767px) 50vw, 30vw"
                  className={cn(styles.cityImage, city.key === "cologne" && styles.cityImageCologne)}
                />
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

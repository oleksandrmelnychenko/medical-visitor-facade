"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/shared/lib/cn";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import { LocationsCitiesGrid } from "./LocationsCitiesGrid";
import styles from "./Locations.module.scss";

type City = {
  key: string;
  image: string;
  delayMs: number;
  name: string;
};

type Props = {
  intro: ReactNode;
  mainCityName: string;
  cities: City[];
};

export function LocationsMotion({ intro, mainCityName, cities }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const introY = useTransform(scrollYProgress, [0, 0.32, 1], [40, 0, -16]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.42, 1, 1]);
  const stageY = useTransform(scrollYProgress, [0, 0.34, 1], [48, 0, -12]);

  return (
    <div ref={ref} id="locations" className={styles.officeWrap} data-home-section="locations">
      <section className={cn(sectionStyles.section, styles.office)}>
        <div className={`${sectionStyles.container} ${styles.container}`}>
          <div className={styles.shell}>
            <motion.div
              className={styles.introPanel}
              data-snap-anchor
              style={shouldReduceMotion ? undefined : { y: introY, opacity: introOpacity }}
            >
              {intro}
            </motion.div>

            <motion.div
              className={styles.stage}
              style={shouldReduceMotion ? undefined : { y: stageY }}
            >
              <LocationsCitiesGrid
                mainCityName={mainCityName}
                mainCityStyle={{}}
                cities={cities}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

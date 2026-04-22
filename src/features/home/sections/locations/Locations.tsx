"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import { LocationsCitiesGrid } from "./LocationsCitiesGrid";
import styles from "./Locations.module.scss";

const MUNICH_STYLE: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--tone-sand) 6%, #fff)",
  borderColor: "color-mix(in srgb, var(--tone-sand) 25%, var(--border-card))",
};

const OTHER_CITIES = [
  {
    key: "berlin",
    image: "/assets/1_city-berlin-v2.png",
    imageWidth: 750,
    imageHeight: 971,
    imageOverlay: "rgba(210, 195, 180, 0.6)",
    delayMs: 200,
    style: {
      backgroundColor: "color-mix(in srgb, var(--tone-blue) 6%, #fff)",
      borderColor: "color-mix(in srgb, var(--tone-blue) 25%, var(--border-card))",
    },
  },
  {
    key: "hamburg",
    image: "/assets/1_city-hamburg.png",
    imageWidth: 1058,
    imageHeight: 1336,
    imagePosition: "center 35%",
    delayMs: 400,
    style: {
      backgroundColor: "color-mix(in srgb, var(--tone-sand) 8%, #fff)",
      borderColor: "color-mix(in srgb, var(--tone-sand) 25%, var(--border-card))",
    },
  },
  {
    key: "cologne",
    image: "/assets/1_city-cologne.png",
    imageWidth: 736,
    imageHeight: 920,
    imagePosition: "center 15%",
    imageOverlay: "rgba(210, 195, 180, 0.6)",
    delayMs: 600,
    style: {
      backgroundColor: "color-mix(in srgb, var(--tone-lavender) 6%, #fff)",
      borderColor: "color-mix(in srgb, var(--tone-lavender) 25%, var(--border-card))",
    },
  },
];

export function Locations() {
  const t = useTranslations("home.locations");
  const overline = t("overline");
  const subtitle = t("subtitle");
  const titleAccent = t.has("titleAccent") ? t("titleAccent") : "";
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
              {overline ? <p className={styles.overline}>{overline}</p> : null}
              <h2 className={styles.title}>
                {t("title")}
                {titleAccent ? (
                  <>
                    {" "}
                    <span className={styles.titleAccent}>{titleAccent}</span>
                  </>
                ) : null}
              </h2>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </motion.div>

            <motion.div
              className={styles.stage}
              style={shouldReduceMotion ? undefined : { y: stageY }}
            >
              <LocationsCitiesGrid
                mainCityName={t("cities.munich.name")}
                mainCityStyle={MUNICH_STYLE}
                cities={OTHER_CITIES.map((city) => ({
                  ...city,
                  name: t(`cities.${city.key}.name`),
                }))}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

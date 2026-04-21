"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const PRINCIPLE_KEYS = [
  "individualSupport",
  "expertise",
  "confidentiality",
  "digitalPortal",
  "security",
  "concierge",
  "coordination",
  "international",
] as const;

export function FullSupport() {
  const t = useTranslations("home.fullSupport");
  const overline = t("overline");
  const subtitle = t("subtitle");
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.32, 1], [56, 0, -26]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.38, 1, 1]);
  const listY = useTransform(scrollYProgress, [0, 0.36, 1], [72, 0, -18]);
  const listOpacity = useTransform(scrollYProgress, [0, 0.22, 1], [0.1, 1, 1]);

  return (
      <section
        ref={ref}
        id="support"
        className={cn(sectionStyles.section, styles.fullSupport)}
        data-home-section="support"
      >
      <div className={sectionStyles.container}>
        <div className={styles.layout} data-snap-anchor>
          <motion.div
            className={styles.headingRow}
            style={shouldReduceMotion ? undefined : { y: headingY, opacity: headingOpacity }}
          >
            <div className={styles.header}>
              {overline ? <p className={styles.overline}>{overline}</p> : null}
              <h2 className={styles.title}>{t("title")}</h2>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>
          </motion.div>

          <div className={styles.body}>
            <motion.div
              className={styles.conceptMedia}
              aria-hidden="true"
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.08, y: 40 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.conceptMediaInner}>
                <Image
                  src="/assets/full-support-concept.webp"
                  alt="End-to-end patient support concept illustration"
                  fill
                  sizes="(max-width: 767px) 80vw, 32vw"
                  className={styles.conceptMediaImage}
                />
              </div>
            </motion.div>

            <motion.div
              className={styles.contentWrap}
              style={shouldReduceMotion ? undefined : { y: listY, opacity: listOpacity }}
            >
              <ol className={styles.principlesList}>
                {PRINCIPLE_KEYS.map((key, index) => (
                  <motion.li
                    key={key}
                    className={styles.principleItem}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 36 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                  >
                    <span className={styles.principleIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.principleBody}>
                      <p className={styles.principleText}>{t(`principles.${key}`)}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}

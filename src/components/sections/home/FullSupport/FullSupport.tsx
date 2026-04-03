"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  const tMembership = useTranslations("membership");
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
  const arrowX = useTransform(scrollYProgress, [0, 0.38, 1], [28, 0, -14]);
  const arrowRotate = useTransform(scrollYProgress, [0, 0.42, 1], ["8deg", "0deg", "-4deg"]);

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

            <motion.div
              className={styles.heroArrow}
              aria-hidden="true"
              style={shouldReduceMotion ? undefined : { x: arrowX, rotate: arrowRotate }}
            >
              <svg viewBox="0 0 40 40" fill="none" className={styles.heroArrowIcon}>
                <path
                  d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
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
                    {key === "digitalPortal" || key === "concierge" ? (
                      <span className={styles.principleBadgeRow}>
                        <Link
                          href="/membership"
                          prefetch={false}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.principleBadgeLink}
                        >
                          <span className={styles.principleBadge}>
                            {tMembership("reserve.badge")}
                          </span>
                        </Link>
                      </span>
                    ) : null}
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}

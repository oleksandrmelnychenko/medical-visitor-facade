"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import styles from "./Focus.module.scss";

const ITEMS = [
  "secondOpinion",
  "continuedTreatment",
  "familyCheckup",
  "rareSpecialist",
] as const;

export function Focus() {
  const t = useTranslations("home.focus");
  const eyebrow = t("eyebrow");
  const subtitle = t("subtitle");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="for-whom"
      className={styles.section}
      data-home-section="focus"
    >
      <div className={styles.layout}>
        <motion.div
          className={styles.headingRow}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.header}>
            {eyebrow ? <p className={styles.overline}>{eyebrow}</p> : null}
            <h2 className={styles.title}>{t("title")}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>
        </motion.div>

        <div className={styles.body}>
          <ol className={styles.principlesList}>
            {ITEMS.map((key, index) => (
              <motion.li
                key={key}
                className={styles.principleItem}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              >
                <span className={styles.principleIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.principleBody}>
                  <p className={styles.principleText}>{t(`items.${key}.label`)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

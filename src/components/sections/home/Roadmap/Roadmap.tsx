"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Roadmap.module.scss";

const STEPS = [
  { number: "01", key: "consultation" },
  { number: "02", key: "travel" },
  { number: "03", key: "arrival" },
  { number: "04", key: "treatment" },
  { number: "05", key: "recovery" },
];

export const Roadmap = memo(function Roadmap() {
  const t = useTranslations("home.fullSupport");

  return (
    <section className={styles.section}>
      <div className={sectionStyles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className={styles.heading}>{t("journey.title")}</h3>

          <div className={styles.steps}>
            {STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                className={styles.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className={styles.timeline}>
                  <div className={styles.dot} />
                  {index < STEPS.length - 1 && <div className={styles.connector} />}
                </div>
                <div className={styles.content}>
                  <span className={styles.number}>{step.number}</span>
                  <h4 className={styles.stepTitle}>
                    {t(`journey.steps.${step.key}.title`)}
                  </h4>
                  <p className={styles.stepDesc}>
                    {t(`journey.steps.${step.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.promise}>
            <p className={styles.promiseText}>{t("promise.text")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

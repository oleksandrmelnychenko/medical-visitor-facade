"use client";

import { memo, type CSSProperties } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  Building2,
  Stethoscope,
  Activity,
  ShieldCheck,
} from "lucide-react";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

const STEPS = [
  { icon: Building2, key: "clinic", tone: "var(--tone-blue)" },
  { icon: Stethoscope, key: "organization", tone: "var(--tone-sand)" },
  { icon: Activity, key: "coordination", tone: "var(--tone-sage)" },
  { icon: ShieldCheck, key: "support", tone: "var(--tone-lavender)" },
];

export const CareForward = memo(function CareForward() {
  const t = useTranslations("home.careForward");

  return (
    <section className={styles.section} data-dark-section>
      <div className={sectionStyles.container}>
        <motion.div
          className={styles.shell}
          data-snap-anchor
          data-snap-shift="24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{t("title")}</h2>
          </div>
          <div className={styles.flowGrid}>
            {STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                className={styles.flowCard}
                style={{ "--tone": step.tone } as CSSProperties}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.stepNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.cardIcon}>
                    <step.icon />
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{t(`services.${step.key}.title`)}</h3>
                  <p className={styles.cardDesc}>{t(`services.${step.key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

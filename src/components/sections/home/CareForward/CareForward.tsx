"use client";

import { memo, type CSSProperties } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  Building2,
  Stethoscope,
  Activity,
  ShieldCheck,
  Headphones,
  Video,
} from "lucide-react";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

const STEPS = [
  { icon: Building2, key: "clinic", ns: "careForward" as const, style: { "--tone": "#9bb3c9" } as CSSProperties },
  { icon: Stethoscope, key: "organization", ns: "careForward" as const, style: { "--tone": "#d4b5a5" } as CSSProperties },
  { icon: Activity, key: "coordination", ns: "careForward" as const, style: { "--tone": "#c9c0a0" } as CSSProperties },
];

const SUPPORT_CHILDREN = [
  { icon: Headphones, key: "support", style: { "--tone": "#b8a0cc" } as CSSProperties },
  { icon: Video, key: "consultations", style: { "--tone": "#a890c0" } as CSSProperties },
];

export const CareForward = memo(function CareForward() {
  const t = useTranslations("home.careForward");
  const tCta = useTranslations("home.cta");
  return (
    <section className={styles.section}>
      <div className={sectionStyles.container}>
        <motion.div
          className={styles.shell}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{t("title")}</h2>
          </div>

          <div className={styles.timeline}>
            {/* Main steps 01–03 */}
            {STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                className={styles.step}
                style={step.style}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className={styles.rail}>
                  <div className={styles.dot}>
                    <span className={styles.stepNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <step.icon />
                  </div>
                  <div className={styles.connector} />
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    {t(`services.${step.key}.title`)}
                  </h3>
                  <p className={styles.stepDesc}>
                    {t(`services.${step.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* 04 Сопровождение — parent with nested children */}
            <motion.div
              className={styles.stepGroup}
              style={{ "--tone": "#c4afd4" } as CSSProperties}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: STEPS.length * 0.08 }}
            >
              {/* Parent row */}
              <div className={styles.step}>
                <div className={styles.rail}>
                  <div className={`${styles.dot} ${styles.dotParent}`}>
                    <span className={styles.stepNumber}>
                      {String(STEPS.length + 1).padStart(2, "0")}
                    </span>
                    <ShieldCheck />
                  </div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{tCta("title")}</h3>
                </div>
              </div>

              {/* Children */}
              <div className={styles.children}>
                {SUPPORT_CHILDREN.map((child, index) => (
                    <motion.div
                      key={child.key}
                      className={styles.childStep}
                      style={child.style}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: (STEPS.length + 1 + index) * 0.08,
                      }}
                    >
                      <div className={styles.childRail}>
                        <div className={styles.childDot}>
                          <child.icon />
                        </div>
                      </div>
                      <div className={styles.childContent}>
                        <h3 className={styles.childTitle}>
                          {tCta(`services.${child.key}.title`)}
                        </h3>
                        <p className={styles.childDesc}>
                          {tCta(`services.${child.key}.desc`)}
                        </p>
                      </div>
                    </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

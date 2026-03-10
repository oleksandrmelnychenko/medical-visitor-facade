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
  UserCheck,
  Video,
} from "lucide-react";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

const STEPS = [
  { icon: Building2, key: "clinic", tone: "var(--tone-blue)" },
  { icon: Stethoscope, key: "organization", tone: "var(--tone-sand)" },
  { icon: Activity, key: "coordination", tone: "var(--tone-sage)" },
  { icon: ShieldCheck, key: "support", tone: "var(--tone-lavender)" },
];

const SUPPORT_ITEMS = [
  { icon: Headphones, key: "support" },
  { icon: UserCheck, key: "monitoring" },
  { icon: Video, key: "consultations" },
];

export const CareForward = memo(function CareForward() {
  const t = useTranslations("home.careForward");
  const tCta = useTranslations("home.cta");

  return (
    <section className={styles.section} data-dark-section>
      <span className={styles.topSeam} aria-hidden />
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

          <motion.div
            className={styles.supportStrip}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.4 }}
          >
            {SUPPORT_ITEMS.map((item) => (
              <div key={item.key} className={styles.supportItem}>
                <div className={styles.supportItemIcon}>
                  <item.icon />
                </div>
                <div className={styles.supportItemText}>
                  <h4 className={styles.supportItemTitle}>
                    {tCta(`services.${item.key}.title`)}
                  </h4>
                  <p className={styles.supportItemDesc}>
                    {tCta(`services.${item.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

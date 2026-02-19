"use client";

import { memo, type CSSProperties } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Building2, Stethoscope, Activity, Headphones, Video } from "lucide-react";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

const PRIMARY_SERVICES = [
  { icon: Building2, key: "clinic", style: { "--tone": "#D8C39B" } as CSSProperties },
  { icon: Stethoscope, key: "organization", style: { "--tone": "#9FCBD8" } as CSSProperties },
  { icon: Activity, key: "coordination", style: { "--tone": "#A8D0AE" } as CSSProperties },
];

const SUPPORT_SERVICES = [
  { icon: Headphones, key: "support" },
  { icon: Video, key: "consultations" },
];

const SUPPORT_BLOCK_STYLE = { "--tone": "#C7A6D4" } as CSSProperties;

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
            <span className={styles.headerLine} />
            <h2 className={styles.title}>{t("title")}</h2>
          </div>

          <div className={styles.layout}>
            <div className={styles.flow}>
              {PRIMARY_SERVICES.map((service, index) => (
                <motion.article
                  key={service.key}
                  className={styles.flowCard}
                  style={service.style}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className={styles.flowIcon}>
                    <service.icon />
                  </div>
                  <div className={styles.cardText}>
                    <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                    <p className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              className={styles.supportPanel}
              style={SUPPORT_BLOCK_STYLE}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.supportHead}>
                <div className={styles.supportIcon}>
                  <Headphones />
                </div>
                <h3 className={styles.supportTitle}>{tCta("title")}</h3>
              </div>

              <div className={styles.supportGrid}>
                {SUPPORT_SERVICES.map((subService) => (
                  <div key={subService.key} className={styles.supportItem}>
                    <subService.icon className={styles.subServiceIcon} />
                    <div>
                      <h4 className={styles.subServiceTitle}>
                        {tCta(`services.${subService.key}.title`)}
                      </h4>
                      <p className={styles.subServiceDesc}>
                        {tCta(`services.${subService.key}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

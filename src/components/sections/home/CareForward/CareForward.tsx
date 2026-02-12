"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Building2, Stethoscope, Activity, Headphones, Video } from "lucide-react";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

// Static arrays moved outside component to prevent recreation on each render
const SERVICES = [
  { icon: Building2, key: 'clinic', style: { '--hover-color': '#E5D5A8' } as React.CSSProperties },
  { icon: Stethoscope, key: 'organization', style: { '--hover-color': '#A8D5E5' } as React.CSSProperties },
  { icon: Activity, key: 'coordination', style: { '--hover-color': '#B5E5B0' } as React.CSSProperties },
];

const SUPPORT_SERVICES = [
  { icon: Headphones, key: 'support' },
  { icon: Video, key: 'consultations' },
];

const SUPPORT_BLOCK_STYLE = { '--hover-color': '#D5A8E5' } as React.CSSProperties;

export const CareForward = memo(function CareForward() {
  const t = useTranslations('home.careForward');
  const tCta = useTranslations('home.cta');

  return (
    <section className={styles.section}>
      <div className={sectionStyles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        <div className={styles.servicesGrid}>
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.key}
              className={styles.serviceItem}
              style={service.style}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Front - icon + title */}
              <div className={styles.serviceFront}>
                <div className={styles.serviceIcon}>
                  <service.icon />
                </div>
                <h3 className={styles.serviceTitle}>
                  {t(`services.${service.key}.title`)}
                </h3>
              </div>
              {/* Back - description on hover */}
              <div className={styles.serviceBack}>
                <p className={styles.serviceDesc}>
                  {t(`services.${service.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 4th block - Сопровождение with hover sub-services */}
          <motion.div
            className={styles.serviceItem}
            style={SUPPORT_BLOCK_STYLE}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Front - icon + title */}
            <div className={styles.serviceFront}>
              <div className={styles.serviceIcon}>
                <Headphones />
              </div>
              <h3 className={styles.serviceTitle}>
                {tCta('title')}
              </h3>
            </div>
            {/* Back - sub-services on hover */}
            <div className={styles.serviceBack}>
              {SUPPORT_SERVICES.map((subService) => (
                <div key={subService.key} className={styles.subServiceItem}>
                  <subService.icon className={styles.subServiceIcon} />
                  <span className={styles.subServiceTitle}>
                    {tCta(`services.${subService.key}.title`)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

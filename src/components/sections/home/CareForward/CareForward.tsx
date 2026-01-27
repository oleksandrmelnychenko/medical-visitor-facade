"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Building2, Stethoscope, Activity } from "lucide-react";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

export function CareForward() {
  const t = useTranslations('home.careForward');

  const services = [
    { icon: Building2, key: 'clinic' },
    { icon: Stethoscope, key: 'organization' },
    { icon: Activity, key: 'coordination' },
  ];

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
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className={styles.serviceItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.serviceIcon}>
                <service.icon />
              </div>
              <h3 className={styles.serviceTitle}>
                {t(`services.${service.key}.title`)}
              </h3>
              <p className={styles.serviceDesc}>
                {t(`services.${service.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

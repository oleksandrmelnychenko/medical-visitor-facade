"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Building2, Stethoscope, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

export function CareForward() {
  const t = useTranslations('home.careForward');

  const services = [
    { icon: Building2, key: 'clinic', color: '#E5B8A8' },
    { icon: Stethoscope, key: 'organization', color: '#C4A8E5' },
    { icon: Activity, key: 'coordination', color: '#A8E5D5' },
  ];

  const FirstIcon = services[0].icon;

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
          {/* Large card on left */}
          <motion.div
            className={cn(styles.serviceItem, styles.serviceItemLarge)}
            style={{ '--hover-color': services[0].color } as React.CSSProperties}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.serviceIcon}>
              <FirstIcon />
            </div>
            <h3 className={styles.serviceTitle}>
              {t(`services.${services[0].key}.title`)}
            </h3>
            <p className={styles.serviceDesc}>
              {t(`services.${services[0].key}.desc`)}
            </p>
          </motion.div>

          {/* Two smaller cards stacked on right */}
          <div className={styles.rightColumn}>
            {services.slice(1).map((service, index) => (
              <motion.div
                key={service.key}
                className={styles.serviceItem}
                style={{ '--hover-color': service.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
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
      </div>
    </section>
  );
}

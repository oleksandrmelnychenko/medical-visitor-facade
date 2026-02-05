"use client";

import { motion } from "motion/react";
import { Plane, Heart, Clock, MessageCircle, Stamp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

export function FullSupport() {
  const t = useTranslations('home.fullSupport');

  const services = [
    { icon: Heart, key: 'support', color: '#A8D5E5', size: 'normal' as const },
    { icon: Clock, key: 'promptness', color: '#D5A8E5', size: 'large' as const },
    { icon: Stamp, key: 'confidentiality', color: '#B5E5B0', size: 'normal' as const },
    { icon: Plane, key: 'noFees', color: '#A8E5C4', size: 'normal' as const },
    { icon: MessageCircle, key: 'concierge', color: '#E5D5A8', size: 'normal' as const },
  ];

  const journeySteps = [
    { number: '01', key: 'consultation' },
    { number: '02', key: 'travel' },
    { number: '03', key: 'arrival' },
    { number: '04', key: 'treatment' },
    { number: '05', key: 'recovery' },
  ];

  return (
    <section className={cn(sectionStyles.section, styles.fullSupport)}>
      <div className={sectionStyles.container}>
        <div className={styles.layout}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.overline}>{t('overline')}</p>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </motion.div>

          <div className={styles.bentoGrid}>
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                className={cn(
                  styles.serviceItem,
                  service.size === 'large' && styles.serviceItemLarge
                )}
                style={{ '--hover-color': service.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={styles.serviceIcon}>
                  <service.icon />
                </div>
                <div className={styles.serviceText}>
                  <span className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</span>
                  <span className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.closingLine} />

          <div className={styles.rightColumn}>
            <motion.div
              className={styles.roadmapCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={styles.roadmapTitle}>{t('journey.title')}</h3>
              <div className={styles.roadmap}>
                {journeySteps.map((step, index) => (
                  <div
                    key={step.key}
                    className={styles.roadmapStep}
                  >
                    <div className={styles.roadmapLine}>
                      <div className={styles.roadmapDot} />
                      {index < journeySteps.length - 1 && <div className={styles.roadmapConnector} />}
                    </div>
                    <div className={styles.roadmapContent}>
                      <span className={styles.roadmapNumber}>{step.number}</span>
                      <h4 className={styles.roadmapStepTitle}>{t(`journey.steps.${step.key}.title`)}</h4>
                      <p className={styles.roadmapStepDesc}>{t(`journey.steps.${step.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.promise}>
                <p className={styles.promiseText}>{t('promise.text')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

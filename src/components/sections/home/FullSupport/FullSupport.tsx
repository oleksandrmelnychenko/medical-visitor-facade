"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { Plane, CarTaxiFront, Clock, MessageCircle, Stamp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

// City color palette on icons: Berlin → Hamburg → Munich → Cologne
const SERVICES = [
  { icon: CarTaxiFront, key: 'support', size: 'normal' as const, style: { '--icon-bg': '#f7f9fb', '--icon-border': '#e3e9f1' } as React.CSSProperties },
  { icon: Clock, key: 'promptness', size: 'large' as const, style: { '--icon-bg': '#fcf8f6', '--icon-border': '#eee3dd' } as React.CSSProperties },
  { icon: Stamp, key: 'confidentiality', size: 'normal' as const, style: { '--icon-bg': '#fcfbf7', '--icon-border': '#ece9df' } as React.CSSProperties },
  { icon: Plane, key: 'noFees', size: 'normal' as const, style: { '--icon-bg': '#faf8f9', '--icon-border': '#ebe5e7' } as React.CSSProperties },
  { icon: MessageCircle, key: 'concierge', size: 'normal' as const, style: { '--icon-bg': '#f9f7fb', '--icon-border': '#e8e2ef' } as React.CSSProperties },
];

const JOURNEY_STEPS = [
  { number: '01', key: 'consultation' },
  { number: '02', key: 'travel' },
  { number: '03', key: 'arrival' },
  { number: '04', key: 'treatment' },
  { number: '05', key: 'recovery' },
];

export const FullSupport = memo(function FullSupport() {
  const t = useTranslations('home.fullSupport');

  return (
    <section className={cn(sectionStyles.section, styles.fullSupport)}>
      <div className={sectionStyles.container}>
        <div className={styles.layout}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className={styles.overline}>{t('overline')}</p>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </motion.div>

          <div className={styles.bentoGrid}>
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.key}
                className={cn(
                  styles.serviceItem,
                  service.size === 'large' && styles.serviceItemLarge
                )}
                style={service.style}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              >
                <div className={styles.serviceIcon}>
                  <service.icon />
                </div>
                <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                <p className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.closingSpacer} aria-hidden="true" />

          <div className={styles.rightColumn}>
            <motion.div
              className={styles.roadmapCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <h3 className={styles.roadmapTitle}>{t('journey.title')}</h3>
              <div className={styles.roadmap}>
                {JOURNEY_STEPS.map((step, index) => (
                  <div
                    key={step.key}
                    className={styles.roadmapStep}
                  >
                    <div className={styles.roadmapLine}>
                      <div className={styles.roadmapDot} />
                      {index < JOURNEY_STEPS.length - 1 && <div className={styles.roadmapConnector} />}
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
});

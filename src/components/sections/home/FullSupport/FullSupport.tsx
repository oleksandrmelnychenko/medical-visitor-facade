"use client";

import { memo } from "react";
import { motion } from "motion/react";
import {
  PlaneTakeoff,
  Route,
  CalendarClock,
  Headset,
  FileCheck2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const SERVICES = [
  { icon: Route, key: 'support', size: 'normal' as const },
  { icon: CalendarClock, key: 'promptness', size: 'large' as const },
  { icon: FileCheck2, key: 'confidentiality', size: 'normal' as const },
  { icon: PlaneTakeoff, key: 'noFees', size: 'normal' as const, premiumLabel: 'PRIVATE' },
  { icon: Headset, key: 'concierge', size: 'normal' as const, premiumLabel: 'PRIORITY' },
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
        <div className={styles.layout} data-snap-anchor>
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

          <div className={styles.orbitWrapper}>
            {/* Orbital ellipse with 2 dots */}
            <svg
              className={styles.orbitEllipse}
              viewBox="0 0 1000 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                id="orbitPath"
                d="M500,5 A495,345 0 1,1 499.9,5 Z"
                fill="none"
                stroke="rgba(184, 164, 204, 0.12)"
                strokeWidth="1"
              />
              <circle r="3.5" fill="rgba(160, 144, 184, 0.6)">
                <animateMotion dur="16s" repeatCount="indefinite">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>
              <circle r="3.5" fill="rgba(160, 144, 184, 0.6)">
                <animateMotion dur="16s" repeatCount="indefinite" begin="-8s">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>
            </svg>

            <div className={styles.bentoGrid}>
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.key}
                  className={cn(
                    styles.serviceItem,
                    service.premiumLabel && styles.serviceItemPremium,
                    service.size === 'large' && styles.serviceItemLarge
                  )}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                >
                  <div className={styles.serviceIcon}>
                    <service.icon />
                  </div>
                  <div className={styles.serviceTitleRow}>
                    <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                    {service.premiumLabel && (
                      <span className={styles.premiumBadge}>{service.premiumLabel}</span>
                    )}
                  </div>
                  <p className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</p>
                </motion.div>
              ))}
            </div>
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

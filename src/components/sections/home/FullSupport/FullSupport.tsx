"use client";

import { memo } from "react";
import { motion } from "motion/react";
import {
  PlaneTakeoff,
  Route,
  CalendarClock,
  Headset,
  FileCheck2,
  FolderArchive,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const SERVICES = [
  { icon: Route, key: 'support', size: 'normal' as const },
  { icon: CalendarClock, key: 'promptness', size: 'large' as const },
  { icon: FileCheck2, key: 'confidentiality', size: 'normal' as const },
  { icon: PlaneTakeoff, key: 'noFees', size: 'normal' as const, premium: true },
  { icon: Headset, key: 'concierge', size: 'normal' as const, premium: true },
];

const JOURNEY_STEPS = [
  { number: '01', key: 'consultation' },
  { number: '02', key: 'travel' },
  { number: '03', key: 'arrival' },
  { number: '04', key: 'treatment' },
  { number: '05', key: 'recovery' },
];

export const FullSupport = memo(function FullSupport() {
  const t = useTranslations("home.fullSupport");
  const overline = t("overline");
  const subtitle = t("subtitle");

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
            {overline ? <p className={styles.overline}>{overline}</p> : null}
            <h2 className={styles.title}>{t("title")}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </motion.div>

          <div className={styles.orbitWrapper}>
            <div className={styles.bentoGrid}>
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.key}
                  className={cn(
                    styles.serviceItem,
                    service.premium && styles.serviceItemPremium,
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
                    {service.premium && (
                      <span className={styles.premiumBadge}>{t(`services.${service.key}.badge`)}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      styles.premiumDivider,
                      service.premium && styles.premiumDividerPremium
                    )}
                    aria-hidden
                  />
                  <p className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={styles.digitalProfileCard}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
            >
              <div className={cn(styles.serviceIcon, styles.digitalProfileIcon)}>
                <FolderArchive />
              </div>
              <div className={styles.digitalProfileBody}>
                <h3 className={styles.digitalProfileTitle}>{t("digitalProfile.title")}</h3>
                <span className={styles.digitalProfileDivider} aria-hidden />
                <p className={styles.digitalProfileDesc}>{t("digitalProfile.description")}</p>
              </div>
            </motion.div>
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
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
});

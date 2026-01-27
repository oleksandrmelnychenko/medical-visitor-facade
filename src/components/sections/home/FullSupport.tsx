"use client";

import { motion } from "motion/react";
import { Wallet, Heart, Diamond, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import styles from "./fullsupport.module.scss";

export function FullSupport() {
  const t = useTranslations('home.fullSupport');

  // 5 services like in the reference design
  const servicesTop = [
    { icon: Wallet, key: 'noFees', color: '#F4B4C4' },
    { icon: Heart, key: 'support', color: '#A8D5E5' },
    { icon: Diamond, key: 'confidentiality', color: '#B5E5B0' },
  ];

  const servicesBottom = [
    { icon: Clock, key: 'promptness', color: '#D5A8E5' },
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
          {/* Header */}
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

          {/* Services Cards - Staggered Layout */}
          <div className={styles.servicesList}>
            {/* Top Row - 3 cards */}
            <div className={cn(styles.servicesRow, styles.servicesRowTop)}>
              {servicesTop.map((service, index) => (
                <motion.div
                  key={service.key}
                  className={styles.serviceItem}
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

            {/* Bottom Row - 2 cards centered */}
            <div className={cn(styles.servicesRow, styles.servicesRowBottom)}>
              {servicesBottom.map((service, index) => (
                <motion.div
                  key={service.key}
                  className={styles.serviceItem}
                  style={{ '--hover-color': service.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (servicesTop.length + index) * 0.1 }}
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
          </div>

          {/* Closing line */}
          <div className={styles.closingLine} />

          {/* Roadmap */}
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
                  <motion.div
                    key={step.key}
                    className={styles.roadmapStep}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
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
                  </motion.div>
                ))}
              </div>

              {/* Promise */}
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

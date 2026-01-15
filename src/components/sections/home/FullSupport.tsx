"use client";

import { motion } from "motion/react";
import { Plane, Car, UserCheck, HeartHandshake, Building2, Phone, FileText, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import styles from "./fullsupport.module.scss";

export function FullSupport() {
  const t = useTranslations('home.fullSupport');

  const services = [
    { icon: Plane, key: 'flights' },
    { icon: Car, key: 'transport' },
    { icon: Building2, key: 'accommodation' },
    { icon: UserCheck, key: 'escort' },
    { icon: Globe, key: 'translation' },
    { icon: FileText, key: 'paperwork' },
    { icon: HeartHandshake, key: 'medical' },
    { icon: Phone, key: 'support' },
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
          {/* Left Column - Header + Services */}
          <div className={styles.leftColumn}>
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

            {/* Services List */}
            <div className={styles.servicesList}>
              {services.map((service, index) => (
                <motion.div
                  key={service.key}
                  className={styles.serviceItem}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
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

          {/* Right Column - Vertical Roadmap */}
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

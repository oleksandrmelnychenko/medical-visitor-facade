"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PatientCenteredCarePage() {
  const t = useTranslations('patientCenteredCare');

  const principles = [
    {
      title: t('principles.compassionate.title'),
      description: t('principles.compassionate.description')
    },
    {
      title: t('principles.collaborative.title'),
      description: t('principles.collaborative.description')
    },
    {
      title: t('principles.personalized.title'),
      description: t('principles.personalized.description')
    }
  ];

  const benefits = [
    t('benefits.items.dedicatedTeam'),
    t('benefits.items.clearCommunication'),
    t('benefits.items.involvement'),
    t('benefits.items.coordinatedCare'),
    t('benefits.items.supportServices'),
    t('benefits.items.convenientAccess')
  ];

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            variant="page"
            titleAs="h1"
          />
        </div>
      </section>

      <section className={sectionStyles.section}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.stackLg}>
            <div className={pageStyles.gridTwo}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitle}>{t('approach.title')}</h2>
              <p className={pageStyles.textBody}>{t('approach.description1')}</p>
              <p className={pageStyles.textBody}>{t('approach.description2')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              style={{ backgroundColor: '#e2e8f0', minHeight: '300px' }}
            />
          </div>

            <div>
              <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
                {t('principles.title')}
              </h2>
              <div className={pageStyles.gridThree}>
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={pageStyles.stackedCard}
                >
                  <div
                    className={cn(pageStyles.stackedMedia, pageStyles.imageRounded)}
                    style={{ backgroundColor: '#e2e8f0', minHeight: '180px' }}
                  />
                  <div className={pageStyles.stackedBody}>
                    <h3 className={pageStyles.stackedTitle}>{principle.title}</h3>
                    <p className={pageStyles.stackedText}>{principle.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

            <div className={pageStyles.panel}>
              <h2 className={pageStyles.sectionTitle}>{t('benefits.title')}</h2>
              <div className={pageStyles.gridTwo}>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardRow)}
                >
                  <div className={pageStyles.dot}></div>
                  <p className={pageStyles.textBody}>{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}

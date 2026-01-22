"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PatientServicesPage() {
  const t = useTranslations('patientServices');

  const services = [
    {
      title: t('services.appointmentScheduling.title'),
      description: t('services.appointmentScheduling.description')
    },
    {
      title: t('services.patientSupport.title'),
      description: t('services.patientSupport.description')
    },
    {
      title: t('services.medicalRecordsAccess.title'),
      description: t('services.medicalRecordsAccess.description')
    },
    {
      title: t('services.wellnessPrograms.title'),
      description: t('services.wellnessPrograms.description')
    },
    {
      title: t('services.patientEducation.title'),
      description: t('services.patientEducation.description')
    },
    {
      title: t('services.careCoordination.title'),
      description: t('services.careCoordination.description')
    }
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
            <div className={pageStyles.gridThree}>
            {services.map((service, index) => (
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
                  <h3 className={pageStyles.stackedTitle}>{service.title}</h3>
                  <p className={pageStyles.stackedText}>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

            <div className={pageStyles.gridTwo}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitle}>{t('carePlans.title')}</h2>
              <p className={pageStyles.textBody}>{t('carePlans.description')}</p>
              <button className={pageStyles.buttonOutline}>{t('learnMore')}</button>
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
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.textCenter}>
            <h2 className={pageStyles.sectionTitle}>{t('needHelp.title')}</h2>
            <p className={pageStyles.textBody}>{t('needHelp.description')}</p>
            <div className={pageStyles.buttonGroup}>
              <button className={pageStyles.buttonOutline}>{t('contactSupport')}</button>
              <button className={pageStyles.buttonSolid}>{t('callUs')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

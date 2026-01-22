"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function MedicalRecordsPage() {
  const t = useTranslations('medicalRecords');

  const features = [
    {
      title: t('features.download.title'),
      description: t('features.download.description')
    },
    {
      title: t('features.upload.title'),
      description: t('features.upload.description')
    },
    {
      title: t('features.access.title'),
      description: t('features.access.description')
    }
  ];

  const recordTypes = [
    t('recordTypes.medicalHistory'),
    t('recordTypes.labResults'),
    t('recordTypes.imagingReports'),
    t('recordTypes.prescriptionHistory'),
    t('recordTypes.immunizationRecords')
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
            <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.textCenter)}>
              <h2 className={pageStyles.sectionTitleSm}>{t('accessRecords.title')}</h2>
              <p className={cn(pageStyles.textSmall, pageStyles.textMuted)}>
                {t('accessRecords.description')}
              </p>
              <div className={pageStyles.formGrid}>
                <input
                  type="email"
                  placeholder={t('form.email')}
                  className={pageStyles.input}
                />
                <input
                  type="password"
                  placeholder={t('form.password')}
                  className={pageStyles.input}
                />
              </div>
              <button className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}>
                {t('accessRecords.button')}
              </button>
              <p className={cn(pageStyles.textSmall, pageStyles.textMuted)}>
                {t('noAccount')} <a href="#" className={pageStyles.textStrong}>{t('registerHere')}</a>
              </p>
            </div>

            <div className={pageStyles.gridThree}>
              {features.map((feature, index) => (
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
                    <h3 className={pageStyles.stackedTitle}>{feature.title}</h3>
                    <p className={pageStyles.stackedText}>{feature.description}</p>
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
                className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
                style={{ backgroundColor: '#e2e8f0', minHeight: '300px' }}
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className={pageStyles.sectionTitle}>{t('requestRecords.title')}</h2>
                <p className={pageStyles.textBody}>
                  {t('requestRecords.description')}
                </p>
                <ul className={pageStyles.checkList}>
                  {recordTypes.map((item, index) => (
                    <li key={index} className={pageStyles.checkItem}>
                      <div className={pageStyles.checkBullet}>
                        <div className={pageStyles.checkBulletInner}></div>
                      </div>
                      <span className={pageStyles.textSmall}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className={pageStyles.buttonOutline}>
                  {t('requestRecords.button')}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.textCenter}>
            <h2 className={pageStyles.sectionTitle}>{t('privacy.title')}</h2>
            <p className={pageStyles.textBody}>
              {t('privacy.description')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

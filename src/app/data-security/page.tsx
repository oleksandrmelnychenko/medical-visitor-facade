"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function DataSecurityPage() {
  const t = useTranslations('dataSecurity');

  const securityMeasures = [
    {
      title: t('measures.encryption.title'),
      description: t('measures.encryption.description')
    },
    {
      title: t('measures.dataCenters.title'),
      description: t('measures.dataCenters.description')
    },
    {
      title: t('measures.accessControls.title'),
      description: t('measures.accessControls.description')
    },
    {
      title: t('measures.audits.title'),
      description: t('measures.audits.description')
    },
    {
      title: t('measures.threatDetection.title'),
      description: t('measures.threatDetection.description')
    },
    {
      title: t('measures.backup.title'),
      description: t('measures.backup.description')
    }
  ];

  const hipaaItems = [
    t('hipaa.privacyRule'),
    t('hipaa.securityRule'),
    t('hipaa.breachNotification'),
    t('hipaa.businessAssociate')
  ];

  const certificationItems = [
    t('certifications.soc2'),
    t('certifications.iso27001'),
    t('certifications.hitrust'),
    t('certifications.penetrationTesting')
  ];

  const trainingItems = [
    t('training.annualTraining'),
    t('training.securityUpdates'),
    t('training.policies'),
    t('training.backgroundChecks')
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
              className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              style={{ backgroundColor: '#e2e8f0', minHeight: '300px' }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitle}>{t('enterprise.title')}</h2>
              <p className={pageStyles.textBody}>{t('enterprise.description1')}</p>
              <p className={pageStyles.textBody}>{t('enterprise.description2')}</p>
            </motion.div>
          </div>

          <div>
            <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
              {t('measures.title')}
            </h2>
            <div className={pageStyles.gridThree}>
              {securityMeasures.map((feature, index) => (
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
          </div>

          <div className={pageStyles.panel}>
            <h2 className={pageStyles.sectionTitle}>{t('compliance.title')}</h2>
            <div className={pageStyles.gridTwo}>
              <div>
                <h3 className={pageStyles.sectionTitleSm}>{t('hipaa.title')}</h3>
                <p className={pageStyles.textSmall}>{t('hipaa.description')}</p>
                <ul className={pageStyles.checkList}>
                  {hipaaItems.map((item, index) => (
                    <li key={index} className={pageStyles.checkItem}>
                      <div className={pageStyles.checkBullet}>
                        <div className={pageStyles.checkBulletInner}></div>
                      </div>
                      <span className={pageStyles.textSmall}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={pageStyles.sectionTitleSm}>{t('certifications.title')}</h3>
                <p className={pageStyles.textSmall}>{t('certifications.description')}</p>
                <ul className={pageStyles.checkList}>
                  {certificationItems.map((item, index) => (
                    <li key={index} className={pageStyles.checkItem}>
                      <div className={pageStyles.checkBullet}>
                        <div className={pageStyles.checkBulletInner}></div>
                      </div>
                      <span className={pageStyles.textSmall}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={pageStyles.gridTwo}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitle}>{t('training.title')}</h2>
              <p className={pageStyles.textBody}>{t('training.description')}</p>
              <ul className={pageStyles.dotList}>
                {trainingItems.map((item, index) => (
                  <li key={index} className={pageStyles.dotItem}>
                    <span className={pageStyles.dot}></span>
                    <p className={pageStyles.textBody}>{item}</p>
                  </li>
                ))}
              </ul>
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
            <h2 className={pageStyles.sectionTitle}>{t('reportConcern.title')}</h2>
            <p className={pageStyles.textBody}>{t('reportConcern.description')}</p>
            <button className={pageStyles.buttonOutline}>
              {t('contactSecurityTeam')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

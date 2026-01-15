"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function HIPAACompliancePage() {
  const t = useTranslations('hipaaCompliance');

  const rules = [
    {
      title: t('rules.privacy.title'),
      description: t('rules.privacy.description'),
      points: [
        t('rules.privacy.points.access'),
        t('rules.privacy.points.corrections'),
        t('rules.privacy.points.whoAccessed'),
        t('rules.privacy.points.notices')
      ]
    },
    {
      title: t('rules.security.title'),
      description: t('rules.security.description'),
      points: [
        t('rules.security.points.encryption'),
        t('rules.security.points.accessControls'),
        t('rules.security.points.riskAssessments'),
        t('rules.security.points.incidentResponse')
      ]
    },
    {
      title: t('rules.breach.title'),
      description: t('rules.breach.description'),
      points: [
        t('rules.breach.points.individual'),
        t('rules.breach.points.media'),
        t('rules.breach.points.hhs'),
        t('rules.breach.points.documentation')
      ]
    },
    {
      title: t('rules.omnibus.title'),
      description: t('rules.omnibus.description'),
      points: [
        t('rules.omnibus.points.businessAssociate'),
        t('rules.omnibus.points.patientRights'),
        t('rules.omnibus.points.penalties'),
        t('rules.omnibus.points.geneticInfo')
      ]
    }
  ];

  const adminSafeguards = [
    t('safeguards.administrative.privacyOfficer'),
    t('safeguards.administrative.training'),
    t('safeguards.administrative.policies'),
    t('safeguards.administrative.riskAssessments'),
    t('safeguards.administrative.sanctions')
  ];

  const physicalSafeguards = [
    t('safeguards.physical.facilityAccess'),
    t('safeguards.physical.workstation'),
    t('safeguards.physical.disposal'),
    t('safeguards.physical.visitor'),
    t('safeguards.physical.surveillance')
  ];

  const technicalSafeguards = [
    t('safeguards.technical.userId'),
    t('safeguards.technical.autoLogoff'),
    t('safeguards.technical.encryption'),
    t('safeguards.technical.auditControls'),
    t('safeguards.technical.transmission')
  ];

  const monitoringItems = [
    t('monitoring.continuous'),
    t('monitoring.updates'),
    t('monitoring.incidentResponse'),
    t('monitoring.annualAudits'),
    t('monitoring.policyUpdates')
  ];

  return (
    <div className={pageStyles.page}>
      <Breadcrumbs items={[{ label: t('title').toLowerCase() }]} />

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
            <div>
              <h2 className={pageStyles.sectionTitle}>{t('whatIs.title')}</h2>
              <p className={pageStyles.textBody}>{t('whatIs.description1')}</p>
              <p className={pageStyles.textBody}>{t('whatIs.description2')}</p>
            </div>

            <div>
              <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
                {t('rulesTitle')}
              </h2>
              <div className={pageStyles.gridTwo}>
                {rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={cn(pageStyles.card, pageStyles.cardPadded)}>
                      <h3 className={pageStyles.sectionTitleSm}>{rule.title}</h3>
                      <p className={pageStyles.textSmall}>{rule.description}</p>
                      <ul className={pageStyles.dotList}>
                        {rule.points.map((point, idx) => (
                          <li key={idx} className={pageStyles.dotItem}>
                            <span className={pageStyles.dot}></span>
                            <span className={pageStyles.textSmall}>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className={pageStyles.accentPanel}>
              <h2 className={pageStyles.sectionTitle}>{t('howWeEnsure.title')}</h2>
              <div className={pageStyles.gridTwo}>
                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('safeguards.administrative.title')}</h3>
                  <ul className={pageStyles.dotList}>
                    {adminSafeguards.map((item, index) => (
                      <li key={index} className={pageStyles.dotItem}>
                        <span className={pageStyles.dot}></span>
                        <p className={pageStyles.textSmall}>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('safeguards.physical.title')}</h3>
                  <ul className={pageStyles.dotList}>
                    {physicalSafeguards.map((item, index) => (
                      <li key={index} className={pageStyles.dotItem}>
                        <span className={pageStyles.dot}></span>
                        <p className={pageStyles.textSmall}>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('safeguards.technical.title')}</h3>
                  <ul className={pageStyles.dotList}>
                    {technicalSafeguards.map((item, index) => (
                      <li key={index} className={pageStyles.dotItem}>
                        <span className={pageStyles.dot}></span>
                        <p className={pageStyles.textSmall}>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('monitoring.title')}</h3>
                  <ul className={pageStyles.dotList}>
                    {monitoringItems.map((item, index) => (
                      <li key={index} className={pageStyles.dotItem}>
                        <span className={pageStyles.dot}></span>
                        <p className={pageStyles.textSmall}>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.textCenter}>
            <h2 className={pageStyles.sectionTitle}>{t('questions.title')}</h2>
            <p className={pageStyles.textBody}>{t('questions.description')}</p>
            <div className={pageStyles.buttonGroup}>
              <button className={pageStyles.buttonOutline}>{t('contactPrivacyOfficer')}</button>
              <button className={pageStyles.buttonSolid}>{t('downloadNotice')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

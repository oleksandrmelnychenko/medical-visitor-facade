"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPolicy');

  const keyPoints = [
    {
      title: t('keyPoints.encrypted.title'),
      description: t('keyPoints.encrypted.description')
    },
    {
      title: t('keyPoints.limitedAccess.title'),
      description: t('keyPoints.limitedAccess.description')
    },
    {
      title: t('keyPoints.yourControl.title'),
      description: t('keyPoints.yourControl.description')
    }
  ];

  const privacyRights = [
    t('rights.requestRestrictions'),
    t('rights.confidentialCommunications'),
    t('rights.inspectCopy'),
    t('rights.amend'),
    t('rights.accountingDisclosures'),
    t('rights.paperCopy')
  ];

  const responsibilities = [
    t('responsibilities.maintainPrivacy'),
    t('responsibilities.provideNotice'),
    t('responsibilities.followTerms'),
    t('responsibilities.notifyRestriction'),
    t('responsibilities.notifyBreach')
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
            <div className={pageStyles.gridFour}>
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(pageStyles.card, pageStyles.cardMuted, pageStyles.cardPadded, pageStyles.cardCentered)}
                >
                  <h3 className={pageStyles.cardTitle}>{point.title}</h3>
                  <p className={pageStyles.textSmall}>{point.description}</p>
                </motion.div>
              ))}
            </div>
            <div>
              <div className={pageStyles.stackMd}>
                <div>
                  <h2 className={pageStyles.sectionTitle}>{t('notice.title')}</h2>
                  <p className={pageStyles.textBody}>{t('notice.effectiveDate')}</p>
                  <p className={pageStyles.textBody}>{t('notice.description')}</p>
                </div>

                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('useDisclosure.title')}</h3>
                  <div className={pageStyles.stackMd}>
                    <div>
                      <h4 className={pageStyles.cardTitle}>{t('useDisclosure.treatment.title')}</h4>
                      <p className={pageStyles.textSmall}>{t('useDisclosure.treatment.description')}</p>
                    </div>
                    <div>
                      <h4 className={pageStyles.cardTitle}>{t('useDisclosure.payment.title')}</h4>
                      <p className={pageStyles.textSmall}>{t('useDisclosure.payment.description')}</p>
                    </div>
                    <div>
                      <h4 className={pageStyles.cardTitle}>{t('useDisclosure.operations.title')}</h4>
                      <p className={pageStyles.textSmall}>{t('useDisclosure.operations.description')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('rights.title')}</h3>
                  <ul className={pageStyles.dotList}>
                    {privacyRights.map((right, index) => (
                      <li key={index} className={pageStyles.dotItem}>
                        <span className={pageStyles.dot}></span>
                        <p className={pageStyles.textBody}>{right}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={pageStyles.sectionTitleSm}>{t('responsibilities.title')}</h3>
                  <p className={pageStyles.textBody}>{t('responsibilities.intro')}</p>
                  <ul className={pageStyles.dotList}>
                    {responsibilities.map((responsibility, index) => (
                      <li key={index} className={pageStyles.dotItem}>
                        <span className={pageStyles.dot}></span>
                        <p className={pageStyles.textBody}>{responsibility}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cn(pageStyles.textCenter, pageStyles.divider)}>
                  <p className={pageStyles.textSmall}>{t('lastUpdated')}</p>
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
            <div className={cn(pageStyles.textBody, pageStyles.textCenter)}>
              <p><strong>{t('contact.privacyOfficer')}</strong></p>
              <p>Gmed Agency for Patient Care</p>
              <p>Email: privacy@gmed.org</p>
              <p>{t('contact.phone')}: (555) 123-4567</p>
            </div>
            <button className={pageStyles.buttonOutline}>
              {t('contactPrivacyOfficer')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

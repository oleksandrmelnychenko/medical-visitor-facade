"use client";

import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PatientRightsPage() {
  const t = useTranslations('patientRights');

  const coreRights = [
    {
      title: t('coreRights.respectfulCare.title'),
      description: t('coreRights.respectfulCare.description'),
      details: [
        t('coreRights.respectfulCare.details.dignified'),
        t('coreRights.respectfulCare.details.cultural'),
        t('coreRights.respectfulCare.details.language'),
        t('coreRights.respectfulCare.details.privacy')
      ]
    },
    {
      title: t('coreRights.information.title'),
      description: t('coreRights.information.description'),
      details: [
        t('coreRights.information.details.explanations'),
        t('coreRights.information.details.accessRecords'),
        t('coreRights.information.details.costs'),
        t('coreRights.information.details.providers')
      ]
    },
    {
      title: t('coreRights.decisions.title'),
      description: t('coreRights.decisions.description'),
      details: [
        t('coreRights.decisions.details.consent'),
        t('coreRights.decisions.details.secondOpinion'),
        t('coreRights.decisions.details.refuse'),
        t('coreRights.decisions.details.advanceDirective')
      ]
    },
    {
      title: t('coreRights.communication.title'),
      description: t('coreRights.communication.description'),
      details: [
        t('coreRights.communication.details.questions'),
        t('coreRights.communication.details.concerns'),
        t('coreRights.communication.details.family'),
        t('coreRights.communication.details.advocates')
      ]
    }
  ];

  const additionalRights = [
    t('additionalRights.safeQuality'),
    t('additionalRights.privacy'),
    t('additionalRights.painManagement'),
    t('additionalRights.continuity'),
    t('additionalRights.policies'),
    t('additionalRights.advanceDirectives'),
    t('additionalRights.visitors'),
    t('additionalRights.protectiveServices'),
    t('additionalRights.emergency'),
    t('additionalRights.transfer'),
    t('additionalRights.billReview'),
    t('additionalRights.representative')
  ];

  const responsibilities = [
    t('responsibilities.accurateInfo'),
    t('responsibilities.followPlan'),
    t('responsibilities.askQuestions'),
    t('responsibilities.treatRespect'),
    t('responsibilities.keepAppointments'),
    t('responsibilities.financial')
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
            <div className={pageStyles.gridTwo}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitleSm}>{t('rightsMatter.title')}</h2>
              <p className={pageStyles.textBody}>{t('rightsMatter.description1')}</p>
              <p className={pageStyles.textBody}>{t('rightsMatter.description2')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Patient consultation"
                className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              />
            </motion.div>
          </div>

          <div>
            <h2 className={pageStyles.sectionTitleSm}>{t('coreRights.title')}</h2>
            <div className={pageStyles.gridTwo}>
              {coreRights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={cn(pageStyles.card, pageStyles.cardPadded)}>
                    <h3 className={pageStyles.sectionTitleSm}>{right.title}</h3>
                    <p className={pageStyles.textSmall}>{right.description}</p>
                    <ul className={pageStyles.stackMd}>
                      {right.details.map((detail, idx) => (
                        <li key={idx} className={pageStyles.checkItem}>
                          <CheckCircle className={pageStyles.iconSuccess} />
                          <span className={pageStyles.textSmall}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={pageStyles.panel}>
            <h2 className={pageStyles.sectionTitle}>{t('additionalRights.title')}</h2>
            <div className={pageStyles.gridTwo}>
              {additionalRights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  className={pageStyles.checkItem}
                >
                  <CheckCircle className={pageStyles.iconSuccessLg} />
                  <p className={pageStyles.textBody}>{right}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={pageStyles.gridTwo}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Healthcare partnership"
                className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitleSm}>{t('responsibilities.title')}</h2>
              <p className={pageStyles.textBody}>{t('responsibilities.description')}</p>
              <ul className={pageStyles.dotList}>
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className={pageStyles.dotItem}>
                    <span className={pageStyles.dot}></span>
                    <p className={pageStyles.textBody}>{responsibility}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <h2 className={pageStyles.sectionTitle}>{t('grievance.title')}</h2>
          <div className={pageStyles.gridTwo}>
            <div>
              <p className={pageStyles.textBody}>{t('grievance.description1')}</p>
              <p className={pageStyles.textBody}>{t('grievance.description2')}</p>
            </div>
            <div className={pageStyles.buttonGroup}>
              <button className={pageStyles.buttonOutline}>{t('fileComplaint')}</button>
              <button className={pageStyles.buttonSolid}>{t('contactAdvocate')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

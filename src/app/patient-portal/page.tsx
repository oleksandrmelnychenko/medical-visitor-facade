"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PatientPortalPage() {
  const t = useTranslations('patientPortal');

  const portalFeatures = [
    {
      image: "https://images.unsplash.com/photo-1617131633412-39437b40a16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('features.scheduleAppointments.title'),
      description: t('features.scheduleAppointments.description')
    },
    {
      image: "https://images.unsplash.com/photo-1693328397193-b858f1b38c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('features.viewRecords.title'),
      description: t('features.viewRecords.description')
    },
    {
      image: "https://images.unsplash.com/photo-1762330469637-dfbb6e014a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('features.secureMessaging.title'),
      description: t('features.secureMessaging.description')
    },
    {
      image: "https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('features.prescriptionRefills.title'),
      description: t('features.prescriptionRefills.description')
    },
    {
      image: "https://images.unsplash.com/photo-1762768767074-e491f1eebdfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('features.trackHealth.title'),
      description: t('features.trackHealth.description')
    },
    {
      image: "https://images.unsplash.com/photo-1762340275855-ae8f4c2c144e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('features.manageProfile.title'),
      description: t('features.manageProfile.description')
    }
  ];

  const benefits = [
    t('benefits.item1'),
    t('benefits.item2'),
    t('benefits.item3'),
    t('benefits.item4'),
    t('benefits.item5'),
    t('benefits.item6')
  ];

  const gettingStartedSteps = [
    t('gettingStarted.step1'),
    t('gettingStarted.step2'),
    t('gettingStarted.step3'),
    t('gettingStarted.step4')
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
            <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.textCenter)}>
              <div className={pageStyles.brandBadge}>P</div>
              <h2 className={pageStyles.sectionTitleSm}>{t('login.title')}</h2>
              <p className={pageStyles.textSmall}>{t('login.subtitle')}</p>

              <div className={pageStyles.stackMd}>
                <div>
                  <label className={pageStyles.label}>{t('form.email')}</label>
                  <input
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    className={pageStyles.input}
                  />
                </div>

                <div>
                  <label className={pageStyles.label}>{t('form.password')}</label>
                  <input
                    type="password"
                    placeholder={t('form.passwordPlaceholder')}
                    className={pageStyles.input}
                  />
                </div>
              </div>

              <button className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}>
                {t('login.signIn')}
              </button>

              <div className={pageStyles.buttonGroup}>
                <a href="#" className={pageStyles.linkMuted}>
                  {t('login.forgotPassword')}
                </a>
                <a href="#" className={pageStyles.linkMuted}>
                  {t('login.createAccount')}
                </a>
              </div>
            </div>

            <div>
              <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
                {t('portalFeatures')}
              </h2>
              <div className={pageStyles.gridThree}>
                {portalFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={pageStyles.stackedCard}
                  >
                    <div className={pageStyles.stackedMedia}>
                      <ImageWithFallback
                        src={feature.image}
                        alt={feature.title}
                        className={pageStyles.imageRounded}
                      />
                      <div className={pageStyles.mediaOverlay}></div>
                    </div>
                    <div className={pageStyles.stackedBody}>
                      <h3 className={pageStyles.stackedTitle}>{feature.title}</h3>
                      <p className={pageStyles.stackedText}>{feature.description}</p>
                    </div>
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
                <h2 className={pageStyles.sectionTitle}>{t('whyUse.title')}</h2>
                <ul className={pageStyles.dotList}>
                  {benefits.map((benefit, index) => (
                    <li key={index} className={pageStyles.dotItem}>
                      <span className={pageStyles.dot}></span>
                      <p className={pageStyles.textBody}>{benefit}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={pageStyles.accentPanel}
              >
                <h3 className={pageStyles.sectionTitleSm}>{t('gettingStarted.title')}</h3>
                <ol className={pageStyles.stepList}>
                  {gettingStartedSteps.map((step, index) => (
                    <li key={index} className={pageStyles.stepItem}>
                      <div className={pageStyles.stepNumber}>{index + 1}</div>
                      <p className={pageStyles.textBody}>{step}</p>
                    </li>
                  ))}
                </ol>
              </motion.div>
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
              <button className={pageStyles.buttonSolid}>{t('viewTutorial')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

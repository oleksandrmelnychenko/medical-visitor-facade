"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function InsurancePage() {
  const t = useTranslations('insurance');

  const acceptedInsurance = [
    "Blue Cross Blue Shield",
    "Aetna",
    "UnitedHealthcare",
    "Cigna",
    "Humana",
    "Medicare",
    "Medicaid",
    "Kaiser Permanente"
  ];

  const billingFeatures = [
    t('billing.itemizedStatements'),
    t('billing.insuranceVerification'),
    t('billing.costEstimates'),
    t('billing.paymentPlans')
  ];

  const paymentOptions = [
    {
      image: "https://images.unsplash.com/photo-1765226410758-9ae3d34cd791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('paymentOptions.online.title'),
      description: t('paymentOptions.online.description')
    },
    {
      image: "https://images.unsplash.com/photo-1634128222187-18eababc763d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('paymentOptions.plans.title'),
      description: t('paymentOptions.plans.description')
    },
    {
      image: "https://images.unsplash.com/photo-1688126507367-b7cb61e19f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('paymentOptions.assistance.title'),
      description: t('paymentOptions.assistance.description')
    }
  ];

  const faqs = [
    {
      question: t('faq.whenBill.question'),
      answer: t('faq.whenBill.answer')
    },
    {
      question: t('faq.cantAfford.question'),
      answer: t('faq.cantAfford.answer')
    },
    {
      question: t('faq.submitClaim.question'),
      answer: t('faq.submitClaim.answer')
    }
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
            <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
              {t('acceptedPlans.title')}
            </h2>
            <div className={pageStyles.gridFour}>
              {acceptedInsurance.map((insurance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardCentered, pageStyles.cardHover)}
                >
                  <p className={pageStyles.textStrong}>{insurance}</p>
                </motion.div>
              ))}
            </div>
            <p className={cn(pageStyles.textSmall, pageStyles.textCenter)}>
              {t('acceptedPlans.notSee')} <a href="#" className={pageStyles.textStrong}>{t('contactUs')}</a> {t('acceptedPlans.toVerify')}
            </p>
          </div>

          <div className={pageStyles.gridTwo}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={pageStyles.sectionTitle}>{t('billing.title')}</h2>
              <p className={pageStyles.textBody}>{t('billing.description')}</p>
              <ul className={pageStyles.checkList}>
                {billingFeatures.map((item, index) => (
                  <li key={index} className={pageStyles.checkItem}>
                    <div className={pageStyles.checkBullet}>
                      <div className={pageStyles.checkBulletInner}></div>
                    </div>
                    <span className={pageStyles.textSmall}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Financial planning"
                className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              />
            </motion.div>
          </div>

          <div>
            <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
              {t('paymentOptions.title')}
            </h2>
            <div className={pageStyles.gridThree}>
              {paymentOptions.map((option, index) => (
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
                      src={option.image}
                      alt={option.title}
                      className={pageStyles.imageRounded}
                    />
                    <div className={pageStyles.mediaOverlay}></div>
                  </div>
                  <div className={pageStyles.stackedBody}>
                    <h3 className={pageStyles.stackedTitle}>{option.title}</h3>
                    <p className={pageStyles.stackedText}>{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={pageStyles.panel}>
            <h2 className={pageStyles.sectionTitle}>{t('faq.title')}</h2>
            <div className={pageStyles.stackMd}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={pageStyles.faqCard}
                >
                  <div>
                    <h3 className={pageStyles.cardTitle}>{faq.question}</h3>
                    <p className={pageStyles.textSmall}>{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
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
            <button className={pageStyles.buttonOutline}>
              {t('contactBilling')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PatientCenteredCarePage() {
  const t = useTranslations('patientCenteredCare');

  const principles = [
    {
      image: "https://images.unsplash.com/photo-1764885449364-b1a758f03063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('principles.compassionate.title'),
      description: t('principles.compassionate.description')
    },
    {
      image: "https://images.unsplash.com/photo-1758574437870-f83c160efd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('principles.collaborative.title'),
      description: t('principles.collaborative.description')
    },
    {
      image: "https://images.unsplash.com/photo-1695720247432-8b353fba8c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('principles.personalized.title'),
      description: t('principles.personalized.description')
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
              <h2 className={pageStyles.sectionTitle}>{t('approach.title')}</h2>
              <p className={pageStyles.textBody}>{t('approach.description1')}</p>
              <p className={pageStyles.textBody}>{t('approach.description2')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Doctor consulting with patient"
                className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              />
            </motion.div>
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
                  <div className={pageStyles.stackedMedia}>
                    <ImageWithFallback
                      src={principle.image}
                      alt={principle.title}
                      className={pageStyles.imageRounded}
                    />
                    <div className={pageStyles.mediaOverlay}></div>
                  </div>
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

"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function AboutGmedPage() {
  const t = useTranslations('aboutGmed');

  const stats = [
    { number: "50+", label: t('stats.years') },
    { number: "500K+", label: t('stats.patients') },
    { number: "200+", label: t('stats.specialists') },
    { number: "15", label: t('stats.centers') }
  ];

  const values = [
    {
      title: t('values.excellence.title'),
      description: t('values.excellence.description')
    },
    {
      title: t('values.respect.title'),
      description: t('values.respect.description')
    },
    {
      title: t('values.integrity.title'),
      description: t('values.integrity.description')
    },
    {
      title: t('values.innovation.title'),
      description: t('values.innovation.description')
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
                <h2 className={pageStyles.sectionTitle}>{t('mission.title')}</h2>
                <p className={pageStyles.textBody}>{t('mission.description1')}</p>
                <p className={pageStyles.textBody}>{t('mission.description2')}</p>
              </motion.div>
            </div>

            <div className={cn(pageStyles.statGrid, pageStyles.textCenter)}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={pageStyles.statNumber}>{stat.number}</div>
                  <div className={pageStyles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div>
              <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
                {t('values.title')}
              </h2>
              <div className={pageStyles.gridTwo}>
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(pageStyles.mediaCard, pageStyles.mediaCardHover)}
                    style={{ backgroundColor: '#e2e8f0', minHeight: '200px' }}
                  >
                    <div className={pageStyles.mediaContent}>
                      <h3 className={pageStyles.mediaTitle}>{value.title}</h3>
                      <p className={pageStyles.mediaText}>{value.description}</p>
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
            <h2 className={pageStyles.sectionTitle}>{t('history.title')}</h2>
            <p className={pageStyles.textBody}>{t('history.description1')}</p>
            <p className={pageStyles.textBody}>{t('history.description2')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

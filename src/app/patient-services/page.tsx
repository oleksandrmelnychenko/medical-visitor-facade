"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function PatientServicesPage() {
  const t = useTranslations('patientServices');

  const services = [
    {
      image: "https://images.unsplash.com/photo-1758556549027-879615701c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('services.appointmentScheduling.title'),
      description: t('services.appointmentScheduling.description')
    },
    {
      image: "https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('services.patientSupport.title'),
      description: t('services.patientSupport.description')
    },
    {
      image: "https://images.unsplash.com/photo-1758691462814-485c3672e447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('services.medicalRecordsAccess.title'),
      description: t('services.medicalRecordsAccess.description')
    },
    {
      image: "https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('services.wellnessPrograms.title'),
      description: t('services.wellnessPrograms.description')
    },
    {
      image: "https://images.unsplash.com/photo-1758691462285-9e2db8b8dc44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('services.patientEducation.title'),
      description: t('services.patientEducation.description')
    },
    {
      image: "https://images.unsplash.com/photo-1722235623488-ae7639a2ffd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: t('services.careCoordination.title'),
      description: t('services.careCoordination.description')
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
                <div className={pageStyles.stackedMedia}>
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className={pageStyles.imageRounded}
                  />
                  <div className={pageStyles.mediaOverlay}></div>
                </div>
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
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Healthcare professional with patient"
                className={cn(pageStyles.imageRounded, pageStyles.imageShadow)}
              />
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
              <button className={pageStyles.buttonSolid}>{t('callUs')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Award, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function FindDoctorPage() {
  const t = useTranslations('findDoctor');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const specialties = [
    t('specialties.all'),
    t('specialties.cardiology'),
    t('specialties.oncology'),
    t('specialties.orthopedics'),
    t('specialties.neurology'),
    t('specialties.pediatrics'),
    t('specialties.internalMedicine')
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: t('specialties.cardiology'),
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: t('locations.mainCampus'),
      experience: t('experience.years15')
    },
    {
      name: "Dr. Michael Chen",
      specialty: t('specialties.oncology'),
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: t('locations.cancerCenter'),
      experience: t('experience.years20')
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: t('specialties.pediatrics'),
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: t('locations.childrensHospital'),
      experience: t('experience.years12')
    },
    {
      name: "Dr. James Wilson",
      specialty: t('specialties.orthopedics'),
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: t('locations.orthopedicCenter'),
      experience: t('experience.years18')
    }
  ];

  const features = [
    {
      title: t('features.boardCertified.title'),
      description: t('features.boardCertified.description')
    },
    {
      title: t('features.patientFocused.title'),
      description: t('features.patientFocused.description')
    },
    {
      title: t('features.advancedTraining.title'),
      description: t('features.advancedTraining.description')
    }
  ];

  return (
    <div className={pageStyles.page}>
      <Breadcrumbs items={[{ label: t('title').toLowerCase() }]} />

      <section className={cn(sectionStyles.section, pageStyles.heroSection)}>
        <div className={sectionStyles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title={t('title')}
              subtitle={t('subtitle')}
              variant="page"
              titleAs="h1"
            />

            <div className={cn(pageStyles.formCard, pageStyles.cardShadow)}>
              <div className={pageStyles.formGrid}>
                <div className={pageStyles.fieldWithIcon}>
                  <Search className={pageStyles.fieldIcon} />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(pageStyles.input, pageStyles.inputWithIcon)}
                  />
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className={pageStyles.select}
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              <button className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}>
                {t('searchButton')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={sectionStyles.section}>
        <div className={sectionStyles.container}>
          <h2 className={pageStyles.sectionTitle}>{t('doctorsTitle')}</h2>
          <div className={pageStyles.gridFour}>
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(pageStyles.card, pageStyles.cardHover)}
              >
                <ImageWithFallback
                  src={doctor.image}
                  alt={doctor.name}
                  className={pageStyles.imageRounded}
                />
                <div className={pageStyles.cardPadded}>
                  <h3 className={pageStyles.cardTitle}>{doctor.name}</h3>
                  <p className={cn(pageStyles.textSmall, pageStyles.textStrong)}>{doctor.specialty}</p>
                  <div className={cn(pageStyles.textSmall)}>
                    <div className={pageStyles.metaRow}>
                      <MapPin className={pageStyles.iconSm} />
                      {doctor.location}
                    </div>
                    <div className={pageStyles.metaRow}>
                      <Award className={pageStyles.iconSm} />
                      {doctor.experience}
                    </div>
                  </div>
                  <button className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}>
                    <Calendar className={pageStyles.iconSm} />
                    {t('bookAppointment')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <h2 className={cn(pageStyles.sectionTitle, pageStyles.textCenter)}>
            {t('whyChoose.title')}
          </h2>
          <div className={pageStyles.gridThree}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardCentered)}>
                  <h3 className={pageStyles.cardTitle}>{feature.title}</h3>
                  <p className={pageStyles.cardText}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

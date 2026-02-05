"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import styles from './RequestAppointment.module.scss';
import { PatientTypeSelection } from '../Components/PatientTypeSelection';
import { NewPatientForm } from '../Components/NewPatientForm';
import { ReturningPatientForm } from '../Components/ReturningPatientForm';
import { PhysicianForm } from '../Components/PhysicianForm';

export type PatientType = "new" | "returning" | "physician" | null;

export function RequestAppointment() {
  const t = useTranslations('appointment');
  const [selectedType, setSelectedType] = useState<PatientType>(null);

  // Add transparent header class to body on mount
  useEffect(() => {
    document.body.classList.add('transparent-header-mode');
    return () => {
      document.body.classList.remove('transparent-header-mode');
    };
  }, []);

  const handleCardClick = (type: PatientType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  return (
    <div className={cn(pageStyles.page, styles.gridBackground)} style={{ position: 'relative', zIndex: 0 }}>
      {/* Fixed background image with brightness filter */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'brightness(1.1) contrast(1.1)',
        }}
      />
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)} id="appointment" style={{ position: 'relative', zIndex: 1 }}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            variant="page"
            titleAs="h1"
          />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)} style={{ position: 'relative', zIndex: 1 }}>
        <div className={sectionStyles.container}>
          <AnimatePresence mode="wait">
            {!selectedType ? (
               <PatientTypeSelection onSelect={handleCardClick} />
            ) : (
              <motion.div
                key="form"
                className={pageStyles.stackMd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  onClick={handleBack}
                  className={styles.backButton}
                  type="button"
                >
                  {t('backToSelection')}
                </button>

                {selectedType === 'new' && <NewPatientForm />}
                {selectedType === 'returning' && <ReturningPatientForm onBack={handleBack} />}
                {selectedType === 'physician' && <PhysicianForm onBack={handleBack} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

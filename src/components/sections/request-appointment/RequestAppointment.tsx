"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';
import sectionStyles from '@/components/sections/shared/section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import styles from './request-appointment.module.scss';
import { PatientTypeSelection } from './components/PatientTypeSelection';
import { NewPatientForm } from './components/NewPatientForm';
import { ReturningPatientForm } from './components/ReturningPatientForm';
import { PhysicianForm } from './components/PhysicianForm';

export type PatientType = "new" | "returning" | "physician" | null;

export function RequestAppointment() {
  const t = useTranslations('appointment');
  const [selectedType, setSelectedType] = useState<PatientType>(null);

  const handleCardClick = (type: PatientType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection)} id="appointment">
        <div className={sectionStyles.container}>
          <SectionHeader
            overline={t('overline')}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="page"
            titleAs="h1"
          />
          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)}>
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

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import styles from './request-appointment.module.scss';
import { PatientTypeSelection } from './components/PatientTypeSelection';
import { NewPatientForm } from './components/NewPatientForm';
import { ReturningPatientForm } from './components/ReturningPatientForm';
import { PhysicianForm } from './components/PhysicianForm';

export type PatientType = "new" | "returning" | "physician" | null;

export function RequestAppointment() {
  const t = useTranslations('appointment');
  const tCommon = useTranslations('common');
  const [selectedType, setSelectedType] = useState<PatientType>(null);

  const handleCardClick = (type: PatientType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  return (
    <section className={styles.section} id="appointment">
      {/* Breadcrumb Navigation */}
      <div>
        <div className={cn(styles.container, 'py-3')}>
          <nav className={styles.breadcrumbs}>
            <Link href="/">{tCommon('home')}</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span>{t('title').toLowerCase()}</span>
          </nav>
        </div>
      </div>

      <div className={cn(styles.container, 'py-6')}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className={styles.overline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {t('overline')}
          </motion.p>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('title')}
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedType ? (
             <PatientTypeSelection onSelect={handleCardClick} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-black transition-colors mb-6 flex items-center gap-1"
              >
                {t('backToSelection')}
              </button>

              {selectedType === 'new' && <NewPatientForm onBack={handleBack} />}
              {selectedType === 'returning' && <ReturningPatientForm onBack={handleBack} />}
              {selectedType === 'physician' && <PhysicianForm onBack={handleBack} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

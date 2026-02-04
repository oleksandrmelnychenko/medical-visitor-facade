"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface PatientInfoIntroStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function PatientInfoIntroStep({ wizardPath }: PatientInfoIntroStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();

  const handleStart = () => {
    router.push(`/register/${wizardPath}/patient-information/form`);
  };

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/documents`);
  };

  return (
    <WizardStepLayout
      title={t('patientInfo.introTitle')}
      subtitle={t('patientInfo.introTitleBold')}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={1}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <motion.div
          onClick={handleStart}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('patientInfo.start')}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>
      </div>
    </WizardStepLayout>
  );
}

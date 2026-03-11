"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

export function ExitNoTravelStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();

  const handleBack = () => {
    router.push('/apply?type=new&step=outside-travel');
  };

  const handleExit = () => {
    router.push('/');
  };

  return (
    <WizardStepLayout
      title={t('exitNoTravelPatient.title')}
      showStepper
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={handleExit}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('exitNoTravelPatient.button')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

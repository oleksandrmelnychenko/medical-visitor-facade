"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { LocationType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

export function LocationStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();

  const handleSelect = (location: LocationType) => {
    updateData({ location });
    if (location === 'eu') {
      router.push('/register/eu/step/role');
    } else {
      router.push('/register/outside-eu/step/role');
    }
  };

  const handleBack = () => {
    router.push('/apply');
  };

  return (
    <WizardStepLayout
      title={t('location.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={() => handleSelect('eu')}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('location.insideEU')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('location.insideEUDesc')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('outside_eu')}
          className={styles.clientCard}
          style={{ '--hover-color': '#A8D5E5' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('location.outsideEU')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('location.outsideEUDesc')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

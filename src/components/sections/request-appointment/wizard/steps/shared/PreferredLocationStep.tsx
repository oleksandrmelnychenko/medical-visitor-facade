"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { PreferredLocationType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const LOCATIONS: { value: PreferredLocationType; key: string; color: string }[] = [
  { value: 'no_preference', key: 'noPreference', color: '#D5D5D5' },
  { value: 'munich', key: 'munich', color: '#E5D5A8' },
  { value: 'berlin', key: 'berlin', color: '#A8D5E5' },
  { value: 'hamburg', key: 'hamburg', color: '#A8E5C4' },
  { value: 'cologne', key: 'cologne', color: '#D5A8E5' },
];

export function PreferredLocationStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: PreferredLocationType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ preferredLocation: value });
    router.push('/apply?type=new&step=visit-timing');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=wrap-up-intro');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('preferredLocation.title')}
      subtitle={t('preferredLocation.subtitle')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        {LOCATIONS.map(loc => (
          <div
            key={loc.value}
            onClick={() => handleSelect(loc.value)}
            className={styles.clientCard}
            style={{ '--hover-color': loc.color } as React.CSSProperties}
          >
            <div className={styles.clientCardContent}>
              <h3 className={styles.clientCardTitle}>{t(`preferredLocation.${loc.key}`)}</h3>
            </div>
            <ChevronRight size={24} className={styles.clientCardArrow} />
          </div>
        ))}
      </div>
    </WizardStepLayout>
  );
}

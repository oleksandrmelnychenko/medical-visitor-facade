"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { LocationType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  eu: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  outside: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

export function LocationStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((location: LocationType) => {
    // Prevent double-clicks
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({ location });
    if (location === 'eu') {
      router.push('/register/eu/step/role');
    } else {
      router.push('/register/outside-eu/step/role');
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply');
  }, [router]);

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
          style={CARD_STYLES.eu}
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
          style={CARD_STYLES.outside}
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

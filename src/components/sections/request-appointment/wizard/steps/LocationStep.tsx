"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { LocationDetailedType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

const CARD_STYLES = {
  germany: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  eu: { '--hover-color': '#D5E8D5' } as React.CSSProperties,
  outside: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

export function LocationStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((locationDetailed: LocationDetailedType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({
      location: locationDetailed === 'outside_eu' ? 'outside_eu' : 'eu',
      locationDetailed,
    });
    if (locationDetailed === 'germany') {
      router.push('/apply?type=new&step=health-intro');
    } else {
      router.push('/apply?type=new&step=become-member');
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=welcome');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('location3.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={() => handleSelect('germany')}
          className={styles.clientCard}
          style={CARD_STYLES.germany}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('location3.germany')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('eu_not_germany')}
          className={styles.clientCard}
          style={CARD_STYLES.eu}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('location3.euNotGermany')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('outside_eu')}
          className={styles.clientCard}
          style={CARD_STYLES.outside}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('location3.outsideEu')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

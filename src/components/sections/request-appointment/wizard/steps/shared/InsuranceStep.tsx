"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const CARD_STYLES = {
  yes: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  no: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

export function InsuranceStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: 'yes' | 'no') => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ hasInsurance: value });
    if (value === 'yes') {
      router.push('/apply?type=new&step=insurance-coverage');
    } else {
      router.push('/apply?type=new&step=wrap-up-intro');
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=insurance-intro');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('insuranceStep.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div onClick={() => handleSelect('yes')} className={styles.clientCard} style={CARD_STYLES.yes}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('insuranceStep.yes')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
        <div onClick={() => handleSelect('no')} className={styles.clientCard} style={CARD_STYLES.no}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('insuranceStep.no')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

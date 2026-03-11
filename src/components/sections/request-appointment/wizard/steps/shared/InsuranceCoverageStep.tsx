"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { InsuranceCoverageType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const CARD_STYLES = {
  yes: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  no: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
  notSure: { '--hover-color': '#D5D5D5' } as React.CSSProperties,
};

export function InsuranceCoverageStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: InsuranceCoverageType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ insuranceCoversGermany: value });
    router.push('/apply?type=new&step=wrap-up-intro');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=insurance');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('insuranceCoverage.title')}
      showStepper
      activeStepIndex={3}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div onClick={() => handleSelect('yes')} className={styles.clientCard} style={CARD_STYLES.yes}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('insuranceCoverage.yes')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
        <div onClick={() => handleSelect('no')} className={styles.clientCard} style={CARD_STYLES.no}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('insuranceCoverage.no')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
        <div onClick={() => handleSelect('not_sure')} className={styles.clientCard} style={CARD_STYLES.notSure}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('insuranceCoverage.notSure')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

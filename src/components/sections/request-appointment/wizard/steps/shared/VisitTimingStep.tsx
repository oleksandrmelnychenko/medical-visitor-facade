"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { VisitTimingType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const TIMING_OPTIONS: { value: VisitTimingType; key: string; color: string }[] = [
  { value: 'asap', key: 'asap', color: '#E5D5A8' },
  { value: 'next_few_months', key: 'nextFewMonths', color: '#A8D5E5' },
  { value: 'not_sure', key: 'notSure', color: '#D5D5D5' },
];

export function VisitTimingStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: VisitTimingType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ visitTiming: value });
    router.push('/apply?type=new&step=anything-else');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=preferred-location');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('visitTiming.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        {TIMING_OPTIONS.map(opt => (
          <div
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={styles.clientCard}
            style={{ '--hover-color': opt.color } as React.CSSProperties}
          >
            <div className={styles.clientCardContent}>
              <h3 className={styles.clientCardTitle}>{t(`visitTiming.${opt.key}`)}</h3>
            </div>
            <ChevronRight size={24} className={styles.clientCardArrow} />
          </div>
        ))}
        <p className={styles.wizardTimingNote}>{t('visitTiming.note')}</p>
      </div>
    </WizardStepLayout>
  );
}

"use client";

import React, { useCallback, useRef, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { MedicalRecordsType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  yes: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  no: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
  none: { '--hover-color': '#D5D5D5' } as React.CSSProperties,
};

interface MedicalRecordsStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function MedicalRecordsStep({ wizardPath }: MedicalRecordsStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const recordsKey = useMemo(
    () => data.patientRole === 'patient' ? 'recordsPatient' : 'recordsCompanion',
    [data.patientRole]
  );

  const handleSelect = useCallback((value: MedicalRecordsType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({ hasMedicalRecords: value });
    if (value === 'yes') {
      router.push(`/register/${wizardPath}/step/documents`);
    } else if (value === 'no') {
      router.push(`/register/${wizardPath}/step/exit-records`);
    } else if (value === 'none') {
      router.push(`/register/${wizardPath}/step/documents`);
    }
  }, [updateData, router, wizardPath]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(`/register/${wizardPath}/step/travel`);
  }, [router, wizardPath]);

  return (
    <WizardStepLayout
      title={t(`${recordsKey}.title`)}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={() => handleSelect('yes')}
          className={styles.clientCard}
          style={CARD_STYLES.yes}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${recordsKey}.yes`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('no')}
          className={styles.clientCard}
          style={CARD_STYLES.no}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${recordsKey}.no`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('none')}
          className={styles.clientCard}
          style={CARD_STYLES.none}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${recordsKey}.none`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

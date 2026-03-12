"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { LegalSexType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const SEX_OPTIONS: { value: LegalSexType; key: string }[] = [
  { value: 'female', key: 'female' },
  { value: 'male', key: 'male' },
  { value: 'diverse', key: 'diverse' },
  { value: 'no_entry', key: 'noEntry' },
];

export function SharedLegalSexStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: LegalSexType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ legalSex: value });
    router.push('/apply?type=new&step=interpreter');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=email-consent');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('sharedLegalSex.title')}
      subtitle={t('sharedLegalSex.subtitle')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardSexButtonGrid}>
          {SEX_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={formStyles.sexButton}
              type="button"
            >
              {t(`sharedLegalSex.${opt.key}`)}
            </button>
          ))}
        </div>
      </div>
    </WizardStepLayout>
  );
}

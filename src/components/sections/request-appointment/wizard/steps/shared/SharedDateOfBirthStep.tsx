"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function SharedDateOfBirthStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [dob, setDob] = useState(data.dateOfBirth || '');

  const handleContinue = useCallback(() => {
    if (!dob) return;
    updateData({ dateOfBirth: dob });
    router.push('/apply?type=new&step=phone');
  }, [dob, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=patient-name');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('sharedDob.title')}
      showStepper
      activeStepIndex={1}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <input
              type="text"
              value={dob}
              onChange={e => setDob(e.target.value)}
              placeholder={t('sharedDob.placeholder')}
              className={formStyles.simpleInput}
              autoFocus
            />
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!dob}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function SharedPatientNameStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [firstName, setFirstName] = useState(data.firstName || '');
  const [middleName, setMiddleName] = useState(data.middleName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [suffix, setSuffix] = useState(data.suffix || '');

  const handleContinue = useCallback(() => {
    if (!firstName || !lastName) return;
    updateData({ firstName, middleName, lastName, suffix });
    router.push('/apply?type=new&step=patient-dob');
  }, [firstName, middleName, lastName, suffix, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=health-intro');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('sharedPatientName.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="patient-first-name" className={formStyles.label}>{t('sharedPatientName.firstName')}</label>
            <input
              id="patient-first-name"
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              aria-required="true"
              className={formStyles.simpleInput}
              autoFocus
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="patient-middle-name" className={formStyles.label}>{t('sharedPatientName.middleName')}</label>
            <input
              id="patient-middle-name"
              type="text"
              value={middleName}
              onChange={e => setMiddleName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="patient-last-name" className={formStyles.label}>{t('sharedPatientName.lastName')}</label>
            <input
              id="patient-last-name"
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              aria-required="true"
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="patient-suffix" className={formStyles.label}>{t('sharedPatientName.suffix')}</label>
            <input
              id="patient-suffix"
              type="text"
              value={suffix}
              onChange={e => setSuffix(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!firstName || !lastName}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

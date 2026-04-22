"use client";

import React, { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { validateName } from '../../validation';
import { StepLayout } from '../../ui/StepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '@/features/apply/ApplyPage.module.scss';

export function PatientName() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [firstName, setFirstName] = useState(data.firstName || '');
  const [middleName, setMiddleName] = useState(data.middleName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [suffix, setSuffix] = useState(data.suffix || '');
  const [touched, setTouched] = useState({ firstName: false, lastName: false });

  const firstNameValid = validateName(firstName);
  const lastNameValid = validateName(lastName);
  const canContinue = firstNameValid && lastNameValid;

  const handleContinue = useCallback(() => {
    setTouched({ firstName: true, lastName: true });
    if (!canContinue) return;
    updateData({ firstName: firstName.trim(), middleName: middleName.trim(), lastName: lastName.trim(), suffix: suffix.trim() });
    router.push('/apply?type=new&step=patient-dob');
  }, [canContinue, firstName, middleName, lastName, suffix, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=health-intro');
  }, [router]);

  return (
    <StepLayout
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
              onBlur={() => {
                if (firstName.trim().length > 0) {
                  setTouched(prev => ({ ...prev, firstName: true }));
                }
              }}
              aria-required="true"
              aria-invalid={touched.firstName && !firstNameValid}
              className={`${formStyles.simpleInput} ${touched.firstName && !firstNameValid ? formStyles.inputError : ''}`}
              autoFocus
            />
            {touched.firstName && !firstNameValid && (
              <span className={formStyles.fieldError}>{t('validation.nameMin')}</span>
            )}
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
              onBlur={() => {
                if (lastName.trim().length > 0) {
                  setTouched(prev => ({ ...prev, lastName: true }));
                }
              }}
              aria-required="true"
              aria-invalid={touched.lastName && !lastNameValid}
              className={`${formStyles.simpleInput} ${touched.lastName && !lastNameValid ? formStyles.inputError : ''}`}
            />
            {touched.lastName && !lastNameValid && (
              <span className={formStyles.fieldError}>{t('validation.nameMin')}</span>
            )}
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
          disabled={!canContinue}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>{t('continue')}</span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </StepLayout>
  );
}

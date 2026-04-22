"use client";

import React, { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { validateMinLength } from '../../validation';
import { StepLayout } from '../../ui/StepLayout';
import formStyles from '@/shared/ui/form/Form.module.scss';
import styles from '@/features/apply/ApplyPage.module.scss';

export function PrimaryLanguage() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [language, setLanguage] = useState(data.primaryLanguage || '');
  const [touched, setTouched] = useState(false);

  const languageValid = validateMinLength(language, 2);

  const handleContinue = useCallback(() => {
    setTouched(true);
    if (!languageValid) return;
    updateData({ primaryLanguage: language.trim() });
    router.push('/apply?type=new&step=legal-sex');
  }, [languageValid, language, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=email-consent');
  }, [router]);

  return (
    <StepLayout
      title={t('sharedPrimaryLanguage.title')}
      subtitle={t('sharedPrimaryLanguage.subtitle')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <input
              type="text"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-label={t('sharedPrimaryLanguage.title')}
              aria-required="true"
              aria-invalid={touched && !languageValid}
              className={`${formStyles.simpleInput} ${touched && !languageValid ? formStyles.inputError : ''}`}
              autoFocus
            />
            {touched && !languageValid && (
              <span className={formStyles.fieldError}>{t('validation.languageMin')}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!languageValid}
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

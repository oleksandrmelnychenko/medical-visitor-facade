"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function SharedPrimaryLanguageStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [language, setLanguage] = useState(data.primaryLanguage || '');

  const handleContinue = useCallback(() => {
    if (!language) return;
    updateData({ primaryLanguage: language });
    router.push('/apply?type=new&step=legal-sex');
  }, [language, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=email-consent');
  }, [router]);

  return (
    <WizardStepLayout
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
              className={formStyles.simpleInput}
              autoFocus
            />
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!language}
          className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

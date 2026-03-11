"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function AdditionalConcernsStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [additional, setAdditional] = useState(data.additionalConcerns || '');

  const handleContinue = useCallback(() => {
    updateData({ additionalConcerns: additional });
    router.push('/apply?type=new&step=insurance-intro');
  }, [additional, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=primary-concern');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('additionalConcerns.title')}
      showStepper
      activeStepIndex={2}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <textarea
            value={additional}
            onChange={e => setAdditional(e.target.value)}
            placeholder={t('additionalConcerns.optional')}
            className={formStyles.textarea}
            rows={5}
          />
        </div>
        <button
          onClick={handleContinue}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

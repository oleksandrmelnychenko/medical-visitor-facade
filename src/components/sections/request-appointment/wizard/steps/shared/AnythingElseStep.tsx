"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function AnythingElseStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [message, setMessage] = useState(data.message || '');

  const handleContinue = useCallback(() => {
    updateData({ message });
    router.push('/apply?type=new&step=review');
  }, [message, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=visit-timing');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('anythingElse.title')}
      subtitle={t('anythingElse.subtitle')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={t('anythingElse.optional')}
            className={formStyles.textarea}
            rows={5}
          />
        </div>
        <button
          onClick={handleContinue}
          className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

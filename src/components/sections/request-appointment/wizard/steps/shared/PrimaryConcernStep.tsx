"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function PrimaryConcernStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [concern, setConcern] = useState(data.primaryConcernText || '');

  const handleContinue = useCallback(() => {
    if (!concern) return;
    updateData({ primaryConcernText: concern });
    router.push('/apply?type=new&step=health-risk');
  }, [concern, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=concern-intro');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('primaryConcernText.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <textarea
            value={concern}
            onChange={e => setConcern(e.target.value)}
            placeholder={t('primaryConcernText.placeholder')}
            className={formStyles.textarea}
            rows={5}
            autoFocus
          />
        </div>
        <button
          onClick={handleContinue}
          disabled={!concern}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

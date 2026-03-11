"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function ConcernIntroStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=primary-concern');
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=address');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('concernIntro.title')}
      subtitle={t('concernIntro.description')}
      showStepper
      activeStepIndex={2}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleContinue}
          className={formStyles.submitButton}
          type="button"
        >
          {t('concernIntro.start')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

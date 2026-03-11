"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function InsuranceIntroStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data } = useWizard();
  const hasHealthRiskForTravel = data.hasHealthRiskForTravel;
  const isNavigatingRef = useRef(false);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=insurance');
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(
      hasHealthRiskForTravel === 'yes'
        ? '/apply?type=new&step=health-risk'
        : '/apply?type=new&step=additional-concerns'
    );
  }, [hasHealthRiskForTravel, router]);

  return (
    <WizardStepLayout
      title={t('insuranceIntro.title')}
      subtitle={t('insuranceIntro.subtitle')}
      showStepper
      activeStepIndex={3}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleContinue}
          className={formStyles.submitButton}
          type="button"
        >
          {t('insuranceIntro.start')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

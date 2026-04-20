"use client";

import React, { useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function HealthCareIntroStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleStart = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=patient-name');
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(
      data.locationDetailed === 'germany'
        ? '/apply?type=new&step=location'
        : '/apply?type=new&step=outside-documents'
    );
  }, [router, data.locationDetailed]);

  return (
    <WizardStepLayout
      title={t('healthIntro.title')}
      subtitle={t('healthIntro.subtitle')}
      subtitleClassName={styles.welcomeSubtitleBody}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleStart}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>{t('healthIntro.start')}</span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </WizardStepLayout>
  );
}

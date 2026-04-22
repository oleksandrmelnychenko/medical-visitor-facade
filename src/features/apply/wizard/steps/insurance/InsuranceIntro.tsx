"use client";

import React, { useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { StepLayout } from '../../ui/StepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '@/features/apply/ApplyPage.module.scss';

export function InsuranceIntro() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=insurance');
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=health-risk');
  }, [router]);

  return (
    <StepLayout
      title={t('insuranceIntro.title')}
      subtitle={t('insuranceIntro.subtitle')}
      subtitleClassName={styles.welcomeSubtitleBody}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleContinue}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>{t('insuranceIntro.start')}</span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </StepLayout>
  );
}

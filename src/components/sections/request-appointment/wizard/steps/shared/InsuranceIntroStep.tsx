"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { WizardIntroStep } from '../../components/WizardIntroStep';

export function InsuranceIntroStep() {
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
    <WizardIntroStep
      title={t('insuranceIntro.title')}
      subtitle={t('insuranceIntro.subtitle')}
      onBack={handleBack}
      backLabel={t('back')}
      onContinue={handleContinue}
      continueLabel={t('insuranceIntro.start')}
    />
  );
}

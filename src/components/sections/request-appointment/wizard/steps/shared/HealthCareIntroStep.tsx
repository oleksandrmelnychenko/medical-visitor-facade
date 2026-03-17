"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardIntroStep } from '../../components/WizardIntroStep';

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
    <WizardIntroStep
      title={t('healthIntro.title')}
      subtitle={t('healthIntro.subtitle')}
      onBack={handleBack}
      backLabel={t('back')}
      onContinue={handleStart}
      continueLabel={t('healthIntro.start')}
    />
  );
}

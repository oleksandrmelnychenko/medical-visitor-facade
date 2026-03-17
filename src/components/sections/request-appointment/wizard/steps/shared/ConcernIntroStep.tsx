"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { WizardIntroStep } from '../../components/WizardIntroStep';

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
    <WizardIntroStep
      title={t('concernIntro.title')}
      subtitle={t('concernIntro.description')}
      onBack={handleBack}
      backLabel={t('back')}
      onContinue={handleContinue}
      continueLabel={t('concernIntro.start')}
    />
  );
}

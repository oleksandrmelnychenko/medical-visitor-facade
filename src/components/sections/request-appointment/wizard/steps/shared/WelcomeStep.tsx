"use client";

import React, { useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';
import formStyles from '@/components/auth/Auth.module.scss';

export function WelcomeStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ welcomeCompleted: false });
    router.push('/apply?type=new&step=member-check');
  }, [router, updateData]);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ welcomeCompleted: true });
    router.push('/apply?type=new&step=location');
  }, [router, updateData]);

  return (
    <WizardStepLayout
      title={t('welcome.title')}
      subtitle={t('welcome.subtitle')}
      subtitleClassName={styles.welcomeSubtitleBody}
      contentClassName={styles.welcomeSurfacePlain}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={`${styles.wizardFormContainer} ${styles.welcomeFormContainer}`}>
        <button
          onClick={handleContinue}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          {t('welcome.continue')}
          <ArrowRight aria-hidden="true" />
        </button>
        <p className={styles.wizardEmergencyNote}>
          {t('welcome.emergency')}
        </p>
        <Link href="/privacy-policy" className={styles.wizardPrivacyLink}>
          {t('welcome.privacyPolicy')}
        </Link>
      </div>
    </WizardStepLayout>
  );
}

"use client";

import React, { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';
import formStyles from '@/components/auth/Auth.module.scss';

export function WelcomeStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=location');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('welcome.title')}
      subtitle={t('welcome.subtitle')}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleContinue}
          className={formStyles.submitButton}
          type="button"
        >
          {t('welcome.continue')}
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

"use client";

import React, { useState, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { StepLayout } from '../../ui/StepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '@/features/apply/ApplyPage.module.scss';

export function AnythingElse() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [message, setMessage] = useState(data.message || '');
  const isNavigatingRef = useRef(false);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    updateData({ message: value });
  }, [updateData]);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ message });
    router.push('/apply?type=new&step=review');
  }, [message, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ message });
    router.push('/apply?type=new&step=visit-timing');
  }, [message, updateData, router]);

  return (
    <StepLayout
      title={t('anythingElse.title')}
      subtitle={t('anythingElse.subtitle')}
      subtitleClassName={styles.welcomeSubtitleBody}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder={t('anythingElse.optional')}
            className={formStyles.textarea}
            rows={5}
          />
        </div>
        <button
          onClick={handleContinue}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>{t('continue')}</span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </StepLayout>
  );
}

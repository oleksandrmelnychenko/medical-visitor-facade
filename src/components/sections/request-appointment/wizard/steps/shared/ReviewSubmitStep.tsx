"use client";

import React, { useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { sanitizeWizardData, validateWizardSubmission } from '../../flow';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import { buildSalesforceBundle, submitSalesforceBundle } from '../../salesforce-bundle';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function ReviewSubmitStep() {
  const t = useTranslations('appointment.newPatient');
  const locale = useLocale();
  const router = useRouter();
  const { data, updateData, resetData } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allConsented =
    data.consentAutomatedContact &&
    data.consentHealthcare &&
    data.consentOptOut &&
    data.consentPrivacyPractices;

  const flow = data.locationDetailed === 'outside_eu' ? 'outside-eu' : 'eu';

  const handleSubmit = useCallback(async () => {
    if (!allConsented || isSubmitting) return;

    const submissionData = sanitizeWizardData(data);
    const validationErrors = validateWizardSubmission(submissionData);

    if (validationErrors.length > 0) {
      setError(t('reviewStep.incompleteError'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const bundle = buildSalesforceBundle(submissionData, { flow, locale });
    const result = await submitSalesforceBundle(bundle);

    if (result.success) {
      resetData();
      setIsSubmitted(true);
    } else {
      setError(result.error ?? 'Submission failed');
    }
    setIsSubmitting(false);
  }, [allConsented, isSubmitting, data, flow, locale, resetData, t]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=anything-else');
  }, [router]);

  if (isSubmitted) {
    return (
      <WizardStepLayout
        title={t('reviewStep.successTitle')}
        subtitle={t('reviewStep.successMessage')}
      >
        <div className={styles.wizardFormContainer}>
          <button
            onClick={() => router.push('/')}
            className={formStyles.submitButton}
            type="button"
          >
            {t('reviewStep.backToHome')}
          </button>
          <button
            onClick={() => router.push('/apply')}
            className={formStyles.submitButton}
            type="button"
            style={{ marginTop: '0.75rem' }}
          >
            {t('reviewStep.startOver')}
          </button>
        </div>
      </WizardStepLayout>
    );
  }

  return (
    <WizardStepLayout
      title={t('reviewStep.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardConsentList}>
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.consentAutomatedContact}
              onChange={e => updateData({ consentAutomatedContact: e.target.checked })}
              className={formStyles.checkboxInput}
            />
            <span className={formStyles.checkboxCustom} />
            <span className={formStyles.checkboxText}>{t('reviewStep.consent1')}</span>
          </label>
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.consentHealthcare}
              onChange={e => updateData({ consentHealthcare: e.target.checked })}
              className={formStyles.checkboxInput}
            />
            <span className={formStyles.checkboxCustom} />
            <span className={formStyles.checkboxText}>{t('reviewStep.consent2')}</span>
          </label>
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.consentOptOut}
              onChange={e => updateData({ consentOptOut: e.target.checked })}
              className={formStyles.checkboxInput}
            />
            <span className={formStyles.checkboxCustom} />
            <span className={formStyles.checkboxText}>{t('reviewStep.consent3')}</span>
          </label>
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.consentPrivacyPractices}
              onChange={e => updateData({ consentPrivacyPractices: e.target.checked })}
              className={formStyles.checkboxInput}
            />
            <span className={formStyles.checkboxCustom} />
            <span className={formStyles.checkboxText}>{t('reviewStep.consent4')}</span>
          </label>
        </div>

        {error && (
          <p className={formStyles.formError}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!allConsented || isSubmitting}
          className={formStyles.submitButton}
          type="button"
        >
          {isSubmitting ? t('reviewStep.submitting') : t('reviewStep.submit')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

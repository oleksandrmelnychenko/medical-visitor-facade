"use client";

import React, { useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { sanitizeWizardData, validateWizardSubmission } from '../../flow';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import { WizardReviewSummary } from '../../components/WizardReviewSummary';
import { buildSalesforceBundle, submitSalesforceBundle } from '../../salesforce-bundle';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function ReviewSubmitStep() {
  const t = useTranslations('appointment.newPatient');
  const locale = useLocale();
  const router = useRouter();
  const { data, updateData, resetData, uploadedMedicalFiles } = useWizard();
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
    const result = await submitSalesforceBundle(bundle, uploadedMedicalFiles);

    if (result.success) {
      resetData();
      setIsSubmitted(true);
    } else {
      setError(result.error ?? 'Submission failed');
    }
    setIsSubmitting(false);
  }, [allConsented, isSubmitting, data, flow, locale, resetData, t, uploadedMedicalFiles]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=anything-else');
  }, [router]);

  if (isSubmitted) {
    return (
      <WizardStepLayout
        title={t('reviewStep.successTitle')}
        subtitle={t('reviewStep.successMessage')}
      >
        <div className={`${styles.wizardFormContainer} ${styles.wizardSuccessActions}`}>
          <button
            onClick={() => router.push('/')}
            className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
            type="button"
          >
            {t('reviewStep.backToHome')}
          </button>
          <button
            onClick={() => router.push('/apply')}
            className={`${formStyles.submitButton} ${styles.wizardSecondaryButton}`}
            type="button"
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
      <div className={`${styles.wizardFormContainer} ${styles.wizardReviewFormContainer}`}>
        <WizardReviewSummary data={data} uploadedMedicalFiles={uploadedMedicalFiles} />

        <section className={styles.wizardConsentCard}>
          <div className={styles.wizardConsentList}>
            <label className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox}`}>
              <input
                type="checkbox"
                checked={data.consentAutomatedContact}
                onChange={e => updateData({ consentAutomatedContact: e.target.checked })}
                className={formStyles.checkboxInput}
              />
              <span className={formStyles.checkboxCustom} />
              <span className={`${formStyles.checkboxText} ${styles.wizardConsentText}`}>{t('reviewStep.consent1')}</span>
            </label>
            <label className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox}`}>
              <input
                type="checkbox"
                checked={data.consentHealthcare}
                onChange={e => updateData({ consentHealthcare: e.target.checked })}
                className={formStyles.checkboxInput}
              />
              <span className={formStyles.checkboxCustom} />
              <span className={`${formStyles.checkboxText} ${styles.wizardConsentText}`}>{t('reviewStep.consent2')}</span>
            </label>
            <label className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox}`}>
              <input
                type="checkbox"
                checked={data.consentOptOut}
                onChange={e => updateData({ consentOptOut: e.target.checked })}
                className={formStyles.checkboxInput}
              />
              <span className={formStyles.checkboxCustom} />
              <span className={`${formStyles.checkboxText} ${styles.wizardConsentText}`}>{t('reviewStep.consent3')}</span>
            </label>
            <label className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox}`}>
              <input
                type="checkbox"
                checked={data.consentPrivacyPractices}
                onChange={e => updateData({ consentPrivacyPractices: e.target.checked })}
                className={formStyles.checkboxInput}
              />
              <span className={formStyles.checkboxCustom} />
              <span className={`${formStyles.checkboxText} ${styles.wizardConsentText}`}>{t('reviewStep.consent4')}</span>
            </label>
          </div>

          {error && (
            <p className={formStyles.formError}>{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allConsented || isSubmitting}
            className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
            type="button"
          >
            {isSubmitting ? t('reviewStep.submitting') : t('reviewStep.submit')}
          </button>
        </section>
      </div>
    </WizardStepLayout>
  );
}

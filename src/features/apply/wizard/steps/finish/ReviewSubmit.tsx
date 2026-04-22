"use client";

import React, { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import type { WizardData } from '../../types';
import { useWizard } from '../../WizardContext';
import { sanitizeWizardData, validateWizardSubmission } from '../../flow';
import { StepLayout } from '../../ui/StepLayout';
import { ReviewSummary } from '../../ui/ReviewSummary';
import { buildSubmissionBundle, submitApplication } from '../../submission';
import formStyles from '@/shared/ui/form/Form.module.scss';
import styles from '@/features/apply/ApplyPage.module.scss';

type ConsentField =
  | 'consentAutomatedContact'
  | 'consentHealthcare'
  | 'consentOptOut'
  | 'consentPrivacyPractices';

export function ReviewSubmit() {
  const t = useTranslations('appointment.newPatient');
  const locale = useLocale();
  const router = useRouter();
  const { data, updateData, resetData, uploadedMedicalFiles } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConsentErrors, setShowConsentErrors] = useState(false);

  const checkedConsentCount = [
    data.consentAutomatedContact,
    data.consentHealthcare,
    data.consentOptOut,
    data.consentPrivacyPractices,
  ].filter(Boolean).length;
  const canAttemptSubmit = checkedConsentCount >= 2;
  const allConsented =
    data.consentAutomatedContact &&
    data.consentHealthcare &&
    data.consentOptOut &&
    data.consentPrivacyPractices;

  const flow = data.locationDetailed === 'outside_eu' ? 'outside-eu' : 'eu';

  const handleConsentChange = useCallback((field: ConsentField, checked: boolean) => {
    updateData({ [field]: checked } as Partial<WizardData>);
    setError(null);
  }, [updateData]);

  const handleSubmit = useCallback(async () => {
    if (!canAttemptSubmit || isSubmitting) return;

    if (!allConsented) {
      setShowConsentErrors(true);
      setError(t('reviewStep.consentIncompleteError'));
      return;
    }

    const submissionData = sanitizeWizardData(data);
    const validationErrors = validateWizardSubmission(submissionData);

    if (validationErrors.length > 0) {
      setShowConsentErrors(false);
      setError(t('reviewStep.incompleteError'));
      return;
    }

    setIsSubmitting(true);
    setShowConsentErrors(false);
    setError(null);

    const bundle = buildSubmissionBundle(submissionData, { flow, locale });
    const result = await submitApplication(bundle, uploadedMedicalFiles);

    if (result.success) {
      resetData();
      setIsSubmitted(true);
    } else {
      setError(result.error ?? 'Submission failed');
    }
    setIsSubmitting(false);
  }, [allConsented, canAttemptSubmit, isSubmitting, data, flow, locale, resetData, t, uploadedMedicalFiles]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=anything-else');
  }, [router]);

  const automatedContactInvalid = showConsentErrors && !data.consentAutomatedContact;
  const healthcareInvalid = showConsentErrors && !data.consentHealthcare;
  const optOutInvalid = showConsentErrors && !data.consentOptOut;
  const privacyInvalid = showConsentErrors && !data.consentPrivacyPractices;

  if (isSubmitted) {
    return (
      <StepLayout
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
      </StepLayout>
    );
  }

  return (
    <StepLayout
      title={t('reviewStep.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={`${styles.wizardFormContainer} ${styles.wizardReviewFormContainer}`}>
        <ReviewSummary data={data} uploadedMedicalFiles={uploadedMedicalFiles} />

        <section className={styles.wizardConsentCard}>
          <div className={styles.wizardConsentList}>
            <label
              className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox} ${automatedContactInvalid ? styles.wizardConsentCheckboxInvalid : ''}`}
            >
              <input
                type="checkbox"
                checked={data.consentAutomatedContact}
                onChange={e => handleConsentChange('consentAutomatedContact', e.target.checked)}
                aria-invalid={automatedContactInvalid}
                className={formStyles.checkboxInput}
              />
              <span className={`${formStyles.checkboxCustom} ${automatedContactInvalid ? styles.wizardConsentCustomInvalid : ''}`} />
              <span className={`${formStyles.checkboxContent} ${styles.wizardConsentContent}`}>
                <span className={`${formStyles.checkboxText} ${styles.wizardConsentText} ${automatedContactInvalid ? styles.wizardConsentTextInvalid : ''}`}>
                  {t('reviewStep.consent1')}
                </span>
                {automatedContactInvalid && (
                  <span className={`${formStyles.fieldError} ${styles.wizardConsentFieldError}`}>{t('reviewStep.consentRequired')}</span>
                )}
              </span>
            </label>
            <label
              className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox} ${healthcareInvalid ? styles.wizardConsentCheckboxInvalid : ''}`}
            >
              <input
                type="checkbox"
                checked={data.consentHealthcare}
                onChange={e => handleConsentChange('consentHealthcare', e.target.checked)}
                aria-invalid={healthcareInvalid}
                className={formStyles.checkboxInput}
              />
              <span className={`${formStyles.checkboxCustom} ${healthcareInvalid ? styles.wizardConsentCustomInvalid : ''}`} />
              <span className={`${formStyles.checkboxContent} ${styles.wizardConsentContent}`}>
                <span className={`${formStyles.checkboxText} ${styles.wizardConsentText} ${healthcareInvalid ? styles.wizardConsentTextInvalid : ''}`}>
                  {t('reviewStep.consent2')}
                </span>
                {healthcareInvalid && (
                  <span className={`${formStyles.fieldError} ${styles.wizardConsentFieldError}`}>{t('reviewStep.consentRequired')}</span>
                )}
              </span>
            </label>
            <label
              className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox} ${optOutInvalid ? styles.wizardConsentCheckboxInvalid : ''}`}
            >
              <input
                type="checkbox"
                checked={data.consentOptOut}
                onChange={e => handleConsentChange('consentOptOut', e.target.checked)}
                aria-invalid={optOutInvalid}
                className={formStyles.checkboxInput}
              />
              <span className={`${formStyles.checkboxCustom} ${optOutInvalid ? styles.wizardConsentCustomInvalid : ''}`} />
              <span className={`${formStyles.checkboxContent} ${styles.wizardConsentContent}`}>
                <span className={`${formStyles.checkboxText} ${styles.wizardConsentText} ${optOutInvalid ? styles.wizardConsentTextInvalid : ''}`}>
                  {t('reviewStep.consent3')}
                </span>
                {optOutInvalid && (
                  <span className={`${formStyles.fieldError} ${styles.wizardConsentFieldError}`}>{t('reviewStep.consentRequired')}</span>
                )}
              </span>
            </label>
            <label
              className={`${formStyles.checkboxLabel} ${styles.wizardConsentCheckbox} ${privacyInvalid ? styles.wizardConsentCheckboxInvalid : ''}`}
            >
              <input
                type="checkbox"
                checked={data.consentPrivacyPractices}
                onChange={e => handleConsentChange('consentPrivacyPractices', e.target.checked)}
                aria-invalid={privacyInvalid}
                className={formStyles.checkboxInput}
              />
              <span className={`${formStyles.checkboxCustom} ${privacyInvalid ? styles.wizardConsentCustomInvalid : ''}`} />
              <span className={`${formStyles.checkboxContent} ${styles.wizardConsentContent}`}>
                <span className={`${formStyles.checkboxText} ${styles.wizardConsentText} ${privacyInvalid ? styles.wizardConsentTextInvalid : ''}`}>
                  {t.rich('reviewStep.consent4', {
                    privacyLink: (chunks) => (
                      <Link href="/privacy-policy" className={styles.wizardLink} target="_blank" rel="noopener noreferrer">
                        {chunks}
                      </Link>
                    ),
                  })}
                </span>
                {privacyInvalid && (
                  <span className={`${formStyles.fieldError} ${styles.wizardConsentFieldError}`}>{t('reviewStep.consentRequired')}</span>
                )}
              </span>
            </label>
          </div>

          {error && (
            <p className={formStyles.formError}>{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!canAttemptSubmit || isSubmitting}
            className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
            type="button"
          >
            <span className={styles.welcomeContinueIcon} aria-hidden="true">
              <ArrowRight />
            </span>
            <span className={styles.welcomeContinueLabel}>
              {isSubmitting ? t('reviewStep.submitting') : t('reviewStep.submit')}
            </span>
            <span className={styles.welcomeContinueDot} aria-hidden="true" />
          </button>
        </section>
      </div>
    </StepLayout>
  );
}

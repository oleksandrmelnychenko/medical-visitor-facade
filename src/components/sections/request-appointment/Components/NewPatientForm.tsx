"use client";

import React, { useState, useCallback, useEffect, memo } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  readEncryptedJson,
  removeEncryptedJson,
  saveEncryptedJson,
} from '@/lib/client-encryption';
import pageStyles from '@/styles/page.module.scss';
import styles from '../RequestAppointment/RequestAppointment.module.scss';

type WizardStep =
  | 'primaryConcern'
  | 'seekingCareFor'
  | 'location'
  | 'patientRole'
  | 'travelReady'
  | 'medicalRecords'
  | 'travelDocuments'
  | 'patientInfoIntro'
  | 'patientInfoForm'
  | 'exitNoTravel'
  | 'exitNoRecords';

type LocationType = 'eu' | 'outside_eu' | null;
type PatientRoleType = 'patient' | 'companion' | null;
type YesNoType = 'yes' | 'no' | null;
type MedicalRecordsType = 'yes' | 'no' | 'none' | null;
type PrimaryConcernType = 'cardiology' | 'neurology' | 'oncology' | 'other_diagnosis' | 'no_diagnosis' | null;

interface WizardData {
  primaryConcern: PrimaryConcernType;
  seekingCareDescription: string;
  location: LocationType;
  patientRole: PatientRoleType;
  canTravel: YesNoType;
  hasMedicalRecords: MedicalRecordsType;
  hasTravelDocuments: YesNoType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  message: string;
}

const DRAFT_STORAGE_KEY = "gmed.apply.new-patient.draft.v1";
const INITIAL_WIZARD_DATA: WizardData = {
  primaryConcern: null,
  seekingCareDescription: '',
  location: null,
  patientRole: null,
  canTravel: null,
  hasMedicalRecords: null,
  hasTravelDocuments: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  country: '',
  message: '',
};

const PROGRESS_STEPS = [
  { key: 'primaryConcern', label: 'Primary Concern' },
  { key: 'travelReady', label: 'Travel Readiness' },
  { key: 'patientInfo', label: 'Patient Information' },
  { key: 'insuranceDetails', label: 'Insurance Details' },
  { key: 'wrapUp', label: 'Wrap Up' },
];

// Sidebar components extracted outside to prevent remounting on every render
const Sidebar = memo(({ activeIndex }: { activeIndex: number }) => (
  <div className={styles.wizardSidebar}>
    {PROGRESS_STEPS.map((s, index) => (
      <div
        key={s.key}
        className={cn(
          styles.sidebarStep,
          index === activeIndex && styles.sidebarStepActive,
          index < activeIndex && styles.sidebarStepComplete
        )}
      >
        {s.label}
      </div>
    ))}
  </div>
));
Sidebar.displayName = 'Sidebar';

const IntroSidebar = memo(({ activeIndex }: { activeIndex: number }) => (
  <div className={styles.introSidebar}>
    {PROGRESS_STEPS.map((s, index) => (
      <div
        key={s.key}
        className={cn(
          styles.introSidebarStep,
          index <= activeIndex && styles.introSidebarStepActive
        )}
      >
        {s.label}
      </div>
    ))}
  </div>
));
IntroSidebar.displayName = 'IntroSidebar';

export function NewPatientForm() {
  const t = useTranslations('appointment.newPatient');
  const [step, setStep] = useState<WizardStep>('primaryConcern');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [data, setData] = useState<WizardData>(INITIAL_WIZARD_DATA);
  const [isDraftHydrated, setIsDraftHydrated] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadDraft = async () => {
      const draft = await readEncryptedJson<{ step?: WizardStep; data?: WizardData }>(
        DRAFT_STORAGE_KEY
      );

      if (isCancelled) {
        return;
      }

      if (draft?.step) {
        setStep(draft.step);
      }

      if (draft?.data) {
        setData({ ...INITIAL_WIZARD_DATA, ...draft.data });
      }

      setIsDraftHydrated(true);
    };

    void loadDraft();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isDraftHydrated) {
      return;
    }

    void saveEncryptedJson(DRAFT_STORAGE_KEY, {
      step,
      data,
      updatedAt: new Date().toISOString(),
    }).catch(() => {
      // Ignore storage or crypto errors to avoid blocking the questionnaire flow.
    });
  }, [data, isDraftHydrated, step]);

  // Get translation key suffix based on patient role
  const getRoleSuffix = useCallback(
    () => data.patientRole === 'patient' ? 'Patient' : 'Companion',
    [data.patientRole]
  );

  const handleBack = useCallback(() => {
    switch (step) {
      case 'seekingCareFor':
        setStep('primaryConcern');
        break;
      case 'location':
        // Go back to seekingCareFor if cardiology or neurology, otherwise primaryConcern
        if (data.primaryConcern === 'cardiology' || data.primaryConcern === 'neurology') {
          setStep('seekingCareFor');
        } else {
          setStep('primaryConcern');
        }
        break;
      case 'patientRole':
        setStep('location');
        break;
      case 'travelReady':
        setStep('patientRole');
        break;
      case 'medicalRecords':
        setStep('travelReady');
        break;
      case 'travelDocuments':
        setStep('medicalRecords');
        break;
      case 'patientInfoIntro':
        if (data.hasMedicalRecords === 'none') {
          setStep('medicalRecords');
        } else {
          setStep('travelDocuments');
        }
        break;
      case 'patientInfoForm':
        setStep('patientInfoIntro');
        break;
      case 'exitNoTravel':
        setStep('travelReady');
        break;
      case 'exitNoRecords':
        setStep('medicalRecords');
        break;
    }
  }, [step, data.primaryConcern, data.hasMedicalRecords]);

  const handleExit = useCallback(() => {
    window.location.href = '/';
  }, []);

  // Step 0: Primary Concern (first step)
  if (step === 'primaryConcern') {
    const concerns = [
      { key: 'cardiology', value: 'cardiology' as PrimaryConcernType },
      { key: 'neurology', value: 'neurology' as PrimaryConcernType },
      { key: 'oncology', value: 'oncology' as PrimaryConcernType },
      { key: 'otherDiagnosis', value: 'other_diagnosis' as PrimaryConcernType },
      { key: 'noDiagnosis', value: 'no_diagnosis' as PrimaryConcernType },
    ];

    const handleConcernSelect = (value: PrimaryConcernType) => {
      setData({ ...data, primaryConcern: value });
      // Cardiology and Neurology go to seekingCareFor step
      if (value === 'cardiology' || value === 'neurology') {
        setStep('seekingCareFor');
      } else {
        setStep('location');
      }
    };

    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <div className={styles.splitCard}>
            <div className={styles.splitCardQuestion}>
              <h2 className={styles.questionTitle}>{t('primaryConcern.title')}</h2>
              <p className={styles.questionDescription}>{t('primaryConcern.description')}</p>
            </div>

            <div className={styles.splitCardOptions}>
              {concerns.map((concern) => (
                <button
                  key={concern.key}
                  onClick={() => handleConcernSelect(concern.value)}
                  className={styles.splitCardOption}
                  type="button"
                >
                  <span className={styles.optionTitle}>{t(`primaryConcern.options.${concern.key}`)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 0b: Seeking Care For (for Cardiology/Neurology)
  if (step === 'seekingCareFor') {
    const maxChars = 300;
    const charCount = data.seekingCareDescription.length;

    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.splitCard}>
            <div className={styles.splitCardQuestion}>
              <h2 className={styles.questionTitle}>{t('seekingCareFor.title')}</h2>
              <p className={styles.questionDescription}>{t('seekingCareFor.description')}</p>
            </div>

            <div className={styles.splitCardTextarea}>
              <div className={styles.charCounter}>{charCount}/{maxChars}</div>
              <p className={styles.charLimit}>{t('seekingCareFor.charLimit')}</p>
              <textarea
                value={data.seekingCareDescription}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setData({ ...data, seekingCareDescription: e.target.value });
                  }
                }}
                className={styles.seekingCareTextarea}
                rows={6}
              />
              <button
                onClick={() => setStep('location')}
                className={styles.textareaSubmitButton}
                type="button"
                disabled={charCount === 0}
              >
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Location (light blue background, different layout)
  if (step === 'location') {
    return (
      <div className={styles.locationStep}>
        <button onClick={handleBack} className={styles.locationBackButton} type="button">
          <ArrowLeft size={18} />
          {t('back')}
        </button>

        <div className={styles.locationContent}>
          <div className={styles.locationQuestion}>
            <h2 className={styles.locationTitle}>{t('location.title')}</h2>
          </div>

          <div className={styles.locationOptions}>
            <button
              onClick={() => {
                setData({ ...data, location: 'eu' });
                setStep('patientRole');
              }}
              className={styles.locationOption}
              type="button"
            >
              {t('location.insideEU')}
              <ChevronRight />
            </button>

            <button
              onClick={() => {
                setData({ ...data, location: 'outside_eu' });
                setStep('patientRole');
              }}
              className={styles.locationOption}
              type="button"
            >
              {t('location.outsideEU')}
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Patient Role (split card layout)
  if (step === 'patientRole') {
    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.splitCard}>
            <div className={styles.splitCardQuestion}>
              <h2 className={styles.questionTitle}>{t('patientRole.title')}</h2>
            </div>

            <div className={styles.splitCardOptions}>
              <button
                onClick={() => {
                  setData({ ...data, patientRole: 'patient' });
                  setStep('travelReady');
                }}
                className={styles.splitCardOption}
                type="button"
              >
                <span className={styles.optionTitle}>{t('patientRole.yes').split(',')[0]}</span>
                <span className={styles.optionDesc}>{t('patientRole.yesDesc')}</span>
              </button>

              <button
                onClick={() => {
                  setData({ ...data, patientRole: 'companion' });
                  setStep('travelReady');
                }}
                className={styles.splitCardOption}
                type="button"
              >
                <span className={styles.optionTitle}>{t('patientRole.no').split(',')[0]}</span>
                <span className={styles.optionDesc}>{t('patientRole.noDesc')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3a: Travel Ready
  if (step === 'travelReady') {
    const travelKey = `travel${getRoleSuffix()}`;
    const handleContinue = () => {
      if (data.canTravel === 'yes') {
        setStep('medicalRecords');
      } else if (data.canTravel === 'no') {
        setStep('exitNoTravel');
      }
    };

    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.splitCard}>
            <div className={styles.splitCardQuestion}>
              <h2 className={styles.questionTitle}>{t(`${travelKey}.title`)}</h2>
            </div>

            <div className={styles.splitCardOptions}>
              <button
                onClick={() => setData({ ...data, canTravel: 'yes' })}
                className={cn(
                  styles.splitCardOption,
                  data.canTravel === 'yes' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${travelKey}.yes`)}</span>
              </button>

              <button
                onClick={() => setData({ ...data, canTravel: 'no' })}
                className={cn(
                  styles.splitCardOption,
                  data.canTravel === 'no' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${travelKey}.no`)}</span>
              </button>
            </div>
          </div>

          {data.canTravel && (
            <button onClick={handleContinue} className={styles.continueButton} type="button">
              {t('continue')}
              <ChevronDown size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Step 3b: Medical Records
  if (step === 'medicalRecords') {
    const recordsKey = `records${getRoleSuffix()}`;
    const handleContinue = () => {
      if (data.hasMedicalRecords === 'yes') {
        setStep('travelDocuments');
      } else if (data.hasMedicalRecords === 'no') {
        setStep('exitNoRecords');
      } else if (data.hasMedicalRecords === 'none') {
        setStep('patientInfoIntro');
      }
    };

    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.splitCard}>
            <div className={styles.splitCardQuestion}>
              <h2 className={styles.questionTitle}>{t(`${recordsKey}.title`)}</h2>
            </div>

            <div className={styles.splitCardOptions}>
              <button
                onClick={() => setData({ ...data, hasMedicalRecords: 'yes' })}
                className={cn(
                  styles.splitCardOption,
                  data.hasMedicalRecords === 'yes' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${recordsKey}.yes`)}</span>
              </button>

              <button
                onClick={() => setData({ ...data, hasMedicalRecords: 'no' })}
                className={cn(
                  styles.splitCardOption,
                  data.hasMedicalRecords === 'no' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${recordsKey}.no`)}</span>
              </button>

              <button
                onClick={() => setData({ ...data, hasMedicalRecords: 'none' })}
                className={cn(
                  styles.splitCardOption,
                  data.hasMedicalRecords === 'none' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${recordsKey}.none`)}</span>
              </button>
            </div>
          </div>

          {data.hasMedicalRecords && (
            <button onClick={handleContinue} className={styles.continueButton} type="button">
              {t('continue')}
              <ChevronDown size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Step 3c: Travel Documents
  if (step === 'travelDocuments') {
    const docsKey = `documents${getRoleSuffix()}`;
    const handleContinue = () => {
      setStep('patientInfoIntro');
    };

    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.splitCard}>
            <div className={styles.splitCardQuestion}>
              <h2 className={styles.questionTitle}>{t(`${docsKey}.title`)}</h2>
              <p className={styles.questionDescription}>{t(`${docsKey}.needList`)}</p>
              <ul className={styles.requirementsList}>
                <li>{t(`${docsKey}.passport`)}</li>
                <li>
                  {t(`${docsKey}.visa`)}{' '}
                  <a href="https://www.auswaertiges-amt.de" target="_blank" rel="noopener noreferrer" className={styles.questionLink}>
                    {t(`${docsKey}.visaWaiverProgram`)}
                  </a>.
                </li>
              </ul>
              <p className={styles.questionNote}>
                {t(`${docsKey}.note`)}{' '}
                <a href="https://www.auswaertiges-amt.de" target="_blank" rel="noopener noreferrer" className={styles.questionLink}>
                  {t(`${docsKey}.embassy`)}
                </a>{' '}
                {t(`${docsKey}.noteEnd`)}
              </p>
            </div>

            <div className={styles.splitCardOptions}>
              <button
                onClick={() => setData({ ...data, hasTravelDocuments: 'yes' })}
                className={cn(
                  styles.splitCardOption,
                  data.hasTravelDocuments === 'yes' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${docsKey}.yes`)}</span>
              </button>

              <button
                onClick={() => setData({ ...data, hasTravelDocuments: 'no' })}
                className={cn(
                  styles.splitCardOption,
                  data.hasTravelDocuments === 'no' && styles.splitCardOptionSelected
                )}
                type="button"
              >
                <span className={styles.optionTitle}>{t(`${docsKey}.no`)}</span>
              </button>
            </div>
          </div>

          {data.hasTravelDocuments && (
            <button onClick={handleContinue} className={styles.continueButton} type="button">
              {t('continue')}
              <ChevronDown size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Exit: No Travel
  if (step === 'exitNoTravel') {
    const exitTravelKey = `exitNoTravel${getRoleSuffix()}`;
    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.exitCard}>
            <div className={styles.exitCardContent}>
              <h2 className={styles.exitCardTitle}>{t(`${exitTravelKey}.title`)}</h2>
              <p className={styles.exitCardDescription}>{t(`${exitTravelKey}.description`)}</p>
            </div>
            <button onClick={handleExit} className={styles.exitCardButton} type="button">
              {t(`${exitTravelKey}.button`)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Exit: No Records
  if (step === 'exitNoRecords') {
    const exitRecordsKey = `exitNoRecords${getRoleSuffix()}`;
    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={0} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={styles.exitCard}>
            <div className={styles.exitCardContent}>
              <h2 className={styles.exitCardTitle}>{t(`${exitRecordsKey}.title`)}</h2>
              <p className={styles.exitCardDescription}>{t(`${exitRecordsKey}.description`)}</p>
            </div>
            <button onClick={handleExit} className={styles.exitCardButton} type="button">
              {t(`${exitRecordsKey}.button`)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Patient Info Intro (blue screen)
  if (step === 'patientInfoIntro') {
    return (
      <div className={styles.introScreenWithSidebar}>
        <IntroSidebar activeIndex={1} />
        <div className={styles.introMain}>
          <div className={styles.introContent}>
            <h2 className={styles.introTitle}>
              {t('patientInfo.introTitle')} <strong>{t('patientInfo.introTitleBold')}</strong>
            </h2>
            <p className={styles.introDescription}>
              {t('patientInfo.introDescription1')}
            </p>
            <p className={styles.introDescription}>
              {t('patientInfo.introDescription2')}
            </p>
            <button
              onClick={() => setStep('patientInfoForm')}
              className={styles.introStartButton}
              type="button"
            >
              {t('patientInfo.start')}
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Patient Info Form
  if (step === 'patientInfoForm') {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = {
        ...data,
        submittedAt: new Date().toISOString(),
        source: "apply-form",
      };

      removeEncryptedJson(DRAFT_STORAGE_KEY);

      const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@gmed-health.com";
      const subject = encodeURIComponent("New membership application");
      const body = encodeURIComponent(JSON.stringify(payload, null, 2));
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setSubmitSuccess(true);
    };

    return (
      <div className={styles.wizardContainer}>
        <Sidebar activeIndex={1} />
        <div className={styles.wizardMain}>
          <button onClick={handleBack} className={styles.wizardBackButton} type="button">
            <ChevronUp size={24} />
          </button>

          <div className={cn(pageStyles.formCard, pageStyles.cardShadow, styles.stepCard)}>
            <div className={styles.stepContent}>
              <h3 className={pageStyles.sectionTitleSm}>{t('patientInfo.formTitle')}</h3>
              {submitSuccess && (
                <p className={styles.successMessage}>{t('patientInfo.successMessage')}</p>
              )}

              <form onSubmit={handleSubmit} className={pageStyles.stackMd}>
                <div className={styles.formSection}>
                  <h4 className={styles.formSectionTitle}>{t('patientInfo.personalInfo')}</h4>
                  <div className={pageStyles.formGrid}>
                    <input
                      placeholder={t('patientInfo.firstName')}
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                      className={pageStyles.input}
                    />
                    <input
                      placeholder={t('patientInfo.lastName')}
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                      className={pageStyles.input}
                    />
                    <input
                      placeholder={t('patientInfo.email')}
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                      className={pageStyles.input}
                    />
                    <input
                      placeholder={t('patientInfo.phone')}
                      name="phone"
                      type="tel"
                      value={data.phone}
                      onChange={handleChange}
                      required
                      className={pageStyles.input}
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={data.dateOfBirth}
                      onChange={handleChange}
                      className={pageStyles.input}
                      placeholder={t('patientInfo.dateOfBirth')}
                    />
                    <input
                      placeholder={t('patientInfo.country')}
                      name="country"
                      value={data.country}
                      onChange={handleChange}
                      className={pageStyles.input}
                    />
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h4 className={styles.formSectionTitle}>{t('patientInfo.message')}</h4>
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(pageStyles.input, styles.textarea)}
                    placeholder={t('patientInfo.messagePlaceholder')}
                  ></textarea>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={pageStyles.buttonSolid}>
                    {t('patientInfo.submit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

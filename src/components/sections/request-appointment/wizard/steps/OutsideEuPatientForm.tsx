"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { WizardStepLayout } from '../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';
import { LegalSexType } from '../types';

const COUNTRY_CODES = [
  { code: '+49', country: 'Germany' },
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+32', country: 'Belgium' },
  { code: '+43', country: 'Austria' },
  { code: '+41', country: 'Switzerland' },
  { code: '+48', country: 'Poland' },
  { code: '+380', country: 'Ukraine' },
  { code: '+7', country: 'Russia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+91', country: 'India' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
  { code: '+61', country: 'Australia' },
];

type Step = 'form' | 'contact' | 'whatsapp' | 'whatsapp-number' | 'interpreter' | 'primary-language' | 'legal-sex' | 'address';

export function OutsideEuPatientForm() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [step, setStep] = useState<Step>('form');
  const [firstName, setFirstName] = useState(data.firstName || '');
  const [middleName, setMiddleName] = useState(data.middleName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [suffix, setSuffix] = useState(data.suffix || '');
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhone] = useState(data.phones?.[0]?.number || '');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+49');
  const [whatsappConsent, setWhatsappConsent] = useState<'yes' | 'no' | ''>('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+49');
  const [interpreterNeeded, setInterpreterNeeded] = useState<'yes' | 'no' | ''>('');
  const [primaryLanguage, setPrimaryLanguage] = useState(data.primaryLanguage || '');
  const [legalSex, setLegalSex] = useState<LegalSexType>(data.legalSex);
  const [country, setCountry] = useState(data.country || '');
  const [streetAddress, setStreetAddress] = useState(data.streetAddress || '');
  const [city, setCity] = useState(data.city || '');
  const [stateProvince, setStateProvince] = useState(data.state || '');
  const [postalCode, setPostalCode] = useState(data.zipCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBack = () => {
    if (step === 'form') {
      router.push('/register/outside-eu/step/info');
    } else if (step === 'contact') {
      setStep('form');
    } else if (step === 'whatsapp') {
      setStep('contact');
    } else if (step === 'whatsapp-number') {
      setStep('whatsapp');
    } else if (step === 'interpreter') {
      if (whatsappConsent === 'yes') {
        setStep('whatsapp-number');
      } else {
        setStep('whatsapp');
      }
    } else if (step === 'primary-language') {
      setStep('interpreter');
    } else if (step === 'legal-sex') {
      if (interpreterNeeded === 'yes') {
        setStep('primary-language');
      } else {
        setStep('interpreter');
      }
    } else if (step === 'address') {
      setStep('legal-sex');
    }
  };

  const handleFormNext = () => {
    if (firstName && lastName) {
      setStep('contact');
    }
  };

  const handleContactNext = () => {
    if (email && phone) {
      setStep('whatsapp');
    }
  };

  const handleWhatsappNext = () => {
    if (whatsappConsent === 'yes') {
      setStep('whatsapp-number');
    } else if (whatsappConsent === 'no') {
      setStep('interpreter');
    }
  };

  const handleWhatsappNumberNext = () => {
    setStep('interpreter');
  };

  const handleInterpreterNext = () => {
    if (interpreterNeeded === 'yes') {
      setStep('primary-language');
    } else if (interpreterNeeded === 'no') {
      setStep('legal-sex');
    }
  };

  const handlePrimaryLanguageNext = () => {
    if (primaryLanguage) {
      setStep('legal-sex');
    }
  };

  const handleLegalSexNext = () => {
    if (legalSex) {
      setStep('address');
    }
  };

  const handleAddressSubmit = async () => {
    setIsSubmitting(true);

    updateData({
      firstName,
      middleName,
      lastName,
      suffix,
      email,
      phones: [{ number: `${phoneCountryCode}${phone}`, type: 'mobile' }],
      whatsappConsent: whatsappConsent === 'yes',
      whatsappNumber: whatsappConsent === 'yes' ? `${countryCode}${whatsappNumber}` : '',
      needsInterpreter: interpreterNeeded === 'yes' ? 'yes' : 'no',
      primaryLanguage: interpreterNeeded === 'yes' ? primaryLanguage : '',
      legalSex,
      country,
      streetAddress,
      city,
      state: stateProvince,
      zipCode: postalCode,
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Success screen
  if (isSubmitted) {
    return (
      <WizardStepLayout
        title={t('patientInfo.successTitle')}
        subtitle={t('patientInfo.successMessage')}
        showStepper={true}
        activeStepIndex={1}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.push('/')}
            className={formStyles.submitButton}
            type="button"
          >
            {t('patientInfo.backToHome')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // Contact Step
  if (step === 'contact') {
    return (
      <WizardStepLayout
        title={t('patientInfo.contactTitle')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('patientInfo.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>

            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('patientInfo.phone')}</label>
              <div style={{ display: 'flex', gap: 0 }}>
                <select
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className={formStyles.simpleInput}
                  style={{ width: '140px', borderRight: 'none' }}
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={formStyles.simpleInput}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleContactNext}
            disabled={!email || !phone}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // WhatsApp Step
  if (step === 'whatsapp') {
    return (
      <WizardStepLayout
        title={t('whatsapp.question')}
        subtitle={t('whatsapp.description')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('whatsapp.consent')}</label>
              <select
                value={whatsappConsent}
                onChange={(e) => setWhatsappConsent(e.target.value as 'yes' | 'no' | '')}
                className={formStyles.simpleInput}
              >
                <option value="">{t('euInterpreter.select')}</option>
                <option value="yes">{t('yes')}</option>
                <option value="no">{t('no')}</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleWhatsappNext}
            disabled={!whatsappConsent}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // WhatsApp Number Step
  if (step === 'whatsapp-number') {
    return (
      <WizardStepLayout
        title={t('whatsapp.numberQuestion')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('whatsapp.numberLabel')}</label>
              <div style={{ display: 'flex', gap: 0 }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={formStyles.simpleInput}
                  style={{ width: '140px', borderRight: 'none' }}
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className={formStyles.simpleInput}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleWhatsappNumberNext}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // Interpreter Step
  if (step === 'interpreter') {
    return (
      <WizardStepLayout
        title={t('interpreter.question')}
        subtitle={t('interpreter.description')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('euInterpreter.needInterpreter')}</label>
              <select
                value={interpreterNeeded}
                onChange={(e) => setInterpreterNeeded(e.target.value as 'yes' | 'no' | '')}
                className={formStyles.simpleInput}
              >
                <option value="">{t('euInterpreter.select')}</option>
                <option value="yes">{t('yes')}</option>
                <option value="no">{t('no')}</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleInterpreterNext}
            disabled={!interpreterNeeded}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // Primary Language Step
  if (step === 'primary-language') {
    return (
      <WizardStepLayout
        title={t('primaryLanguage.question')}
        subtitle={t('primaryLanguage.description')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('primaryLanguage.label')}</label>
              <input
                type="text"
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>
          </div>

          <button
            onClick={handlePrimaryLanguageNext}
            disabled={!primaryLanguage}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // Legal Sex Step
  if (step === 'legal-sex') {
    return (
      <WizardStepLayout
        title={t('legalSex.question')}
        subtitle={t('legalSex.description')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('euPatientDob.legalSex')}</label>
              <select
                value={legalSex || ''}
                onChange={(e) => setLegalSex(e.target.value as LegalSexType)}
                className={formStyles.simpleInput}
              >
                <option value="">{t('euPatientDob.selectSex')}</option>
                <option value="female">{t('legalSex.female')}</option>
                <option value="male">{t('legalSex.male')}</option>
                <option value="non-binary">{t('legalSex.nonbinary')}</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleLegalSexNext}
            disabled={!legalSex}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // Address Step
  if (step === 'address') {
    return (
      <WizardStepLayout
        title={t('address.question')}
        showStepper={true}
        activeStepIndex={1}
        onBack={handleBack}
        backLabel={t('back')}
      >
        <motion.div
          className={styles.wizardFormContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('address.country')}</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={formStyles.simpleInput}
              >
                <option value="">{t('address.selectCountry')}</option>
                {COUNTRY_CODES.map((item) => (
                  <option key={item.country} value={item.country}>
                    {item.country}
                  </option>
                ))}
              </select>
            </div>

            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('address.street')}</label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>

            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('address.city')}</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>

            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('address.state')}</label>
              <input
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>

            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('address.postalCode')}</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>
          </div>

          <button
            onClick={handleAddressSubmit}
            disabled={isSubmitting || !country || !streetAddress || !city || !postalCode}
            className={formStyles.submitButton}
            type="button"
          >
            {isSubmitting ? t('patientInfo.submitting') : t('patientInfo.submit')}
          </button>
        </motion.div>
      </WizardStepLayout>
    );
  }

  // Form Step (default - patient name)
  return (
    <WizardStepLayout
      title={t('patientInfo.formTitle')}
      showStepper={true}
      activeStepIndex={1}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <motion.div
        className={styles.wizardFormContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('patientInfo.firstName')}</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euPatientName.middleName')}</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('patientInfo.lastName')}</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euPatientName.suffix')}</label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>

        <button
          onClick={handleFormNext}
          disabled={!firstName || !lastName}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </motion.div>
    </WizardStepLayout>
  );
}

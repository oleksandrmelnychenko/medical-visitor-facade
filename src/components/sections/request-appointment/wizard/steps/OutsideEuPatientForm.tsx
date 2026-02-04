"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useWizard } from '../WizardContext';
import { cn } from '@/lib/utils';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';
import { WizardSidebar } from '../components/WizardSidebar';

import { LegalSexType } from '../types';

const COUNTRY_CODES = [
  { code: '+93', country: 'Afghanistan' },
  { code: '+355', country: 'Albania' },
  { code: '+213', country: 'Algeria' },
  { code: '+1', country: 'American Samoa' },
  { code: '+376', country: 'Andorra' },
  { code: '+244', country: 'Angola' },
  { code: '+1', country: 'Anguilla' },
  { code: '+672', country: 'Antarctica' },
  { code: '+1', country: 'Antigua and Barbuda' },
  { code: '+54', country: 'Argentina' },
  { code: '+374', country: 'Armenia' },
  { code: '+297', country: 'Aruba' },
  { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' },
  { code: '+994', country: 'Azerbaijan' },
  { code: '+1', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+1', country: 'Barbados' },
  { code: '+375', country: 'Belarus' },
  { code: '+32', country: 'Belgium' },
  { code: '+501', country: 'Belize' },
  { code: '+229', country: 'Benin' },
  { code: '+1', country: 'Bermuda' },
  { code: '+975', country: 'Bhutan' },
  { code: '+591', country: 'Bolivia' },
  { code: '+387', country: 'Bosnia and Herzegovina' },
  { code: '+267', country: 'Botswana' },
  { code: '+55', country: 'Brazil' },
  { code: '+673', country: 'Brunei' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+226', country: 'Burkina Faso' },
  { code: '+257', country: 'Burundi' },
  { code: '+855', country: 'Cambodia' },
  { code: '+237', country: 'Cameroon' },
  { code: '+1', country: 'Canada' },
  { code: '+238', country: 'Cape Verde' },
  { code: '+1', country: 'Cayman Islands' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+235', country: 'Chad' },
  { code: '+56', country: 'Chile' },
  { code: '+86', country: 'China' },
  { code: '+57', country: 'Colombia' },
  { code: '+269', country: 'Comoros' },
  { code: '+242', country: 'Congo' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+385', country: 'Croatia' },
  { code: '+53', country: 'Cuba' },
  { code: '+357', country: 'Cyprus' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+45', country: 'Denmark' },
  { code: '+253', country: 'Djibouti' },
  { code: '+1', country: 'Dominica' },
  { code: '+1', country: 'Dominican Republic' },
  { code: '+593', country: 'Ecuador' },
  { code: '+20', country: 'Egypt' },
  { code: '+503', country: 'El Salvador' },
  { code: '+240', country: 'Equatorial Guinea' },
  { code: '+291', country: 'Eritrea' },
  { code: '+372', country: 'Estonia' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+679', country: 'Fiji' },
  { code: '+358', country: 'Finland' },
  { code: '+33', country: 'France' },
  { code: '+241', country: 'Gabon' },
  { code: '+220', country: 'Gambia' },
  { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' },
  { code: '+233', country: 'Ghana' },
  { code: '+350', country: 'Gibraltar' },
  { code: '+30', country: 'Greece' },
  { code: '+299', country: 'Greenland' },
  { code: '+1', country: 'Grenada' },
  { code: '+502', country: 'Guatemala' },
  { code: '+224', country: 'Guinea' },
  { code: '+245', country: 'Guinea-Bissau' },
  { code: '+592', country: 'Guyana' },
  { code: '+509', country: 'Haiti' },
  { code: '+504', country: 'Honduras' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+36', country: 'Hungary' },
  { code: '+354', country: 'Iceland' },
  { code: '+91', country: 'India' },
  { code: '+62', country: 'Indonesia' },
  { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' },
  { code: '+353', country: 'Ireland' },
  { code: '+972', country: 'Israel' },
  { code: '+39', country: 'Italy' },
  { code: '+1', country: 'Jamaica' },
  { code: '+81', country: 'Japan' },
  { code: '+962', country: 'Jordan' },
  { code: '+7', country: 'Kazakhstan' },
  { code: '+254', country: 'Kenya' },
  { code: '+686', country: 'Kiribati' },
  { code: '+965', country: 'Kuwait' },
  { code: '+996', country: 'Kyrgyzstan' },
  { code: '+856', country: 'Laos' },
  { code: '+371', country: 'Latvia' },
  { code: '+961', country: 'Lebanon' },
  { code: '+266', country: 'Lesotho' },
  { code: '+231', country: 'Liberia' },
  { code: '+218', country: 'Libya' },
  { code: '+423', country: 'Liechtenstein' },
  { code: '+370', country: 'Lithuania' },
  { code: '+352', country: 'Luxembourg' },
  { code: '+853', country: 'Macao' },
  { code: '+389', country: 'North Macedonia' },
  { code: '+261', country: 'Madagascar' },
  { code: '+265', country: 'Malawi' },
  { code: '+60', country: 'Malaysia' },
  { code: '+960', country: 'Maldives' },
  { code: '+223', country: 'Mali' },
  { code: '+356', country: 'Malta' },
  { code: '+692', country: 'Marshall Islands' },
  { code: '+222', country: 'Mauritania' },
  { code: '+230', country: 'Mauritius' },
  { code: '+52', country: 'Mexico' },
  { code: '+691', country: 'Micronesia' },
  { code: '+373', country: 'Moldova' },
  { code: '+377', country: 'Monaco' },
  { code: '+976', country: 'Mongolia' },
  { code: '+382', country: 'Montenegro' },
  { code: '+212', country: 'Morocco' },
  { code: '+258', country: 'Mozambique' },
  { code: '+95', country: 'Myanmar' },
  { code: '+264', country: 'Namibia' },
  { code: '+674', country: 'Nauru' },
  { code: '+977', country: 'Nepal' },
  { code: '+31', country: 'Netherlands' },
  { code: '+64', country: 'New Zealand' },
  { code: '+505', country: 'Nicaragua' },
  { code: '+227', country: 'Niger' },
  { code: '+234', country: 'Nigeria' },
  { code: '+850', country: 'North Korea' },
  { code: '+47', country: 'Norway' },
  { code: '+968', country: 'Oman' },
  { code: '+92', country: 'Pakistan' },
  { code: '+680', country: 'Palau' },
  { code: '+970', country: 'Palestine' },
  { code: '+507', country: 'Panama' },
  { code: '+675', country: 'Papua New Guinea' },
  { code: '+595', country: 'Paraguay' },
  { code: '+51', country: 'Peru' },
  { code: '+63', country: 'Philippines' },
  { code: '+48', country: 'Poland' },
  { code: '+351', country: 'Portugal' },
  { code: '+1', country: 'Puerto Rico' },
  { code: '+974', country: 'Qatar' },
  { code: '+40', country: 'Romania' },
  { code: '+7', country: 'Russia' },
  { code: '+250', country: 'Rwanda' },
  { code: '+685', country: 'Samoa' },
  { code: '+378', country: 'San Marino' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+221', country: 'Senegal' },
  { code: '+381', country: 'Serbia' },
  { code: '+248', country: 'Seychelles' },
  { code: '+232', country: 'Sierra Leone' },
  { code: '+65', country: 'Singapore' },
  { code: '+421', country: 'Slovakia' },
  { code: '+386', country: 'Slovenia' },
  { code: '+677', country: 'Solomon Islands' },
  { code: '+252', country: 'Somalia' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+211', country: 'South Sudan' },
  { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+249', country: 'Sudan' },
  { code: '+597', country: 'Suriname' },
  { code: '+46', country: 'Sweden' },
  { code: '+41', country: 'Switzerland' },
  { code: '+963', country: 'Syria' },
  { code: '+886', country: 'Taiwan' },
  { code: '+992', country: 'Tajikistan' },
  { code: '+255', country: 'Tanzania' },
  { code: '+66', country: 'Thailand' },
  { code: '+670', country: 'Timor-Leste' },
  { code: '+228', country: 'Togo' },
  { code: '+676', country: 'Tonga' },
  { code: '+1', country: 'Trinidad and Tobago' },
  { code: '+216', country: 'Tunisia' },
  { code: '+90', country: 'Turkey' },
  { code: '+993', country: 'Turkmenistan' },
  { code: '+688', country: 'Tuvalu' },
  { code: '+256', country: 'Uganda' },
  { code: '+380', country: 'Ukraine' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+1', country: 'United States' },
  { code: '+598', country: 'Uruguay' },
  { code: '+998', country: 'Uzbekistan' },
  { code: '+678', country: 'Vanuatu' },
  { code: '+379', country: 'Vatican City' },
  { code: '+58', country: 'Venezuela' },
  { code: '+84', country: 'Vietnam' },
  { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' },
  { code: '+263', country: 'Zimbabwe' },
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
  const [whatsappConsent, setWhatsappConsent] = useState<boolean | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+49');
  const [interpreterNeeded, setInterpreterNeeded] = useState<boolean | null>(null);
  const [primaryLanguage, setPrimaryLanguage] = useState(data.primaryLanguage || '');
  const [legalSex, setLegalSex] = useState<LegalSexType>(null);
  // Address fields
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
      if (whatsappConsent) {
        setStep('whatsapp-number');
      } else {
        setStep('whatsapp');
      }
    } else if (step === 'primary-language') {
      setStep('interpreter');
    } else if (step === 'legal-sex') {
      if (interpreterNeeded) {
        setStep('primary-language');
      } else {
        setStep('interpreter');
      }
    } else if (step === 'address') {
      setStep('legal-sex');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('contact');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('whatsapp');
  };

  const handleWhatsappSelect = (value: boolean) => {
    setWhatsappConsent(value);
    if (value) {
      setStep('whatsapp-number');
    } else {
      setStep('interpreter');
    }
  };

  const handleWhatsappNumberContinue = () => {
    setStep('interpreter');
  };

  const handleInterpreterSelect = (value: boolean) => {
    setInterpreterNeeded(value);
    if (value) {
      setStep('primary-language');
    } else {
      setStep('legal-sex');
    }
  };

  const handlePrimaryLanguageContinue = () => {
    setStep('legal-sex');
  };

  const handleLegalSexSelect = (value: LegalSexType) => {
    setLegalSex(value);
    setStep('address');
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
      whatsappConsent,
      whatsappNumber: whatsappConsent ? `${countryCode}${whatsappNumber}` : '',
      needsInterpreter: interpreterNeeded === true ? 'yes' : interpreterNeeded === false ? 'no' : null,
      primaryLanguage: interpreterNeeded ? primaryLanguage : '',
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

  // Validators temporarily disabled for testing
  // const isFormValid = firstName.trim() && lastName.trim();
  // const isContactValid = email.trim() && phone.trim();

  if (isSubmitted) {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)}>
          <div className={sectionStyles.container}>
            <h1 className={styles.wizardHeaderTitle}>{t('patientInfo.successTitle')}</h1>
            <p className={styles.wizardHeaderSubtitle}>{t('patientInfo.successMessage')}</p>
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <button
                onClick={() => router.push('/')}
                className={styles.exitButton}
                type="button"
              >
                {t('patientInfo.backToHome')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Contact Step (Email and Phone)
  if (step === 'contact') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)}>
          <div className={sectionStyles.container}>
            <h1 className={styles.wizardHeaderTitle}>{t('patientInfo.contactTitle')}</h1>
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <form onSubmit={handleContactSubmit} className={styles.cardForm}>
                <div className={styles.cardFormBox}>
                  <div className={styles.cardFormField}>
                    <div className={styles.cardFormLabelRow}>
                      <span className={styles.cardFormLabel}>{t('patientInfo.email')}</span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.cardFormInput}
                    />
                  </div>

                  <div className={styles.cardFormField}>
                    <div className={styles.cardFormLabelRow}>
                      <span className={styles.cardFormLabel}>{t('patientInfo.phone')}</span>
                    </div>
                    <div className={styles.phoneInputWrapper}>
                      <select
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                        className={styles.phoneCountrySelect}
                      >
                        {COUNTRY_CODES.map((item, index) => (
                          <option key={`${item.code}-${index}`} value={item.code}>
                            {item.country} ({item.code})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.phoneNumberInput}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className={styles.wizardBackBtn}
                  >
                    {t('back')}
                  </button>

                  <button
                    type="submit"
                    className={styles.submitButton}
                  >
                    {t('continue')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // WhatsApp Question Step
  if (step === 'whatsapp') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <div className={styles.whatsappSplitCard}>
                <div className={styles.whatsappQuestion}>
                  <h2 className={styles.whatsappQuestionTitle}>
                    {t('whatsapp.question')}
                  </h2>
                  <p className={styles.whatsappQuestionDesc}>
                    {t('whatsapp.description')}
                  </p>
                </div>
                <div className={styles.whatsappOptions}>
                  <button
                    type="button"
                    className={cn(styles.whatsappOption, whatsappConsent === true && styles.whatsappOptionSelected)}
                    onClick={() => handleWhatsappSelect(true)}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('yes')}</span>
                    <span className={styles.whatsappOptionDesc}>{t('whatsapp.yesDisclaimer')}</span>
                  </button>
                  <button
                    type="button"
                    className={cn(styles.whatsappOption, whatsappConsent === false && styles.whatsappOptionSelected)}
                    onClick={() => handleWhatsappSelect(false)}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('no')}</span>
                  </button>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // WhatsApp Number Step
  if (step === 'whatsapp-number') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <div className={styles.whatsappNumberCard}>
                <div className={styles.whatsappNumberQuestion}>
                  <h2 className={styles.whatsappQuestionTitle}>
                    {t('whatsapp.numberQuestion')}
                  </h2>
                </div>
                <div className={styles.whatsappNumberInput}>
                  <label className={styles.whatsappInputLabel}>
                    {t('whatsapp.numberLabel')}
                  </label>
                  <div className={styles.whatsappInputRow}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className={styles.whatsappCountrySelect}
                    >
                      {COUNTRY_CODES.map((item, index) => (
                        <option key={`whatsapp-${item.code}-${index}`} value={item.code}>
                          {item.country} ({item.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="000000000000"
                      className={styles.whatsappNumberField}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsappNumberContinue}
                  className={styles.submitButton}
                >
                  {t('continue')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Interpreter Question Step
  if (step === 'interpreter') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <div className={styles.whatsappSplitCard}>
                <div className={styles.whatsappQuestion}>
                  <h2 className={styles.whatsappQuestionTitle}>
                    {t('interpreter.question')}
                  </h2>
                  <p className={styles.whatsappQuestionDesc}>
                    {t('interpreter.description')} <a href="#" className={styles.interpreterLink}>{t('interpreter.learnMore')}</a> {t('interpreter.aboutServices')}
                  </p>
                </div>
                <div className={styles.whatsappOptions}>
                  <button
                    type="button"
                    className={cn(styles.whatsappOption, interpreterNeeded === true && styles.whatsappOptionSelected)}
                    onClick={() => handleInterpreterSelect(true)}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('yes')}</span>
                  </button>
                  <button
                    type="button"
                    className={cn(styles.whatsappOption, interpreterNeeded === false && styles.whatsappOptionSelected)}
                    onClick={() => handleInterpreterSelect(false)}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('no')}</span>
                  </button>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Primary Language Step
  if (step === 'primary-language') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <div className={styles.whatsappNumberCard}>
                <div className={styles.whatsappNumberQuestion}>
                  <h2 className={styles.whatsappQuestionTitle}>
                    {t('primaryLanguage.question')}
                  </h2>
                  <p className={styles.whatsappQuestionDesc}>
                    {t('primaryLanguage.description')}
                  </p>
                </div>
                <div className={styles.whatsappNumberInput}>
                  <label className={styles.whatsappInputLabel}>
                    {t('primaryLanguage.label')}
                  </label>
                  <input
                    type="text"
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    className={styles.whatsappNumberField}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>

                <button
                  type="button"
                  onClick={handlePrimaryLanguageContinue}
                  className={styles.submitButton}
                >
                  {t('continue')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Legal Sex Question Step
  if (step === 'legal-sex') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <div className={styles.legalSexCard}>
                <div className={styles.whatsappQuestion}>
                  <h2 className={styles.whatsappQuestionTitle}>
                    {t('legalSex.question')}
                  </h2>
                  <p className={styles.whatsappQuestionDesc}>
                    {t('legalSex.description')}
                  </p>
                </div>
                <div className={styles.legalSexOptions}>
                  <button
                    type="button"
                    className={cn(styles.legalSexOption, legalSex === 'female' && styles.whatsappOptionSelected)}
                    onClick={() => handleLegalSexSelect('female')}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('legalSex.female')}</span>
                  </button>
                  <button
                    type="button"
                    className={cn(styles.legalSexOption, legalSex === 'male' && styles.whatsappOptionSelected)}
                    onClick={() => handleLegalSexSelect('male')}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('legalSex.male')}</span>
                  </button>
                  <button
                    type="button"
                    className={cn(styles.legalSexOption, legalSex === 'non-binary' && styles.whatsappOptionSelected)}
                    onClick={() => handleLegalSexSelect('non-binary')}
                  >
                    <span className={styles.whatsappOptionTitle}>{t('legalSex.nonbinary')}</span>
                  </button>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Address Step
  if (step === 'address') {
    return (
      <div className={cn(pageStyles.page, styles.gridBackground)}>
        <div className={styles.gridOverlay} />

        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={1} />
          </div>
        </section>

        <section className={cn(sectionStyles.section, styles.cardsSection)}>
          <div className={sectionStyles.container}>
            <div className={styles.locationStepContent}>
              <div className={styles.addressCard}>
                <div className={styles.whatsappQuestion}>
                  <h2 className={styles.whatsappQuestionTitle}>
                    {t('address.question')}
                  </h2>
                  <p className={styles.whatsappQuestionDesc}>
                    <a href="#" className={styles.interpreterLink}>{t('address.learnMore')}</a> {t('address.whyAsking')}
                  </p>
                </div>
                <div className={styles.addressForm}>
                  <div className={styles.addressField}>
                    <label className={styles.addressLabel}>{t('address.country')}</label>
                    <div className={styles.addressSelectWrapper}>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={styles.addressSelect}
                      >
                        <option value="">{t('address.selectCountry')}</option>
                        {COUNTRY_CODES.map((item, index) => (
                          <option key={`country-${item.country}-${index}`} value={item.country}>
                            {item.country}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={20} className={styles.addressSelectIcon} />
                    </div>
                  </div>

                  <div className={styles.addressField}>
                    <label className={styles.addressLabel}>{t('address.street')}</label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className={styles.addressInput}
                    />
                  </div>

                  <div className={styles.addressField}>
                    <label className={styles.addressLabel}>{t('address.city')}</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={styles.addressInput}
                    />
                  </div>

                  <div className={styles.addressField}>
                    <label className={styles.addressLabel}>{t('address.state')}</label>
                    <input
                      type="text"
                      value={stateProvince}
                      onChange={(e) => setStateProvince(e.target.value)}
                      className={styles.addressInput}
                    />
                  </div>

                  <div className={styles.addressField}>
                    <label className={styles.addressLabel}>{t('address.postalCode')}</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={styles.addressInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>

                <button
                  type="button"
                  onClick={handleAddressSubmit}
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? t('patientInfo.submitting') : t('patientInfo.submit')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Form Step (default)
  return (
    <div className={cn(pageStyles.page, styles.gridBackground)}>
      <div className={styles.gridOverlay} />

      <section className={cn(sectionStyles.section, styles.stepperSection)}>
        <div className={sectionStyles.container}>
          <WizardSidebar activeIndex={1} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)}>
        <div className={sectionStyles.container}>
          <h1 className={styles.wizardHeaderTitle}>{t('patientInfo.formTitle')}</h1>
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.locationStepContent}>
            <form onSubmit={handleFormSubmit} className={styles.cardForm}>
              <div className={styles.cardFormBox}>
                <div className={styles.cardFormField}>
                  <div className={styles.cardFormLabelRow}>
                    <span className={styles.cardFormLabel}>{t('patientInfo.firstName')}</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={styles.cardFormInput}
                  />
                </div>

                <div className={styles.cardFormField}>
                  <div className={styles.cardFormLabelRow}>
                    <span className={styles.cardFormLabel}>{t('euPatientName.middleName')}</span>
                    <span className={styles.cardFormOptional}>{t('optional')}</span>
                  </div>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className={styles.cardFormInput}
                  />
                </div>

                <div className={styles.cardFormField}>
                  <div className={styles.cardFormLabelRow}>
                    <span className={styles.cardFormLabel}>{t('patientInfo.lastName')}</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={styles.cardFormInput}
                  />
                </div>

                <div className={styles.cardFormField}>
                  <div className={styles.cardFormLabelRow}>
                    <span className={styles.cardFormLabel}>{t('euPatientName.suffix')}</span>
                    <span className={styles.cardFormOptional}>{t('optional')}</span>
                  </div>
                  <input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    className={styles.cardFormInput}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.wizardBackBtn}
                >
                  {t('back')}
                </button>

                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  {t('continue')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

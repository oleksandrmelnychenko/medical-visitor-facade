"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const COUNTRY_CODES = [
  { code: '+49', country: 'Germany' },
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+41', country: 'Switzerland' },
  { code: '+43', country: 'Austria' },
  { code: '+48', country: 'Poland' },
  { code: '+380', country: 'Ukraine' },
  { code: '+7', country: 'Russia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+91', country: 'India' },
  { code: '+55', country: 'Brazil' },
  { code: '+61', country: 'Australia' },
];

export function PhoneStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [phone, setPhone] = useState(data.phones[0]?.number ?? '');
  const [email, setEmail] = useState(data.email || '');
  const [countryCode, setCountryCode] = useState('+49');

  const handleContinue = useCallback(() => {
    if (!phone || !email) return;
    const normalizedPhone = phone.startsWith('+') ? phone : `${countryCode}${phone}`;
    updateData({
      email,
      phones: [{ number: normalizedPhone, type: 'mobile' }],
    });
    router.push('/apply?type=new&step=whatsapp-consent');
  }, [phone, email, countryCode, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=patient-dob');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('phoneStep.title')}
      showStepper
      activeStepIndex={1}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('phoneStep.phoneNumber')}</label>
            <div style={{ display: 'flex', gap: 0 }}>
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                className={formStyles.simpleInput}
                style={{ width: '140px', borderRight: 'none' }}
              >
                {COUNTRY_CODES.map(item => (
                  <option key={item.code} value={item.code}>{item.code}</option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={formStyles.simpleInput}
                style={{ flex: 1 }}
                autoFocus
              />
            </div>
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('phoneStep.emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!phone || !email}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

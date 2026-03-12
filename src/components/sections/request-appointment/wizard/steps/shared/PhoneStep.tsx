"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import { COUNTRY_CODES, splitInternationalPhoneNumber } from '../../contact-phone';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function PhoneStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const initialPhone = splitInternationalPhoneNumber(data.phones[0]?.number);
  const [phone, setPhone] = useState(initialPhone.nationalNumber);
  const [email, setEmail] = useState(data.email || '');
  const [countryCode, setCountryCode] = useState(initialPhone.countryCode);

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

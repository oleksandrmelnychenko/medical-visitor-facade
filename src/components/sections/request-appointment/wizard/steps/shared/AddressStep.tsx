"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const COUNTRIES = [
  'Germany', 'United States', 'United Kingdom', 'France', 'Italy', 'Spain',
  'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Poland', 'Ukraine',
  'Russia', 'China', 'Japan', 'South Korea', 'India', 'Brazil', 'Mexico', 'Australia',
  'Canada', 'Saudi Arabia', 'UAE', 'Turkey', 'Egypt', 'South Africa', 'Other',
];

export function AddressStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [country, setCountry] = useState(data.country || '');
  const [street, setStreet] = useState(data.streetAddress || '');
  const [city, setCity] = useState(data.city || '');
  const [state, setState] = useState(data.state || '');
  const [postal, setPostal] = useState(data.zipCode || '');

  const handleContinue = useCallback(() => {
    if (!country || !street || !city || !postal) return;
    updateData({ country, streetAddress: street, city, state, zipCode: postal });
    router.push('/apply?type=new&step=concern-intro');
  }, [country, street, city, state, postal, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=services');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('address.question')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.country')}</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className={formStyles.simpleInput}
            >
              <option value="">{t('address.selectCountry')}</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.street')}</label>
            <input
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.city')}</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.state')}</label>
            <input
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.postalCode')}</label>
            <input
              type="text"
              value={postal}
              onChange={e => setPostal(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!country || !street || !city || !postal}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}

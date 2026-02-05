"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

export function EuAddressStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [streetAddress, setStreetAddress] = useState(data.streetAddress || '');
  const [city, setCity] = useState(data.city || '');
  const [state, setState] = useState(data.state || '');
  const [zipCode, setZipCode] = useState(data.zipCode || '');

  const handleBack = () => {
    router.push('/register/eu/step/interpreter');
  };

  const handleNext = () => {
    if (streetAddress && city && state && zipCode) {
      updateData({
        streetAddress,
        city,
        state,
        zipCode
      });
      router.push('/register/eu/step/medical');
    }
  };

  const isValid = streetAddress.trim() && city.trim() && state && zipCode.trim();

  return (
    <WizardStepLayout
      title={t('euAddress.title')}
      showStepper={true}
      activeStepIndex={0}
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
            <label className={formStyles.label}>{t('euAddress.streetAddress')}</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euAddress.city')}</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euAddress.state')}</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={formStyles.simpleInput}
            >
              <option value="">{t('euAddress.statePlaceholder')}</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euAddress.zipCode')}</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!isValid}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </motion.div>
    </WizardStepLayout>
  );
}

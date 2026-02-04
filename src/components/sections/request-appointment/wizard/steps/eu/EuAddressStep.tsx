"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
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
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <button onClick={handleBack} className={styles.euBackLink} type="button">
          <ChevronLeft size={20} />
          <span>{t('back')}</span>
        </button>

        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('euAddress.title')}</h1>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euAddress.streetAddress')}</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className={styles.euFormInput}
            />
          </div>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euAddress.city')}</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={styles.euFormInput}
            />
          </div>

          <div className={styles.euFormRowHalf}>
            <div className={styles.euFormGroup}>
              <label className={styles.euFormLabel}>{t('euAddress.state')}</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={styles.euFormSelect}
              >
                <option value="">{t('euAddress.statePlaceholder')}</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.euFormGroup}>
              <label className={styles.euFormLabel}>{t('euAddress.zipCode')}</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={styles.euFormInput}
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isValid}
            className={styles.euNextButton}
            type="button"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  );
}

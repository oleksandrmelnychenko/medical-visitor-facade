"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWizard } from '../../WizardContext';
import { LegalSexType } from '../../types';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuPatientDobStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [legalSex, setLegalSex] = useState<LegalSexType>(data.legalSex);
  const [dateOfBirth, setDateOfBirth] = useState(data.dateOfBirth || '');

  const handleBack = () => {
    router.push('/register/eu/step/form');
  };

  const handleNext = () => {
    if (legalSex && dateOfBirth) {
      updateData({
        legalSex,
        dateOfBirth
      });
      router.push('/register/eu/step/contact');
    }
  };

  const isValid = legalSex && dateOfBirth.trim();

  return (
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <button onClick={handleBack} className={styles.euBackLink} type="button">
          <ChevronLeft size={20} />
          <span>{t('back')}</span>
        </button>

        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('euPatientDob.title')}</h1>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euPatientDob.legalSex')}</label>
            <p className={styles.euFormHint}>{t('euPatientDob.legalSexNote')}</p>
          </div>

          <div className={styles.euRadioGroup}>
            <label
              className={cn(
                styles.euRadioOption,
                legalSex === 'female' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="legalSex"
                value="female"
                checked={legalSex === 'female'}
                onChange={() => setLegalSex('female')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('euPatientDob.female')}</span>
              </div>
            </label>

            <label
              className={cn(
                styles.euRadioOption,
                legalSex === 'male' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="legalSex"
                value="male"
                checked={legalSex === 'male'}
                onChange={() => setLegalSex('male')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('euPatientDob.male')}</span>
              </div>
            </label>

            <label
              className={cn(
                styles.euRadioOption,
                legalSex === 'non-binary' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="legalSex"
                value="non-binary"
                checked={legalSex === 'non-binary'}
                onChange={() => setLegalSex('non-binary')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('euPatientDob.nonBinary')}</span>
              </div>
            </label>
          </div>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euPatientDob.dateOfBirth')}</label>
            <input
              type="text"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder={t('euPatientDob.dateFormat')}
              className={styles.euFormInput}
            />
            <p className={styles.euFormHint}>{t('euPatientDob.dateFormat')}</p>
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

"use client";

import React, { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuPatientNameStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [firstName, setFirstName] = useState(data.firstName || '');
  const [middleName, setMiddleName] = useState(data.middleName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [suffix, setSuffix] = useState(data.suffix || '');
  const [preferredName, setPreferredName] = useState(data.preferredName || '');
  const [showSuffix, setShowSuffix] = useState(!!data.suffix);

  const handleBack = () => {
    if (data.patientRole === 'companion') {
      router.push('/register/eu/step/companion');
    } else {
      router.push('/register/eu/step/role');
    }
  };

  const handleNext = () => {
    if (firstName && lastName) {
      updateData({
        firstName,
        middleName,
        lastName,
        suffix,
        preferredName
      });
      router.push('/register/eu/step/dob');
    }
  };

  const isValid = firstName.trim() && lastName.trim();

  return (
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <button onClick={handleBack} className={styles.euBackLink} type="button">
          <ChevronLeft size={20} />
          <span>{t('back')}</span>
        </button>

        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('euPatientName.title')}</h1>
          <p className={styles.euWizardSubtitle}>{t('euPatientName.subtitle')}</p>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('patientInfo.firstName')}</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.euFormInput}
            />
          </div>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euPatientName.middleName')}</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className={styles.euFormInput}
            />
          </div>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('patientInfo.lastName')}</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.euFormInput}
            />
          </div>

          {showSuffix ? (
            <div className={styles.euFormGroup}>
              <label className={styles.euFormLabel}>{t('euPatientName.suffix')}</label>
              <input
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className={styles.euFormInput}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowSuffix(true)}
              className={styles.euAddLink}
              type="button"
            >
              <Plus size={18} />
              <span>{t('euPatientName.addSuffix')}</span>
            </button>
          )}

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euPatientName.preferredName')}</label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              className={styles.euFormInput}
            />
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

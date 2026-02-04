"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWizard } from '../../WizardContext';
import { PatientRoleType } from '../../types';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuPatientRoleStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [selected, setSelected] = useState<PatientRoleType>(data.patientRole);

  const handleNext = () => {
    if (selected) {
      updateData({ patientRole: selected });
      if (selected === 'patient') {
        router.push('/register/eu/step/form');
      } else {
        router.push('/register/eu/step/companion');
      }
    }
  };

  return (
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('patientRole.title')}</h1>

          <div className={styles.euRadioGroup}>
            <label
              className={cn(
                styles.euRadioOption,
                selected === 'patient' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="patientRole"
                value="patient"
                checked={selected === 'patient'}
                onChange={() => setSelected('patient')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('patientRole.yes')}</span>
                <span className={styles.euRadioDesc}>{t('patientRole.yesDesc')}</span>
              </div>
            </label>

            <label
              className={cn(
                styles.euRadioOption,
                selected === 'companion' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="patientRole"
                value="companion"
                checked={selected === 'companion'}
                onChange={() => setSelected('companion')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('patientRole.no')}</span>
                <span className={styles.euRadioDesc}>{t('patientRole.noDesc')}</span>
              </div>
            </label>
          </div>

          <button
            onClick={handleNext}
            disabled={!selected}
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

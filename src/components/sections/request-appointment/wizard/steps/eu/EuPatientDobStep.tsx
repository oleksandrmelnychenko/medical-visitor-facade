"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { LegalSexType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
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

  const sexOptions: { value: LegalSexType; label: string }[] = [
    { value: 'female', label: t('euPatientDob.female') },
    { value: 'male', label: t('euPatientDob.male') },
    { value: 'non-binary', label: t('euPatientDob.nonBinary') },
  ];

  return (
    <WizardStepLayout
      title={t('euPatientDob.title')}
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
            <label className={formStyles.label}>{t('euPatientDob.legalSex')}</label>
            <select
              value={legalSex || ''}
              onChange={(e) => setLegalSex(e.target.value as LegalSexType)}
              className={formStyles.simpleInput}
            >
              <option value="">{t('euPatientDob.selectSex')}</option>
              {sexOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euPatientDob.dateOfBirth')}</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
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

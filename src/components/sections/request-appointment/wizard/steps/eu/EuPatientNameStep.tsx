"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
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
    <WizardStepLayout
      title={t('euPatientName.title')}
      subtitle={t('euPatientName.subtitle')}
      showStepper={true}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
      onContinue={handleNext}
      continueLabel={t('continue')}
      continueDisabled={!isValid}
    >
      <motion.div
        className={styles.wizardFormContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('patientInfo.firstName')}</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euPatientName.middleName')}</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('patientInfo.lastName')}</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>

          {showSuffix ? (
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('euPatientName.suffix')}</label>
              <input
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>
          ) : (
            <div className={formStyles.simpleFormGroup}>
              <button
                onClick={() => setShowSuffix(true)}
                className={styles.wizardAddLink}
                type="button"
              >
                <Plus size={18} />
                <span>{t('euPatientName.addSuffix')}</span>
              </button>
            </div>
          )}

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euPatientName.preferredName')}</label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>
      </motion.div>
    </WizardStepLayout>
  );
}

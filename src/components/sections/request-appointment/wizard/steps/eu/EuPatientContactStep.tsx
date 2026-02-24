"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { PhoneEntry, PhoneType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuPatientContactStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [email, setEmail] = useState(data.email || '');
  const [phones, setPhones] = useState<PhoneEntry[]>(
    data.phones?.length ? data.phones : [{ number: '', type: 'mobile' }]
  );

  const handleBack = () => {
    router.push('/register/eu/step/dob');
  };

  const handleNext = () => {
    if (email && phones[0].number) {
      updateData({
        email,
        phones
      });
      router.push('/register/eu/step/interpreter');
    }
  };

  const updatePhone = (index: number, field: 'number' | 'type', value: string) => {
    const newPhones = [...phones];
    if (field === 'type') {
      newPhones[index].type = value as PhoneType;
    } else {
      newPhones[index].number = value;
    }
    setPhones(newPhones);
  };

  const addPhone = () => {
    setPhones([...phones, { number: '', type: 'mobile' }]);
  };

  const isValid = email.trim() && phones[0].number.trim();

  return (
    <WizardStepLayout
      title={t('euPatientContact.title')}
      subtitle={t('euPatientContact.subtitle')}
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
            <label className={formStyles.label}>{t('euPatientContact.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('euPatientContact.emailPlaceholder')}
              className={formStyles.simpleInput}
            />
          </div>

          {phones.map((phone, index) => (
            <React.Fragment key={index}>
              <div className={formStyles.simpleFormGroup}>
                <label className={formStyles.label}>
                  {t('euPatientContact.phone')}
                </label>
                <input
                  type="tel"
                  value={phone.number}
                  onChange={(e) => updatePhone(index, 'number', e.target.value)}
                  placeholder={t('euPatientContact.phonePlaceholder')}
                  className={formStyles.simpleInput}
                />
              </div>
              <div className={formStyles.simpleFormGroup}>
                <label className={formStyles.label}>
                  {t('euPatientContact.phoneType')}
                </label>
                <select
                  value={phone.type}
                  onChange={(e) => updatePhone(index, 'type', e.target.value)}
                  className={formStyles.simpleInput}
                >
                  <option value="mobile">{t('euPatientContact.mobile')}</option>
                  <option value="home">{t('euPatientContact.home')}</option>
                  <option value="work">{t('euPatientContact.work')}</option>
                </select>
              </div>
            </React.Fragment>
          ))}

          <div className={formStyles.simpleFormGroup}>
            <button
              onClick={addPhone}
              className={styles.wizardAddLink}
              type="button"
            >
              <Plus size={18} />
              <span>{t('euPatientContact.addPhone')}</span>
            </button>
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

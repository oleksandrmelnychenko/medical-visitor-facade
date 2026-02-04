"use client";

import React, { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { PhoneEntry, PhoneType } from '../../types';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
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
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <button onClick={handleBack} className={styles.euBackLink} type="button">
          <ChevronLeft size={20} />
          <span>{t('back')}</span>
        </button>

        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('euPatientContact.title')}</h1>
          <p className={styles.euWizardSubtitle}>{t('euPatientContact.subtitle')}</p>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euPatientContact.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('euPatientContact.emailPlaceholder')}
              className={styles.euFormInput}
            />
          </div>

          {phones.map((phone, index) => (
            <div key={index} className={styles.euPhoneRow}>
              <div className={styles.euFormGroup}>
                <label className={styles.euFormLabel}>
                  {t('euPatientContact.phone')}
                </label>
                <input
                  type="tel"
                  value={phone.number}
                  onChange={(e) => updatePhone(index, 'number', e.target.value)}
                  placeholder={t('euPatientContact.phonePlaceholder')}
                  className={styles.euFormInput}
                />
              </div>
              <div className={styles.euFormGroup}>
                <label className={styles.euFormLabel}>
                  {t('euPatientContact.phoneType')}
                </label>
                <select
                  value={phone.type}
                  onChange={(e) => updatePhone(index, 'type', e.target.value)}
                  className={styles.euFormSelect}
                >
                  <option value="mobile">{t('euPatientContact.mobile')}</option>
                  <option value="home">{t('euPatientContact.home')}</option>
                  <option value="work">{t('euPatientContact.work')}</option>
                </select>
              </div>
            </div>
          ))}

          <button
            onClick={addPhone}
            className={styles.euAddLink}
            type="button"
          >
            <Plus size={18} />
            <span>{t('euPatientContact.addPhone')}</span>
          </button>

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

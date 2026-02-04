"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWizard } from '../../WizardContext';
import { YesNoType } from '../../types';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuInterpreterStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [selected, setSelected] = useState<YesNoType>(data.needsInterpreter);
  const [primaryLanguage, setPrimaryLanguage] = useState(data.primaryLanguage || '');

  const handleBack = () => {
    router.push('/register/eu/step/contact');
  };

  const handleNext = () => {
    if (selected) {
      updateData({
        needsInterpreter: selected,
        primaryLanguage: selected === 'yes' ? primaryLanguage : ''
      });
      router.push('/register/eu/step/address');
    }
  };

  const isValid = selected && (selected === 'no' || (selected === 'yes' && primaryLanguage.trim()));

  return (
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <button onClick={handleBack} className={styles.euBackLink} type="button">
          <ChevronLeft size={20} />
          <span>{t('back')}</span>
        </button>

        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('euInterpreter.title')}</h1>
          <p className={styles.euWizardSubtitle}>{t('euInterpreter.subtitle')}</p>

          <div className={styles.euRadioGroup}>
            <label
              className={cn(
                styles.euRadioOption,
                selected === 'yes' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="interpreter"
                value="yes"
                checked={selected === 'yes'}
                onChange={() => setSelected('yes')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('euInterpreter.yes')}</span>
              </div>
            </label>

            <label
              className={cn(
                styles.euRadioOption,
                selected === 'no' && styles.euRadioOptionSelected
              )}
            >
              <input
                type="radio"
                name="interpreter"
                value="no"
                checked={selected === 'no'}
                onChange={() => setSelected('no')}
                className={styles.euRadioInput}
              />
              <div className={styles.euRadioCircle} />
              <div className={styles.euRadioContent}>
                <span className={styles.euRadioTitle}>{t('euInterpreter.no')}</span>
              </div>
            </label>
          </div>

          {selected === 'yes' && (
            <div className={styles.euFormGroup}>
              <label className={styles.euFormLabel}>{t('euInterpreter.primaryLanguage')}</label>
              <input
                type="text"
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
                className={styles.euFormInput}
              />
            </div>
          )}

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

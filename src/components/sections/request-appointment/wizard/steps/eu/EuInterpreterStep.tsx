"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { YesNoType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
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
    <WizardStepLayout
      title={t('euInterpreter.title')}
      subtitle={t('euInterpreter.subtitle')}
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
            <label className={formStyles.label}>{t('euInterpreter.needInterpreter')}</label>
            <select
              value={selected || ''}
              onChange={(e) => setSelected(e.target.value as YesNoType)}
              className={formStyles.simpleInput}
            >
              <option value="">{t('euInterpreter.select')}</option>
              <option value="yes">{t('euInterpreter.yes')}</option>
              <option value="no">{t('euInterpreter.no')}</option>
            </select>
          </div>

          {selected === 'yes' && (
            <div className={formStyles.simpleFormGroup}>
              <label className={formStyles.label}>{t('euInterpreter.primaryLanguage')}</label>
              <input
                type="text"
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
                className={formStyles.simpleInput}
              />
            </div>
          )}
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

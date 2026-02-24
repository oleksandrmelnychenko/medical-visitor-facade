"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuCompanionInfoStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const [firstName, setFirstName] = useState(data.companionFirstName || '');
  const [lastName, setLastName] = useState(data.companionLastName || '');
  const [relationship, setRelationship] = useState(data.relationshipToPatient || '');

  const handleBack = () => {
    router.push('/register/eu/step/role');
  };

  const handleNext = () => {
    if (firstName && lastName && relationship) {
      updateData({
        companionFirstName: firstName,
        companionLastName: lastName,
        relationshipToPatient: relationship
      });
      router.push('/register/eu/step/form');
    }
  };

  const isValid = firstName.trim() && lastName.trim() && relationship;

  return (
    <WizardStepLayout
      title={t('euCompanionInfo.title')}
      subtitle={t('euCompanionInfo.subtitle')}
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
            <label className={formStyles.label}>{t('patientInfo.firstName')}</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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

          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('euCompanionInfo.relationship')}</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className={formStyles.simpleInput}
            >
              <option value="">{t('euCompanionInfo.selectPlaceholder')}</option>
              <option value="child">{t('euCompanionInfo.relationships.child')}</option>
              <option value="grandchild">{t('euCompanionInfo.relationships.grandchild')}</option>
              <option value="grandparent">{t('euCompanionInfo.relationships.grandparent')}</option>
              <option value="guardian">{t('euCompanionInfo.relationships.guardian')}</option>
              <option value="inLaw">{t('euCompanionInfo.relationships.inLaw')}</option>
              <option value="lifePartner">{t('euCompanionInfo.relationships.lifePartner')}</option>
              <option value="other">{t('euCompanionInfo.relationships.other')}</option>
              <option value="parent">{t('euCompanionInfo.relationships.parent')}</option>
              <option value="sibling">{t('euCompanionInfo.relationships.sibling')}</option>
              <option value="spouse">{t('euCompanionInfo.relationships.spouse')}</option>
            </select>
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

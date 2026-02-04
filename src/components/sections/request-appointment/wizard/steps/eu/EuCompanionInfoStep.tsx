"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { EuWizardSidebar } from '../../components/EuWizardSidebar';
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
    <div className={styles.euWizardContainer}>
      <EuWizardSidebar activeStep={0} />

      <div className={styles.euWizardMain}>
        <button onClick={handleBack} className={styles.euBackLink} type="button">
          <ChevronLeft size={20} />
          <span>{t('back')}</span>
        </button>

        <div className={styles.euWizardContent}>
          <h1 className={styles.euWizardTitle}>{t('euCompanionInfo.title')}</h1>
          <p className={styles.euWizardSubtitle}>{t('euCompanionInfo.subtitle')}</p>

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
            <label className={styles.euFormLabel}>{t('patientInfo.lastName')}</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.euFormInput}
            />
          </div>

          <div className={styles.euFormGroup}>
            <label className={styles.euFormLabel}>{t('euCompanionInfo.relationship')}</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className={styles.euFormSelect}
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

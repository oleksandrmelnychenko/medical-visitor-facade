"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { MedicalAreaType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuMedicalStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();

  const areas = [
    { key: 'cardiology', value: 'cardiology' as MedicalAreaType, color: '#F4B4C4' },
    { key: 'neurology', value: 'neurology' as MedicalAreaType, color: '#A8D5E5' },
    { key: 'oncology', value: 'oncology' as MedicalAreaType, color: '#A8E5C4' },
    { key: 'otherDiagnosis', value: 'other' as MedicalAreaType, color: '#E5D5A8' },
    { key: 'noDiagnosis', value: 'none' as MedicalAreaType, color: '#D5A8E5' },
  ];

  const handleSelect = (value: MedicalAreaType) => {
    updateData({ medicalArea: value });
    router.push('/register/eu/step/role');
  };

  const handleBack = () => {
    router.push('/register');
  };

  return (
    <WizardStepLayout
      title={t('medicalDiagnosis.title')}
      subtitle={t('medicalDiagnosis.description')}
      showStepper={false}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        {areas.map((area) => (
          <div
            key={area.key}
            onClick={() => handleSelect(area.value)}
            className={styles.clientCard}
            style={{ '--hover-color': area.color } as React.CSSProperties}
          >
            <div className={styles.clientCardContent}>
              <h3 className={styles.clientCardTitle}>
                {t(`medicalDiagnosis.options.${area.key}`)}
              </h3>
            </div>
            <ChevronRight size={24} className={styles.clientCardArrow} />
          </div>
        ))}
      </div>
    </WizardStepLayout>
  );
}

"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { YesNoType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface TravelDocumentsStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function TravelDocumentsStep({ wizardPath }: TravelDocumentsStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const documentsKey = data.patientRole === 'patient' ? 'documentsPatient' : 'documentsCompanion';

  const handleSelect = (value: YesNoType) => {
    updateData({ hasTravelDocuments: value });
    router.push(`/register/${wizardPath}/step/info`);
  };

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/records`);
  };

  return (
    <WizardStepLayout
      title={t(`${documentsKey}.title`)}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={() => handleSelect('yes')}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${documentsKey}.yes`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('no')}
          className={styles.clientCard}
          style={{ '--hover-color': '#A8D5E5' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${documentsKey}.no`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

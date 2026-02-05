"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { YesNoType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface TravelReadyStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function TravelReadyStep({ wizardPath }: TravelReadyStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  // Use different translation keys based on patient role
  const travelKey = data.patientRole === 'patient' ? 'travelPatient' : 'travelCompanion';

  const handleSelect = (value: YesNoType) => {
    updateData({ canTravel: value });
    if (value === 'yes') {
      router.push(`/register/${wizardPath}/step/records`);
    } else {
      router.push(`/register/${wizardPath}/step/visa`);
    }
  };

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/role`);
  };

  return (
    <WizardStepLayout
      title={t(`${travelKey}.title`)}
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
              {t(`${travelKey}.yes`)}
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
              {t(`${travelKey}.no`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

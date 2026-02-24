"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { YesNoType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface VisaHelpStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function VisaHelpStep({ wizardPath }: VisaHelpStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  // Use different translation keys based on patient role
  const visaKey = data.patientRole === 'patient' ? 'visaHelpPatient' : 'visaHelpCompanion';

  const handleSelect = (value: YesNoType) => {
    updateData({ needsVisaHelp: value });
    // Regardless of answer, continue to next step or show exit
    router.push(`/register/${wizardPath}/step/exit-travel`);
  };

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/travel`);
  };

  return (
    <WizardStepLayout
      title={t(`${visaKey}.title`)}
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
              {t(`${visaKey}.yes`)}
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
              {t(`${visaKey}.no`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface ExitNoRecordsStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function ExitNoRecordsStep({ wizardPath }: ExitNoRecordsStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data } = useWizard();

  const exitKey = data.patientRole === 'patient' ? 'exitNoRecordsPatient' : 'exitNoRecordsCompanion';

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/records`);
  };

  const handleExit = () => {
    router.push('/');
  };

  return (
    <WizardStepLayout
      title={t(`${exitKey}.title`)}
      subtitle={t(`${exitKey}.description`)}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={handleExit}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${exitKey}.button`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

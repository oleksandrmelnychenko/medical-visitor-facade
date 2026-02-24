"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { PatientRoleType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  patient: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  companion: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

interface PatientRoleStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function PatientRoleStep({ wizardPath }: PatientRoleStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((role: PatientRoleType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({ patientRole: role });
    router.push(`/register/${wizardPath}/step/travel`);
  }, [updateData, router, wizardPath]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/register');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('patientRole.title')}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={() => handleSelect('patient')}
          className={styles.clientCard}
          style={CARD_STYLES.patient}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('patientRole.yes')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('patientRole.yesDesc')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => handleSelect('companion')}
          className={styles.clientCard}
          style={CARD_STYLES.companion}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('patientRole.no')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('patientRole.noDesc')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

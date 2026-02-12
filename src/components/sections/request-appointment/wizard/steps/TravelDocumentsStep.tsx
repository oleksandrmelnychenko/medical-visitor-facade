"use client";

import React, { useCallback, useRef, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { YesNoType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  yes: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  no: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

interface TravelDocumentsStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function TravelDocumentsStep({ wizardPath }: TravelDocumentsStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const documentsKey = useMemo(
    () => data.patientRole === 'patient' ? 'documentsPatient' : 'documentsCompanion',
    [data.patientRole]
  );

  const handleSelect = useCallback((value: YesNoType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({ hasTravelDocuments: value });
    router.push(`/register/${wizardPath}/step/info`);
  }, [updateData, router, wizardPath]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(`/register/${wizardPath}/step/records`);
  }, [router, wizardPath]);

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
          style={CARD_STYLES.yes}
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
          style={CARD_STYLES.no}
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

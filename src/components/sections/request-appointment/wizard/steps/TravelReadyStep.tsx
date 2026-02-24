"use client";

import React, { useCallback, useRef, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { YesNoType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  yes: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  no: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

interface TravelReadyStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function TravelReadyStep({ wizardPath }: TravelReadyStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  // Use different translation keys based on patient role
  const travelKey = useMemo(
    () => data.patientRole === 'patient' ? 'travelPatient' : 'travelCompanion',
    [data.patientRole]
  );

  const handleSelect = useCallback((value: YesNoType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({ canTravel: value });
    if (value === 'yes') {
      router.push(`/register/${wizardPath}/step/records`);
    } else {
      router.push(`/register/${wizardPath}/step/visa`);
    }
  }, [updateData, router, wizardPath]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(`/register/${wizardPath}/step/role`);
  }, [router, wizardPath]);

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
          style={CARD_STYLES.yes}
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
          style={CARD_STYLES.no}
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

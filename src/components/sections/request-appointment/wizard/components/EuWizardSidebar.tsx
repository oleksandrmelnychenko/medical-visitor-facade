"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface EuWizardSidebarProps {
  activeStep: number;
  part1Steps?: string[];
}

const DEFAULT_PART1_STEPS = ['patientInfo', 'medicalConcerns', 'insuranceDetails', 'preferences'];

export function EuWizardSidebar({ activeStep, part1Steps = DEFAULT_PART1_STEPS }: EuWizardSidebarProps) {
  const t = useTranslations('appointment.newPatient.euProgress');

  return (
    <div className={styles.euWizardSidebar}>
      <div className={styles.euSidebarPart}>
        <h3 className={styles.euPartTitle}>{t('part1')}</h3>
        <div className={styles.euStepsList}>
          {part1Steps.map((step, index) => (
            <div
              key={step}
              className={cn(
                styles.euStep,
                index === activeStep && styles.euStepActive,
                index < activeStep && styles.euStepComplete
              )}
            >
              <div className={styles.euStepIndicator}>
                <div className={styles.euStepCircle} />
                {index < part1Steps.length - 1 && <div className={styles.euStepLine} />}
              </div>
              <span className={styles.euStepLabel}>{t(step)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.euSidebarPart}>
        <h3 className={styles.euPartTitle}>{t('part2')}</h3>
        <p className={styles.euPartNote}>{t('part2Note')}</p>
      </div>
    </div>
  );
}

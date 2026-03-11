"use client";

import React from 'react';
import { Check, ClipboardCheck, User, Stethoscope, Shield, Flag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

const PROGRESS_STEPS = [
  { key: 'eligibility', labelKey: 'eligibility', icon: ClipboardCheck },
  { key: 'patientInfo', labelKey: 'patientInfo', icon: User },
  { key: 'primaryConcern', labelKey: 'primaryConcern', icon: Stethoscope },
  { key: 'servicesInsurance', labelKey: 'servicesInsurance', icon: Shield },
  { key: 'wrapUp', labelKey: 'wrapUp', icon: Flag },
];

interface WizardSidebarProps {
  activeIndex: number;
}

export function WizardSidebar({ activeIndex }: WizardSidebarProps) {
  const t = useTranslations('appointment.newPatient.progressSteps');
  const progressPercent = (activeIndex / (PROGRESS_STEPS.length - 1)) * 100;

  return (
    <div className={styles.wizardStepper}>
      {/* Glassmorphism background */}
      <div className={styles.stepperGlass} />

      {/* Progress track background */}
      <div className={styles.stepperTrack}>
        <div
          className={styles.stepperTrackFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className={styles.stepperSteps}>
        {PROGRESS_STEPS.map((step, index) => {
          const isComplete = index < activeIndex;
          const isActive = index === activeIndex;
          const isPending = index > activeIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={cn(
                styles.stepperStep,
                isActive && styles.stepperStepActive,
                isComplete && styles.stepperStepComplete,
                isPending && styles.stepperStepPending
              )}
            >
              <div className={styles.stepperDot}>
                <div className={styles.stepperDotInner}>
                  {isComplete ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <Icon size={16} strokeWidth={2} />
                  )}
                </div>
              </div>
              <span className={styles.stepperStepLabel}>{t(step.labelKey)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

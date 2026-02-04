"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import { WizardSidebar } from './WizardSidebar';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface WizardStepLayoutProps {
  title: string;
  subtitle?: string;
  showStepper?: boolean;
  activeStepIndex?: number;
  onBack?: () => void;
  backLabel?: string;
  children: React.ReactNode;
}

export function WizardStepLayout({
  title,
  subtitle,
  showStepper = false,
  activeStepIndex = 0,
  onBack,
  backLabel = 'Back',
  children,
}: WizardStepLayoutProps) {
  return (
    <div className={cn(pageStyles.page, styles.gridBackground)}>
      <div className={styles.gridOverlay} />
      {showStepper && (
        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={activeStepIndex} />
          </div>
        </section>
      )}

      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)} id="register">
        <div className={sectionStyles.container}>
          <h1 className={styles.wizardHeaderTitle}>{title}</h1>
          {subtitle && (
            <p className={styles.wizardHeaderSubtitle}>{subtitle}</p>
          )}
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.locationStepContent}>
            {children}

            {onBack && (
              <div className={styles.wizardButtonRow}>
                <button
                  onClick={onBack}
                  className={styles.wizardBackBtn}
                  type="button"
                >
                  {backLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

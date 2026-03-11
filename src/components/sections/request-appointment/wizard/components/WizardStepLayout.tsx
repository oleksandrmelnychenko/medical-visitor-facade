"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import { WizardSidebar } from './WizardSidebar';
import { EuWizardSidebar } from './EuWizardSidebar';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface WizardStepLayoutProps {
  title: string;
  subtitle?: string;
  showStepper?: boolean;
  showEuStepper?: boolean;
  activeStepIndex?: number;
  onBack?: () => void;
  backLabel?: string;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  children: React.ReactNode;
}

export function WizardStepLayout({
  title,
  subtitle,
  showStepper = false,
  showEuStepper = false,
  activeStepIndex = 0,
  onBack,
  backLabel = 'Back',
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  children,
}: WizardStepLayoutProps) {
  return (
    <div className={cn(pageStyles.page, styles.gridBackground)}>
      {showStepper && (
        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <WizardSidebar activeIndex={activeStepIndex} />
          </div>
        </section>
      )}
      {showEuStepper && (
        <section className={cn(sectionStyles.section, styles.stepperSection)}>
          <div className={sectionStyles.container}>
            <EuWizardSidebar activeStep={activeStepIndex} />
          </div>
        </section>
      )}

      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)} id="register">
        <div className={sectionStyles.container}>
          <div className={styles.wizardHeaderWrapper}>
            <h1 className={cn(styles.wizardHeaderTitle, styles.wizardHeaderEnter)}>
              {title}
            </h1>
            {subtitle && (
              <p className={cn(styles.wizardHeaderSubtitle, styles.wizardHeaderSubtitleEnter)}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)}>
        <div className={sectionStyles.container}>
          <div className={cn(styles.locationStepContent, styles.wizardSurface, styles.wizardSurfaceEnter)}>
            <div className={styles.wizardSurfaceInner}>
              {children}

              {(onBack || onContinue) && (
                <div className={styles.wizardButtonRow}>
                  {onBack && (
                    <button
                      onClick={onBack}
                      className={styles.wizardBackBtnHalf}
                      type="button"
                    >
                      {backLabel}
                    </button>
                  )}
                  {onContinue && (
                    <button
                      onClick={onContinue}
                      disabled={continueDisabled}
                      className={styles.wizardContinueBtnHalf}
                      type="button"
                    >
                      {continueLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

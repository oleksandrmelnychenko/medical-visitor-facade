"use client";

import React from 'react';
import { motion } from 'motion/react';
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
            <motion.h1
              className={styles.wizardHeaderTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className={styles.wizardHeaderSubtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)}>
        <div className={sectionStyles.container}>
          <motion.div
            className={styles.locationStepContent}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className={styles.wizardHeaderSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
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

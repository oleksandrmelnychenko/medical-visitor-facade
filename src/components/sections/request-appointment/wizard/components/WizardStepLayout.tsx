"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import { WizardPathTree } from './WizardPathTree';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface WizardStepLayoutProps {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  innerClassName?: string;
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
  subtitleClassName,
  contentClassName,
  innerClassName,
  onBack,
  backLabel = 'Back',
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  children,
}: WizardStepLayoutProps) {
  const hasManualTitleBreak = title.includes("\n");

  return (
    <div className={cn(pageStyles.page, styles.gridBackground)}>
      <section className={cn(sectionStyles.section, styles.wizardShellSection)} id="register">
        <div className={sectionStyles.container}>
          <div className={styles.wizardOuterRow}>
            <div className={styles.wizardTreeCol}>
              <div className={styles.wizardTimelinePanel}>
                <WizardPathTree />
              </div>
            </div>

            <div className={styles.wizardShell}>
              <div className={styles.wizardShellHeader}>
                <div className={styles.wizardHeaderWrapper}>
                  <h1
                    className={cn(
                      styles.wizardHeaderTitle,
                      hasManualTitleBreak && styles.wizardHeaderTitleManualBreak,
                      styles.wizardHeaderEnter
                    )}
                  >
                    {title}
                  </h1>
                  {subtitle && (
                    <p className={cn(styles.wizardHeaderSubtitle, styles.wizardHeaderSubtitleEnter, subtitleClassName)}>
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.wizardPageRow}>
                <div className={styles.wizardMainCol}>
                  <div className={cn(styles.locationStepContent, styles.wizardSurface, styles.wizardSurfaceEnter, contentClassName)}>
                    <div className={cn(styles.wizardSurfaceInner, innerClassName)}>
                      {children}

                      {(onBack || onContinue) && (
                        <div className={styles.wizardButtonRow}>
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
                          {onBack && (
                            <button
                              onClick={onBack}
                              className={styles.wizardBackText}
                              type="button"
                            >
                              {backLabel}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

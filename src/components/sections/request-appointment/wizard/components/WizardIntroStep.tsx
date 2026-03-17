"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "../steps/shared/MemberCheckStep.module.scss";
import welcomeStyles from "../steps/shared/WelcomeStep.module.scss";

interface WizardIntroStepProps {
  title: string;
  subtitle?: string;
  overline?: string;
  onBack?: () => void;
  backLabel?: string;
  onContinue: () => void;
  continueLabel: string;
  titleClassName?: string;
  headerClassName?: string;
  footer?: ReactNode;
}

export function WizardIntroStep({
  title,
  subtitle,
  overline,
  onBack,
  backLabel,
  onContinue,
  continueLabel,
  titleClassName,
  headerClassName,
  footer,
}: WizardIntroStepProps) {
  const t = useTranslations("appointment.newPatient");

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, styles.memberCheck)}>
        <div className={sectionStyles.container}>
          <div className={styles.layout}>
            {onBack && (
              <button
                onClick={onBack}
                className={styles.backCircle}
                type="button"
                aria-label={backLabel ?? t("back")}
              >
                <svg viewBox="0 0 24 24" fill="none" className={styles.backCircleIcon}>
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <div className={styles.headingRow}>
              <div className={cn(styles.header, headerClassName)}>
                {overline && <p className={styles.overline}>{overline}</p>}
                <h1 className={cn(styles.title, titleClassName)}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            </div>

            <div className={welcomeStyles.actions}>
              <button
                onClick={onContinue}
                className={welcomeStyles.ctaLink}
                type="button"
              >
                <span className={welcomeStyles.ctaLabel}>{continueLabel}</span>
                <span className={welcomeStyles.ctaArrow} aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none" className={welcomeStyles.ctaArrowIcon}>
                    <path
                      d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {footer}
          </div>
        </div>

        <span className={styles.cornerDecor} aria-hidden="true" />
      </section>
    </div>
  );
}

"use client";

import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "../steps/shared/MemberCheckStep.module.scss";

export interface WizardChoiceOption {
  description?: string;
  hoverColor?: string;
  icon: LucideIcon;
  key: string;
  onSelect: () => void;
  title: string;
}

interface WizardChoiceStepProps {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  overline?: string;
  onBack?: () => void;
  backLabel?: string;
  options: WizardChoiceOption[];
  footer?: ReactNode;
  contentClassName?: string;
  innerClassName?: string;
  titleClassName?: string;
  headerClassName?: string;
}

export function WizardChoiceStep({
  title,
  subtitle,
  overline,
  onBack,
  backLabel,
  options,
  footer,
  titleClassName,
  headerClassName,
}: WizardChoiceStepProps) {
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

            <div className={styles.cardGrid}>
              {options.map((option) => {
                const Icon = option.icon;

                return (
                  <button
                    key={option.key}
                    onClick={option.onSelect}
                    className={styles.card}
                    type="button"
                  >
                    <div className={styles.cardHead}>
                      <span className={styles.cardIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    </div>
                    <div className={styles.cardCopy}>
                      <h3 className={styles.cardTitle}>{option.title}</h3>
                      {option.description && (
                        <p className={styles.cardDesc}>{option.description}</p>
                      )}
                      <span className={styles.cardUnderline} aria-hidden="true" />
                    </div>
                  </button>
                );
              })}
            </div>

            {footer}
          </div>
        </div>

        <span className={styles.cornerDecor} aria-hidden="true" />
      </section>
    </div>
  );
}

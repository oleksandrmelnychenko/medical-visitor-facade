"use client";

import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { WizardStepLayout } from "./WizardStepLayout";
import styles from "../../RequestAppointment/RequestAppointment.module.scss";

interface WizardChoiceOption {
  description?: string;
  hoverColor: string;
  icon: LucideIcon;
  key: string;
  onSelect: () => void;
  style?: CSSProperties;
  title: string;
}

interface WizardChoiceStepProps {
  title: React.ReactNode;
  subtitle?: string;
  subtitleClassName?: string;
  onBack?: () => void;
  backLabel?: string;
  options: WizardChoiceOption[];
  footer?: ReactNode;
  contentClassName?: string;
  innerClassName?: string;
  showTrustBanner?: boolean;
}

export function WizardChoiceStep({
  title,
  subtitle,
  subtitleClassName,
  onBack,
  backLabel,
  options,
  footer,
  contentClassName,
  innerClassName,
  showTrustBanner,
}: WizardChoiceStepProps) {
  return (
    <WizardStepLayout
      title={title}
      subtitle={subtitle}
      subtitleClassName={subtitleClassName}
      contentClassName={cn(styles.locationConceptSurface, contentClassName)}
      innerClassName={cn(styles.locationConceptInner, innerClassName)}
      onBack={onBack}
      backLabel={backLabel}
      showTrustBanner={showTrustBanner}
    >
      <div className={styles.locationConceptGrid}>
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.key}
              onClick={option.onSelect}
              className={styles.locationConceptCard}
              style={{ "--hover-color": option.hoverColor, ...option.style } as CSSProperties}
              type="button"
            >
              <span className={styles.locationConceptCardHeader}>
                <span className={styles.locationConceptIcon} aria-hidden="true">
                  <Icon />
                </span>
              </span>

              <span className={styles.locationConceptCopy}>
                <span className={styles.locationConceptTitle}>{option.title}</span>
                {option.description && (
                  <span className={styles.locationConceptDesc}>{option.description}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {footer}
    </WizardStepLayout>
  );
}

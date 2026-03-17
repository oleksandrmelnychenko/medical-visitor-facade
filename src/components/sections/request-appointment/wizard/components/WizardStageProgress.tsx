"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { PROGRESS_STEPS, type WizardStep } from "../types";
import { isWizardStep } from "../progress-cookie";
import styles from "../../RequestAppointment/RequestAppointment.module.scss";

const STAGE_STEP_GROUPS: WizardStep[][] = [
  [
    "member-check",
    "welcome",
    "location",
    "become-member",
    "outside-travel",
    "outside-records",
    "records-language",
    "outside-documents",
    "outside-exit-travel",
    "outside-exit-records",
  ],
  [
    "health-intro",
    "patient-name",
    "patient-dob",
    "phone",
    "whatsapp-consent",
    "email-consent",
    "no-contact-exit",
    "primary-language",
    "legal-sex",
    "interpreter",
  ],
  [
    "services",
    "address",
    "concern-intro",
    "primary-concern",
    "current-treatment",
    "health-risk",
  ],
  [
    "insurance-intro",
    "insurance",
    "insurance-coverage",
  ],
  [
    "wrap-up-intro",
    "preferred-location",
    "visit-timing",
    "anything-else",
    "review",
  ],
];

function resolveStageIndex(step: WizardStep) {
  const index = STAGE_STEP_GROUPS.findIndex((group) => group.includes(step));
  return index >= 0 ? index : 0;
}

export function WizardStageProgress() {
  const searchParams = useSearchParams();
  const rawStep = searchParams.get("step");
  const currentStep: WizardStep = isWizardStep(rawStep) ? rawStep : "member-check";
  const currentStage = resolveStageIndex(currentStep) + 1;
  const totalStages = PROGRESS_STEPS.length;
  const progress = `${(currentStage / totalStages) * 100}%`;

  return (
    <div className={styles.wizardStageProgress} aria-label={`Step ${currentStage} of ${totalStages}`}>
      <span className={styles.wizardStageValue}>
        {String(currentStage).padStart(2, "0")}
        <span aria-hidden="true">—</span>
        {String(totalStages).padStart(2, "0")}
      </span>
      <span className={styles.wizardStageTrack} aria-hidden="true">
        <span className={styles.wizardStageFill} style={{ width: progress }} />
      </span>
    </div>
  );
}

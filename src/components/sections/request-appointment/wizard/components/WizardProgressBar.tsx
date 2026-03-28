"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useWizard } from "../WizardContext";
import { buildPath } from "../wizard-path";
import styles from "./WizardProgressBar.module.scss";

function WizardProgressBarInner() {
  const searchParams = useSearchParams();
  const { data } = useWizard();
  const currentStep = searchParams.get("step") ?? "member-check";

  const steps = useMemo(() => buildPath(data), [data]);
  const currentIndex = steps.findIndex((s) => s === currentStep);
  const percent = steps.length > 1
    ? Math.round(((Math.max(currentIndex, 0) + 1) / steps.length) * 100)
    : 0;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}

export function WizardProgressBar() {
  return (
    <Suspense fallback={null}>
      <WizardProgressBarInner />
    </Suspense>
  );
}

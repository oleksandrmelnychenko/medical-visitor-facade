"use client";

import React, { useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import formStyles from "@/components/auth/Auth.module.scss";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

export function WrapUpIntroStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=preferred-location");
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(
      data.hasInsurance === "yes"
        ? "/apply?type=new&step=insurance-coverage"
        : "/apply?type=new&step=insurance"
    );
  }, [data.hasInsurance, router]);

  return (
    <WizardStepLayout
      title={t("wrapUpIntro.title")}
      subtitle={t("wrapUpIntro.subtitle")}
      subtitleClassName={styles.welcomeSubtitleBody}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleContinue}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>{t("wrapUpIntro.start")}</span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </WizardStepLayout>
  );
}

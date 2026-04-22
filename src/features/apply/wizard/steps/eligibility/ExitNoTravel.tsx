"use client";

import { useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { StepLayout } from "../../ui/StepLayout";
import formStyles from "@/shared/ui/form/Form.module.scss";
import styles from "@/features/apply/ApplyPage.module.scss";

export function ExitNoTravel() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(
      data.hasTravelDocuments === "no"
        ? "/apply?type=new&step=outside-documents"
        : "/apply?type=new&step=outside-travel"
    );
  }, [router, data.hasTravelDocuments]);

  const handleExit = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/");
  }, [router]);

  return (
    <StepLayout
      title={t("exitNoTravelPatient.title")}
      subtitle={t("exitNoTravelPatient.description")}
      subtitleClassName={styles.welcomeSubtitleBody}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.wizardFormContainer}>
        <button
          onClick={handleExit}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>
            {t("exitNoTravelPatient.button")}
          </span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </StepLayout>
  );
}

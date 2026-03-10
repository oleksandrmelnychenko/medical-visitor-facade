"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { MedicalAreaType } from "../../types";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";
import formStyles from "@/components/auth/Auth.module.scss";
import { buildSalesforceBundle, downloadSalesforceBundle } from "../../salesforce-bundle";

export function EuMedicalStep() {
  const t = useTranslations("appointment.newPatient");
  const locale = useLocale();
  const router = useRouter();
  const { data, updateData, resetData } = useWizard();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const areas = [
    { key: "cardiology", value: "cardiology" as MedicalAreaType, color: "#F4B4C4" },
    { key: "neurology", value: "neurology" as MedicalAreaType, color: "#A8D5E5" },
    { key: "oncology", value: "oncology" as MedicalAreaType, color: "#A8E5C4" },
    { key: "otherDiagnosis", value: "other" as MedicalAreaType, color: "#E5D5A8" },
    { key: "noDiagnosis", value: "none" as MedicalAreaType, color: "#D5A8E5" },
  ];

  const handleSelect = (value: MedicalAreaType) => {
    const nextData = { ...data, medicalArea: value };

    updateData({ medicalArea: value });
    downloadSalesforceBundle(
      buildSalesforceBundle(nextData, {
        flow: "eu",
        locale,
      })
    );
    resetData();
    setIsSubmitted(true);
  };

  const handleBack = () => {
    router.push("/register");
  };

  if (isSubmitted) {
    return (
      <WizardStepLayout
        title={t("patientInfo.successTitle")}
        subtitle={t("patientInfo.successMessage")}
      >
        <div className={styles.wizardFormContainer}>
          <button
            onClick={() => {
              resetData();
              router.push("/apply");
            }}
            className={formStyles.submitButton}
            type="button"
          >
            {t("patientInfo.startOver")}
          </button>
        </div>
      </WizardStepLayout>
    );
  }

  return (
    <WizardStepLayout
      title={t("medicalDiagnosis.title")}
      subtitle={t("medicalDiagnosis.description")}
      showStepper={false}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.clientCardsGrid}>
        {areas.map((area) => (
          <div
            key={area.key}
            onClick={() => handleSelect(area.value)}
            className={styles.clientCard}
            style={{ '--hover-color': area.color } as React.CSSProperties}
          >
            <div className={styles.clientCardContent}>
              <h3 className={styles.clientCardTitle}>
                {t(`medicalDiagnosis.options.${area.key}`)}
              </h3>
            </div>
            <ChevronRight size={24} className={styles.clientCardArrow} />
          </div>
        ))}
      </div>
    </WizardStepLayout>
  );
}

"use client";

import React, { useCallback, useRef } from "react";
import { FileText, FileX, FolderX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../WizardContext";
import { MedicalRecordsType } from "../types";
import { WizardChoiceStep } from "../components/WizardChoiceStep";

export function MedicalRecordsStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: MedicalRecordsType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ hasMedicalRecords: value });
    if (value === "yes") {
      router.push("/apply?type=new&step=records-language");
    } else {
      router.push("/apply?type=new&step=outside-documents");
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=outside-travel");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("recordsPatient.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("recordsPatient.yes"),
          icon: FileText,
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("recordsPatient.no"),
          icon: FileX,
          onSelect: () => handleSelect("no"),
        },
        {
          key: "none",
          title: t("recordsPatient.none"),
          icon: FolderX,
          onSelect: () => handleSelect("none"),
        },
      ]}
    />
  );
}

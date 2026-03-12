"use client";

import { useCallback, useRef } from "react";
import { FileCheck, FileX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../WizardContext";
import { YesNoType } from "../types";
import { WizardChoiceStep } from "../components/WizardChoiceStep";

export function TravelDocumentsStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: YesNoType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ hasTravelDocuments: value });
    router.push("/apply?type=new&step=health-intro");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(
      data.hasMedicalRecords === "yes"
        ? "/apply?type=new&step=records-language"
        : "/apply?type=new&step=outside-records"
    );
  }, [data.hasMedicalRecords, router]);

  return (
    <WizardChoiceStep
      title={t("documentsPatient.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("documentsPatient.yes"),
          icon: FileCheck,
          hoverColor: "#E5D5A8",
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("documentsPatient.no"),
          icon: FileX,
          hoverColor: "#A8D5E5",
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

"use client";

import { useCallback, useRef } from "react";
import { FileX, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function MedicalRecordsLanguageStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: "yes" | "no") => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ recordsInAcceptedLanguage: value });
    router.push("/apply?type=new&step=outside-documents");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=outside-records");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("recordsLanguage.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("recordsLanguage.yes"),
          icon: Languages,
          hoverColor: "#E5D5A8",
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("recordsLanguage.no"),
          icon: FileX,
          hoverColor: "#A8D5E5",
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

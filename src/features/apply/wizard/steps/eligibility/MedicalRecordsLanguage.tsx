"use client";

import { useCallback, useRef } from "react";
import { FileX, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { ChoiceStep } from "../../ui/ChoiceStep";

export function MedicalRecordsLanguage() {
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
    <ChoiceStep
      title={t.rich("recordsLanguage.title", { b: (chunks) => <strong>{chunks}</strong> })}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("recordsLanguage.yes"),
          icon: Languages,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("recordsLanguage.no"),
          icon: FileX,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

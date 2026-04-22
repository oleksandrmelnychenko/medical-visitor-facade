"use client";

import { useCallback, useRef } from "react";
import { FileCheck, FileX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { YesNoType } from "../../types";
import { ChoiceStep } from "../../ui/ChoiceStep";

export function TravelDocuments() {
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
    <ChoiceStep
      title={t("documentsPatient.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("documentsPatient.yes"),
          icon: FileCheck,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("documentsPatient.no"),
          icon: FileX,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

"use client";

import { useCallback, useRef } from "react";
import { ClipboardMinus, ClipboardPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function CurrentTreatmentStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: 'yes' | 'no') => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ currentlyInTreatment: value });
    router.push('/apply?type=new&step=health-risk');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=primary-concern");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("healthTreatment.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("healthTreatment.yes"),
          icon: ClipboardPlus,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("healthTreatment.no"),
          icon: ClipboardMinus,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

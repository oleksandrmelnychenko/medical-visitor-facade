"use client";

import { useCallback, useRef } from "react";
import { ShieldCheck, ShieldX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { ChoiceStep } from "../../ui/ChoiceStep";

export function Insurance() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: 'yes' | 'no') => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ hasInsurance: value });
    if (value === 'yes') {
      router.push('/apply?type=new&step=insurance-coverage');
    } else {
      router.push('/apply?type=new&step=wrap-up-intro');
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=insurance-intro");
  }, [router]);

  return (
    <ChoiceStep
      title={t("insuranceStep.title")}
      onBack={handleBack}
      backLabel={t("back")}
      showTrustBanner
      options={[
        {
          key: "yes",
          title: t("insuranceStep.yes"),
          icon: ShieldCheck,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("insuranceStep.no"),
          icon: ShieldX,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

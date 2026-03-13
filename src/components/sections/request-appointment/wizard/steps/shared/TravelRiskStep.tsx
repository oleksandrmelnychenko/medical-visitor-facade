"use client";

import { useCallback, useRef } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function TravelRiskStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: 'yes' | 'no') => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ hasHealthRiskForTravel: value });
    router.push("/apply?type=new&step=additional-concerns");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=current-treatment");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("healthRisk.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("healthRisk.yes"),
          icon: ShieldAlert,
          hoverColor: "#E5D5A8",
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("healthRisk.no"),
          description: t("healthRisk.disclaimer"),
          icon: ShieldCheck,
          hoverColor: "#A8D5E5",
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

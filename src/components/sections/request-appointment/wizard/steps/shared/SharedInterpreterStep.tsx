"use client";

import { useCallback, useRef } from "react";
import { Languages, UserRoundCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function SharedInterpreterStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: 'yes' | 'no') => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ needsInterpreter: value });
    router.push(value === "yes"
      ? "/apply?type=new&step=primary-language"
      : "/apply?type=new&step=services");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=legal-sex");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("sharedInterpreter.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("sharedInterpreter.yes"),
          icon: Languages,
          hoverColor: "#E5D5A8",
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("sharedInterpreter.no"),
          icon: UserRoundCheck,
          hoverColor: "#A8D5E5",
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

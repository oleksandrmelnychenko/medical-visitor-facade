"use client";

import { useCallback, useRef } from "react";
import { BadgeCheck, BadgeX, ShieldQuestionMark } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { InsuranceCoverageType } from "../../types";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function InsuranceCoverageStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: InsuranceCoverageType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ insuranceCoversGermany: value });
    router.push('/apply?type=new&step=wrap-up-intro');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=insurance");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("insuranceCoverage.title")}
      onBack={handleBack}
      backLabel={t("back")}
      showTrustBanner
      options={[
        {
          key: "yes",
          title: t("insuranceCoverage.yes"),
          icon: BadgeCheck,
          hoverColor: "#E5D5A8",
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("insuranceCoverage.no"),
          icon: BadgeX,
          hoverColor: "#A8D5E5",
          onSelect: () => handleSelect("no"),
        },
        {
          key: "not_sure",
          title: t("insuranceCoverage.notSure"),
          icon: ShieldQuestionMark,
          hoverColor: "#D5D5D5",
          onSelect: () => handleSelect("not_sure"),
        },
      ]}
    />
  );
}

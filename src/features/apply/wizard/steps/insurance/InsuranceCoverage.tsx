"use client";

import { useCallback, useRef } from "react";
import { BadgeCheck, BadgeX, ShieldQuestionMark } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { InsuranceCoverageType } from "../../types";
import { ChoiceStep } from "../../ui/ChoiceStep";

export function InsuranceCoverage() {
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
    <ChoiceStep
      title={t("insuranceCoverage.title")}
      onBack={handleBack}
      backLabel={t("back")}
      showTrustBanner
      options={[
        {
          key: "yes",
          title: t("insuranceCoverage.yes"),
          icon: BadgeCheck,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("insuranceCoverage.no"),
          icon: BadgeX,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: () => handleSelect("no"),
        },
        {
          key: "not_sure",
          title: t("insuranceCoverage.notSure"),
          icon: ShieldQuestionMark,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.neutral,
          style: BINARY_CHOICE_CARD_STYLES.neutral,
          onSelect: () => handleSelect("not_sure"),
        },
      ]}
    />
  );
}

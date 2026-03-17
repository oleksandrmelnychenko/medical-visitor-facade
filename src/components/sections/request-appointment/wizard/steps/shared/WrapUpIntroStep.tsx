"use client";

import React, { useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardIntroStep } from "../../components/WizardIntroStep";

export function WrapUpIntroStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=preferred-location");
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(
      data.hasInsurance === "yes"
        ? "/apply?type=new&step=insurance-coverage"
        : "/apply?type=new&step=insurance"
    );
  }, [data.hasInsurance, router]);

  return (
    <WizardIntroStep
      title={t("wrapUpIntro.title")}
      subtitle={t("wrapUpIntro.subtitle")}
      onBack={handleBack}
      backLabel={t("back")}
      onContinue={handleContinue}
      continueLabel={t("wrapUpIntro.start")}
    />
  );
}

"use client";

import { useCallback, useRef } from "react";
import { CircleX, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function OutsideRecordsSubmitStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: 'yes' | 'no') => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    if (value === "yes") {
      router.push("/apply?type=new&step=health-intro");
    } else {
      router.push("/apply?type=new&step=outside-exit-records");
    }
  }, [router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=outside-records");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("outsideRecordsSubmit.title")}
      subtitle={t("outsideRecordsSubmit.subtitle")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("yes"),
          icon: Send,
          hoverColor: "#E5D5A8",
          onSelect: () => handleSelect("yes"),
        },
        {
          key: "no",
          title: t("no"),
          icon: CircleX,
          hoverColor: "#A8D5E5",
          onSelect: () => handleSelect("no"),
        },
      ]}
    />
  );
}

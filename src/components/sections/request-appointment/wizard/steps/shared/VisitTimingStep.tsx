"use client";

import { useCallback, useRef } from "react";
import { CalendarDays, Clock3, ClockAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { VisitTimingType } from "../../types";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

const TIMING_OPTIONS: { value: VisitTimingType; key: string; color: string; icon: LucideIcon }[] = [
  { value: "asap", key: "asap", color: "#E5D5A8", icon: Clock3 },
  { value: "next_few_months", key: "nextFewMonths", color: "#A8D5E5", icon: CalendarDays },
  { value: "not_sure", key: "notSure", color: "#D5D5D5", icon: ClockAlert },
];

export function VisitTimingStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: VisitTimingType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ visitTiming: value });
    router.push('/apply?type=new&step=anything-else');
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=preferred-location");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("visitTiming.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={TIMING_OPTIONS.map((option) => ({
        key: option.value,
        title: t(`visitTiming.${option.key}`),
        icon: option.icon,
        hoverColor: option.color,
        onSelect: () => handleSelect(option.value),
      }))}
      footer={<p className={styles.wizardTimingNote}>{t("visitTiming.note")}</p>}
    />
  );
}

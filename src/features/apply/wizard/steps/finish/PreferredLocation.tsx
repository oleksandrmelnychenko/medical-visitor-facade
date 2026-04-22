"use client";

import { useCallback, useRef } from "react";
import { Building2, Landmark, MapPin, MapPinHouse, MapPinned } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { PreferredLocationType } from "../../types";
import { ChoiceStep } from "../../ui/ChoiceStep";
import styles from "@/features/apply/ApplyPage.module.scss";

const LOCATIONS: { value: NonNullable<PreferredLocationType>; key: string; color: string; icon: LucideIcon }[] = [
  { value: "no_preference", key: "noPreference", color: "#D5D5D5", icon: MapPinHouse },
  { value: "munich", key: "munich", color: "#E5D5A8", icon: Landmark },
  { value: "berlin", key: "berlin", color: "#A8D5E5", icon: Building2 },
  { value: "hamburg", key: "hamburg", color: "#A8E5C4", icon: MapPinned },
  { value: "cologne", key: "cologne", color: "#D5A8E5", icon: MapPin },
];

export function PreferredLocation() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: PreferredLocationType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ preferredLocation: value });
    router.push("/apply?type=new&step=visit-timing");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=wrap-up-intro");
  }, [router]);

  return (
    <ChoiceStep
      title={t("preferredLocation.title")}
      subtitle={t("preferredLocation.subtitle")}
      subtitleClassName={styles.welcomeSubtitleBody}
      onBack={handleBack}
      backLabel={t("back")}
      options={LOCATIONS.map((location) => ({
        key: location.value,
        title: t(`preferredLocation.${location.key}`),
        icon: location.icon,
        hoverColor: location.color,
        onSelect: () => handleSelect(location.value),
      }))}
    />
  );
}

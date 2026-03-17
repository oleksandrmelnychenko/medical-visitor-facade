"use client";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../WizardContext";
import { WizardChoiceStep } from "../components/WizardChoiceStep";
import localStyles from "./TravelReadyStep.module.scss";

export function ExitNoTravelStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data } = useWizard();

  const handleBack = () => {
    router.push(
      data.hasTravelDocuments === "no"
        ? "/apply?type=new&step=outside-documents"
        : "/apply?type=new&step=outside-travel"
    );
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <WizardChoiceStep
      title={t("exitNoTravelPatient.title")}
      subtitle={t("exitNoTravelPatient.description")}
      onBack={handleBack}
      backLabel={t("back")}
      titleClassName={localStyles.title}
      headerClassName={localStyles.header}
      options={[
        {
          key: "exit",
          title: t("exitNoTravelPatient.button"),
          icon: LogOut,
          onSelect: handleExit,
        },
      ]}
    />
  );
}

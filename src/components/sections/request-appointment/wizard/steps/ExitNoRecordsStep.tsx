"use client";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { WizardChoiceStep } from "../components/WizardChoiceStep";

export function ExitNoRecordsStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();

  const handleBack = () => {
    router.push("/apply?type=new&step=outside-records");
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <WizardChoiceStep
      title={t("exitNoRecordsPatient.title")}
      subtitle={t("exitNoRecordsPatient.description")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "exit",
          title: t("exitNoRecordsPatient.button"),
          icon: LogOut,
          hoverColor: "#E5D5A8",
          onSelect: handleExit,
        },
      ]}
    />
  );
}

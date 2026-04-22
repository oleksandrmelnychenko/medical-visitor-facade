"use client";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ChoiceStep } from "../../ui/ChoiceStep";

export function NoContactExit() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();

  return (
    <ChoiceStep
      title={t("noContactExit.title")}
      subtitle={t("noContactExit.description")}
      onBack={() => router.push("/apply?type=new&step=email-consent")}
      backLabel={t("back")}
      options={[
        {
          key: "home",
          title: t("noContactExit.button"),
          icon: LogOut,
          hoverColor: "#E5D5A8",
          onSelect: () => router.push("/"),
        },
      ]}
    />
  );
}

"use client";

import { useCallback, useRef } from "react";
import { MailCheck, MailX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";

export function EmailConsentStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleYes = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ emailConsent: true });
    router.push("/apply?type=new&step=primary-language");
  }, [updateData, router]);

  const handleNo = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ emailConsent: false });
    router.push(
      data.whatsappConsent
        ? "/apply?type=new&step=primary-language"
        : "/apply?type=new&step=no-contact-exit"
    );
  }, [data.whatsappConsent, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=whatsapp-consent");
  }, [router]);

  return (
    <WizardChoiceStep
      title={t("emailConsent.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("emailConsent.yes"),
          description: t("emailConsent.yesDisclaimer"),
          icon: MailCheck,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: handleYes,
        },
        {
          key: "no",
          title: t("emailConsent.no"),
          icon: MailX,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: handleNo,
        },
      ]}
    />
  );
}

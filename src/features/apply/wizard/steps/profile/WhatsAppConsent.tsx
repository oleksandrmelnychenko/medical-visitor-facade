"use client";

import { useState, useCallback, useRef } from "react";
import { ArrowRight, MessageCircleMore, MessageCircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES, BINARY_CHOICE_HOVER_COLORS } from "../../choiceCardStyles";
import { StepLayout } from "../../ui/StepLayout";
import { ChoiceStep } from "../../ui/ChoiceStep";
import { COUNTRY_CODES, splitInternationalPhoneNumber } from "../../contactPhone";
import formStyles from "@/components/auth/Auth.module.scss";
import styles from "@/features/apply/ApplyPage.module.scss";

export function WhatsAppConsent() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const initialWhatsApp = splitInternationalPhoneNumber(data.whatsappNumber);
  const [consent, setConsent] = useState<"yes" | "no" | null>(
    data.whatsappConsent === null ? null : data.whatsappConsent ? "yes" : "no"
  );
  const [number, setNumber] = useState(initialWhatsApp.nationalNumber);
  const [countryCode, setCountryCode] = useState(initialWhatsApp.countryCode);
  const isNavigatingRef = useRef(false);

  const handleYes = useCallback(() => {
    setConsent("yes");
  }, []);

  const handleNo = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ whatsappConsent: false, whatsappNumber: '' });
    router.push("/apply?type=new&step=email-consent");
  }, [updateData, router]);

  const handleNumberContinue = useCallback(() => {
    if (!number || isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ whatsappConsent: true, whatsappNumber: `${countryCode}${number}` });
    router.push("/apply?type=new&step=email-consent");
  }, [countryCode, number, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=phone");
  }, [router]);

  if (consent === "yes") {
    return (
      <StepLayout
        title={t("whatsappConsentNew.numberTitle")}
        onBack={() => setConsent(null)}
        backLabel={t("back")}
        showTrustBanner
      >
        <div className={styles.wizardFormContainer}>
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <div className={styles.contactPhoneSurface}>
                <div className={styles.contactPhoneCode}>
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className={styles.contactPhoneSelect}
                  >
                    {COUNTRY_CODES.map(item => (
                      <option key={item.code} value={item.code}>{`${item.flag} ${item.code}`}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  className={styles.contactPhoneInput}
                  autoFocus
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleNumberContinue}
            disabled={!number}
            className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
            type="button"
          >
            <span className={styles.welcomeContinueIcon} aria-hidden="true">
              <ArrowRight />
            </span>
            <span className={styles.welcomeContinueLabel}>{t("continue")}</span>
            <span className={styles.welcomeContinueDot} aria-hidden="true" />
          </button>
        </div>
      </StepLayout>
    );
  }

  return (
    <ChoiceStep
      title={t("whatsappConsentNew.title")}
      onBack={handleBack}
      backLabel={t("back")}
      showTrustBanner
      options={[
        {
          key: "yes",
          title: t("whatsappConsentNew.yes"),
          description: t("whatsappConsentNew.yesDisclaimer"),
          icon: MessageCircleMore,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.yes,
          style: BINARY_CHOICE_CARD_STYLES.yes,
          onSelect: handleYes,
        },
        {
          key: "no",
          title: t("whatsappConsentNew.no"),
          icon: MessageCircleX,
          hoverColor: BINARY_CHOICE_HOVER_COLORS.no,
          style: BINARY_CHOICE_CARD_STYLES.no,
          onSelect: handleNo,
        },
      ]}
    />
  );
}

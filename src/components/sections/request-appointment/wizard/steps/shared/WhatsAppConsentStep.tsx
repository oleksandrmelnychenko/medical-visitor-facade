"use client";

import { useState, useCallback, useRef } from "react";
import { MessageCircleMore, MessageCircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import { WizardChoiceStep } from "../../components/WizardChoiceStep";
import { COUNTRY_CODES, splitInternationalPhoneNumber } from "../../contact-phone";
import formStyles from "@/components/auth/Auth.module.scss";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

export function WhatsAppConsentStep() {
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
      <WizardStepLayout
        title={t("whatsappConsentNew.numberTitle")}
        onBack={() => setConsent(null)}
        backLabel={t("back")}
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
            className={formStyles.submitButton}
            type="button"
          >
            {t("continue")}
          </button>
        </div>
      </WizardStepLayout>
    );
  }

  return (
    <WizardChoiceStep
      title={t("whatsappConsentNew.title")}
      onBack={handleBack}
      backLabel={t("back")}
      options={[
        {
          key: "yes",
          title: t("whatsappConsentNew.yes"),
          description: t("whatsappConsentNew.yesDisclaimer"),
          icon: MessageCircleMore,
          hoverColor: "#E5D5A8",
          onSelect: handleYes,
        },
        {
          key: "no",
          title: t("whatsappConsentNew.no"),
          icon: MessageCircleX,
          hoverColor: "#A8D5E5",
          onSelect: handleNo,
        },
      ]}
    />
  );
}

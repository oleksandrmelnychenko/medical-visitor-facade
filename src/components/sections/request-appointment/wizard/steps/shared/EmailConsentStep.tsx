"use client";

import React, { useCallback, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

const CARD_STYLES = {
  yes: { "--hover-color": "#E5D5A8" } as React.CSSProperties,
  no: { "--hover-color": "#A8D5E5" } as React.CSSProperties,
};

export function EmailConsentStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleYes = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ emailConsent: true });
    router.push("/apply?type=new&step=legal-sex");
  }, [updateData, router]);

  const handleNo = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ emailConsent: false });
    router.push(
      data.whatsappConsent
        ? "/apply?type=new&step=legal-sex"
        : "/apply?type=new&step=no-contact-exit"
    );
  }, [data.whatsappConsent, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=whatsapp-consent");
  }, [router]);

  return (
    <WizardStepLayout
      title={t("emailConsent.title")}
      showStepper
      activeStepIndex={1}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.clientCardsGrid}>
        <div onClick={handleYes} className={styles.clientCard} style={CARD_STYLES.yes}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t("emailConsent.yes")}</h3>
            <p className={styles.clientCardDesc}>{t("emailConsent.yesDisclaimer")}</p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div onClick={handleNo} className={styles.clientCard} style={CARD_STYLES.no}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t("emailConsent.no")}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

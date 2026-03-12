"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

export function NoContactExitStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();

  return (
    <WizardStepLayout
      title={t("noContactExit.title")}
      subtitle={t("noContactExit.description")}
      onBack={() => router.push("/apply?type=new&step=email-consent")}
      backLabel={t("back")}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={() => router.push("/")}
          className={styles.clientCard}
          style={{ "--hover-color": "#E5D5A8" } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t("noContactExit.button")}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}

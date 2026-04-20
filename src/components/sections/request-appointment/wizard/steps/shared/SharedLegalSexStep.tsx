"use client";

import React, { useCallback, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { LegalSexType } from "../../types";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import formStyles from "@/components/auth/Auth.module.scss";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

const SEX_OPTIONS: { value: NonNullable<LegalSexType>; key: string }[] = [
  { value: "female", key: "female" },
  { value: "male", key: "male" },
  { value: "diverse", key: "diverse" },
  { value: "no_entry", key: "noEntry" },
];

export function SharedLegalSexStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);
  const [legalSex, setLegalSex] = useState<LegalSexType>(data.legalSex);

  const handleContinue = useCallback(() => {
    if (!legalSex || isNavigatingRef.current) return;
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ legalSex });
    router.push("/apply?type=new&step=interpreter");
  }, [legalSex, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=primary-language");
  }, [router]);

  return (
    <WizardStepLayout
      title={t("sharedLegalSex.title")}
      subtitle={t("sharedLegalSex.subtitle")}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.wizardFormContainer}>
        <div className={`${formStyles.radioGroup} ${styles.legalSexRadioGroup}`}>
          {SEX_OPTIONS.map(opt => {
            const inputId = `legal-sex-${opt.value}`;

            return (
              <label
                key={opt.value}
                htmlFor={inputId}
                className={`${formStyles.radioLabel} ${styles.legalSexRadioLabel}`}
              >
                <input
                  id={inputId}
                  type="radio"
                  name="legal-sex"
                  value={opt.value}
                  checked={legalSex === opt.value}
                  onChange={() => setLegalSex(opt.value)}
                  className={formStyles.radioInput}
                />
                <span className={formStyles.radioCustom} />
                <span className={styles.legalSexRadioText}>{t(`sharedLegalSex.${opt.key}`)}</span>
              </label>
            );
          })}
        </div>
        <button
          onClick={handleContinue}
          disabled={!legalSex}
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
    </WizardStepLayout>
  );
}

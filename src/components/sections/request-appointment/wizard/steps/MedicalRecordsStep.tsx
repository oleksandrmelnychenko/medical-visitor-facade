"use client";

import { useCallback, useRef } from "react";
import { FileText, FileX, FolderX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../WizardContext";
import { BINARY_CHOICE_CARD_STYLES } from "../choiceCardStyles";
import { MedicalRecordsType } from "../types";
import { WizardStepLayout } from "../components/WizardStepLayout";
import styles from "../../RequestAppointment/RequestAppointment.module.scss";

const CARD_STYLES = {
  yes: BINARY_CHOICE_CARD_STYLES.yes,
  no: BINARY_CHOICE_CARD_STYLES.no,
  none: BINARY_CHOICE_CARD_STYLES.neutral,
};

export function MedicalRecordsStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: MedicalRecordsType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ hasMedicalRecords: value });
    if (value === "yes") {
      router.push("/apply?type=new&step=records-language");
    } else {
      router.push("/apply?type=new&step=outside-documents");
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=outside-travel");
  }, [router]);

  return (
    <WizardStepLayout
      title={t("recordsPatient.title")}
      contentClassName={styles.locationConceptSurface}
      innerClassName={styles.locationConceptInner}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.locationConceptGrid}>
        <button
          onClick={() => handleSelect("yes")}
          className={styles.locationConceptCard}
          style={CARD_STYLES.yes}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
              <FileText />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("recordsPatient.yes")}</h3>
        </button>
        <button
          onClick={() => handleSelect("no")}
          className={styles.locationConceptCard}
          style={CARD_STYLES.no}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
              <FileX />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("recordsPatient.no")}</h3>
        </button>
        <button
          onClick={() => handleSelect("none")}
          className={styles.locationConceptCard}
          style={CARD_STYLES.none}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
              <FolderX />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("recordsPatient.none")}</h3>
        </button>
      </div>
    </WizardStepLayout>
  );
}

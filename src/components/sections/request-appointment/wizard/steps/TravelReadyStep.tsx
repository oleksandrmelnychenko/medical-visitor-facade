"use client";

import { useCallback, useRef } from "react";
import { Ban, Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../WizardContext";
import { BINARY_CHOICE_CARD_STYLES } from "../choiceCardStyles";
import { YesNoType } from "../types";
import { WizardStepLayout } from "../components/WizardStepLayout";
import styles from "../../RequestAppointment/RequestAppointment.module.scss";

const CARD_STYLES = BINARY_CHOICE_CARD_STYLES;

export function TravelReadyStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: YesNoType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ canTravel: value });
    if (value === "yes") {
      router.push("/apply?type=new&step=outside-records");
    } else {
      router.push("/apply?type=new&step=outside-exit-travel");
    }
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=become-member");
  }, [router]);

  return (
    <WizardStepLayout
      title={t("travelPatient.title")}
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
              <Plane />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("travelPatient.yes")}</h3>
        </button>
        <button
          onClick={() => handleSelect("no")}
          className={styles.locationConceptCard}
          style={CARD_STYLES.no}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
              <Ban />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("travelPatient.no")}</h3>
        </button>
      </div>
    </WizardStepLayout>
  );
}

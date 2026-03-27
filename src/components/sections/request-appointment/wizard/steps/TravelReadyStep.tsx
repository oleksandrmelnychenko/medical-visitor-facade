"use client";

import React, { useCallback, useRef } from "react";
import { ArrowUpRight, Ban, Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../WizardContext";
import { YesNoType } from "../types";
import { WizardStepLayout } from "../components/WizardStepLayout";
import styles from "../../RequestAppointment/RequestAppointment.module.scss";

const CARD_STYLES = {
  yes: { "--hover-color": "#E5D5A8" } as React.CSSProperties,
  no: { "--hover-color": "#A8D5E5" } as React.CSSProperties,
};

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
          <span className={styles.locationConceptArrow} aria-hidden="true">
            <ArrowUpRight />
          </span>
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
          <span className={styles.locationConceptArrow} aria-hidden="true">
            <ArrowUpRight />
          </span>
        </button>
      </div>
    </WizardStepLayout>
  );
}

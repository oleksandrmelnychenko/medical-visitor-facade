"use client";

import { useCallback, useRef } from "react";
import { UserRoundPlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { BINARY_CHOICE_CARD_STYLES } from "../../choiceCardStyles";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

const CARD_STYLES = BINARY_CHOICE_CARD_STYLES;

export function BecomeMemberStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: "yes" | "no") => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({
      wantsMembership: value,
      selectedProgram: value === "yes" ? "reserve" : "portal",
    });
    router.push("/apply?type=new&step=outside-travel");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=location");
  }, [router]);

  return (
    <WizardStepLayout
      title={t("becomeMember.title")}
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
              <UserRoundPlus />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("becomeMember.yes")}</h3>
        </button>

        <button
          onClick={() => handleSelect("no")}
          className={styles.locationConceptCard}
          style={CARD_STYLES.no}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
              <Users />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t("becomeMember.no")}</h3>
        </button>
      </div>
    </WizardStepLayout>
  );
}

"use client";

import { useCallback, useRef } from "react";
import { ArrowRight, ShieldCheck, FileText, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWizard } from "../../WizardContext";
import { StepLayout } from "../../ui/StepLayout";
import styles from "@/features/apply/ApplyPage.module.scss";
import greetingStyles from "./Greeting.module.scss";

export function Greeting() {
  const t = useTranslations("appointment.newPatient.greeting");
  const tBase = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/");
  }, [router]);

  const handleStart = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ greetingCompleted: true });
    router.push("/apply?type=new&step=member-check");
  }, [router, updateData]);

  return (
    <StepLayout
      title={t("title")}
      subtitle={t("subtitle")}
      contentClassName={styles.welcomeSurfacePlain}
      innerClassName={greetingStyles.inner}
      onBack={handleBack}
      backLabel={tBase("back")}
    >
      <div className={greetingStyles.stack}>
        <ul className={greetingStyles.points}>
          <li className={greetingStyles.point}>
            <span className={greetingStyles.pointIcon} aria-hidden="true">
              <FileText />
            </span>
            <div className={greetingStyles.pointBody}>
              <p className={greetingStyles.pointTitle}>{t("points.1.title")}</p>
              <p className={greetingStyles.pointText}>{t("points.1.text")}</p>
            </div>
          </li>
          <li className={greetingStyles.point}>
            <span className={greetingStyles.pointIcon} aria-hidden="true">
              <ShieldCheck />
            </span>
            <div className={greetingStyles.pointBody}>
              <p className={greetingStyles.pointTitle}>{t("points.2.title")}</p>
              <p className={greetingStyles.pointText}>{t("points.2.text")}</p>
            </div>
          </li>
          <li className={greetingStyles.point}>
            <span className={greetingStyles.pointIcon} aria-hidden="true">
              <MessageCircle />
            </span>
            <div className={greetingStyles.pointBody}>
              <p className={greetingStyles.pointTitle}>{t("points.3.title")}</p>
              <p className={greetingStyles.pointText}>{t("points.3.text")}</p>
            </div>
          </li>
        </ul>

        <button
          onClick={handleStart}
          className={greetingStyles.startButton}
          type="button"
        >
          <span className={greetingStyles.startLabel}>{t("start")}</span>
          <ArrowRight aria-hidden="true" />
        </button>

        <p className={greetingStyles.note}>{t("note")}</p>
      </div>
    </StepLayout>
  );
}

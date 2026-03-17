"use client";

import React, { useCallback, useRef } from "react";
import { UserRoundPlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useWizard } from "../../WizardContext";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "../shared/MemberCheckStep.module.scss";

export function BecomeMemberStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((value: "yes" | "no") => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ wantsMembership: value });
    router.push("/apply?type=new&step=outside-travel");
  }, [updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push("/apply?type=new&step=location");
  }, [router]);

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, styles.memberCheck)}>
        <div className={sectionStyles.container}>
          <div className={styles.layout}>
            <button
              onClick={handleBack}
              className={styles.backCircle}
              type="button"
              aria-label={t("back")}
            >
              <svg viewBox="0 0 24 24" fill="none" className={styles.backCircleIcon}>
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.headingRow}>
              <div className={styles.header}>
                <p className={styles.overline}>{t("becomeMember.overline")}</p>
                <h1 className={styles.title}>{t("becomeMember.title")}</h1>
              </div>
            </div>

            <div className={styles.cardGrid}>
              <button
                onClick={() => handleSelect("yes")}
                className={styles.card}
                type="button"
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <UserRoundPlus />
                  </span>
                </div>
                <div className={styles.cardCopy}>
                  <h3 className={styles.cardTitle}>{t("becomeMember.yes")}</h3>
                  <span className={styles.cardUnderline} aria-hidden="true" />
                </div>
              </button>

              <button
                onClick={() => handleSelect("no")}
                className={styles.card}
                type="button"
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <Users />
                  </span>
                </div>
                <div className={styles.cardCopy}>
                  <h3 className={styles.cardTitle}>{t("becomeMember.no")}</h3>
                  <span className={styles.cardUnderline} aria-hidden="true" />
                </div>
              </button>
            </div>
          </div>
        </div>

        <span className={styles.cornerDecor} aria-hidden="true" />
      </section>
    </div>
  );
}

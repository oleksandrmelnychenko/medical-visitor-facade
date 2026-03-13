"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./RequestAppointment.module.scss";
import { ApplyNewPatientWizard } from "../wizard/ApplyNewPatientWizard";

export type PatientType = "new" | "returning" | "physician" | null;

const RequestAppointmentFallbackFlow = dynamic(
  () =>
    import("./RequestAppointmentFallbackFlow").then(
      (module) => module.RequestAppointmentFallbackFlow
    ),
  { loading: () => null }
);

function isPatientType(value: string | null): value is Exclude<PatientType, null> {
  return value === "new" || value === "returning" || value === "physician";
}

export function RequestAppointment() {
  const t = useTranslations("appointment");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTypeParam = searchParams.get("type");
  const selectedType = isPatientType(selectedTypeParam) ? selectedTypeParam : null;

  const handleBack = () => {
    router.push("/apply");
  };

  const activeType = selectedType ?? "new";

  if (activeType === "new") {
    return (
      <div className={cn(pageStyles.page, styles.applyPageChrome, styles.gridBackground)}>
        <ApplyNewPatientWizard />
      </div>
    );
  }

  return (
    <div className={cn(pageStyles.page, styles.applyPageChrome, styles.gridBackground)}>
      <section
        className={cn(sectionStyles.section, pageStyles.heroSection, styles.applyHeroSection)}
        id="appointment"
      >
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            variant="page"
            titleAs="h1"
          />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.cardsSection)}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.stackMd}>
            <button onClick={handleBack} className={styles.backButton} type="button">
              {t("backToSelection")}
            </button>

            <RequestAppointmentFallbackFlow
              activeType={activeType}
              onBack={handleBack}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

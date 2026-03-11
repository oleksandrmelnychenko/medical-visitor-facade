"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./RequestAppointment.module.scss";
import { ReturningPatientForm } from "../Components/ReturningPatientForm";
import { PhysicianForm } from "../Components/PhysicianForm";
import { ApplyNewPatientWizard } from "../wizard/ApplyNewPatientWizard";

export type PatientType = "new" | "returning" | "physician" | null;

function isPatientType(value: string | null): value is Exclude<PatientType, null> {
  return value === "new" || value === "returning" || value === "physician";
}

export function RequestAppointment() {
  const t = useTranslations("appointment");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTypeParam = searchParams.get("type");
  const selectedType = isPatientType(selectedTypeParam) ? selectedTypeParam : null;

  useEffect(() => {
    document.body.classList.add("transparent-header-mode", "apply-page-bg");
    return () => {
      document.body.classList.remove("transparent-header-mode", "apply-page-bg");
    };
  }, []);

  const handleBack = () => {
    router.push("/apply");
  };

  const activeType = selectedType ?? "new";

  if (activeType === "new") {
    return <ApplyNewPatientWizard />;
  }

  return (
    <div className={cn(pageStyles.page, styles.gridBackground)}>
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              className={pageStyles.stackMd}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <button onClick={handleBack} className={styles.backButton} type="button">
                {t("backToSelection")}
              </button>

              {activeType === "returning" && <ReturningPatientForm onBack={handleBack} />}
              {activeType === "physician" && <PhysicianForm onBack={handleBack} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

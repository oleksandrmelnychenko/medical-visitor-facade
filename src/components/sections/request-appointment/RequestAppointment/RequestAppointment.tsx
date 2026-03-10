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
import { PatientTypeSelection } from "../Components/PatientTypeSelection";
import { ReturningPatientForm } from "../Components/ReturningPatientForm";
import { PhysicianForm } from "../Components/PhysicianForm";
import { ApplyNewPatientWizard } from "../wizard/ApplyNewPatientWizard";

export type PatientType = "new" | "returning" | "physician" | null;

export function RequestAppointment() {
  const t = useTranslations("appointment");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedType = (searchParams.get("type") as PatientType) ?? null;

  useEffect(() => {
    document.body.classList.add("transparent-header-mode", "apply-page-bg");
    return () => {
      document.body.classList.remove("transparent-header-mode", "apply-page-bg");
    };
  }, []);

  const handleCardClick = (type: PatientType) => {
    if (type === "new") {
      router.push("/apply?type=new&step=location");
      return;
    }

    if (type === "returning") {
      router.push("/apply?type=returning");
      return;
    }

    if (type === "physician") {
      router.push("/apply?type=physician");
    }
  };

  const handleBack = () => {
    router.push("/apply");
  };

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
            {!selectedType ? (
              <PatientTypeSelection onSelect={handleCardClick} />
            ) : (
              <motion.div
                key={`${selectedType}-${searchParams.get("step") ?? "selection"}`}
                className={pageStyles.stackMd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {selectedType !== "new" && (
                  <button onClick={handleBack} className={styles.backButton} type="button">
                    {t("backToSelection")}
                  </button>
                )}

                {selectedType === "new" && <ApplyNewPatientWizard />}
                {selectedType === "returning" && <ReturningPatientForm onBack={handleBack} />}
                {selectedType === "physician" && <PhysicianForm onBack={handleBack} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

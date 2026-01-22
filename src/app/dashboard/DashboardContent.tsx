"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const t = useTranslations("dashboard");

  const handleSignOut = () => {
    signOut({ callbackUrl: "/patient-portal" });
  };

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            subtitle={t("welcomeBack", { name: user.name || user.email || "" })}
            variant="page"
            titleAs="h1"
          />
        </div>
      </section>

      <section className={sectionStyles.section}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.stackLg}>
            <div className={cn(pageStyles.formCard, pageStyles.cardShadow)}>
              <h2 className={pageStyles.sectionTitleSm}>{t("accountInfo")}</h2>
              <div className={pageStyles.stackMd}>
                <div>
                  <p className={pageStyles.label}>{t("name")}</p>
                  <p className={pageStyles.textBody}>{user.name || "-"}</p>
                </div>
                <div>
                  <p className={pageStyles.label}>{t("email")}</p>
                  <p className={pageStyles.textBody}>{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}
                style={{ marginTop: "1.5rem" }}
              >
                {t("signOut")}
              </button>
            </div>

            <div className={pageStyles.gridThree}>
              <div className={cn(pageStyles.formCard, pageStyles.cardShadow)}>
                <h3 className={pageStyles.sectionTitleSm}>{t("appointments")}</h3>
                <p className={pageStyles.textSmall}>{t("appointmentsDescription")}</p>
              </div>
              <div className={cn(pageStyles.formCard, pageStyles.cardShadow)}>
                <h3 className={pageStyles.sectionTitleSm}>{t("medicalRecords")}</h3>
                <p className={pageStyles.textSmall}>{t("medicalRecordsDescription")}</p>
              </div>
              <div className={cn(pageStyles.formCard, pageStyles.cardShadow)}>
                <h3 className={pageStyles.sectionTitleSm}>{t("messages")}</h3>
                <p className={pageStyles.textSmall}>{t("messagesDescription")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./account.module.scss";

type TabType = "account" | "history";

export default function AccountPage() {
  const t = useTranslations("account");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("account");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className={cn(pageStyles.page, styles.page)}>
        <section className={cn(sectionStyles.section, styles.loadingSection)}>
          <div className={sectionStyles.container}>
            <p>{t("loading")}</p>
          </div>
        </section>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user as {
    id: string;
    email: string;
    name: string;
    role: string;
    phone?: string | null;
  };

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle", { name: user.name || user.email })}
            variant="page"
            titleAs="h1"
          />
          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <button
                className={cn(styles.tab, activeTab === "account" && styles.active)}
                onClick={() => setActiveTab("account")}
              >
                {t("tabs.account")}
              </button>
              <button
                className={cn(styles.tab, activeTab === "history" && styles.active)}
                onClick={() => setActiveTab("history")}
              >
                {t("tabs.history")}
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === "account" && (
                <div className={styles.profileList}>
                  <div className={styles.profileItem}>
                    <span className={styles.profileLabel}>{t("name")}</span>
                    <span className={styles.profileValue}>{user.name}</span>
                  </div>

                  {user.phone && (
                    <div className={styles.profileItem}>
                      <span className={styles.profileLabel}>{t("phone")}</span>
                      <span className={styles.profileValue}>{user.phone}</span>
                    </div>
                  )}

                  <div className={styles.profileItem}>
                    <span className={styles.profileLabel}>{t("email")}</span>
                    <span className={styles.profileValue}>{user.email}</span>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>
                    {t("history.empty")}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

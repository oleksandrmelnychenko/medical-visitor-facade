"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { User, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./account.module.scss";

export default function AccountPage() {
  const t = useTranslations("account");
  const { data: session, status } = useSession();
  const router = useRouter();

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
            theme="beige"
          />
          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.profileSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                <User size={48} />
              </div>
              <h2 className={styles.profileName}>{user.name}</h2>
            </div>

            <div className={styles.profileInfo}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <User size={20} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>{t("name")}</span>
                  <span className={styles.infoValue}>{user.name}</span>
                </div>
              </div>

              {user.phone && (
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Phone size={20} />
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>{t("phone")}</span>
                    <span className={styles.infoValue}>{user.phone}</span>
                  </div>
                </div>
              )}

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>{t("email")}</span>
                  <span className={styles.infoValue}>{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

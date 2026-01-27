"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./legal-notice.module.scss";

export default function LegalNoticePage() {
  const t = useTranslations("impressumPage");

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            variant="page"
            titleAs="h1"
            theme="beige"
          />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.content}>
            <div className={styles.infoBlock}>
              <p className={styles.companyName}>Agentur für Patientenbetreuung Heorhii Hudiiev</p>
              <p className={styles.text}>{t("owner")}: Heorhii Hudiiev</p>
              <p className={styles.text}>Albert-Schweitzer-Straße 56</p>
              <p className={styles.text}>81735 München</p>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.sectionTitle}>{t("contact")}</h2>
              <p className={styles.text}>
                <a href="mailto:contact@gmed-health.com">contact@gmed-health.com</a>
              </p>
              <p className={styles.text}>
                <a href="https://www.gmed-health.com" target="_blank" rel="noopener noreferrer">www.gmed-health.com</a>
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.sectionTitle}>{t("vatTitle")}</h2>
              <p className={styles.text}>{t("vatLegal")}</p>
              <p className={styles.vatNumber}>147/220/51409</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.text}>{t("contactPrompt")}</p>
              <p className={styles.text}>
                <a href="mailto:contact@gmed-health.com">contact@gmed-health.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./privacy-policy.module.scss";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicy");

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            subtitle={t("lastUpdated")}
            variant="page"
            titleAs="h1"
            theme="beige"
          />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.content}>
            {/* Intro */}
            <p className={styles.text}>{t("intro1")}</p>
            <p className={styles.text}>{t("intro2")}</p>
            <p className={styles.text}>{t("intro3")}</p>
            <p className={styles.text}>{t("intro4")}</p>

            {/* Data Collection */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("dataCollection.title")}</h2>
              <p className={styles.text}>{t("dataCollection.text")}</p>
              <ul className={styles.list}>
                <li>{t("dataCollection.item1")}</li>
                <li>{t("dataCollection.item2")}</li>
              </ul>
              <p className={styles.text}>{t("dataCollection.text2")}</p>
            </div>

            {/* How We Collect */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("howWeCollect.title")}</h2>
              <p className={styles.text}>{t("howWeCollect.text1")}</p>
              <p className={styles.text}>{t("howWeCollect.text2")}</p>
            </div>

            {/* Purpose */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("purpose.title")}</h2>
              <p className={styles.text}>{t("purpose.text")}</p>
              <ul className={styles.list}>
                <li>{t("purpose.item1")}</li>
                <li>{t("purpose.item2")}</li>
                <li>{t("purpose.item3")}</li>
                <li>{t("purpose.item4")}</li>
                <li>{t("purpose.item5")}</li>
                <li>{t("purpose.item6")}</li>
                <li>{t("purpose.item7")}</li>
              </ul>
              <p className={styles.text}>{t("purpose.text2")}</p>
              <ul className={styles.list}>
                <li>{t("purpose.legal1")}</li>
                <li>{t("purpose.legal2")}</li>
                <li>{t("purpose.legal3")}</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("sharing.title")}</h2>
              <p className={styles.text}>{t("sharing.text1")}</p>
              <p className={styles.text}>{t("sharing.text2")}</p>
              <p className={styles.text}>{t("sharing.text3")}</p>
            </div>

            {/* Your Rights */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("rights.title")}</h2>
              <p className={styles.text}>{t("rights.text")}</p>
            </div>

            {/* Hosting */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("hosting.title")}</h2>
              <p className={styles.text}>{t("hosting.text1")}</p>
              <p className={styles.text}>{t("hosting.text2")}</p>
              <p className={styles.text}>{t("hosting.text3")}</p>
              <p className={styles.text}>{t("hosting.text4")}</p>
            </div>

            {/* Cookies */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("cookies.title")}</h2>
              <p className={styles.text}>{t("cookies.text1")}</p>
              <p className={styles.text}>{t("cookies.text2")}</p>
            </div>

            {/* Storage Location */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("storage.title")}</h2>
              <p className={styles.text}>{t("storage.text1")}</p>
              <p className={styles.text}>{t("storage.text2")}</p>
            </div>

            {/* Retention */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("retention.title")}</h2>
              <p className={styles.text}>{t("retention.text")}</p>
            </div>

            {/* Security */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("security.title")}</h2>
              <p className={styles.text}>{t("security.text1")}</p>
              <p className={styles.text}>{t("security.text2")}</p>
              <p className={styles.text}>{t("security.text3")}</p>
              <p className={styles.text}>{t("security.text4")}</p>
            </div>

            {/* Minors */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("minors.title")}</h2>
              <p className={styles.text}>{t("minors.text1")}</p>
              <p className={styles.text}>{t("minors.text2")}</p>
              <p className={styles.text}>{t("minors.text3")}</p>
              <p className={styles.text}>{t("minors.text4")}</p>
            </div>

            {/* Updates */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("updates.title")}</h2>
              <p className={styles.text}>{t("updates.text")}</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

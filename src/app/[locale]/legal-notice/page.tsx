import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./legal-notice.module.scss";

type LegalNoticePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LegalNoticePage({ params }: LegalNoticePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impressumPage" });

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <h1 className={styles.srOnly}>{t("title")}</h1>
          <div className={styles.editorialLayout}>
            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("legalNameTitle")}</p>
              <div className={styles.rowContent}>
                <h2 className={styles.primaryStatement}>{t("companyName")}</h2>
              </div>
            </div>

            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("addressTitle")}</p>
              <div className={styles.rowContent}>
                <div className={styles.statementGroup}>
                  <p className={styles.secondaryStatement}>Albert-Schweitzer-Straße 56</p>
                  <p className={styles.secondaryStatement}>81735 München</p>
                </div>
              </div>
            </div>

            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("vatTitle")}</p>
              <div className={styles.rowContent}>
                <div className={styles.statementGroup}>
                  <p className={cn(styles.primaryStatement, styles.pastelVatNumber)}>DE407675242</p>
                </div>
              </div>
            </div>

            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("contactPrompt")}</p>
              <div className={styles.rowContent}>
                <p className={styles.secondaryStatement}>
                  <a href="mailto:contact@gmed-health.com" className={styles.secondaryLink}>
                    contact@gmed-health.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

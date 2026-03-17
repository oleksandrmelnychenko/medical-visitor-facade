import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./financial-assistance.module.scss";

type FinancialAssistancePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FinancialAssistancePage({ params }: FinancialAssistancePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointment.freeService" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const noteText = t("note");
  const noteMatch = noteText.match(new RegExp("^([^:]+):\\s*(.+)$", "s"));
  const noteBody = noteMatch?.[2] ?? noteText;
  const noteStatement = noteBody ? `${noteBody.charAt(0).toUpperCase()}${noteBody.slice(1)}` : noteBody;

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.editorialLayout}>
            <header className={styles.heroRow}>
              <div className={styles.heroMeta}>
                <p className={styles.metaLabel}>(Pro bono)</p>
              </div>
              <div className={styles.heroContent}>
                <h1 className={styles.pageTitle}>{t("title")}</h1>
                <p className={styles.pageLead}>{t("description1")}</p>
              </div>
            </header>

            <section className={styles.infoRow} aria-label={t("title")}>
              <div className={styles.rowIndex}>00</div>
              <div className={styles.rowHeading}>
                <p className={styles.rowTitle}>{t("title")}</p>
              </div>
              <div className={styles.rowBody}>
                <p className={styles.infoLead}>{t("description2")}</p>
              </div>
            </section>

            <article className={styles.priorityRow}>
              <div className={styles.rowIndex}>01</div>
              <div className={styles.rowHeading}>
                <h2 className={styles.rowTitle}>{t("priority")}</h2>
              </div>
              <div className={styles.rowBody}>
                <p className={styles.priorityText}>{t("priorityText")}</p>
              </div>
            </article>

            <aside className={styles.noteRow}>
              <div className={styles.noteCard}>
                <p className={styles.noteText}>{noteStatement}</p>
                <Link href="/apply" prefetch={false} className={styles.noteCtaLink}>
                  <span className={styles.noteCtaLabel}>{tCommon("requestAppointment")}</span>
                  <span className={styles.noteCtaArrow} aria-hidden="true">
                    <svg viewBox="0 0 40 40" fill="none" className={styles.noteCtaArrowIcon}>
                      <path
                        d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

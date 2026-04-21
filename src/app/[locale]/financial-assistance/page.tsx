import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import pageStyles from "@/styles/page.module.scss";
import styles from "./financial-assistance.module.scss";

type FinancialAssistancePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FinancialAssistancePage({ params }: FinancialAssistancePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointment.freeService" });

  return (
    <div className={cn(pageStyles.page, styles.page)} data-page="financial-assistance">
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>{t("title")}</p>
            <h1 className={styles.title}>
              {t("description1Dark")}{" "}
              <span className={styles.titleAccent}>{t("description1Accent")}</span>{" "}
              {t("description1Tail")}
            </h1>
          </header>

          <div className={styles.body}>
            <aside className={styles.aside}>
              <p className={styles.lead}>{t("description2")}</p>
            </aside>

            <div className={styles.content}>
              <div className={styles.priorityBlock}>
                <h2 className={styles.priorityTitle}>{t("priority")}</h2>
                <p className={styles.priorityText}>
                  {t("priorityText")}{" "}
                  <span className={styles.priorityAccent}>{t("priorityAccent")}</span>
                </p>
              </div>

              <p className={styles.noteText}>{t("note")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

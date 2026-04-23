import { getLocale, getTranslations } from "next-intl/server";
import { FaqAccordion } from "./FaqAccordion";
import styles from "./Faq.module.scss";

const FAQ_ITEM_KEYS = [
  "services",
  "clinicSelection",
  "travel",
  "documents",
  "onSite",
  "start",
] as const;

export async function Faq() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.faq" });

  const eyebrow = t.has("eyebrow") ? t("eyebrow") : "FAQs";
  const title = t.has("title") ? t("title") : "FAQs.";
  const subtitle = t.has("subtitle") ? t("subtitle") : "";

  const items = FAQ_ITEM_KEYS.map((key) => ({
    key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section id="faq" className={styles.section} data-home-section="faq">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.title}>{title}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>

          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}

import { getLocale, getTranslations } from "next-intl/server";
import { JourneyAccordion } from "./JourneyAccordion";
import styles from "./Journey.module.scss";

const STEPS = [
  "consultation",
  "coordination",
  "documentation",
  "languageDigital",
  "travelTransfer",
  "personalSupport",
  "aftercare",
] as const;

const DETAIL_DESCRIPTORS = [
  { pointKey: "point1", itemKey: "item1" },
  { pointKey: "point2", itemKey: "item2" },
  { pointKey: "point3", itemKey: "item3" },
] as const;

export async function Journey() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.journey" });

  const items = STEPS.map((key) => ({
    key,
    title: t(`services.${key}.title`),
    details: DETAIL_DESCRIPTORS.map((descriptor) => {
      const itemTitleKey = `services.${key}.${descriptor.itemKey}Title`;
      const itemTextKey = `services.${key}.${descriptor.itemKey}Text`;
      const hasDetailed = t.has(itemTitleKey) && t.has(itemTextKey);

      return {
        title: hasDetailed ? t(itemTitleKey) : t(`services.${key}.${descriptor.pointKey}`),
        text: hasDetailed ? t(itemTextKey) : null,
      };
    }),
  }));

  return (
    <section id="journey" className={styles.section} data-home-section="journey">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("title")}</p>
            <h2 className={styles.title}>
              {t("headlineDark")}{" "}
              <span className={styles.titleMuted}>{t("headlineMuted")}</span>
            </h2>
          </div>

          <div className={styles.body}>
            <JourneyAccordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

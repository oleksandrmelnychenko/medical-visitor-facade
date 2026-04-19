import { useTranslations } from "next-intl";
import styles from "./ForWhom.module.scss";

const ITEMS = [
  "secondOpinion",
  "continuedTreatment",
  "familyCheckup",
  "rareSpecialist",
] as const;

export function ForWhom() {
  const t = useTranslations("home.forWhom");

  return (
    <section id="for-whom" className={styles.section} data-home-section="forWhom">
      <span className={styles.eyebrow}>{t("eyebrow")}</span>

      <ul className={styles.list}>
        {ITEMS.map((key) => {
          const descriptionKey = `items.${key}.description`;
          const hasDescription = t.has(descriptionKey);

          return (
            <li
              key={key}
              className={`${styles.item} ${!hasDescription ? styles.itemSingle : ""}`.trim()}
            >
              <h3 className={styles.label}>{t(`items.${key}.label`)}</h3>
              {hasDescription ? <p className={styles.description}>{t(descriptionKey)}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

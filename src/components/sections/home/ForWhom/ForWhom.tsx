import { useTranslations } from "next-intl";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
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
              <div className={styles.labelRow}>
                <h3 className={styles.label}>{t(`items.${key}.label`)}</h3>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowLeftIcon size={32} weight="light" />
                </span>
              </div>
              {hasDescription ? <p className={styles.description}>{t(descriptionKey)}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { getLocale, getTranslations } from "next-intl/server";
import { ApproachMotion } from "./ApproachMotion";
import styles from "./Approach.module.scss";

const PRINCIPLE_KEYS = [
  "individualSupport",
  "expertise",
  "confidentiality",
  "digitalPortal",
  "security",
  "concierge",
  "coordination",
  "international",
] as const;

export async function Approach() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.approach" });

  const overline = t("overline");
  const title = t("title");
  const subtitle = t("subtitle");
  const principles = PRINCIPLE_KEYS.map((key) => t(`principles.${key}`));

  const heading = (
    <>
      {overline ? <p className={styles.overline}>{overline}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </>
  );

  return <ApproachMotion heading={heading} principles={principles} />;
}

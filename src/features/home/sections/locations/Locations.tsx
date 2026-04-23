import { getLocale, getTranslations } from "next-intl/server";
import { LocationsMotion } from "./LocationsMotion";
import styles from "./Locations.module.scss";

const OTHER_CITIES = [
  { key: "berlin", image: "/assets/city-berlin-watercolor.webp", delayMs: 200 },
  { key: "hamburg", image: "/assets/city-hamburg-watercolor.webp", delayMs: 400 },
  { key: "cologne", image: "/assets/city-cologne-watercolor.webp", delayMs: 600 },
] as const;

export async function Locations() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.locations" });

  const overline = t("overline");
  const title = t("title");
  const subtitle = t("subtitle");
  const titleAccent = t.has("titleAccent") ? t("titleAccent") : "";

  const intro = (
    <>
      {overline ? <p className={styles.overline}>{overline}</p> : null}
      <h2 className={styles.title}>
        {title}
        {titleAccent ? (
          <>
            {" "}
            <span className={styles.titleAccent}>{titleAccent}</span>
          </>
        ) : null}
      </h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </>
  );

  const cities = OTHER_CITIES.map((city) => ({
    ...city,
    name: t(`cities.${city.key}.name`),
  }));

  return (
    <LocationsMotion
      intro={intro}
      mainCityName={t("cities.munich.name")}
      cities={cities}
    />
  );
}

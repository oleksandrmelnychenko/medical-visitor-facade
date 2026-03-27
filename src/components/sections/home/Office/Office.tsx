import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import { OfficeCitiesGrid } from "./OfficeCitiesGrid";
import styles from "./Office.module.scss";

// Static styles moved outside component to prevent recreation on each render
const MUNICH_STYLE: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--tone-sand) 6%, #fff)",
  borderColor: "color-mix(in srgb, var(--tone-sand) 25%, var(--border-card))",
};
const OTHER_CITIES = [
  {
    key: "berlin",
    image: "/assets/1_city-berlin-v2.jpg",
    imageWidth: 750,
    imageHeight: 971,
    delayMs: 200,
    style: {
      backgroundColor: "color-mix(in srgb, var(--tone-blue) 6%, #fff)",
      borderColor: "color-mix(in srgb, var(--tone-blue) 25%, var(--border-card))",
    },
  },
  {
    key: "hamburg",
    image: "/assets/1_city-hamburg.jpg",
    imageWidth: 1058,
    imageHeight: 1336,
    delayMs: 400,
    style: {
      backgroundColor: "color-mix(in srgb, var(--tone-sand) 8%, #fff)",
      borderColor: "color-mix(in srgb, var(--tone-sand) 25%, var(--border-card))",
    },
  },
  {
    key: "cologne",
    image: "/assets/1_city-cologne.jpg",
    imageWidth: 736,
    imageHeight: 920,
    delayMs: 600,
    style: {
      backgroundColor: "color-mix(in srgb, var(--tone-lavender) 6%, #fff)",
      borderColor: "color-mix(in srgb, var(--tone-lavender) 25%, var(--border-card))",
    },
  },
];

export function Office() {
  const t = useTranslations("home.office");
  const overline = t("overline");
  const subtitle = t("subtitle");

  return (
    <section className={cn(sectionStyles.section, styles.office)}>
      <div className={`${sectionStyles.container} ${styles.container}`}>
        <div className={styles.shell}>
          <div className={styles.introPanel} data-snap-anchor>
            <span className={styles.introMark} aria-hidden="true" />
            {overline ? <p className={styles.overline}>{overline}</p> : null}
            <h2 className={styles.title}>{t("title")}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>

          <div className={styles.stage}>
            <OfficeCitiesGrid
              mainCityName={t("cities.munich.name")}
              mainCityStyle={MUNICH_STYLE}
              cities={OTHER_CITIES.map((city) => ({
                ...city,
                name: t(`cities.${city.key}.name`),
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

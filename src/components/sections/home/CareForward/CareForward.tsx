import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import {
  Stethoscope,
  CalendarClock,
  FileText,
  Languages,
  PlaneTakeoff,
  Headphones,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

const STEPS = [
  { icon: Stethoscope, key: "consultation", tone: "var(--tone-blue)" },
  { icon: CalendarClock, key: "coordination", tone: "var(--tone-sand)" },
  { icon: FileText, key: "documentation", tone: "var(--tone-sage)" },
  { icon: Languages, key: "languageDigital", tone: "var(--tone-lavender)" },
  { icon: PlaneTakeoff, key: "travelTransfer", tone: "var(--tone-blue)" },
  { icon: Headphones, key: "personalSupport", tone: "var(--tone-sand)" },
  { icon: HeartPulse, key: "aftercare", tone: "var(--tone-sage)" },
];

export function CareForward() {
  const t = useTranslations("home.careForward");

  return (
    <section className={styles.section} data-dark-section>
      <span className={styles.topSeam} aria-hidden />
      <div className={sectionStyles.container}>
        <div
          className={styles.shell}
          data-snap-anchor
          data-snap-shift="24"
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{t("title")}</h2>
          </div>
          <div className={styles.flowGrid}>
            {STEPS.map((step, index) => (
              <article
                key={step.key}
                className={cn(
                  styles.flowCard,
                  step.key === "aftercare" && styles.flowCardWide
                )}
                style={{ "--tone": step.tone } as CSSProperties}
              >
                <div className={styles.cardTop}>
                  <span className={styles.stepNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.cardIcon}>
                    <step.icon />
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{t(`services.${step.key}.title`)}</h3>
                  <ul className={styles.cardList}>
                    {(["point1", "point2", "point3"] as const).map((pointKey) => (
                      <li key={pointKey} className={styles.cardPoint}>
                        {t(`services.${step.key}.${pointKey}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

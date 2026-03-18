"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
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
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const toggleCard = (key: string) => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (hasHover) return;
    setActiveKey((current) => (current === key ? null : key));
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, key: string) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    toggleCard(key);
  };

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
            {STEPS.map((step) => {
              const isExpanded = activeKey === step.key;
              const panelId = `care-forward-${step.key}-details`;

              return (
                <article
                  key={step.key}
                  className={cn(
                    styles.flowCard,
                    step.key === "aftercare" && styles.flowCardWide,
                    isExpanded && styles.flowCardExpanded
                  )}
                  style={{ "--tone": step.tone } as CSSProperties}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleCard(step.key)}
                  onKeyDown={(event) => handleCardKeyDown(event, step.key)}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>
                      <step.icon />
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{t(`services.${step.key}.title`)}</h3>
                    <div className={styles.cardDivider} aria-hidden="true" />
                    <div className={styles.cardListWrap}>
                      <ul id={panelId} className={styles.cardList}>
                        {(["point1", "point2", "point3"] as const).map((pointKey) => (
                          <li key={pointKey} className={styles.cardPoint}>
                            {t(`services.${step.key}.${pointKey}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

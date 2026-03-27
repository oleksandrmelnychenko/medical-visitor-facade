"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

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
  {
    pointKey: "point1",
    itemKey: "item1",
  },
  {
    pointKey: "point2",
    itemKey: "item2",
  },
  {
    pointKey: "point3",
    itemKey: "item3",
  },
] as const;

export function CareForward() {
  const t = useTranslations("home.careForward");
  const [openKey, setOpenKey] = useState<(typeof STEPS)[number] | null>(null);

  const toggle = (key: (typeof STEPS)[number]) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <section className={styles.section}>
      <div className={sectionStyles.container}>
        {/* Hero statement */}
        <div className={styles.statement} data-snap-anchor>
          <div className={styles.statementCopy}>
            <h2 className={styles.statementHeadline}>{t("headline")}</h2>
          </div>
          <div className={styles.statementSide}>
            <p className={styles.statementLabel}>
              <span className={styles.statementLabelBracket} aria-hidden="true">(</span>
              <span>{t("title")}</span>
              <span className={styles.statementLabelBracket} aria-hidden="true">)</span>
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className={styles.accordionWrap} data-snap-anchor data-snap-shift="24">
          <div className={styles.accordion}>
            {STEPS.map((key) => {
              const isOpen = openKey === key;
              const panelId = `care-${key}-panel`;
              const triggerId = `care-${key}-trigger`;

              return (
                <div key={key} className={cn(styles.accordionItem, isOpen && styles.accordionItemOpen)}>
                  <button
                    id={triggerId}
                    type="button"
                    className={styles.accordionTrigger}
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <div className={styles.accordionTriggerContent}>
                      <span className={styles.accordionLabel}>
                        {t(`services.${key}.title`)}
                      </span>
                    </div>
                    <span className={cn(styles.accordionIcon, isOpen && styles.accordionIconOpen)}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className={cn(styles.accordionPanel, isOpen && styles.accordionPanelOpen)}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                  >
                    <ul className={styles.accordionList}>
                      {DETAIL_DESCRIPTORS.map((descriptor) => {
                        const itemTitleKey = `services.${key}.${descriptor.itemKey}Title`;
                        const itemTextKey = `services.${key}.${descriptor.itemKey}Text`;
                        const hasDetailedText =
                          t.has(itemTitleKey) &&
                          t.has(itemTextKey);

                        const pointTitle = hasDetailedText
                          ? t(itemTitleKey)
                          : t(`services.${key}.${descriptor.pointKey}`);
                        const pointText = hasDetailedText
                          ? t(itemTextKey)
                          : null;

                        return (
                          <li key={descriptor.pointKey} className={styles.accordionPoint}>
                            <p className={styles.accordionPointLine}>
                              <span className={styles.accordionPointTitle}>{pointTitle}</span>
                              {pointText ? (
                                <span className={styles.accordionPointText}> {pointText}</span>
                              ) : null}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

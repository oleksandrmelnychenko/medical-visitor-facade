"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
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
  { pointKey: "point1", itemKey: "item1" },
  { pointKey: "point2", itemKey: "item2" },
  { pointKey: "point3", itemKey: "item3" },
] as const;

export function CareForward() {
  const t = useTranslations("home.careForward");
  const ref = useRef<HTMLDivElement>(null);
  const [isStaticMobile, setIsStaticMobile] = useState(false);
  const [openKey, setOpenKey] = useState<(typeof STEPS)[number] | null>(null);

  const toggle = (key: (typeof STEPS)[number]) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    const syncMode = () => setIsStaticMobile(mediaQuery.matches);
    syncMode();
    mediaQuery.addEventListener("change", syncMode);
    return () => mediaQuery.removeEventListener("change", syncMode);
  }, []);

  // Fade in as anchor approaches viewport
  const { scrollYProgress: showProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(showProgress, [0, 0.5], [0, 1]);

  // Slide up once fully revealed
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div ref={ref} className={styles.anchor}>
      <motion.div
        className={styles.pinned}
        style={isStaticMobile ? undefined : { y, opacity }}
      >
        <div className={styles.surface}>
          <div className={styles.container}>
            <div className={styles.statement}>
              <div className={styles.statementCopy}>
                <h2 className={styles.statementHeadline}>{t("headline")}</h2>
              </div>
            </div>

            <div className={styles.accordionWrap}>
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
                            const hasDetailedText = t.has(itemTitleKey) && t.has(itemTextKey);

                            const pointTitle = hasDetailedText
                              ? t(itemTitleKey)
                              : t(`services.${key}.${descriptor.pointKey}`);
                            const pointText = hasDetailedText ? t(itemTextKey) : null;

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
        </div>
      </motion.div>
    </div>
  );
}

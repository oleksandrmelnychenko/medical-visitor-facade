"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
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
  const ref = useRef<HTMLDivElement>(null);
  const [isStaticMobile, setIsStaticMobile] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [openKey, setOpenKey] = useState<(typeof STEPS)[number] | null>(null);
  const isTailOpen = !isStaticMobile && openKey === STEPS[STEPS.length - 2];
  const isLastOpen = !isStaticMobile && openKey === STEPS[STEPS.length - 1];

  const toggle = (key: (typeof STEPS)[number]) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");

    const syncMode = () => {
      setIsStaticMobile(mediaQuery.matches);
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMode);
    };
  }, []);

  const { scrollYProgress: revealProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: sceneProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const sectionOpacity = useTransform(revealProgress, [0, 0.45], [0, 1]);
  const sectionY = useTransform(sceneProgress, [0, 1], ["0%", "-9%"]);
  const statementY = useTransform(sceneProgress, [0, 0.42, 1], ["0%", "-1%", "-10%"]);
  const statementOpacity = useTransform(sceneProgress, [0, 0.64, 1], [1, 0.98, 0.42]);
  const statementScale = useTransform(sceneProgress, [0, 0.58, 1], [1, 0.992, 0.965]);
  const accordionY = useTransform(sceneProgress, [0, 0.16, 0.46, 1], ["0.5%", "0%", "0%", "-2.5%"]);
  const accordionOpacity = useTransform(sceneProgress, [0, 0.14, 0.3], [0.72, 0.9, 1]);
  const accordionScale = useTransform(sceneProgress, [0, 0.46, 1], [0.994, 1.006, 1]);
  const accordionRotate = useTransform(sceneProgress, [0, 0.46, 1], ["0.35deg", "0deg", "-0.08deg"]);
  const auraOpacity = useTransform(sceneProgress, [0, 0.35, 0.65, 1], [0.15, 0.45, 0.78, 0.4]);

  useEffect(() => {
    if (isStaticMobile) {
      setIsInteractive(true);
      return undefined;
    }

    const syncInteractive = () => {
      const nextValue = revealProgress.get() > 0.34 && sceneProgress.get() < 0.96;
      setIsInteractive((current) => (current === nextValue ? current : nextValue));
    };

    syncInteractive();

    const unsubscribeReveal = revealProgress.on("change", syncInteractive);
    const unsubscribeScene = sceneProgress.on("change", syncInteractive);

    return () => {
      unsubscribeReveal();
      unsubscribeScene();
    };
  }, [isStaticMobile, revealProgress, sceneProgress]);

  useEffect(() => {
    if (!openKey || typeof window === "undefined") {
      return undefined;
    }

    const panelId = `care-${openKey}-panel`;
    const triggerId = `care-${openKey}-trigger`;

    const ensurePanelVisible = (behavior: ScrollBehavior) => {
      const panel = document.getElementById(panelId);
      const trigger = document.getElementById(triggerId);

      if (!panel) {
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      const triggerRect = trigger?.getBoundingClientRect();
      const viewportBottomInset = 28;
      const viewportBottom = window.innerHeight - viewportBottomInset;
      const overflowBottom = panelRect.bottom - viewportBottom;

      if (overflowBottom > 0) {
        window.scrollBy({ top: overflowBottom + 18, behavior });
        return;
      }

      if (triggerRect && triggerRect.top < 28) {
        window.scrollBy({ top: triggerRect.top - 28, behavior });
      }
    };

    const passes = [
      window.setTimeout(() => ensurePanelVisible("auto"), 140),
      window.setTimeout(() => ensurePanelVisible("auto"), 360),
      window.setTimeout(() => ensurePanelVisible("smooth"), 620),
    ];

    return () => {
      passes.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [openKey]);

  return (
    <div ref={ref} className={styles.anchor}>
      <motion.div
        className={styles.pinned}
        style={isStaticMobile
          ? { pointerEvents: "auto" }
          : {
              y: sectionY,
              opacity: sectionOpacity,
              pointerEvents: isInteractive ? "auto" : "none",
            }}
      >
        <div className={styles.surface}>
          <motion.div
            aria-hidden="true"
            className={styles.backdropGlow}
            style={isStaticMobile ? undefined : { opacity: auraOpacity }}
          />
          <div className={styles.container}>
            <motion.div
              className={styles.statement}
              data-snap-anchor
              style={isStaticMobile
                ? undefined
                : {
                    y: statementY,
                    opacity: statementOpacity,
                    scale: statementScale,
                  }}
            >
              <div className={styles.statementCopy}>
                <h2 className={styles.statementHeadline}>{t("headline")}</h2>
              </div>
            </motion.div>

            <motion.div
              className={styles.accordionMotion}
              data-snap-anchor
              data-snap-shift="24"
              style={isStaticMobile
                ? undefined
                : {
                    y: accordionY,
                    opacity: accordionOpacity,
                    scale: accordionScale,
                    rotate: accordionRotate,
                  }}
              >
                <div
                  className={cn(
                    styles.accordionWrap,
                    isTailOpen && styles.accordionWrapLiftTail,
                    isLastOpen && styles.accordionWrapLiftLast
                  )}
                >
                  <div className={styles.accordion}>
                    {STEPS.map((key) => {
                      const isOpen = openKey === key;
                      const panelId = `care-${key}-panel`;
                      const triggerId = `care-${key}-trigger`;

                      return (
                        <div
                          key={key}
                          className={cn(styles.accordionItem, isOpen && styles.accordionItemOpen)}
                        >
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
                              <span className={styles.accordionIconBar} />
                              <span
                                className={cn(
                                  styles.accordionIconBar,
                                  styles.accordionIconBarVertical,
                                  isOpen && styles.accordionIconBarVerticalHidden
                                )}
                              />
                            </span>
                          </button>

                          <div
                            id={panelId}
                            className={cn(styles.accordionPanel, isOpen && styles.accordionPanelOpen)}
                            role="region"
                            aria-labelledby={triggerId}
                            aria-hidden={!isOpen}
                          >
                            <ul className={cn(styles.accordionList, isOpen && styles.accordionListOpen)}>
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

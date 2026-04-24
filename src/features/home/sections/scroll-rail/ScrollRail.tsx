"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";
import styles from "./ScrollRail.module.scss";

const SECTION_IDS = ["hero", "approach", "journey", "locations", "outro", "faq", "contact"] as const;
const SECTION_SCROLL_OFFSET = 104;

export function ScrollRail() {
  const tHome = useTranslations("home");
  const tScrollRail = useTranslations("home.scrollRail");
  const tCommon = useTranslations("common");
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = useMemo(
    () => [
      {
        id: "hero",
        label: tScrollRail("labels.hero"),
        fullLabel: `${tHome("hero.titleDark")} ${tHome("hero.titleMuted")}`,
      },
      { id: "approach", label: tScrollRail("labels.approach"), fullLabel: tHome("approach.title") },
      { id: "journey", label: tScrollRail("labels.journey"), fullLabel: tHome("journey.title") },
      { id: "locations", label: tScrollRail("labels.locations"), fullLabel: tHome("locations.title") },
      { id: "outro", label: tScrollRail("labels.outro"), fullLabel: tCommon("requestAppointment") },
      { id: "faq", label: tScrollRail("labels.faq"), fullLabel: tHome("faq.title") },
      { id: "contact", label: tScrollRail("labels.contact"), fullLabel: tHome("contact.title") },
    ] as const,
    [tCommon, tHome, tScrollRail]
  );

  const sectionIndex = useMemo(
    () => new Map(sections.map(({ id }, index) => [id, index])),
    [sections]
  );

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.querySelector(`[data-home-section="${id}"]`)).filter(
      (node): node is Element => Boolean(node)
    );

    if (!nodes.length) {
      return undefined;
    }

    type SectionId = (typeof SECTION_IDS)[number];
    const visibility = new Map<SectionId, number>();

    const syncActiveSection = () => {
      let bestId: SectionId = SECTION_IDS[0];
      let bestRatio = -1;

      visibility.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      // If no section is visible (e.g. scrolled to footer), keep the last one active
      if (bestRatio <= 0) {
        return;
      }

      const nextIndex = sectionIndex.get(bestId) ?? 0;
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-home-section");
          if (!id) {
            return;
          }

          visibility.set(id as SectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        syncActiveSection();
      },
      {
        threshold: [0.16, 0.32, 0.5, 0.68, 0.84],
        rootMargin: "-18% 0px -28% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [sectionIndex]);

  const handlePointClick = (sectionId: (typeof SECTION_IDS)[number], index: number) => {
    const target = document.querySelector(`[data-home-section="${sectionId}"]`);

    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = window.scrollY + target.getBoundingClientRect().top - SECTION_SCROLL_OFFSET;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    setActiveIndex(index);
  };

  const activeSection = sections[activeIndex]?.id;
  const isDark = activeSection === "outro";
  const isHidden = activeSection === "hero";

  return (
    <nav
      className={cn(styles.rail, isDark && styles.railInverted, isHidden && styles.railHidden)}
      aria-hidden={isHidden}
      aria-label={tScrollRail("ariaLabel")}
    >
      <ol className={styles.points}>
        {sections.map((section, index) => (
          <li
            key={section.id}
            className={index === activeIndex ? styles.pointActive : styles.point}
          >
            <button
              type="button"
              className={styles.pointButton}
              onClick={() => handlePointClick(section.id, index)}
              aria-label={section.fullLabel}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <span className={styles.pointLabel}>{section.label}</span>
              <span className={styles.pointDot} />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

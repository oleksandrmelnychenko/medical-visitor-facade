"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import styles from "./HomeScrollRail.module.scss";

const SECTION_IDS = ["hero", "support", "care", "office", "outro", "faq", "scale"] as const;
const SECTION_SCROLL_OFFSET = 104;
const SHORT_LABELS = {
  de: {
    hero: "Start",
    support: "Konzept",
    care: "Leistungen",
    office: "Standorte",
    outro: "Anfrage",
    faq: "FAQ",
    scale: "Zahlen",
  },
  en: {
    hero: "Home",
    support: "Concept",
    care: "Services",
    office: "Offices",
    outro: "Apply",
    faq: "FAQ",
    scale: "Scale",
  },
  ru: {
    hero: "Главная",
    support: "Концепт",
    care: "Услуги",
    office: "Офисы",
    outro: "Заявка",
    faq: "FAQ",
    scale: "Цифры",
  },
  es: {
    hero: "Inicio",
    support: "Concepto",
    care: "Servicios",
    office: "Oficinas",
    outro: "Solicitud",
    faq: "FAQ",
    scale: "Cifras",
  },
} as const;

export function HomeScrollRail() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const shortLabels = SHORT_LABELS[locale as keyof typeof SHORT_LABELS] ?? SHORT_LABELS.en;
  const sections = useMemo(
    () => [
      {
        id: "hero",
        label: shortLabels.hero,
        fullLabel: `${tHome("hero.titleDark")} ${tHome("hero.titleMuted")}`,
      },
      { id: "support", label: shortLabels.support, fullLabel: tHome("fullSupport.title") },
      { id: "care", label: shortLabels.care, fullLabel: tHome("careForward.title") },
      { id: "office", label: shortLabels.office, fullLabel: tHome("office.title") },
      { id: "outro", label: shortLabels.outro, fullLabel: tCommon("requestAppointment") },
      { id: "faq", label: shortLabels.faq, fullLabel: tHome("faq.title") },
      { id: "scale", label: shortLabels.scale, fullLabel: shortLabels.scale },
    ] as const,
    [shortLabels, tCommon, tHome]
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

  return (
    <nav className={cn(styles.rail, isDark && styles.railInverted)} aria-label="Home sections">
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

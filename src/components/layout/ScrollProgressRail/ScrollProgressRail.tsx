"use client";

import { memo, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import styles from "./ScrollProgressRail.module.scss";

const SECTIONS = ["hero", "fullSupport", "careForward", "office"] as const;

export const ScrollProgressRail = memo(function ScrollProgressRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    // Hide rail when at top (Hero section)
    setVisible(scrollY > viewportH * 0.3);

    // Find all sections with data-snap-anchor
    const anchors = document.querySelectorAll("[data-snap-anchor]");
    const viewportCenter = scrollY + viewportH * 0.45;

    let closest = 0;
    let closestDist = Infinity;

    anchors.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const elCenter = scrollY + rect.top + rect.height / 2;
      const dist = Math.abs(viewportCenter - elCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i + 1; // +1 because Hero is index 0
      }
    });

    // If we're near top, Hero is active
    if (scrollY < viewportH * 0.5) {
      closest = 0;
    }

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (index: number) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const anchors = document.querySelectorAll("[data-snap-anchor]");
    const target = anchors[index - 1];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav
      className={cn(styles.rail, visible && styles.railVisible)}
      aria-label="Page sections"
    >
      <div className={styles.track}>
        <div className={styles.trackLine} />
        <div
          className={styles.progressFill}
          style={{
            height: `${(activeIndex / (SECTIONS.length - 1)) * 100}%`,
          }}
        />
        {SECTIONS.map((section, i) => (
          <button
            key={section}
            className={cn(styles.dot, activeIndex === i && styles.dotActive)}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to section ${i + 1}`}
            aria-current={activeIndex === i ? "true" : undefined}
          >
            <span className={styles.dotInner} />
          </button>
        ))}
      </div>
    </nav>
  );
});

"use client";

import { memo, useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "@/i18n/navigation";
import styles from "./ScrollProgressRail.module.scss";

const SECTIONS = ["hero", "fullSupport", "careForward", "office"] as const;

export const ScrollProgressRail = memo(function ScrollProgressRail() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const anchorsRef = useRef<Element[]>([]);
  const darkSectionsRef = useRef<Element[]>([]);
  const anchorCentersRef = useRef<number[]>([]);
  const darkRangesRef = useRef<Array<{ top: number; bottom: number }>>([]);
  const activeIndexRef = useRef(0);
  const visibleRef = useRef(false);
  const darkModeRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const refreshTargets = useCallback(() => {
    anchorsRef.current = Array.from(document.querySelectorAll("[data-snap-anchor]"));
    darkSectionsRef.current = Array.from(document.querySelectorAll("[data-dark-section]"));
  }, []);

  const refreshMetrics = useCallback(() => {
    anchorCentersRef.current = anchorsRef.current.map((el) => {
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      return top + rect.height / 2;
    });

    darkRangesRef.current = darkSectionsRef.current.map((el) => {
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      return { top, bottom: top + rect.height };
    });
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const viewportCenter = scrollY + viewportH * 0.45;
    const anchorCenters = anchorCentersRef.current;
    const darkRanges = darkRangesRef.current;

    // Hide rail when at top (Hero section)
    const nextVisible = scrollY > viewportH * 0.3;
    if (nextVisible !== visibleRef.current) {
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    }

    if (anchorCenters.length === 0) {
      if (activeIndexRef.current !== 0) {
        activeIndexRef.current = 0;
        setActiveIndex(0);
      }
      if (darkModeRef.current) {
        darkModeRef.current = false;
        setDarkMode(false);
      }
      return;
    }

    let closest = 0;
    let closestDist = Infinity;

    anchorCenters.forEach((anchorCenter, i) => {
      const dist = Math.abs(viewportCenter - anchorCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i + 1; // +1 because Hero is index 0
      }
    });

    // If we're near top, Hero is active
    if (scrollY < viewportH * 0.5) {
      closest = 0;
    }

    if (closest !== activeIndexRef.current) {
      activeIndexRef.current = closest;
      setActiveIndex(closest);
    }

    // Check if rail overlaps a dark section
    const railY = scrollY + viewportH * 0.5;
    let onDark = false;
    darkRanges.forEach((range) => {
      if (range.top < railY && range.bottom > railY) {
        onDark = true;
      }
    });
    if (onDark !== darkModeRef.current) {
      darkModeRef.current = onDark;
      setDarkMode(onDark);
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        handleScroll();
      });
    };

    const onResize = () => {
      refreshTargets();
      refreshMetrics();
      onScroll();
    };

    refreshTargets();
    refreshMetrics();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [handleScroll, pathname, refreshMetrics, refreshTargets]);

  if (pathname !== "/") {
    return null;
  }

  const scrollToSection = (index: number) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = anchorsRef.current[index - 1];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav
      className={cn(styles.rail, visible && styles.railVisible, darkMode && styles.railDark)}
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

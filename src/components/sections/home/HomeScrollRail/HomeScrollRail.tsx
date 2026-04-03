"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import styles from "./HomeScrollRail.module.scss";

const SECTION_IDS = ["hero", "support", "care", "office", "outro", "faq"] as const;

export function HomeScrollRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  const sectionIndex = useMemo(
    () => new Map(SECTION_IDS.map((id, index) => [id, index])),
    []
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

  return (
    <div className={styles.rail} aria-hidden="true">
      <div className={styles.counter}>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className={styles.counterDivider} />
        <span>{String(SECTION_IDS.length).padStart(2, "0")}</span>
      </div>

      <div className={styles.track}>
        <div className={styles.trackBase} />
        <motion.div className={styles.trackFill} style={{ scaleY: progress }} />
      </div>

      <ol className={styles.points}>
        {SECTION_IDS.map((section, index) => (
          <li
            key={section}
            className={index === activeIndex ? styles.pointActive : styles.point}
          >
            <span className={styles.pointIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.pointDot} />
          </li>
        ))}
      </ol>
    </div>
  );
}

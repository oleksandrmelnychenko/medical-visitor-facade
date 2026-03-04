"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollSnap.module.scss";

gsap.registerPlugin(ScrollTrigger);

function getDocTop(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY;
}

function getSnapAnchor(panel: HTMLElement): HTMLElement {
  const explicitAnchor = panel.querySelector<HTMLElement>("[data-snap-anchor]");
  if (explicitAnchor) return explicitAnchor;

  const heading = panel.querySelector<HTMLElement>("h1, h2");
  if (heading) return heading.closest<HTMLElement>("div, section, article") ?? heading;

  return panel;
}

function getCenteredBlockTarget(
  anchorTop: number,
  anchorH: number,
  viewportH: number
): number {
  const anchorCenter = anchorTop + anchorH / 2;
  // Slight upward bias so the block feels visually centered after snap.
  const upwardBias = Math.min(56, viewportH * 0.065);
  const viewportCenter = viewportH / 2 - upwardBias;
  return anchorCenter - viewportCenter;
}

function getSnapShift(panel: HTMLElement, anchor: HTMLElement): number {
  const rawShift = anchor.dataset.snapShift ?? panel.dataset.snapShift;
  const parsed = rawShift ? Number(rawShift) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function computePanelTarget(
  panel: HTMLElement,
  panelIndex: number,
  viewportH: number,
  headerH: number,
  totalScroll: number
): number {
  const anchor = getSnapAnchor(panel);
  const anchorTop = getDocTop(anchor);
  const anchorH = anchor.offsetHeight || panel.offsetHeight;
  const snapShift = getSnapShift(panel, anchor);

  let target =
    panelIndex === 0
      ? 0
      : getCenteredBlockTarget(anchorTop, anchorH, viewportH) + snapShift;

  if (panelIndex !== 0) {
    const minTarget = anchorTop - headerH - 12;
    target = Math.max(target, minTarget);
  }

  return Math.max(0, Math.min(target, totalScroll));
}

/** Compute effective sticky-header height (bar + responsive top margin + border) */
function getHeaderHeight(): number {
  const container = document.querySelector<HTMLElement>(
    '[class*="stickyContainer"]'
  );
  const barHeight = container ? container.clientHeight : 78;

  // top: clamp(0.45rem, 1.2vw, 0.85rem) — resolve at runtime
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const vw = window.innerWidth / 100;
  const topMargin = Math.max(0.45 * rem, Math.min(1.2 * vw, 0.85 * rem));

  return barHeight + topMargin + 2; // +2 for border
}

export function ScrollSnap({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [railItems, setRailItems] = useState<Array<{ id: string; label: string }>>([]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Enable snap on all viewport widths
      ScrollTrigger.matchMedia({
        "(min-width: 0px)": function () {
          const panels = gsap.utils.toArray<HTMLElement>(
            main.querySelectorAll(":scope > section")
          );
          if (panels.length < 2) return;

          ScrollTrigger.create({
            trigger: main,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            snap: {
              snapTo(value) {
                // Recalculate every call → always accurate after resize / layout shift
                const totalScroll =
                  document.documentElement.scrollHeight - window.innerHeight;
                if (totalScroll <= 0) return value;

                const viewportH = window.innerHeight;
                const headerH = getHeaderHeight();

                let closest = 0;
                let minDist = Infinity;

                for (let i = 0; i < panels.length; i++) {
                  const panel = panels[i];
                  const target = computePanelTarget(
                    panel,
                    i,
                    viewportH,
                    headerH,
                    totalScroll
                  );
                  const normalized = target / totalScroll;
                  const dist = Math.abs(value - normalized);

                  if (dist < minDist) {
                    minDist = dist;
                    closest = normalized;
                  }
                }

                // Allow reaching the footer only when user is actually near the bottom
                const distToBottom = Math.abs(value - 1);
                if (value > 0.9 && distToBottom < minDist) {
                  closest = 1;
                }

                return closest;
              },
              duration: prefersReduced
                ? { min: 0.08, max: 0.16 }
                : { min: 0.25, max: 0.65 },
              delay: 0.1,
              ease: "power1.inOut",
            },
          });
        },
      });
    }, main);

    const panels = Array.from(
      main.querySelectorAll<HTMLElement>(":scope > section")
    );

    const nextRailItems = panels.map((panel, index) => {
      if (!panel.id) {
        panel.id = `home-section-${index + 1}`;
      }
      const headingText =
        panel.querySelector<HTMLElement>("h1, h2")?.textContent?.trim() ?? "";
      return {
        id: panel.id,
        label: headingText || `Section ${index + 1}`,
      };
    });
    setRailItems(nextRailItems);

    const getPanelTargetByIndex = (panelIndex: number): number => {
      const panel = panels[panelIndex];
      if (!panel) return 0;

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return 0;

      const viewportH = window.innerHeight;
      const headerH = getHeaderHeight();
      return computePanelTarget(panel, panelIndex, viewportH, headerH, totalScroll);
    };

    const updateActiveFromScroll = () => {
      const currentY = window.scrollY;
      let nextActive = 0;
      let minDist = Infinity;

      for (let i = 0; i < panels.length; i++) {
        const target = getPanelTargetByIndex(i);
        const dist = Math.abs(currentY - target);
        if (dist < minDist) {
          minDist = dist;
          nextActive = i;
        }
      }

      setActiveIndex(nextActive);
    };

    updateActiveFromScroll();

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        rafId = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Refresh snap targets after resize or font load
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(resizeTimer);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToPanel = (panelIndex: number) => {
    const main = mainRef.current;
    if (!main) return;
    const panels = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));
    const panel = panels[panelIndex];
    if (!panel) return;

    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    const viewportH = window.innerHeight;
    const headerH = getHeaderHeight();
    const target = computePanelTarget(panel, panelIndex, viewportH, headerH, totalScroll);

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  return (
    <main ref={mainRef} style={{ position: "relative" }}>
      {children}
      {railItems.length > 1 && (
        <nav
          className={`${styles.progressRail} ${activeIndex === 0 ? styles.progressRailHidden : ""}`}
          aria-label="Home section progress"
        >
          {railItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={item.id} className={styles.railItem}>
                <button
                  type="button"
                  className={`${styles.railDot} ${isActive ? styles.railDotActive : ""}`}
                  onClick={() => scrollToPanel(index)}
                  aria-label={item.label}
                  aria-current={isActive ? "true" : undefined}
                  title={item.label}
                >
                  <span className={styles.railLabel}>{item.label}</span>
                </button>
                {index < railItems.length - 1 && (
                  <span className={styles.railSegment} aria-hidden="true" />
                )}
              </div>
            );
          })}
        </nav>
      )}
    </main>
  );
}

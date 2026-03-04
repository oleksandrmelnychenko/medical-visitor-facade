"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                  const anchor = getSnapAnchor(panel);
                  const anchorTop = getDocTop(anchor);
                  const anchorH = anchor.offsetHeight || panel.offsetHeight;

                  let target: number;
                  if (i === 0) {
                    // Hero — always snap to page top
                    target = 0;
                  } else {
                    // Main behavior: place block center into viewport center
                    target = getCenteredBlockTarget(anchorTop, anchorH, viewportH);

                    // Safety guard for very short blocks right below sticky header
                    const minTarget = anchorTop - headerH - 12;
                    target = Math.max(target, minTarget);
                  }

                  target = Math.max(0, Math.min(target, totalScroll));
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
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <main ref={mainRef} style={{ position: "relative" }}>
      {children}
    </main>
  );
}

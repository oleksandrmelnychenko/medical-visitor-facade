"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_HEIGHT = 100; // sticky header height + top offset

export function ScrollSnap({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Disable on mobile
    if (window.innerWidth <= 768) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        main.querySelectorAll(":scope > section")
      );

      if (panels.length < 2) return;

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      ScrollTrigger.create({
        snap: {
          snapTo(value) {
            // Find the closest panel top (offset by header height)
            const scrollPos = value * totalScroll;
            let closest = 0;
            let minDist = Infinity;

            for (const panel of panels) {
              const target = Math.max(0, panel.offsetTop - HEADER_HEIGHT);
              const normalized = target / totalScroll;
              const dist = Math.abs(value - normalized);
              if (dist < minDist) {
                minDist = dist;
                closest = normalized;
              }
            }
            return closest;
          },
          duration: { min: 0.2, max: 0.6 },
          delay: 0.05,
          ease: "power1.inOut",
        },
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} style={{ position: "relative" }}>
      {children}
    </main>
  );
}

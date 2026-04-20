"use client";

import { useEffect } from "react";

const AUDIO_SRC = "/audio/click.ogg";
const POOL_SIZE = 4;
const MIN_INTERVAL_MS = 60;
const HOVER_SELECTOR = [
  "button",
  "a[href]",
  '[role="menuitem"]',
  '[role="tab"]',
  '[role="button"]',
  "[data-sound-hover]",
].join(",");

export function HoverSound() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pool: HTMLAudioElement[] = Array.from({ length: POOL_SIZE }, () => {
      const audio = new Audio(AUDIO_SRC);
      audio.preload = "auto";
      audio.volume = 0.2;
      return audio;
    });

    let poolIndex = 0;
    let lastPlayAt = 0;
    let lastHit: Element | null = null;
    let unlocked = false;

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      pool.forEach((audio) => {
        audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
          })
          .catch(() => {});
      });
    };

    const play = () => {
      const now = performance.now();
      if (now - lastPlayAt < MIN_INTERVAL_MS) return;
      lastPlayAt = now;

      const audio = pool[poolIndex];
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      try {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch {
        /* noop */
      }
    };

    const isDisabled = (el: Element) =>
      (el as HTMLButtonElement).disabled === true ||
      el.getAttribute("aria-disabled") === "true" ||
      el.hasAttribute("data-sound-hover-off");

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target as Element | null;
      const hit = target?.closest<HTMLElement>(HOVER_SELECTOR) ?? null;

      if (!hit) {
        lastHit = null;
        return;
      }

      if (hit === lastHit) return;

      lastHit = hit;
      if (isDisabled(hit)) return;
      play();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!lastHit) return;
      const related = event.relatedTarget as Element | null;
      if (related && lastHit.contains(related)) return;
      const relatedHit = related?.closest<HTMLElement>(HOVER_SELECTOR) ?? null;
      if (relatedHit === lastHit) return;
      lastHit = relatedHit;
    };

    const handlePointerLeaveWindow = () => {
      lastHit = null;
    };

    document.addEventListener("pointerdown", unlock, { once: true, capture: true });
    document.addEventListener("keydown", unlock, { once: true, capture: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handlePointerLeaveWindow);

    return () => {
      document.removeEventListener("pointerdown", unlock, { capture: true } as EventListenerOptions);
      document.removeEventListener("keydown", unlock, { capture: true } as EventListenerOptions);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handlePointerLeaveWindow);
      pool.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  return null;
}

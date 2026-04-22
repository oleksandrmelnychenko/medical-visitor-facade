"use client";

import { useEffect } from "react";

const AUDIO_SOURCES = [
  { src: "/audio/click.mp3", type: "audio/mpeg" },
  { src: "/audio/click.ogg", type: "audio/ogg" },
] as const;
const POOL_SIZE = 4;
const SOUND_VOLUME = 0.16;
const MIN_INTERVAL_MS = 140;
const HOVER_INTENT_MS = 45;
const CLICK_DEDUP_MS = 180;
const INTERACTIVE_SELECTOR = [
  "button",
  "a[href]",
  '[role="menuitem"]',
  '[role="tab"]',
  '[role="button"]',
  "[data-sound-hover]",
].join(",");

function pickPlayableSource() {
  if (typeof document === "undefined") {
    return AUDIO_SOURCES[0].src;
  }

  const probe = document.createElement("audio");

  for (const source of AUDIO_SOURCES) {
    if (probe.canPlayType(source.type)) {
      return source.src;
    }
  }

  return AUDIO_SOURCES[0].src;
}

export function HoverSound() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const audioSrc = pickPlayableSource();

    const pool: HTMLAudioElement[] = Array.from({ length: POOL_SIZE }, () => {
      const audio = new Audio(audioSrc);
      audio.preload = "auto";
      audio.volume = SOUND_VOLUME;
      return audio;
    });

    let poolIndex = 0;
    let lastPlayAt = 0;
    let currentHoverHit: Element | null = null;
    let pendingHoverHit: Element | null = null;
    let hoverIntentTimeout: number | null = null;
    let lastHoverSoundHit: Element | null = null;
    let lastHoverSoundAt = 0;
    let unlocked = false;

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      pool.forEach((audio) => {
        audio.muted = true;
        audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
          })
          .catch(() => {
            audio.muted = false;
          });
      });
    };

    const clearPendingHover = () => {
      if (hoverIntentTimeout !== null) {
        window.clearTimeout(hoverIntentTimeout);
        hoverIntentTimeout = null;
      }

      pendingHoverHit = null;
    };

    const play = (source: "hover" | "press", hit?: Element) => {
      const now = performance.now();
      if (now - lastPlayAt < MIN_INTERVAL_MS) return false;
      lastPlayAt = now;

      const audio = pool[poolIndex];
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      try {
        audio.currentTime = 0;
        audio.play().catch(() => {});

        if (source === "hover" && hit) {
          lastHoverSoundHit = hit;
          lastHoverSoundAt = now;
        }
      } catch {
        /* noop */
      }

      return true;
    };

    const resolveHit = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>(INTERACTIVE_SELECTOR) ?? null
        : null;

    const isDisabled = (el: Element) =>
      (el as HTMLButtonElement).disabled === true ||
      el.getAttribute("aria-disabled") === "true" ||
      el.hasAttribute("data-sound-hover-off");

    const handlePointerOver = (event: PointerEvent) => {
      if (!supportsHover) return;
      if (event.pointerType !== "mouse") return;
      const hit = resolveHit(event.target);

      if (!hit) {
        currentHoverHit = null;
        clearPendingHover();
        return;
      }

      if (hit === currentHoverHit) return;

      currentHoverHit = hit;
      clearPendingHover();

      if (isDisabled(hit)) return;

      pendingHoverHit = hit;
      hoverIntentTimeout = window.setTimeout(() => {
        hoverIntentTimeout = null;

        if (pendingHoverHit !== hit) return;
        if (currentHoverHit !== hit) return;
        if (isDisabled(hit)) return;

        pendingHoverHit = null;
        play("hover", hit);
      }, HOVER_INTENT_MS);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!supportsHover) return;
      if (event.pointerType !== "mouse") return;
      if (!currentHoverHit) return;
      const related = event.relatedTarget as Element | null;
      if (related && currentHoverHit.contains(related)) return;
      const relatedHit = resolveHit(related);
      if (relatedHit === currentHoverHit) return;

      currentHoverHit = null;
      clearPendingHover();
    };

    const handlePointerLeaveWindow = () => {
      currentHoverHit = null;
      clearPendingHover();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const hit = resolveHit(event.target);

      if (!hit || isDisabled(hit)) return;

      if (event.pointerType === "mouse") {
        clearPendingHover();
      }

      if (hit === lastHoverSoundHit && performance.now() - lastHoverSoundAt < CLICK_DEDUP_MS) {
        return;
      }

      play("press", hit);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key !== "Enter" && event.key !== " ") return;

      const hit = resolveHit(event.target);
      if (!hit || isDisabled(hit)) return;

      clearPendingHover();
      play("press", hit);
    };

    document.addEventListener("pointerdown", unlock, { once: true, capture: true });
    document.addEventListener("keydown", unlock, { once: true, capture: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("blur", handlePointerLeaveWindow);

    return () => {
      document.removeEventListener("pointerdown", unlock, { capture: true } as EventListenerOptions);
      document.removeEventListener("keydown", unlock, { capture: true } as EventListenerOptions);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("blur", handlePointerLeaveWindow);
      clearPendingHover();
      pool.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  return null;
}

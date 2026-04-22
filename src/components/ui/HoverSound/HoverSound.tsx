"use client";

import { useEffect } from "react";

const AUDIO_SOURCES = [
  { src: "/audio/click.mp3", type: "audio/mpeg" },
  { src: "/audio/click.ogg", type: "audio/ogg" },
] as const;
const SOUND_VOLUME = 0.16;
const MIN_INTERVAL_MS = 72;
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
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const AudioContextCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) return;

    const audioSrc = pickPlayableSource();
    const audioContext = new AudioContextCtor({ latencyHint: "interactive" });
    const abortController = new AbortController();

    let isDisposed = false;
    let isUnlocked = false;
    let lastPlayAt = 0;
    let lastHit: Element | null = null;
    let audioBuffer: AudioBuffer | null = null;
    let bufferPromise: Promise<AudioBuffer | null> | null = null;

    const loadBuffer = () => {
      if (audioBuffer) return Promise.resolve(audioBuffer);
      if (bufferPromise) return bufferPromise;

      bufferPromise = fetch(audioSrc, {
        signal: abortController.signal,
        cache: "force-cache",
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to load hover sound: ${response.status}`);
          }

          const audioData = await response.arrayBuffer();
          const decoded = await audioContext.decodeAudioData(audioData.slice(0));

          if (!isDisposed) {
            audioBuffer = decoded;
          }

          return decoded;
        })
        .catch(() => null);

      return bufferPromise;
    };

    const resolveHit = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>(INTERACTIVE_SELECTOR) ?? null
        : null;

    const isDisabled = (el: Element) =>
      (el as HTMLButtonElement).disabled === true ||
      el.getAttribute("aria-disabled") === "true" ||
      el.hasAttribute("data-sound-hover-off");

    const unlock = () => {
      if (isDisposed) return;
      isUnlocked = true;

      loadBuffer().catch(() => null);

      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }
    };

    const play = () => {
      if (!isUnlocked) return;
      if (!audioBuffer) return;
      if (audioContext.state !== "running") return;

      const now = performance.now();
      if (now - lastPlayAt < MIN_INTERVAL_MS) return;
      lastPlayAt = now;

      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.value = SOUND_VOLUME;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(0);
      source.addEventListener("ended", () => {
        source.disconnect();
        gainNode.disconnect();
      });
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const hit = resolveHit(event.target);
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

      const relatedHit = resolveHit(related);
      if (relatedHit === lastHit) return;

      lastHit = relatedHit;
    };

    const handleWindowBlur = () => {
      lastHit = null;
    };

    loadBuffer().catch(() => null);

    document.addEventListener("pointerdown", unlock, { once: true, capture: true });
    document.addEventListener("keydown", unlock, { once: true, capture: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      isDisposed = true;
      abortController.abort();

      document.removeEventListener("pointerdown", unlock, { capture: true } as EventListenerOptions);
      document.removeEventListener("keydown", unlock, { capture: true } as EventListenerOptions);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleWindowBlur);

      audioContext.close().catch(() => {});
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./MusicToggle.module.scss";

const AUDIO_SOURCES = [
  { src: "/audio/generic.mp3", type: "audio/mpeg" },
  { src: "/audio/generic.ogg", type: "audio/ogg" },
] as const;
const AUTOSTART_DELAY_MS = 280;
const AUTOSTART_IDLE_TIMEOUT_MS = 700;

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

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioListenersRef = useRef<{ onPlay: () => void; onPause: () => void } | null>(null);
  const hasUnmutedRef = useRef(false);
  const autoplayDelayRef = useRef<number | null>(null);
  const autoplayRafRef = useRef<number | null>(null);
  const autoplayIdleRef = useRef<number | null>(null);
  const readyHandlerRef = useRef<(() => void) | null>(null);

  const ensureAudio = () => {
    if (audioRef.current) {
      return audioRef.current;
    }

    const audio = new Audio(pickPlayableSource());
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audio.muted = !hasUnmutedRef.current;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    audioListenersRef.current = { onPlay, onPause };
    audioRef.current = audio;

    return audio;
  };

  const tryPlay = (audio: HTMLAudioElement) => {
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const startMutedAutoplay = () => {
      const audio = ensureAudio();
      audio.muted = !hasUnmutedRef.current;
      tryPlay(audio);

      if (audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        audio.addEventListener("canplay", () => tryPlay(audio), { once: true });
      }
    };

    const queueAutoplay = () => {
      autoplayDelayRef.current = window.setTimeout(() => {
        autoplayRafRef.current = window.requestAnimationFrame(() => {
          if ("requestIdleCallback" in window) {
            autoplayIdleRef.current = window.requestIdleCallback(startMutedAutoplay, {
              timeout: AUTOSTART_IDLE_TIMEOUT_MS,
            });
            return;
          }

          startMutedAutoplay();
        });
      }, AUTOSTART_DELAY_MS);
    };

    const onReady = () => {
      if (document.readyState !== "complete" || document.visibilityState !== "visible") {
        return;
      }

      window.removeEventListener("load", onReady);
      document.removeEventListener("visibilitychange", onReady);
      readyHandlerRef.current = null;
      queueAutoplay();
    };

    readyHandlerRef.current = onReady;

    if (document.readyState === "complete" && document.visibilityState === "visible") {
      queueAutoplay();
    } else {
      window.addEventListener("load", onReady, { once: true });
      document.addEventListener("visibilitychange", onReady);
    }

    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || document.visibilityState !== "visible") {
        return;
      }

      tryPlay(audio);
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);

      const readyHandler = readyHandlerRef.current;
      if (readyHandler) {
        window.removeEventListener("load", readyHandler);
        document.removeEventListener("visibilitychange", readyHandler);
        readyHandlerRef.current = null;
      }

      if (autoplayDelayRef.current !== null) {
        window.clearTimeout(autoplayDelayRef.current);
        autoplayDelayRef.current = null;
      }

      if (autoplayRafRef.current !== null) {
        window.cancelAnimationFrame(autoplayRafRef.current);
        autoplayRafRef.current = null;
      }

      if (autoplayIdleRef.current !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(autoplayIdleRef.current);
        autoplayIdleRef.current = null;
      }

      const audio = audioRef.current;
      const listeners = audioListenersRef.current;

      if (audio && listeners) {
        audio.removeEventListener("play", listeners.onPlay);
        audio.removeEventListener("pause", listeners.onPause);
      }

      if (audio) {
        audio.pause();
        audio.src = "";
      }

      audioListenersRef.current = null;
      audioRef.current = null;
    };
  }, []);

  const handleToggle = async () => {
    const audio = ensureAudio();

    if (audio.paused || audio.muted) {
      audio.muted = false;
      hasUnmutedRef.current = true;
      setHasUnmuted(true);

      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
  };

  const showActive = isPlaying && hasUnmuted;

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={showActive}
      aria-label={showActive ? "Pause background music" : "Play background music"}
      className={cn(styles.button, showActive && styles.playing)}
    >
      <svg
        className={styles.waveSvg}
        viewBox="0 0 24 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {showActive ? (
          <path
            className={styles.wavePath}
            pathLength="100"
            d="M 2 6 L 7 6 Q 9 10.2 11 6 T 15 6 L 22 6"
          />
        ) : (
          <path className={styles.dashPath} d="M 2 6 L 22 6" />
        )}
      </svg>
    </button>
  );
}

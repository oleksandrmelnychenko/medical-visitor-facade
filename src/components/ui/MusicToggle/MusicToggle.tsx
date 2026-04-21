"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./MusicToggle.module.scss";

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointerup",
  "pointermove",
  "touchstart",
  "touchmove",
  "touchend",
  "click",
  "keydown",
  "scroll",
  "wheel",
  "mousemove",
] as const;

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.volume = 0.45;
    audio.muted = true;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryPlayMuted = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    const onCanPlay = () => tryPlayMuted();
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("loadeddata", onCanPlay);

    tryPlayMuted();

    const unmuteOnInteraction = () => {
      audio.muted = false;
      setHasUnmuted(true);
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      INTERACTION_EVENTS.forEach((evt) =>
        document.removeEventListener(evt, unmuteOnInteraction, true),
      );
    };

    INTERACTION_EVENTS.forEach((evt) =>
      document.addEventListener(evt, unmuteOnInteraction, {
        capture: true,
        once: true,
        passive: true,
      }),
    );

    const onVisibility = () => {
      if (document.visibilityState === "visible" && audio.paused && hasUnmuted) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("loadeddata", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      INTERACTION_EVENTS.forEach((evt) =>
        document.removeEventListener(evt, unmuteOnInteraction, true),
      );
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.muted) {
      audio.muted = false;
      setHasUnmuted(true);
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const showActive = isPlaying && hasUnmuted;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/audio/generic.mp3" type="audio/mpeg" />
        <source src="/audio/generic.ogg" type="audio/ogg" />
      </audio>
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
    </>
  );
}

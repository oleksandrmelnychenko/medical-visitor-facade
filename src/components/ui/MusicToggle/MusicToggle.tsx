"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./MusicToggle.module.scss";

const AUDIO_SRC = "/audio/generic.ogg";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audioRef.current = audio;

    const startOnInteraction = () => {
      audio.play().catch(() => {});
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
    };

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        window.addEventListener("pointerdown", startOnInteraction, { once: true });
        window.addEventListener("keydown", startOnInteraction, { once: true });
        window.addEventListener("touchstart", startOnInteraction, { once: true });
      });

    return () => {
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      className={cn(styles.button, isPlaying && styles.playing)}
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
        {isPlaying ? (
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

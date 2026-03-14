"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./Hero.module.scss";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    let isMounted = true;

    const tryPlay = async () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      try {
        await video.play();
      } catch {
        // Safari on iPhone may reject autoplay until it considers the element visible enough.
      }
    };

    const handleLoadedData = () => {
      if (isMounted) {
        setIsReady(true);
      }

      void tryPlay();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void tryPlay();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void tryPlay();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    video.addEventListener("loadeddata", handleLoadedData);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", handleVisibility);

    void tryPlay();

    return () => {
      isMounted = false;
      observer.disconnect();
      video.removeEventListener("loadeddata", handleLoadedData);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", handleVisibility);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={cn(styles.heroVideo, !isReady && styles.heroVideoHidden)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source
        src="/assets/hero_mobile.mp4"
        type="video/mp4"
        media="(max-width: 768px) and (prefers-reduced-motion: no-preference)"
      />
      <source
        src="/assets/hero_hd.mp4"
        type="video/mp4"
        media="(min-width: 769px) and (prefers-reduced-motion: no-preference)"
      />
    </video>
  );
}

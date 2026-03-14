"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./Hero.module.scss";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncSource = () => {
      if (reducedMotionQuery.matches) {
        setVideoSrc(null);
        return;
      }

      setVideoSrc(mobileQuery.matches ? "/assets/hero_mobile.mp4" : "/assets/hero_hd.mp4");
    };

    syncSource();
    mobileQuery.addEventListener("change", syncSource);
    reducedMotionQuery.addEventListener("change", syncSource);

    return () => {
      mobileQuery.removeEventListener("change", syncSource);
      reducedMotionQuery.removeEventListener("change", syncSource);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) {
      return undefined;
    }

    let isMounted = true;
    setIsReady(false);

    const syncReadyState = () => {
      if (isMounted && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setIsReady(true);
      }
    };

    const tryPlay = async () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "true");

      try {
        await video.play();
      } catch {
        // Safari on iPhone may reject autoplay until it considers the element visible enough.
      }
    };

    const handleLoadedData = () => {
      syncReadyState();
      void tryPlay();
    };

    const handleCanPlay = () => {
      syncReadyState();
      void tryPlay();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void tryPlay();
      }
    };

    const handleUserActivation = () => {
      void tryPlay();
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
    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", handleVisibility);
    window.addEventListener("touchstart", handleUserActivation, { passive: true });
    window.addEventListener("scroll", handleUserActivation, { passive: true });

    video.load();
    syncReadyState();
    void tryPlay();

    return () => {
      isMounted = false;
      observer.disconnect();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", handleVisibility);
      window.removeEventListener("touchstart", handleUserActivation);
      window.removeEventListener("scroll", handleUserActivation);
    };
  }, [videoSrc]);

  if (!videoSrc) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      className={cn(styles.heroVideo, !isReady && styles.heroVideoHidden)}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={videoSrc}
      aria-hidden="true"
    />
  );
}

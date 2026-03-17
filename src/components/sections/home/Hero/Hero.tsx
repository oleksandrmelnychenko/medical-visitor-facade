"use client";

import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { GmedHeaderLogo } from "@/components/branding/GmedHeaderLogo/GmedHeaderLogo";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import { HeroMedia } from "./HeroMedia";
import styles from "./Hero.module.scss";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - ((-2 * progress + 2) ** 3) / 2;
}

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const mediaLabel = "Agentur für Patientenbetreuung Heorhii Hudiiev";
  const heroRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wordmarkStageRef = useRef<HTMLDivElement>(null);
  const mediaOriginRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const sceneFrameRef = useRef<number | null>(null);
  const sceneReadyRef = useRef(false);
  const originReadyRef = useRef(false);
  const sceneProgressRef = useRef(0);
  const sceneRenderedProgressRef = useRef(0);
  const originMetricsRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [isOriginReady, setIsOriginReady] = useState(false);
  const shouldRenderStaticMedia = !isInteractive || !isSceneReady;

  const measureOrigin = useEffectEvent((options?: { force?: boolean }) => {
    const hero = heroRef.current;
    const viewport = viewportRef.current;
    const wordmarkStage = wordmarkStageRef.current;
    const mediaOrigin = mediaOriginRef.current;
    const cachedMetrics = originMetricsRef.current;
    const shouldForce = options?.force ?? false;

    if (!hero || !viewport || !wordmarkStage || !mediaOrigin) {
      return;
    }

    if (cachedMetrics && !shouldForce) {
      hero.style.setProperty("--hero-origin-left", `${cachedMetrics.left}px`);
      hero.style.setProperty("--hero-origin-top", `${cachedMetrics.top}px`);

      return cachedMetrics;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const wordmarkRect = wordmarkStage.getBoundingClientRect();
    const originRect = mediaOrigin.getBoundingClientRect();
    const rawProgress = clamp(sceneRenderedProgressRef.current, 0, 1);
    const contentProgress = easeInOutCubic(clamp(rawProgress / 0.88, 0, 1));
    const contentShift = lerp(0, -window.innerHeight * 0.48, contentProgress);
    const startWidth = originRect.width;
    const startHeight = originRect.height;
    const wordmarkSvg = wordmarkStage.querySelector("svg");
    let glyphLeft = wordmarkRect.left;
    let glyphTop = wordmarkRect.top - contentShift;
    let glyphWidth = wordmarkRect.width;
    let glyphHeight = wordmarkRect.height;

    if (wordmarkSvg instanceof SVGSVGElement) {
      try {
        const bbox = wordmarkSvg.getBBox();
        const viewBox = wordmarkSvg.viewBox.baseVal;
        const svgRect = wordmarkSvg.getBoundingClientRect();

        if (viewBox.width > 0 && viewBox.height > 0 && bbox.width > 0 && bbox.height > 0) {
          const scaleX = svgRect.width / viewBox.width;
          const scaleY = svgRect.height / viewBox.height;

          glyphLeft = svgRect.left + bbox.x * scaleX;
          glyphTop = svgRect.top - contentShift + bbox.y * scaleY;
          glyphWidth = bbox.width * scaleX;
          glyphHeight = bbox.height * scaleY;
        }
      } catch {
        // Fall back to the wordmark container box if the SVG bbox isn't available.
      }
    }

    const startLeft = clamp(
      glyphLeft - viewportRect.left + glyphWidth * 0.73 - startWidth / 2,
      0,
      Math.max(viewportRect.width - startWidth, 0)
    );
    const startCenterY = glyphTop - viewportRect.top + glyphHeight;
    const startTop = clamp(
      startCenterY - startHeight * 0.76,
      0,
      Math.max(viewportRect.height - startHeight, 0)
    );

    hero.style.setProperty("--hero-origin-left", `${startLeft}px`);
    hero.style.setProperty("--hero-origin-top", `${startTop}px`);

    const metrics = { left: startLeft, top: startTop, width: startWidth, height: startHeight };
    originMetricsRef.current = metrics;

    if (!originReadyRef.current) {
      originReadyRef.current = true;
      setIsOriginReady(true);
    }

    return metrics;
  });

  const syncScene = useEffectEvent((rawProgressValue?: number) => {
    const hero = heroRef.current;
    const viewport = viewportRef.current;

    if (!hero || !viewport) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const rawProgress = clamp(rawProgressValue ?? sceneProgressRef.current, 0, 1);
    const progress = easeInOutCubic(rawProgress);
    const contentProgress = easeInOutCubic(clamp(rawProgress / 0.88, 0, 1));
    const contentOpacity = lerp(1, 0, contentProgress);
    const contentShift = lerp(0, -window.innerHeight * 0.48, contentProgress);
    const originMetrics = originMetricsRef.current ?? measureOrigin();

    if (!originMetrics) {
      return;
    }

    const startLeft = originMetrics.left;
    const startTop = originMetrics.top;
    const startWidth = originMetrics.width;
    const startHeight = originMetrics.height;
    const insetX = window.innerWidth >= 1440 ? 32 : 18;
    const insetY = window.innerWidth >= 1440 ? 28 : 18;
    const targetWidth = Math.max(viewportRect.width - insetX * 2, startWidth);
    const targetHeight = Math.max(viewportRect.height - insetY * 2, startHeight);
    const targetLeft = (viewportRect.width - targetWidth) / 2;
    const targetTop = (viewportRect.height - targetHeight) / 2;
    const currentLeft = lerp(startLeft, targetLeft, progress);
    const currentTop = lerp(startTop, targetTop, progress);
    const currentWidth = lerp(startWidth, targetWidth, progress);
    const currentHeight = lerp(startHeight, targetHeight, progress);
    const currentRadius = lerp(28, 24, progress);
    const currentCardPadding = 0;
    const currentVideoRadius = currentRadius;

    hero.style.setProperty("--hero-progress", progress.toFixed(4));
    hero.style.setProperty("--hero-content-opacity", contentOpacity.toFixed(4));
    hero.style.setProperty("--hero-content-shift", `${contentShift}px`);
    hero.style.setProperty("--hero-content-scale", "1");
    hero.style.setProperty("--hero-floating-left", `${currentLeft}px`);
    hero.style.setProperty("--hero-floating-top", `${currentTop}px`);
    hero.style.setProperty("--hero-floating-width", `${currentWidth}px`);
    hero.style.setProperty("--hero-floating-height", `${currentHeight}px`);
    hero.style.setProperty("--hero-floating-radius", `${currentRadius}px`);
    hero.style.setProperty("--hero-card-padding", `${currentCardPadding}px`);
    hero.style.setProperty("--hero-video-radius", `${currentVideoRadius}px`);

    if (!sceneReadyRef.current) {
      sceneReadyRef.current = true;
      setIsSceneReady(true);
    }
  });

  const animateScene = useEffectEvent(() => {
    if (sceneFrameRef.current !== null) {
      return;
    }

    const tick = () => {
      const targetProgress = clamp(sceneProgressRef.current, 0, 1);
      const currentProgress = clamp(sceneRenderedProgressRef.current, 0, 1);
      const delta = targetProgress - currentProgress;

      if (Math.abs(delta) <= 0.0015) {
        sceneRenderedProgressRef.current = targetProgress;

        if (targetProgress <= 0.001) {
          const metrics = measureOrigin({ force: true });

          if (metrics) {
            originMetricsRef.current = metrics;
          }
        }

        syncScene(targetProgress);
        sceneFrameRef.current = null;
        return;
      }

      const nextProgress = currentProgress + delta * 0.18;
      sceneRenderedProgressRef.current = nextProgress;
      syncScene(nextProgress);
      sceneFrameRef.current = window.requestAnimationFrame(tick);
    };

    sceneFrameRef.current = window.requestAnimationFrame(tick);
  });

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const desktopQuery = window.matchMedia("(min-width: 961px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMode = () => {
      const nextInteractive = desktopQuery.matches && !reducedMotionQuery.matches;
      sceneReadyRef.current = false;
      originReadyRef.current = false;
      sceneProgressRef.current = 0;
      sceneRenderedProgressRef.current = 0;
      originMetricsRef.current = null;

      if (sceneFrameRef.current !== null) {
        window.cancelAnimationFrame(sceneFrameRef.current);
        sceneFrameRef.current = null;
      }

      setIsOriginReady(false);
      setIsSceneReady(!nextInteractive);
      setIsInteractive(nextInteractive);
    };

    syncMode();
    desktopQuery.addEventListener("change", syncMode);
    reducedMotionQuery.addEventListener("change", syncMode);

    return () => {
      desktopQuery.removeEventListener("change", syncMode);
      reducedMotionQuery.removeEventListener("change", syncMode);
    };
  }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const viewport = viewportRef.current;
    const wordmarkStage = wordmarkStageRef.current;

    if (!hero || !viewport || !wordmarkStage) {
      return undefined;
    }

    const syncNow = () => {
      const metrics = measureOrigin({ force: true });

      if (isInteractive) {
        if (metrics) {
          originMetricsRef.current = metrics;
        }
        syncScene(sceneRenderedProgressRef.current);
        return;
      }

      hero.style.setProperty("--hero-progress", "0");
      hero.style.setProperty("--hero-content-opacity", "1");
      hero.style.setProperty("--hero-content-shift", "0rem");
      hero.style.setProperty("--hero-content-scale", "1");
      hero.style.setProperty("--hero-card-padding", "");
      hero.style.setProperty("--hero-video-radius", "");
      sceneProgressRef.current = 0;
      sceneRenderedProgressRef.current = 0;
    };

    const requestSync = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncNow();
      });
    };

    syncNow();
    window.addEventListener("resize", requestSync);
    window.addEventListener("load", requestSync);
    window.addEventListener("pageshow", requestSync);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            requestSync();
          })
        : null;

    resizeObserver?.observe(viewport);
    resizeObserver?.observe(wordmarkStage);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (sceneFrameRef.current !== null) {
        window.cancelAnimationFrame(sceneFrameRef.current);
        sceneFrameRef.current = null;
      }

      window.removeEventListener("resize", requestSync);
      window.removeEventListener("load", requestSync);
      window.removeEventListener("pageshow", requestSync);
      resizeObserver?.disconnect();
    };
  }, [isInteractive]);

  useEffect(() => {
    if (!isInteractive) {
      return undefined;
    }

    const onWheel = (event: WheelEvent) => {
      const atTop = window.scrollY <= 0.5;
      const targetProgress = sceneProgressRef.current;
      const renderedProgress = sceneRenderedProgressRef.current;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;
      const shouldCapture =
        atTop &&
        ((scrollingDown && (targetProgress < 1 || renderedProgress < 0.999)) ||
          (scrollingUp && (targetProgress > 0 || renderedProgress > 0.001)));

      if (!shouldCapture) {
        return;
      }

      event.preventDefault();

      const nextProgress = clamp(targetProgress + event.deltaY / 1300, 0, 1);
      sceneProgressRef.current = nextProgress;
      window.scrollTo({ top: 0, behavior: "auto" });
      animateScene();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [isInteractive]);

  const renderMediaFrame = () => (
    <>
      <div className={styles.mediaCard}>
        <div className={styles.videoContainer}>
          <HeroMedia />
        </div>
      </div>
      <div className={styles.mediaCaption}>{mediaLabel}</div>
    </>
  );

  return (
    <section
      ref={heroRef}
      className={cn(
        styles.hero,
        isInteractive && styles.heroInteractive,
        isSceneReady && styles.sceneReady,
        isOriginReady && styles.originReady
      )}
    >
      <h1 className={styles.srOnly}>{t("title")}</h1>
      <div className={sectionStyles.container}>
        <div className={styles.heroScrollStage}>
          <div ref={viewportRef} className={styles.heroViewport}>
            <div className={styles.mediaLayer} aria-hidden="true">
              <div ref={mediaOriginRef} className={styles.mediaOrigin} />
              {shouldRenderStaticMedia ? (
                <div className={styles.mediaStatic}>
                  {renderMediaFrame()}
                </div>
              ) : null}
            </div>
            <div className={styles.heroContent}>
              <div ref={wordmarkStageRef} className={styles.wordmarkStage}>
                <GmedHeaderLogo className={styles.wordmark} />
              </div>
              <div className={styles.mediaStage} aria-hidden="true" />
              <div className={styles.copyBlock}>
                <p className={styles.copyLead}>
                  <span className={styles.copyLeadText}>{t("title")}</span>
                </p>
                <p className={styles.copySubtitle}>
                  {t.rich("subtitle", {
                    br: () => <br />,
                  })}
                </p>
                <Link href="/apply" prefetch={false} className={styles.ctaLink}>
                  <span className={styles.ctaLabel}>{tCommon("requestAppointment")}</span>
                  <span className={styles.ctaArrow} aria-hidden="true">
                    <svg viewBox="0 0 40 40" fill="none" className={styles.ctaArrowIcon}>
                      <path
                        d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            {isInteractive ? (
              <div className={styles.mediaFloating}>
                {renderMediaFrame()}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

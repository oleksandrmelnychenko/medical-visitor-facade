"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./Office.module.scss";

type City = {
  key: string;
  name: string;
  image: string;
  style: CSSProperties;
  delayMs: number;
};

type OfficeCitiesGridProps = {
  cities: City[];
  mainCityName: string;
  mainCityStyle: CSSProperties;
};

type RevealMode = "pending" | "animate" | "static";

let officeRevealPrimed = false;

export function OfficeCitiesGrid({
  cities,
  mainCityName,
  mainCityStyle,
}: OfficeCitiesGridProps) {
  const [revealMode, setRevealMode] = useState<RevealMode>(() =>
    officeRevealPrimed ? "static" : "pending"
  );

  useEffect(() => {
    if (officeRevealPrimed) {
      return;
    }

    officeRevealPrimed = true;

    const frame = window.requestAnimationFrame(() => {
      setRevealMode(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "static"
          : "animate"
      );
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.atlas}>
      <article className={styles.featuredCity} style={mainCityStyle}>
        <div className={styles.featuredMeta}>
          <span className={styles.featuredIndex}>01</span>
          <h3 className={styles.featuredName}>{mainCityName}</h3>
        </div>
        <div className={styles.featuredVisual}>
          <Image
            src="/assets/1_city-munich.png"
            alt={mainCityName}
            width={400}
            height={300}
            sizes="(max-width: 767px) 40vw, 50vw"
            className={styles.cityImageMunich}
            priority={false}
          />
        </div>
      </article>

      <div className={styles.sideCities}>
        {cities.map((city, index) => (
          <article key={city.key} className={styles.cityCard} style={city.style}>
            <div className={styles.cityCardMeta}>
              <span className={styles.cityCardIndex}>
                {String(index + 2).padStart(2, "0")}
              </span>
              <h3 className={styles.cityName}>{city.name}</h3>
            </div>
            <div className={styles.cityCardVisual}>
              <Image
                src={city.image}
                alt={city.name}
                width={300}
                height={220}
                sizes="(max-width: 767px) 45vw, 25vw"
                className={cn(
                  styles.cityImage,
                  revealMode === "pending" && styles.brushPaint,
                  revealMode === "animate" && styles.brushPaint,
                  revealMode === "animate" && styles.brushPaintActive,
                  revealMode === "static" && styles.brushPaintStatic
                )}
                style={
                  revealMode === "animate"
                    ? { animationDelay: `${city.delayMs}ms` }
                    : undefined
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

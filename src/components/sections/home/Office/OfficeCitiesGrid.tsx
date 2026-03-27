"use client";

import { type CSSProperties } from "react";
import Image from "next/image";
import styles from "./Office.module.scss";

type City = {
  key: string;
  name: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string;
  imageOverlay?: string;
  style: CSSProperties;
  delayMs: number;
};

type OfficeCitiesGridProps = {
  cities: City[];
  mainCityName: string;
  mainCityStyle: CSSProperties;
};

export function OfficeCitiesGrid({
  cities,
  mainCityName,
}: OfficeCitiesGridProps) {
  return (
    <div className={styles.collage}>
      {/* Munich — large left */}
      <div className={styles.collageMunich}>
        <Image
          src="/assets/1_city-munich.png"
          alt={mainCityName}
          fill
          sizes="(max-width: 767px) 100vw, 40vw"
          className={styles.collageImage}
          style={{ objectPosition: "center 20%" }}
        />
        <div className={styles.collageLabel}>
          <h3 className={styles.collageName}>{mainCityName}</h3>
        </div>
      </div>

      {/* Berlin — top middle */}
      {cities[0] && (
        <div className={styles.collageBerlin}>
          <Image
            src={cities[0].image}
            alt={cities[0].name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.collageImage}
            style={cities[0].imagePosition ? { objectPosition: cities[0].imagePosition } : undefined}
          />
          {cities[0].imageOverlay && (
            <span className={styles.cityImageOverlay} style={{ background: cities[0].imageOverlay }} />
          )}
          <div className={styles.collageLabel}>
            <h3 className={styles.collageName}>{cities[0].name}</h3>
          </div>
        </div>
      )}

      {/* Hamburg — bottom middle */}
      {cities[1] && (
        <div className={styles.collageHamburg}>
          <Image
            src={cities[1].image}
            alt={cities[1].name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.collageImage}
            style={cities[1].imagePosition ? { objectPosition: cities[1].imagePosition } : undefined}
          />
          {cities[1].imageOverlay && (
            <span className={styles.cityImageOverlay} style={{ background: cities[1].imageOverlay }} />
          )}
          <div className={styles.collageLabel}>
            <h3 className={styles.collageName}>{cities[1].name}</h3>
          </div>
        </div>
      )}

      {/* Cologne — full right */}
      {cities[2] && (
        <div className={styles.collageCologne}>
          <Image
            src={cities[2].image}
            alt={cities[2].name}
            fill
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.collageImage}
            style={cities[2].imagePosition ? { objectPosition: cities[2].imagePosition } : undefined}
          />
          {cities[2].imageOverlay && (
            <span className={styles.cityImageOverlay} style={{ background: cities[2].imageOverlay }} />
          )}
          <div className={styles.collageLabel}>
            <h3 className={styles.collageName}>{cities[2].name}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

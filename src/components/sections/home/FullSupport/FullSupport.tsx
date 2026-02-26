"use client";

import { memo, useState, useCallback, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Plane, CarTaxiFront, Clock, MessageCircle, Stamp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const SERVICES = [
  { icon: CarTaxiFront, key: 'support' },
  { icon: Clock, key: 'promptness' },
  { icon: Stamp, key: 'confidentiality' },
  { icon: Plane, key: 'noFees' },
  { icon: MessageCircle, key: 'concierge' },
];

// City markers on Germany map (positions in SVG viewBox coords matching the map scale)
// Computed from lon/lat → normalized → scaled ×1.2 centered at (50,50)
const CITIES = [
  { key: 'berlin',  x: 89,  y: 31 },
  { key: 'hamburg', x: 49,  y: 18 },
  { key: 'cologne', x: 13,  y: 50 },
  { key: 'munich',  x: 67,  y: 83 },
];

// Line colors: red, yellow, purple, orange, violet
const LINE_COLORS = ['#e8453c', '#f0b732', '#8b5cf6', '#f97316', '#a855f7'];

// Ball animation durations (staggered for organic feel)
const BALL_DURS = ['3.5s', '4.2s', '3.8s', '4.5s', '3.2s'];

/** Compute endpoint on circle */
function endPoint(index: number, total: number, radiusPct: number, startAngle = -54) {
  const angle = ((index / total) * 360 + startAngle) * (Math.PI / 180);
  return {
    x: 50 + Math.cos(angle) * radiusPct,
    y: 50 + Math.sin(angle) * radiusPct,
  };
}

/** Build a cable-style L-shaped path: straight segments with rounded 90° turn */
function cablePath(index: number, total: number, radiusPct: number) {
  const ep = endPoint(index, total, radiusPct);
  const dx = ep.x - 50;
  const dy = ep.y - 50;
  const r = 3; // corner radius

  // If nearly aligned on one axis, just go straight
  if (Math.abs(dx) < 1) return `M50,50 V${ep.y}`;
  if (Math.abs(dy) < 1) return `M50,50 H${ep.x}`;

  const sx = dx >= 0 ? 1 : -1;
  const sy = dy >= 0 ? 1 : -1;
  const cr = Math.min(r, Math.abs(dx), Math.abs(dy));

  if (Math.abs(dx) >= Math.abs(dy)) {
    // Horizontal first → rounded corner → vertical
    return `M50,50 H${ep.x - sx * cr} Q${ep.x},50 ${ep.x},${50 + sy * cr} V${ep.y}`;
  }
  // Vertical first → rounded corner → horizontal
  return `M50,50 V${ep.y - sy * cr} Q50,${ep.y} ${50 + sx * cr},${ep.y} H${ep.x}`;
}

/** Tile positioning */
function orbitPosition(index: number, total: number, radiusPct: number, startAngle = -54) {
  const ep = endPoint(index, total, radiusPct, startAngle);
  return { left: `${ep.x}%`, top: `${ep.y}%` } as React.CSSProperties;
}

/** Zero-padded number */
function pad(n: number) {
  return String(n).padStart(2, '0');
}

export const FullSupport = memo(function FullSupport() {
  const t = useTranslations('home.fullSupport');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });

  const handleEnter = useCallback((i: number) => setHoveredIdx(i), []);
  const handleLeave = useCallback(() => setHoveredIdx(null), []);

  return (
    <section ref={sectionRef} className={cn(sectionStyles.section, styles.fullSupport)}>
      <div className={sectionStyles.container}>

        {/* ──── Desktop: Orbital layout ──── */}
        <motion.div
          className={styles.orbit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Colored curved lines + animated balls with glow */}
          <svg
            className={styles.lines}
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
            style={{ animationPlayState: isInView ? 'running' : 'paused' }}
          >
            <defs>
              {SERVICES.map((_, i) => {
                const ep = endPoint(i, SERVICES.length, 40);
                const color = LINE_COLORS[i];
                return (
                  <g key={`defs-${i}`}>
                    <linearGradient
                      id={`lineGrad${i}`}
                      x1="50%" y1="50%"
                      x2={`${ep.x}%`} y2={`${ep.y}%`}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={color} stopOpacity="0.15" />
                    </linearGradient>
                  </g>
                );
              })}
            </defs>

            {/* Germany silhouette watermark */}
            <path
              d="M6,10 L7,19 L10,20 L8,30 L3,34 L8,39 L3,46 L-10,46 L-8,54 L-10,64 L-8,70 L-5,75 L0,85 L5,91 L22,92 L14,107 L14,115 L28,112 L43,115 L50,119 L56,114 L67,115 L79,114 L89,113 L104,108 L97,102 L93,95 L84,78 L78,77 L78,71 L84,73 L90,71 L103,64 L109,61 L119,59 L115,58 L114,43 L115,27 L107,12 L102,6 L92,6 L77,8 L71,5 L62,5 L49,-2 L33,-4 Z"
              fill="#e0e0e0"
              opacity="0.18"
              stroke="none"
            />

            {/* City markers on Germany map */}
            {CITIES.map((city) => (
              <g key={city.key} opacity="0.35">
                <circle cx={city.x} cy={city.y} r="1.1" fill="#c0c0c0" />
                <circle cx={city.x} cy={city.y} r="0.45" fill="#999" />
                <text
                  x={city.x + 2}
                  y={city.y + 0.5}
                  fontSize="2.8"
                  fill="#b0b0b0"
                  fontFamily="'Inter', sans-serif"
                  fontWeight="500"
                >
                  {t(`cities.${city.key}`)}
                </text>
              </g>
            ))}

            {/* Dashed orbit circles */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="0.15"
              strokeDasharray="1.2 0.8"
              opacity="0.45"
            />
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="0.12"
              strokeDasharray="0.9 0.6"
              opacity="0.3"
            />

            {SERVICES.map((_, i) => {
              const path = cablePath(i, SERVICES.length, 40);
              const color = LINE_COLORS[i];
              const dur = BALL_DURS[i];
              const isActive = hoveredIdx === null || hoveredIdx === i;
              const isHighlighted = hoveredIdx === i;

              return (
                <g
                  key={i}
                  style={{
                    opacity: isActive ? 1 : 0.15,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <path
                    d={path}
                    fill="none"
                    stroke={`url(#lineGrad${i})`}
                    strokeWidth={isHighlighted ? '0.4' : '0.25'}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-width 0.3s ease' }}
                  />
                  {/* Animated ball — only rendered when section is in viewport */}
                  {isInView && (
                    <circle
                      r={isHighlighted ? '0.9' : '0.65'}
                      fill={color}
                      opacity="0.85"
                      style={{ transition: 'r 0.3s ease' }}
                    >
                      <animateMotion
                        dur={isHighlighted ? '2s' : dur}
                        repeatCount="indefinite"
                        path={path}
                        rotate="auto"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Center hub — title */}
          <div className={styles.hub}>
            <h2 className={styles.title}>{t('title')}</h2>
          </div>

          {/* Service tiles on orbit */}
          {SERVICES.map((svc, i) => (
            <div
              key={svc.key}
              className={styles.svcNode}
              style={{
                ...orbitPosition(i, SERVICES.length, 40),
                '--line-color': LINE_COLORS[i],
              } as React.CSSProperties}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              <div className={cn(
                styles.serviceItem,
                hoveredIdx !== null && hoveredIdx !== i && styles.dimmed,
              )}>
                <div className={styles.serviceFront}>
                  <span className={styles.serviceNum}>{pad(i + 1)}</span>
                  <div className={styles.serviceIcon}>
                    <svc.icon />
                  </div>
                  <span className={styles.serviceTitle}>
                    {t(`services.${svc.key}.title`)}
                  </span>
                </div>
                <div className={styles.serviceBack}>
                  <span className={styles.serviceTitle}>
                    {t(`services.${svc.key}.title`)}
                  </span>
                  <span className={styles.serviceDesc}>
                    {t(`services.${svc.key}.desc`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ──── Mobile ──── */}
        <div className={styles.mobile}>
          <motion.div
            className={styles.mobileHead}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className={styles.mobileTitle}>{t('title')}</h2>
          </motion.div>

          <div className={styles.rail}>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.key}
                className={styles.railCard}
                style={{ '--line-color': LINE_COLORS[i] } as React.CSSProperties}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              >
                <div className={styles.railFront}>
                  <span className={styles.serviceNum}>{pad(i + 1)}</span>
                  <div className={styles.serviceIcon}><svc.icon /></div>
                  <span className={styles.serviceTitle}>
                    {t(`services.${svc.key}.title`)}
                  </span>
                </div>
                <div className={styles.railBack}>
                  <span className={styles.serviceTitle}>
                    {t(`services.${svc.key}.title`)}
                  </span>
                  <span className={styles.serviceDesc}>
                    {t(`services.${svc.key}.desc`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
});

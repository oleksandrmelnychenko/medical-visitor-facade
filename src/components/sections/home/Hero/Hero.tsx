"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { UserPlus, User } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const { status } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className={styles.hero}>
      <h1 className={styles.srOnly}>{t("title")}</h1>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          key={isMobile ? "mobile" : "desktop"}
        >
          <source
            src={isMobile ? "/assets/hero_mobile.mp4" : "/assets/hero_hd.mp4"}
            type="video/mp4"
          />
        </video>
      </div>

      {/* CTA + Login — single centered glass panel */}
      <motion.div
        className={styles.heroActions}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/apply" className={styles.heroButton}>
          <UserPlus size={18} />
          {tCommon("requestAppointment")}
        </Link>
        {status !== "authenticated" && (
          <Link href="/login" className={styles.heroLoginLink}>
            <User size={16} />
            {tCommon("login")}
          </Link>
        )}
      </motion.div>
    </section>
  );
}

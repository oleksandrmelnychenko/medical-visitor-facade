import { useTranslations } from "next-intl";
import { UserPlus, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");

  return (
    <section className={styles.hero}>
      <h1 className={styles.srOnly}>{t("title")}</h1>
      <div className={styles.videoContainer}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster-desktop.jpg"
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
      </div>

      <div className={styles.heroActions}>
        <Link href="/apply" prefetch={false} className={styles.heroButton}>
          <UserPlus size={18} />
          {tCommon("requestAppointment")}
        </Link>
        <Link href="/login" prefetch={false} className={styles.heroLoginLink}>
          <User size={16} />
          {tCommon("login")}
        </Link>
      </div>
    </section>
  );
}

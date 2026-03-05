import { useTranslations } from "next-intl";
import { UserPlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroAuthActions } from "./HeroAuthActions";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");

  return (
    <section className={styles.hero}>
      <h1 className={styles.srOnly}>{t("title")}</h1>
      <div className={styles.videoContainer}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline preload="metadata">
          <source src="/assets/hero_hd.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.heroActions}>
        <Link href="/apply" className={styles.heroButton}>
          <UserPlus size={18} />
          {tCommon("requestAppointment")}
        </Link>
        <HeroAuthActions loginLabel={tCommon("login")} />
      </div>
    </section>
  );
}

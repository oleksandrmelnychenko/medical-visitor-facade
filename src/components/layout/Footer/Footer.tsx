import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GmedHeaderLogo } from "@/components/branding/GmedHeaderLogo/GmedHeaderLogo";
import { FooterSwitch } from "./FooterSwitch";
import styles from "./Footer.module.scss";

type FooterProps = {
  locale: string;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");

  const authFooter = (
    <footer className={styles.authFooter}>
      <div className={styles.authFooterInner}>
        <p className={styles.authFooterText}>
          {t("copyright", { year: 2026 })}. {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );

  const mainFooter = (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.textSmall}>
              <p>{t("address")}</p>
            </div>
          </div>

          <div className={styles.column}>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="mailto:contact@gmed-health.com">contact@gmed-health.com</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <ul className={`${styles.linkList} ${styles.agencyList}`}>
              <li className={`${styles.linkItem} ${styles.agencyLinkItem}`}>
                <Link href="/financial-assistance" locale={locale}>
                  {t("financialAssistance")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.trustBadge} aria-label="5 stars, 250 plus">
          <div className={styles.trustStars} aria-hidden="true">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <p className={styles.trustCount}>250+</p>
        </div>

        <div className={styles.brandRow}>
          <div className={styles.brandBlock}>
            <GmedHeaderLogo className={styles.brandWordmark} />
          </div>

          <div className={styles.utilityRow}>
            <div className={styles.bottomBar}>
              <p>{t("copyright", { year: 2026 })}. {t("allRightsReserved")}.</p>
            </div>

            <a href="#" className={styles.backToTop}>
              <span>{t("backToTop")}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.legalBar}>
        <Link href="/privacy-policy" locale={locale} className={styles.legalLink}>
          {t("privacyPolicy")}
        </Link>
        <Link href="/legal-notice" locale={locale} className={styles.legalLink}>
          {t("impressum")}
        </Link>
      </div>
    </footer>
  );

  return <FooterSwitch main={mainFooter} auth={authFooter} />;
}

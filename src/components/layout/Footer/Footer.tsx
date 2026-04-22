import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoSvgOld } from "@/components/layout/Header/LogoSvgOld";
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
            <p className={styles.columnLabel}>{t("headquarters")}</p>
            <div className={styles.textSmall}>
              <p>{t("address")}</p>
            </div>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>{t("contact")}</p>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="mailto:contact@gmed-health.com">contact@gmed-health.com</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>{t("theAgency")}</p>
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

        <div className={styles.brandRow}>
          <div className={styles.brandBlock}>
            <LogoSvgOld className={styles.brandWordmark} />
          </div>

          <div className={styles.utilityRow}>
            <div className={styles.utilityLeft}>
              <div className={styles.bottomBar}>
                <p>{t("copyright", { year: 2026 })}. {t("allRightsReserved")}.</p>
              </div>
              <div className={styles.legalBar}>
                <Link href="/privacy-policy" locale={locale} className={styles.legalLink}>
                  {t("privacyPolicy")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link href="/legal-notice" locale={locale} className={styles.legalLink}>
                  {t("impressum")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>

            <a href="#" className={styles.backToTop}>
              <span>{t("backToTop")}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  return <FooterSwitch main={mainFooter} auth={authFooter} />;
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./Footer.module.scss";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div>
            <h3 className={styles.sectionTitle}>{t("headquarters")}</h3>
            <div className={styles.textSmall}>
              <p>{t("ownerName")}</p>
              <p>{t("address")}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.sectionTitle}>{t("contact")}</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="mailto:contact@gmed-health.com">
                  contact@gmed-health.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className={styles.sectionTitle}>{t("theAgency")}</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/financial-assistance">
                  {t("financialAssistance")}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/privacy-policy">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/legal-notice">
                  {t("impressum")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>{t("copyright", { year: new Date().getFullYear() })}. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
}

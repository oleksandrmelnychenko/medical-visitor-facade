"use client";

import { Activity, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./footer.module.scss";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Impressum */}
          <div>
            <h3 className={styles.sectionTitle}>{t("impressum")}</h3>
            <div className={styles.textSmall}>
              <p className="text-white">{t("companyName")}</p>
              <p>{t("owner")}</p>
              <p className="mt-3">Albert-Schweitzer-Straße 56</p>
              <p>81735 München, Germany</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.sectionTitle}>{t("contact")}</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@gmed-health.com">
                  contact@gmed-health.com
                </a>
              </li>
              <li className={styles.linkItem}>
                <Activity className="w-4 h-4 flex-shrink-0" />
                <a href="https://www.gmed-health.com">www.gmed-health.com</a>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className={styles.sectionTitle}>{t("vatTitle")}</h3>
            <p className={styles.textSmall}>{t("vatLegal")}</p>
            <p className={`${styles.textSmall} text-white mb-6`}>
              {t("vatNumber")}
            </p>
            <p className={styles.textSmall}>
              {t("contactPrompt")}{" "}
              <a
                href="mailto:contact@gmed-health.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@gmed-health.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

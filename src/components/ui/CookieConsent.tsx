"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { X } from "lucide-react";
import styles from "./cookie-consent.module.scss";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasAccepted) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={declineCookies}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.content}>
          <p className={styles.text}>
            {t("message")}{" "}
            <Link href="/privacy-policy" className={styles.link}>
              {t("learnMore")}
            </Link>
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.declineButton}
            onClick={declineCookies}
          >
            {t("decline")}
          </button>
          <button
            className={styles.acceptButton}
            onClick={acceptCookies}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import styles from "./header.module.scss";

export function Header() {
  const tCommon = useTranslations('common');
  const { locale, setLocale } = useLanguage();
  const { status } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoize languages array to prevent recreation on each render
  const languages = useMemo(() => [
    { code: 'de' as const, label: 'DE' },
    { code: 'en' as const, label: 'ENG' },
    { code: 'ru' as const, label: 'RU' },
    { code: 'es' as const, label: 'ES' },
  ], []);

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === locale),
    [languages, locale]
  );

  return (
    <header ref={headerRef} className={cn(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        {/* Row 1: Utility items (above logo) */}
        <div className={styles.utilityRow}>
          <div className={styles.utilityItems}>
            {status !== "authenticated" && (
              <>
                <Link href="/apply" className={styles.appointmentLink}>
                  {tCommon('requestAppointment')}
                </Link>
                <Link href="/login" className={styles.loginLink}>
                  <User />
                  {tCommon('login')}
                </Link>
              </>
            )}

            {/* Language Selector */}
            <div className={styles.languageSelector}>
              {languages.map((language, index) => (
                <span key={language.code}>
                  <button
                    onClick={() => setLocale(language.code)}
                    className={cn(styles.langButton, locale === language.code && styles.active)}
                  >
                    {language.label}
                  </button>
                  {index < languages.length - 1 && <span className={styles.langDivider}>,</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Logo (centered) */}
        <div className={styles.logoRow}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png"
              alt="Agency for Patient Care"
              width={200}
              height={54}
              className={styles.logo}
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

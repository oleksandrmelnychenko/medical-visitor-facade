"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { UserPlus, Menu, X, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Header.module.scss";

export function Header() {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const stickyLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 150);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideDesktopLang = langRef.current && !langRef.current.contains(event.target as Node);
      const clickedOutsideStickyLang = stickyLangRef.current && !stickyLangRef.current.contains(event.target as Node);

      if (clickedOutsideDesktopLang && clickedOutsideStickyLang) {
        setIsLangOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const languages = useMemo(() => [
    { code: 'de' as const, label: 'DE', fullName: 'Deutsch' },
    { code: 'en' as const, label: 'EN', fullName: 'English' },
    { code: 'ru' as const, label: 'RU', fullName: 'Русский' },
    { code: 'es' as const, label: 'ES', fullName: 'Español' },
  ], []);

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === locale),
    [languages, locale]
  );

  const currentPathWithSearch = searchParams.size
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const handleLanguageSelect = (code: 'de' | 'en' | 'ru' | 'es') => {
    router.replace(currentPathWithSearch, { locale: code });
    setIsLangOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLanguageSelect = (code: 'de' | 'en' | 'ru' | 'es') => {
    router.replace(currentPathWithSearch, { locale: code });
    setIsLangOpen(false);
    closeMobileMenu();
  };

  return (
    <>
      <div className={cn(styles.stickyHeader, isScrolled && styles.visible, isMobileMenuOpen && styles.noShadow)}>
        <div className={styles.stickyContainer}>
          <Link href="/" className={styles.stickyLogoLink}>
            <Image
              src="/assets/logo.png"
              alt="Medical Concierge Agency"
              width={120}
              height={32}
              className={styles.stickyLogo}
            />
            <span className={styles.stickyLogoTagline}>{tFooter.rich('companyName', { accent: (chunks) => <span className={styles.logoAccent}>{chunks}</span> })}</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={cn(styles.stickyMobileMenuButton, isMobileMenuOpen && styles.menuButtonOpen)}
          >
            <span
              className={cn(styles.hamburgerIcon, isMobileMenuOpen && styles.hamburgerIconOpen)}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>
          <div className={styles.stickyActions}>
            <Link href="/apply" className={styles.stickyButton}>
              {tCommon('requestAppointment')}
              <ArrowRight size={16} />
            </Link>
            <div className={styles.languageSelector} ref={stickyLangRef}>
              <button
                className={styles.stickyLangToggle}
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label={tCommon('selectLanguage')}
                aria-expanded={isLangOpen}
              >
                {currentLanguage?.label}
              </button>
              {isLangOpen && isScrolled && (
                <div className={styles.langDropdown}>
                  {languages.map((language, index) => (
                    <React.Fragment key={language.code}>
                      <button
                        onClick={() => handleLanguageSelect(language.code)}
                        className={cn(styles.langOption, locale === language.code && styles.active)}
                      >
                        {language.fullName}
                      </button>
                      {index < languages.length - 1 && <div className={styles.langSeparator} />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header ref={headerRef} className={styles.header} style={{ position: 'relative' }}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft} />

          <Link href="/" className={styles.logoLink}>
            <Image
              src="/assets/logo.png"
              alt="Agency for Patient Care"
              width={200}
              height={54}
              className={styles.logo}
              priority
            />
            <span className={styles.logoTagline}>{tFooter.rich('companyName', { accent: (chunks) => <span className={styles.logoAccent}>{chunks}</span> })}</span>
          </Link>

          <div className={styles.headerRight}>
            <div className={styles.languageSelector} ref={langRef}>
              <button
                className={styles.langToggle}
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label={tCommon('selectLanguage')}
                aria-expanded={isLangOpen}
              >
                {currentLanguage?.label}
              </button>
              {isLangOpen && (
                <div className={styles.langDropdown}>
                  {languages.map((language, index) => (
                    <React.Fragment key={language.code}>
                      <button
                        onClick={() => handleLanguageSelect(language.code)}
                        className={cn(styles.langOption, locale === language.code && styles.active)}
                      >
                        {language.fullName}
                      </button>
                      {index < languages.length - 1 && <div className={styles.langSeparator} />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      <div
        className={cn(styles.mobileMenuBackdrop, isMobileMenuOpen && styles.mobileMenuBackdropOpen)}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <div
        className={cn(
          styles.mobileMenu,
          isMobileMenuOpen && styles.mobileMenuOpen,
          isScrolled && styles.mobileMenuWithSticky
        )}
      >
        <div style={{ padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center", textAlign: "center" }}>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleMobileLanguageSelect(language.code)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: locale === language.code ? 600 : 400,
                  color: "#1a1a1a",
                  cursor: "pointer"
                }}
              >
                {language.label}
              </button>
            ))}
          </div>

          <Link
            href="/apply"
            onClick={closeMobileMenu}
            className={styles.mobileApplyButton}
          >
            <UserPlus size={16} />
            {tCommon('requestAppointment')}
          </Link>

          <div className={styles.mobileFooterLinks}>
            <div className={styles.mobileFooterTitle}>{tFooter("theAgency")}</div>
            <Link href="/financial-assistance" onClick={closeMobileMenu} className={styles.mobileFooterLink}>{tFooter('financialAssistance')}</Link>
            <Link href="/privacy-policy" onClick={closeMobileMenu} className={styles.mobileFooterLink}>{tFooter('privacyPolicy')}</Link>
            <Link href="/legal-notice" onClick={closeMobileMenu} className={styles.mobileFooterLink}>{tFooter('impressum')}</Link>
          </div>
        </div>
      </div>
      </header>
    </>
  );
}

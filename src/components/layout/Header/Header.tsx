"use client";

import React, { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import { UserPlus, User, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Header.module.scss";

const LANGUAGES = [
  { code: "de", label: "DE", fullName: "Deutsch" },
  { code: "en", label: "EN", fullName: "English" },
  { code: "ru", label: "RU", fullName: "Русский" },
  { code: "es", label: "ES", fullName: "Español" },
] as const;

type SupportedLocale = (typeof LANGUAGES)[number]["code"];

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
  const langRef = useRef<HTMLDivElement>(null);
  const stickyLangRef = useRef<HTMLDivElement>(null);

  const handleScroll = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 150);
  });

  const handleClickOutside = useEffectEvent((event: MouseEvent) => {
    const clickedOutsideDesktopLang =
      langRef.current && !langRef.current.contains(event.target as Node);
    const clickedOutsideStickyLang =
      stickyLangRef.current && !stickyLangRef.current.contains(event.target as Node);

    if (clickedOutsideDesktopLang && clickedOutsideStickyLang) {
      setIsLangOpen(false);
    }
  });

  const handleResize = useEffectEvent(() => {
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false);
    }
  });

  useEffect(() => {
    let frameId: number | null = null;
    const onScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        handleScroll();
      });
    };

    const onResize = () => {
      handleResize();
    };

    const onMouseDown = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onMouseDown);
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

  const currentLanguage = LANGUAGES.find((language) => language.code === locale) ?? LANGUAGES[1];

  const currentSearch = searchParams.toString();
  const currentPathWithSearch = currentSearch
    ? `${pathname}?${currentSearch}`
    : pathname;
  const showHomeLogin = pathname === "/";
  const showStickyLogin = pathname !== "/login";
  const hideHeader = pathname === "/login";

  if (hideHeader) {
    return null;
  }

  const handleLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
    setIsLangOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
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
            onClick={() => setIsMobileMenuOpen((open) => !open)}
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
            <Link href="/apply" prefetch={false} className={styles.stickyButton}>
              {tCommon('requestAppointment')}
              <ArrowRight size={16} />
            </Link>
            {showStickyLogin && (
              <Link href="/login" prefetch={false} className={styles.stickyLoginLink}>
                <User size={16} />
                <span>{tCommon("login")}</span>
              </Link>
            )}
            <div className={styles.languageSelector} ref={stickyLangRef}>
              <button
                className={styles.stickyLangToggle}
                onClick={() => setIsLangOpen((open) => !open)}
                aria-label={tCommon('selectLanguage')}
                aria-expanded={isLangOpen}
              >
                {currentLanguage?.label}
              </button>
              {isLangOpen && isScrolled && (
                <div className={styles.langDropdown}>
                  {LANGUAGES.map((language, index) => (
                    <React.Fragment key={language.code}>
                      <button
                        onClick={() => handleLanguageSelect(language.code)}
                        className={cn(styles.langOption, locale === language.code && styles.active)}
                      >
                        {language.fullName}
                      </button>
                      {index < LANGUAGES.length - 1 && <div className={styles.langSeparator} />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className={styles.header} style={{ position: 'relative' }}>
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
            {showHomeLogin && (
              <Link href="/login" prefetch={false} className={styles.headerLoginLink}>
                <User size={16} />
                <span>{tCommon("login")}</span>
              </Link>
            )}
            <div className={styles.languageSelector} ref={langRef}>
              <button
                className={styles.langToggle}
                onClick={() => setIsLangOpen((open) => !open)}
                aria-label={tCommon('selectLanguage')}
                aria-expanded={isLangOpen}
              >
                {currentLanguage?.label}
              </button>
              {isLangOpen && (
                <div className={styles.langDropdown}>
                  {LANGUAGES.map((language, index) => (
                    <React.Fragment key={language.code}>
                      <button
                        onClick={() => handleLanguageSelect(language.code)}
                        className={cn(styles.langOption, locale === language.code && styles.active)}
                      >
                        {language.fullName}
                      </button>
                      {index < LANGUAGES.length - 1 && <div className={styles.langSeparator} />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={cn(styles.mobileMenuButton, isMobileMenuOpen && styles.menuButtonOpen)}
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
          <div
            style={{
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
              {LANGUAGES.map((language) => (
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
                    cursor: "pointer",
                  }}
                >
                  {language.label}
                </button>
              ))}
            </div>

            <Link
              href="/apply"
              prefetch={false}
              onClick={closeMobileMenu}
              className={styles.mobileApplyButton}
            >
              <UserPlus size={16} />
              {tCommon("requestAppointment")}
            </Link>

            {showHomeLogin && (
              <Link
                href="/login"
                prefetch={false}
                onClick={closeMobileMenu}
                className={styles.mobileFooterLink}
              >
                {tCommon("login")}
              </Link>
            )}

            <div className={styles.mobileFooterLinks}>
              <div className={styles.mobileFooterTitle}>{tFooter("theAgency")}</div>
              <Link
                href="/financial-assistance"
                onClick={closeMobileMenu}
                className={styles.mobileFooterLink}
              >
                {tFooter("financialAssistance")}
              </Link>
              <Link
                href="/privacy-policy"
                onClick={closeMobileMenu}
                className={styles.mobileFooterLink}
              >
                {tFooter("privacyPolicy")}
              </Link>
              <Link
                href="/legal-notice"
                onClick={closeMobileMenu}
                className={styles.mobileFooterLink}
              >
                {tFooter("impressum")}
              </Link>
            </div>
          </div>
        </div>

        {showHomeLogin && !isMobileMenuOpen && (
          <Link
            href="/login"
            prefetch={false}
            className={styles.mobileLoginFab}
            aria-label={tCommon("login")}
          >
            <User size={24} />
          </Link>
        )}
      </header>
    </>
  );
}

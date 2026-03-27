"use client";

import React, { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import { UserPlus, User, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Header.module.scss";

const LANGUAGES = [
  { code: "de", label: "DE", fullName: "Deutsch", flagSrc: "/assets/flags/de.svg" },
  { code: "en", label: "EN", fullName: "English", flagSrc: "/assets/flags/gb.svg" },
  { code: "ru", label: "RU", fullName: "Русский", flagSrc: "/assets/flags/ru.svg" },
  { code: "es", label: "ES", fullName: "Español", flagSrc: "/assets/flags/es.svg" },
] as const;

type SupportedLocale = (typeof LANGUAGES)[number]["code"];

export function Header() {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isStickyLangOpen, setIsStickyLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const stickyLangRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useEffectEvent((event: MouseEvent) => {
    const clickedOutsideStickyLang =
      stickyLangRef.current && !stickyLangRef.current.contains(event.target as Node);

    if (clickedOutsideStickyLang) {
      setIsStickyLangOpen(false);
    }
  });

  const handleResize = useEffectEvent(() => {
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false);
    }
  });

  useEffect(() => {
    const onResize = () => {
      handleResize();
    };

    const onMouseDown = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("resize", onResize);
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
  const isLoginPage = pathname === "/login";
  const isApplyPage = pathname === "/apply";
  const showLogin = !isLoginPage;
  const showApplyCta = !isApplyPage;
  const showMobileLoginFab = showLogin && !isMobileMenuOpen && !isApplyPage;

  const handleLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
    setIsStickyLangOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
    setIsStickyLangOpen(false);
    closeMobileMenu();
  };

  return (
    <>
      <div
        className={cn(
          styles.stickyHeader,
          styles.visible,
          isMobileMenuOpen && styles.noShadow
        )}
      >
        <div className={styles.stickyContainer}>
          <Link href="/" className={styles.stickyLogoLink}>
            <Image
              src="/assets/logo.png"
              alt="Medical Concierge Agency"
              width={120}
              height={32}
              className={styles.stickyLogo}
            />
            <span className={styles.stickyLogoTagline}>
              {tFooter.rich("companyName", { accent: (chunks) => <span className={styles.logoAccent}>{chunks}</span> })}
            </span>
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
            <Link href="/membership" className={styles.stickyNavLink}>
              {tFooter("membership")}
              <ArrowUpRight aria-hidden="true" />
            </Link>
            {showApplyCta && (
              <Link href="/apply" prefetch={false} className={styles.stickyButton}>
                {tCommon('requestAppointment')}
              </Link>
            )}
            <span className={styles.stickyDivider} aria-hidden="true" />
            {showLogin && (
              <Link href="/login" prefetch={false} className={styles.stickyLoginLink}>
                <span>{tCommon("login")}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            )}
            <div className={styles.languageSelector} ref={stickyLangRef}>
              <button
                className={cn(styles.langOrb, isStickyLangOpen && styles.langOrbOpen)}
                onClick={() => {
                  setIsStickyLangOpen((open) => !open);
                }}
                aria-label={`${tCommon("selectLanguage")}: ${currentLanguage.fullName}`}
                aria-expanded={isStickyLangOpen}
              >
                <span className={styles.langOrbLabel}>{currentLanguage.label}</span>
              </button>
              {isStickyLangOpen && (
                <div className={styles.langDropdown}>
                  {LANGUAGES.map((language, index) => (
                    <React.Fragment key={language.code}>
                      <button
                        onClick={() => handleLanguageSelect(language.code)}
                        className={cn(styles.langOption, locale === language.code && styles.active)}
                      >
                        <span className={styles.langOptionInner}>
                          <span className={styles.langOptionCode}>{language.label}</span>
                          <span className={styles.langOptionName}>{language.fullName}</span>
                        </span>
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

      <header className={cn(styles.header, isApplyPage && styles.headerTransparent)}>
        <div
          className={cn(styles.mobileMenuBackdrop, isMobileMenuOpen && styles.mobileMenuBackdropOpen)}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        <div
          className={cn(
            styles.mobileMenu,
            isMobileMenuOpen && styles.mobileMenuOpen,
            styles.mobileMenuWithSticky
          )}
        >
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileLanguageTabs}>
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleMobileLanguageSelect(language.code)}
                  className={cn(
                    styles.mobileLanguageButton,
                    locale === language.code && styles.mobileLanguageButtonActive
                  )}
                >
                  {language.label}
                </button>
              ))}
            </div>

            {showApplyCta && (
              <Link
                href="/apply"
                prefetch={false}
                onClick={closeMobileMenu}
                className={styles.mobileApplyButton}
              >
                <UserPlus size={16} />
                {tCommon("requestAppointment")}
              </Link>
            )}

            {showLogin && (
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
                href="/membership"
                onClick={closeMobileMenu}
                className={styles.mobileFooterLink}
              >
                {tFooter("membership")}
              </Link>
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

        {showMobileLoginFab && (
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

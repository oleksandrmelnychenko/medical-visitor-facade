"use client";

import React, { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import { UserPlus, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { GmedHeaderLogo } from "@/components/branding/GmedHeaderLogo/GmedHeaderLogo";
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
type ClockParts = {
  dayPeriod?: string,
  hour: string,
  minute: string,
};

export function Header() {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clockParts, setClockParts] = useState<ClockParts | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useEffectEvent((event: MouseEvent) => {
    const clickedOutsideDesktopLang =
      langRef.current && !langRef.current.contains(event.target as Node);

    if (clickedOutsideDesktopLang) {
      setIsDesktopLangOpen(false);
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

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: "Europe/Berlin",
      hour: "numeric",
      minute: "2-digit",
    });

    const syncTimeLabel = () => {
      const parts = formatter.formatToParts(new Date());
      const hour = parts.find((part) => part.type === "hour")?.value ?? "";
      const minute = parts.find((part) => part.type === "minute")?.value ?? "";
      const hourValue = Number.parseInt(hour, 10);
      const dayPeriod = Number.isFinite(hourValue) ? (hourValue >= 12 ? "pm" : "am") : undefined;

      if (!hour || !minute) {
        return;
      }

      setClockParts({ dayPeriod, hour, minute });
    };

    syncTimeLabel();
    const intervalId = window.setInterval(syncTimeLabel, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [locale]);

  const currentLanguage = LANGUAGES.find((language) => language.code === locale) ?? LANGUAGES[1];

  const currentSearch = searchParams.toString();
  const currentPathWithSearch = currentSearch
    ? `${pathname}?${currentSearch}`
    : pathname;
  const isLoginPage = pathname === "/login";
  const isApplyPage = pathname === "/apply";
  const showLogin = !isLoginPage;
  const showApplyCta = !isApplyPage;
  const hideHeader = isLoginPage;
  const isHomePage = pathname === "/";
  const isOverlayHeader = isHomePage || isApplyPage;
  const locationLabel = tFooter("address").replace(/^\d+\s*/u, "");
  const primaryLinks = [
    ...(showApplyCta ? [{ href: "/apply", label: tCommon("requestAppointment") }] : []),
    ...(showLogin ? [{ href: "/login", label: tCommon("login") }] : []),
  ];

  if (hideHeader) {
    return null;
  }

  const handleLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
    setIsDesktopLangOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
    setIsDesktopLangOpen(false);
    closeMobileMenu();
  };

  const renderPrimaryLinks = () =>
    primaryLinks.map((item, index) => {
      const isActive = pathname === item.href;

      return (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            prefetch={false}
            className={cn(styles.navLink, isActive && styles.navLinkActive)}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
          {index < primaryLinks.length - 1 ? <span className={styles.navComma} aria-hidden="true">,</span> : null}
        </React.Fragment>
      );
    });

  const renderClock = () =>
    clockParts ? (
      <span className={styles.metaTime}>
        <span className={styles.timeNumber}>{clockParts.hour}</span>
        <span className={styles.timeSeparator} aria-hidden="true" />
        <span className={styles.timeNumber}>{clockParts.minute}</span>
        {clockParts.dayPeriod ? (
          <span className={styles.metaDayPeriod}>{clockParts.dayPeriod}</span>
        ) : null}
      </span>
    ) : null;

  return (
    <>
      <header className={cn(styles.header, isOverlayHeader && styles.headerTransparent)}>
        <div className={styles.headerRow}>
          <Link href="/" className={styles.logoLink}>
            {/* <Image
              src="/assets/logo.png"
              alt="Agency for Patient Care"
              width={200}
              height={54}
              className={styles.logo}
              priority
            />
            */}
            <GmedHeaderLogo className={styles.wordmark} title="GMED" />
            <span className={styles.logoTagline}>{tFooter.rich('companyName', { accent: (chunks) => <span className={styles.logoAccent}>{chunks}</span> })}</span>
          </Link>

          <div className={styles.headerMeta}>
            <span>{locationLabel}</span>
            {renderClock()}
          </div>

          <div className={styles.headerRight}>
            <nav className={styles.headerNav} aria-label="Primary">
              {renderPrimaryLinks()}
            </nav>
            <div className={styles.languageSelector} ref={langRef}>
              <button
                className={styles.langOrb}
                onClick={() => {
                  setIsDesktopLangOpen((open) => !open);
                }}
                aria-label={`${tCommon("selectLanguage")}: ${currentLanguage?.fullName}`}
                aria-expanded={isDesktopLangOpen}
              >
                <span className={styles.langOrbLabel}>{currentLanguage?.fullName}</span>
                <span className={styles.langOrbCore} aria-hidden="true" />
              </button>
              {isDesktopLangOpen && (
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
            isMobileMenuOpen && styles.mobileMenuOpen
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

        {showLogin && !isMobileMenuOpen && (
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
      {!isOverlayHeader ? <div className={styles.headerSpacer} aria-hidden="true" /> : null}
    </>
  );
}

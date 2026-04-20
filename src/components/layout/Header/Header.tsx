"use client";

import React, { startTransition, useEffect, useEffectEvent, useState } from "react";
import Image from "next/image";
import { User, House, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { MusicToggle } from "@/components/ui/MusicToggle";
import styles from "./Header.module.scss";

const LANGUAGES = [
  { code: "de", label: "DE", fullName: "Deutsch", flagSrc: "/assets/flags/de.svg" },
  { code: "en", label: "EN", fullName: "English", flagSrc: "/assets/flags/gb.svg" },
  { code: "ru", label: "RU", fullName: "Русский", flagSrc: "/assets/flags/ru.svg" },
  { code: "es", label: "ES", fullName: "Español", flagSrc: "/assets/flags/es.svg" },
] as const;

type SupportedLocale = (typeof LANGUAGES)[number]["code"];

const MENU_COPY = {
  de: {
    close: "Schließen",
    contactLabel: "Kontakt",
    contactLineOne: "Schreiben Sie uns",
    contactLineTwo: "direkt",
  },
  en: {
    close: "Close",
    contactLabel: "Contact",
    contactLineOne: "Write to us",
    contactLineTwo: "directly",
  },
  ru: {
    close: "Закрыть",
    contactLabel: "Контакты",
    contactLineOne: "Напишите нам",
    contactLineTwo: "напрямую",
  },
  es: {
    close: "Cerrar",
    contactLabel: "Contacto",
    contactLineOne: "Escríbanos",
    contactLineTwo: "directamente",
  },
} satisfies Record<
  SupportedLocale,
  {
    close: string;
    contactLabel: string;
    contactLineOne: string;
    contactLineTwo: string;
  }
>;

export function Header() {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const tHome = useTranslations("home");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(false);

  const handleResize = useEffectEvent(() => {
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false);
    }
  });

  useEffect(() => {
    const onResize = () => {
      handleResize();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
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
    const darkNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-dark-bg="true"]'));
    if (!darkNodes.length) {
      setIsOverDarkBg(false);
      return undefined;
    }

    const stickyHeaderHeight = 120;

    const checkOverlap = () => {
      let overlapping = false;
      for (const node of darkNodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top < stickyHeaderHeight && rect.bottom > 0) {
          overlapping = true;
          break;
        }
      }
      setIsOverDarkBg((prev) => (prev === overlapping ? prev : overlapping));
    };

    checkOverlap();
    window.addEventListener("scroll", checkOverlap, { passive: true });
    window.addEventListener("resize", checkOverlap);

    return () => {
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
    };
  }, [pathname]);

  const currentSearch = searchParams.toString();
  const currentPathWithSearch = currentSearch
    ? `${pathname}?${currentSearch}`
    : pathname;
  const isLoginPage = pathname === "/login";
  const isApplyPage = pathname === "/apply";
  const isMembershipPage = pathname === "/membership";
  const showLogin = !isLoginPage;
  const showApplyCta = !isApplyPage;
  const menuCopy = MENU_COPY[locale as SupportedLocale] ?? MENU_COPY.en;
  const menuShowcaseLinks = [
    { label: tCommon("home"), href: "/", type: "route" as const },
    { label: tFooter("membership"), href: "/membership", type: "route" as const },
    { label: tHome("faq.title"), href: "/#faq", type: "route" as const },
    { label: menuCopy.contactLabel, href: "mailto:contact@gmed-health.com", type: "external" as const },
  ] as const;

  const showMobileLoginFab = showLogin && !isMobileMenuOpen && !isApplyPage && !isMembershipPage;

  if (isLoginPage) {
    return (
      <header className={styles.header}>
        <Link
          href="/"
          prefetch={false}
          className={cn(styles.mobileLoginFab, styles.mobileHomeFab)}
          aria-label={tCommon("home")}
        >
          <House size={24} aria-hidden="true" />
        </Link>
      </header>
    );
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLanguageSelect = (code: SupportedLocale) => {
    startTransition(() => {
      router.replace(currentPathWithSearch, { locale: code });
    });
    closeMobileMenu();
  };

  const isMenuLinkActive = (href: string, type: "route" | "external") => {
    if (type !== "route" || href.includes("#")) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  return (
    <>
      <div className="headerOffset" aria-hidden="true" />
      <div
        className={cn(
          styles.stickyHeader,
          styles.visible,
          isMobileMenuOpen && styles.noShadow,
        )}
      >
        <div className={styles.stickyContainer}>
          <Link href="/" className={styles.stickyLogoLink}>
            <Image
              src="/assets/logo.png"
              alt="Medical Concierge Agency"
              width={150}
              height={59}
              className={cn(styles.stickyLogo, isOverDarkBg && styles.stickyLogoInverted)}
            />
            {/* <span className={styles.stickyLogoTagline}>
              {tFooter.rich("companyName", {
                accent: (chunks) => <span className={styles.logoAccent}>{chunks}</span>,
              })}
            </span> */}
          </Link>

          <div className={styles.stickyActions}>
            <MusicToggle />
            {showApplyCta && (
              <Link href="/apply" prefetch={false} className={styles.stickyButton}>
                <span className={styles.stickyButtonIcon} aria-hidden="true">
                  <ArrowUpRight />
                </span>
                <span className={styles.stickyButtonLabel}>{tCommon("requestAppointment")}</span>
                <span className={styles.stickyButtonDot} aria-hidden="true" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className={cn(styles.stickyMenuPill, isMobileMenuOpen && styles.stickyMenuPillOpen)}
            >
              <span className={styles.stickyMenuPillLabel} aria-hidden="true">
                <span className={styles.stickyMenuPillLabelTrack}>
                  <span className={styles.stickyMenuPillLabelText}>{tCommon("menu")}</span>
                  <span className={styles.stickyMenuPillLabelText}>{menuCopy.close}</span>
                </span>
              </span>
              <span className={styles.stickyMenuPillDots} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
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

            <div className={styles.menuDropdownStack}>
              <div className={styles.menuShowcaseCard}>
                <nav className={styles.menuShowcaseNav} aria-label={tCommon("menu")}>
                  {menuShowcaseLinks.map((item) => {
                    const active = isMenuLinkActive(item.href, item.type);

                    if (item.type === "external") {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className={styles.menuShowcaseLink}
                          onClick={closeMobileMenu}
                        >
                          <span className={styles.menuShowcaseText}>{item.label}</span>
                          {active && <span className={styles.menuShowcaseDot} aria-hidden="true" />}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        prefetch={false}
                        onClick={closeMobileMenu}
                        className={styles.menuShowcaseLink}
                      >
                        <span className={styles.menuShowcaseText}>{item.label}</span>
                        {active && <span className={styles.menuShowcaseDot} aria-hidden="true" />}
                      </Link>
                    );
                  })}
                </nav>

                <div className={styles.menuShowcaseFooter}>
                  <div className={styles.menuLocaleRail}>
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

                  {showLogin && (
                    <Link
                      href="/login"
                      prefetch={false}
                      onClick={closeMobileMenu}
                      className={styles.menuMetaLink}
                    >
                      {tCommon("login")}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>

              <div className={styles.menuContactCard}>
                <p className={styles.menuContactTitle}>
                  <span>{menuCopy.contactLineOne}</span>
                  <span>{menuCopy.contactLineTwo}</span>
                </p>

                <a
                  href="mailto:contact@gmed-health.com"
                  className={styles.menuContactField}
                  onClick={closeMobileMenu}
                >
                  <span className={styles.menuContactFieldText}>contact@gmed-health.com</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>

              <Link
                href="/financial-assistance"
                onClick={closeMobileMenu}
                className={styles.menuFeatureCard}
              >
                <span className={styles.menuFeatureGlyph} aria-hidden="true" />
                <span className={styles.menuFeatureLabel}>{tFooter("financialAssistance")}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>

              <div className={styles.mobileFooterLinks}>
                <Link
                  href="/financial-assistance"
                  onClick={closeMobileMenu}
                  className={styles.mobileFooterLink}
                >
                  {tFooter("financialAssistance")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link
                  href="/privacy-policy"
                  onClick={closeMobileMenu}
                  className={styles.mobileFooterLink}
                >
                  {tFooter("privacyPolicy")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link
                  href="/legal-notice"
                  onClick={closeMobileMenu}
                  className={styles.mobileFooterLink}
                >
                  {tFooter("impressum")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
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

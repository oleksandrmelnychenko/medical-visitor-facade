"use client";

import React, { startTransition, useEffect, useEffectEvent, useState } from "react";
import { User, House, ArrowUpRight, ArrowLeft, Layers } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/shared/lib/cn";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LogoSvg } from "./LogoSvg";
import { LogoSvgOld } from "./LogoSvgOld";
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
  const [isScrolled, setIsScrolled] = useState(false);

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
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const prev = {
      htmlOverflow: documentElement.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyTouch: body.style.touchAction,
    };

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";

    return () => {
      documentElement.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      body.style.touchAction = prev.bodyTouch;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(`.${styles.mobileMenuContent}`)) return;
      if (target.closest(`.${styles.stickyMenuPill}`)) return;
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isMobileMenuOpen]);

  const currentSearch = searchParams.toString();
  const currentPathWithSearch = currentSearch
    ? `${pathname}?${currentSearch}`
    : pathname;
  const isLoginPage = pathname === "/login";
  const isApplyPage = pathname === "/apply";
  const isMembershipPage = pathname === "/membership";
  const showStickyFullBrand = isScrolled || isApplyPage || isMembershipPage;
  const showLogin = !isLoginPage;
  const showApplyCta = !isApplyPage;
  const menuCopy = MENU_COPY[locale as SupportedLocale] ?? MENU_COPY.en;
  const menuShowcaseLinks = [
    { label: tCommon("home"), href: "/", type: "route" as const },
    { label: tCommon("services"), href: "/#journey", type: "route" as const },
    { label: tHome("faq.title"), href: "/#faq", type: "route" as const },
    { label: tCommon("programs"), href: "/membership", type: "route" as const },
  ] as const;

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

  const handleLanguageSelect = (code: SupportedLocale) => {
    if (code === locale) return;
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
          isScrolled && styles.stickyHeaderScrolled,
          isMobileMenuOpen && styles.noShadow,
        )}
      >
        <div className={styles.stickyContainer}>
          <Link
            href="/"
            className={cn(styles.stickyLogoLink, showStickyFullBrand && styles.stickyLogoLinkWordmark)}
            aria-label="Medical Concierge Agency"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className={styles.stickyLogoBadge}>
              <LogoSvg className={cn(styles.stickyLogo, styles.stickyLogoMark)} aria-hidden="true" />
              <LogoSvgOld className={cn(styles.stickyLogo, styles.stickyLogoWordmark)} aria-hidden="true" />
            </span>
          </Link>

          <span
            className={cn(
              styles.stickyTaglineMeta,
              showStickyFullBrand && styles.stickyTaglineMetaVisible,
            )}
            aria-hidden={!showStickyFullBrand}
          >
            Medical Concierge Agency
          </span>

          <div className={styles.stickyActions}>
            <div className={styles.stickyLocaleGroup} role="group" aria-label={tCommon("language")}>
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageSelect(language.code)}
                  className={cn(
                    styles.stickyLocaleButton,
                    locale === language.code && styles.stickyLocaleButtonActive
                  )}
                  aria-pressed={locale === language.code}
                  aria-label={language.fullName}
                >
                  {language.label}
                </button>
              ))}
            </div>
            <Link
              href="/membership"
              prefetch={false}
              className={cn(
                styles.stickyNavLink,
                isMembershipPage && styles.stickyNavLinkActive
              )}
              aria-current={isMembershipPage ? "page" : undefined}
            >
              <Layers size={16} strokeWidth={2} aria-hidden="true" />
              <span className={styles.stickyNavLinkLabel}>{tCommon("programs")}</span>
            </Link>
            {showApplyCta && (
              <Link href="/apply" prefetch={false} className={styles.stickyButton}>
                <span className={styles.stickyButtonIcon} aria-hidden="true">
                  <ArrowUpRight />
                </span>
                <span className={styles.stickyButtonLabel}>{tCommon("headerRequestAppointment")}</span>
              </Link>
            )}
            {showLogin && (
              <Link href="/login" prefetch={false} className={styles.stickyLoginLink}>
                <User size={16} strokeWidth={2} aria-hidden="true" />
                <span className={styles.stickyLoginLabel}>{tCommon("login")}</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? tCommon("closeMenu") : tCommon("openMenu")}
              aria-expanded={isMobileMenuOpen}
              className={cn(
                styles.stickyMenuPill,
                styles.stickyMenuPillMobileOnly,
                isMobileMenuOpen && styles.stickyMenuPillOpen
              )}
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

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        prefetch={false}
                        onClick={closeMobileMenu}
                        className={styles.menuShowcaseLink}
                      >
                        <span className={styles.menuShowcaseText}>{item.label}</span>
                        <span className={styles.menuShowcaseArrow} aria-hidden="true">
                          <ArrowLeft />
                        </span>
                        {active && <span className={styles.menuShowcaseDot} aria-hidden="true" />}
                      </Link>
                    );
                  })}
                </nav>

                <div className={styles.menuShowcaseFooter}>
                  {showLogin && (
                    <Link
                      href="/login"
                      prefetch={false}
                      onClick={closeMobileMenu}
                      className={styles.menuMetaLink}
                    >
                      <span className={styles.menuMetaLinkAvatar} aria-hidden="true">
                        <User size={16} strokeWidth={2} />
                      </span>
                      {tCommon("login")}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>

              <Link
                href="/apply"
                prefetch={false}
                onClick={closeMobileMenu}
                className={styles.menuFeatureCard}
              >
                <span className={styles.menuFeatureGlyph} aria-hidden="true" />
                <span className={styles.menuFeatureLabel}>{tCommon("headerRequestAppointment")}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>

              <div className={styles.menuContactCard}>
                <p className={styles.menuContactTitle}>
                  <span>{menuCopy.contactLineOne}</span>
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

              <div className={styles.menuLanguageRow} role="group" aria-label={tCommon("language")}>
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleLanguageSelect(language.code)}
                    className={cn(
                      styles.menuLanguageButton,
                      locale === language.code && styles.menuLanguageButtonActive
                    )}
                    aria-pressed={locale === language.code}
                    aria-label={language.fullName}
                  >
                    {language.label}
                  </button>
                ))}
              </div>

              <div className={styles.mobileFooterLinks}>
                <Link
                  href="/pro-bono"
                  onClick={closeMobileMenu}
                  className={styles.mobileFooterLink}
                >
                  <span className={styles.mobileFooterLinkText}>{tFooter("financialAssistance")}</span>
                  <span className={styles.mobileFooterLinkArrow} aria-hidden="true">
                    <ArrowLeft />
                  </span>
                </Link>
                <Link
                  href="/privacy-policy"
                  onClick={closeMobileMenu}
                  className={styles.mobileFooterLink}
                >
                  <span className={styles.mobileFooterLinkText}>{tFooter("privacyPolicy")}</span>
                  <span className={styles.mobileFooterLinkArrow} aria-hidden="true">
                    <ArrowLeft />
                  </span>
                </Link>
                <Link
                  href="/legal-notice"
                  onClick={closeMobileMenu}
                  className={styles.mobileFooterLink}
                >
                  <span className={styles.mobileFooterLinkText}>{tFooter("impressum")}</span>
                  <span className={styles.mobileFooterLinkArrow} aria-hidden="true">
                    <ArrowLeft />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

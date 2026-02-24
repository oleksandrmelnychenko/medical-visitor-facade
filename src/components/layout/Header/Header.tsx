"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, UserPlus, LogOut, Menu, X, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import styles from "./Header.module.scss";

export function Header() {
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const tFooter = useTranslations('footer');
  const tAccount = useTranslations('account');
  const { locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const stickyLangRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Combined event listeners for better performance
  useEffect(() => {
    // Scroll detection with RAF throttling
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

    // Click outside detection for dropdowns
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideDesktopLang = langRef.current && !langRef.current.contains(event.target as Node);
      const clickedOutsideStickyLang = stickyLangRef.current && !stickyLangRef.current.contains(event.target as Node);

      if (clickedOutsideDesktopLang && clickedOutsideStickyLang) {
        setIsLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
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

  const isHomePath = useMemo(() => {
    const cleanPath = (pathname ?? "/").replace(/\/$/, "") || "/";
    return cleanPath === "/" || ["/de", "/en", "/ru", "/es"].includes(cleanPath);
  }, [pathname]);

  const handleLanguageSelect = (code: 'de' | 'en' | 'ru' | 'es') => {
    setLocale(code);
    setIsLangOpen(false);
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const userName = session?.user?.name ||
    ((session?.user as { firstName?: string; lastName?: string })?.firstName &&
     (session?.user as { firstName?: string; lastName?: string })?.lastName
      ? `${(session?.user as { firstName?: string })?.firstName} ${(session?.user as { lastName?: string })?.lastName}`
      : null) ||
    session?.user?.email?.split('@')[0] ||
    'User';
  const userEmail = session?.user?.email;
  const userPhone = (session?.user as { phone?: string })?.phone;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Close mobile menu on language select
  const handleMobileLanguageSelect = (code: 'de' | 'en' | 'ru' | 'es') => {
    setLocale(code);
    setIsLangOpen(false);
    closeMobileMenu();
  };

  return (
    <>
      {/* Sticky Header - appears on scroll */}
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
            {status !== "authenticated" && (
              <Link href="/login" className={styles.stickyLoginLink}>
                <User size={18} aria-hidden="true" />
                {tCommon('login')}
              </Link>
            )}
            {status === "authenticated" && (
              <Link href="/account" className={styles.stickyLoginLink}>
                <User size={18} aria-hidden="true" />
                {userName}
              </Link>
            )}
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

      {/* Main Header — single row: [left] [logo] [right] */}
      <header ref={headerRef} className={styles.header} style={{ position: 'relative' }}>
        <div className={styles.headerRow}>
          {/* Left: empty for grid balance */}
          <div className={styles.headerLeft} />

          {/* Center: logo */}
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/assets/logo.png"
              alt="Agency for Patient Care"
              width={200}
              height={54}
              className={styles.logo}
              priority
            />
          </Link>

          {/* Right: actions + lang (like sticky header) */}
          <div className={styles.headerRight}>
            <Link href="/apply" className={styles.headerButton}>
              <UserPlus size={16} />
              {tCommon('requestAppointment')}
            </Link>
            {status !== "authenticated" && (
              <Link href="/login" className={styles.headerLoginLink}>
                <User size={16} />
                {tCommon('login')}
              </Link>
            )}
            {status === "authenticated" && (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userMenuToggle}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label={tCommon('userMenu')}
                  aria-expanded={isUserMenuOpen}
                >
                  <User size={16} aria-hidden="true" />
                  {userName}
                </button>
                {isUserMenuOpen && (
                  <div className={styles.userMenuDropdown}>
                    {isAdmin ? (
                      <Link href="/admin" className={styles.userMenuLink} onClick={() => setIsUserMenuOpen(false)}>
                        {tAdmin("adminPanel")}
                      </Link>
                    ) : (
                      <Link href="/account" className={styles.userMenuLink} onClick={() => setIsUserMenuOpen(false)}>
                        {tAccount("tabs.account")}
                      </Link>
                    )}
                    {userPhone && <div className={styles.userMenuInfo}>{userPhone}</div>}
                    {userEmail && <div className={styles.userMenuInfo}>{userEmail}</div>}
                    <div className={styles.userMenuSeparator} />
                    <button onClick={handleLogout} className={styles.userMenuLogout}>
                      <LogOut size={16} aria-hidden="true" />
                      {tAdmin("logout")}
                    </button>
                  </div>
                )}
              </div>
            )}
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

          {/* Mobile: hamburger */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      {/* Mobile Dropdown Menu - appears below hamburger */}
      {/* Invisible backdrop to close menu on outside click */}
      <div
        className={cn(styles.mobileMenuBackdrop, isMobileMenuOpen && styles.mobileMenuBackdropOpen)}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Dropdown panel */}
      <div
        className={cn(
          styles.mobileMenu,
          isMobileMenuOpen && styles.mobileMenuOpen,
          isScrolled && styles.mobileMenuWithSticky
        )}
      >
            <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              {status !== "authenticated" && (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 500, padding: '0.5rem 0', textDecoration: 'none', color: '#2d2d32' }}
                >
                  <User size={20} />
                  {tCommon('login')}
                </Link>
              )}

              {status === "authenticated" && (
                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 500, padding: '0.5rem 0', textDecoration: 'none', color: '#2d2d32' }}
                >
                  <User size={20} />
                  <span>{userName}</span>
                </Link>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleMobileLanguageSelect(language.code)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: locale === language.code ? 600 : 400,
                      color: '#1a1a1a',
                      cursor: 'pointer'
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

              {/* Footer links */}
              <div className={styles.mobileFooterLinks}>
                <div className={styles.mobileFooterTitle}>{tFooter("theAgency")}</div>
                <Link href="/financial-assistance" onClick={closeMobileMenu} className={styles.mobileFooterLink}>{tFooter('financialAssistance')}</Link>
                <Link href="/privacy-policy" onClick={closeMobileMenu} className={styles.mobileFooterLink}>{tFooter('privacyPolicy')}</Link>
                <Link href="/legal-notice" onClick={closeMobileMenu} className={styles.mobileFooterLink}>{tFooter('impressum')}</Link>
              </div>

              {status === "authenticated" && (
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={18} />
                  {tAdmin("logout")}
                </button>
              )}
            </div>
          </div>
      </header>
    </>
  );
}

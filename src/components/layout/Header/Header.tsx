"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, Menu, X, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import styles from "./Header.module.scss";

export function Header() {
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const tFooter = useTranslations('footer');
  const { locale, setLocale } = useLanguage();
  const { data: session, status } = useSession();
  const userRole = (session?.user as { role?: string })?.role;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const isAdmin = userRole === "ADMIN" || userRole === "MANAGER";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Close mobile menu on language select
  const handleMobileLanguageSelect = (code: 'de' | 'en' | 'ru' | 'es') => {
    setLocale(code);
    setIsLangOpen(false);
    closeMobileMenu();
  };

  return (
    <header ref={headerRef} className={cn(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        {/* Mobile header buttons - login + hamburger */}
        <div className={styles.mobileControls}>
          {status !== "authenticated" && (
            <Link href="/login" className={styles.mobileLoginButton} aria-label={tCommon('login')}>
              <User size={20} />
            </Link>
          )}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className={styles.utilityRow}>
            {isAdmin && (
              <Link href="/admin" className={styles.adminTitle}>{tAdmin("adminPanel")}</Link>
            )}

            <div className={styles.utilityItems}>
              {status !== "authenticated" && (
                <>
                  <Link href="/apply" className={styles.appointmentLink}>
                    {tCommon('requestAppointment')}
                  </Link>
                  <Link href="/login" className={styles.loginLink}>
                    <User aria-hidden="true" />
                    {tCommon('login')}
                  </Link>
                </>
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

              {status === "authenticated" && (
                <div className={styles.userMenu} ref={userMenuRef}>
                  <button
                    className={styles.userMenuToggle}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label={tCommon('userMenu')}
                    aria-expanded={isUserMenuOpen}
                  >
                    <User size={18} aria-hidden="true" />
                    {userName}
                  </button>
                  {isUserMenuOpen && (
                    <div className={styles.userMenuDropdown}>
                      {userPhone && (
                        <div className={styles.userMenuInfo}>{userPhone}</div>
                      )}
                      {userEmail && (
                        <div className={styles.userMenuInfo}>{userEmail}</div>
                      )}
                      <div className={styles.userMenuSeparator} />
                      <button onClick={handleLogout} className={styles.userMenuLogout}>
                        <LogOut size={16} aria-hidden="true" />
                        {tAdmin("logout")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

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

      {/* Mobile menu backdrop */}
      <div
        className={cn(styles.mobileMenuBackdrop, isMobileMenuOpen && styles.open)}
        onClick={closeMobileMenu}
      />

      {/* Mobile menu dropdown */}
      <div className={cn(styles.mobileMenuDropdown, isMobileMenuOpen && styles.open)}>
        <div className={styles.mobileMenuContent}>
          {status !== "authenticated" && (
            <Link href="/login" onClick={closeMobileMenu} className={styles.mobileMenuItem}>
              <User size={20} />
              {tCommon('login')}
            </Link>
          )}

          {status === "authenticated" && (
            <div className={styles.mobileUserInfo}>
              <User size={20} />
              <span>{userName}</span>
            </div>
          )}

          <div className={styles.mobileLanguages}>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleMobileLanguageSelect(language.code)}
                className={cn(styles.mobileLangButton, locale === language.code && styles.active)}
              >
                {language.label}
              </button>
            ))}
          </div>

          <Link href="/apply" onClick={closeMobileMenu} className={styles.mobileApplyButton}>
            {tCommon('requestAppointment')}
            <ArrowRight size={16} />
          </Link>

          {/* Footer links */}
          <div className={styles.mobileFooterLinks}>
            <div className={styles.mobileFooterTitle}>The Agency</div>
            <Link href="/financial-assistance" onClick={closeMobileMenu} className={styles.mobileFooterLink}>
              {tFooter('financialAssistance')}
            </Link>
            <Link href="/privacy-policy" onClick={closeMobileMenu} className={styles.mobileFooterLink}>
              {tFooter('privacyPolicy')}
            </Link>
            <Link href="/legal-notice" onClick={closeMobileMenu} className={styles.mobileFooterLink}>
              {tFooter('impressum')}
            </Link>
          </div>

          {status === "authenticated" && (
            <button onClick={handleLogout} className={styles.mobileLogoutButton}>
              <LogOut size={18} />
              {tAdmin("logout")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

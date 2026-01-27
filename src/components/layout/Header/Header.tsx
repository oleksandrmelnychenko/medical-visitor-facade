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
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <header ref={headerRef} className={cn(styles.header, isScrolled && styles.scrolled)} style={{ position: 'relative' }}>
      <div className={styles.container} style={{ position: 'relative' }}>
        {/* Mobile hamburger button - JS controls visibility */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          style={{
            display: isMobile ? 'flex' : 'none',
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'white',
            border: '1px solid #1a1a1a',
            borderRadius: '4px',
            padding: '0.5rem',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <Menu size={20} />
        </button>

        {/* Desktop navigation - JS hides on mobile */}
        <div className={styles.utilityRow} style={{ display: isMobile ? 'none' : 'flex' }}>
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

      {/* Mobile Dropdown Menu - appears below hamburger */}
      {/* Invisible backdrop to close menu on outside click */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998
          }}
          onClick={closeMobileMenu}
        />
      )}

      {/* Dropdown panel */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          zIndex: 999,
          boxShadow: 'none',
          borderTop: 'none',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'transform 0.25s ease, opacity 0.25s ease'
        }}
      >
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center' }}>
              {status !== "authenticated" && (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 500 }}
                >
                  <User size={18} />
                  {tCommon('login')}
                </Link>
              )}

              {status === "authenticated" && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 500 }}>
                  <User size={18} />
                  <span>{userName}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleMobileLanguageSelect(language.code)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.9rem',
                      fontWeight: locale === language.code ? 600 : 400,
                      color: '#1a1a1a',
                      cursor: 'pointer',
                      textDecoration: locale === language.code ? 'underline' : 'none',
                      textUnderlineOffset: '2px'
                    }}
                  >
                    {language.label}
                  </button>
                ))}
              </div>

              <Link
                href="/apply"
                onClick={closeMobileMenu}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  background: '#1a1a1a',
                  border: '1px solid #fff',
                  color: 'white',
                  padding: '1rem 2rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  cursor: 'pointer'
                }}
              >
                {tCommon('requestAppointment')}
                <ArrowRight size={16} />
              </Link>

              {/* Footer links */}
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Agency</div>
                <Link href="/financial-assistance" onClick={closeMobileMenu} style={{ fontSize: '0.875rem', color: '#1a1a1a', textDecoration: 'underline' }}>{tFooter('financialAssistance')}</Link>
                <Link href="/privacy-policy" onClick={closeMobileMenu} style={{ fontSize: '0.875rem', color: '#1a1a1a', textDecoration: 'underline' }}>{tFooter('privacyPolicy')}</Link>
                <Link href="/legal-notice" onClick={closeMobileMenu} style={{ fontSize: '0.875rem', color: '#1a1a1a', textDecoration: 'underline' }}>{tFooter('impressum')}</Link>
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
  );
}

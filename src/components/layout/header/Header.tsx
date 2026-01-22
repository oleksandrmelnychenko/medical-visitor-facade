"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import styles from "./header.module.scss";

export function Header() {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');
  const { locale, setLocale } = useLanguage();
  const { status } = useSession();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
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

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    setMobileSubmenu(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  }, []);

  // Memoized toggle function using functional setState
  const toggleMenu = useCallback((menuName: string) => {
    setActiveMenu(prev => prev === menuName ? null : menuName);
  }, []);

  // Memoize languages array to prevent recreation on each render
  const languages = useMemo(() => [
    { code: 'de' as const, name: 'Deutsch', flag: 'https://flagcdn.com/w80/de.png' },
    { code: 'en' as const, name: 'English', flag: 'https://flagcdn.com/w80/gb.png' },
    { code: 'ru' as const, name: 'Русский', flag: 'https://flagcdn.com/w80/ru.png' },
    { code: 'es' as const, name: 'Español', flag: 'https://flagcdn.com/w80/es.png' },
  ], []);

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === locale),
    [languages, locale]
  );

  // Memoize ordered languages for flag stack
  const orderedLanguages = useMemo(
    () => [currentLanguage, ...languages.filter(l => l.code !== locale)],
    [currentLanguage, languages, locale]
  );

  // Keep menu open on link click (page will navigate)
  const handleLinkClick = () => {};

  return (
    <header ref={headerRef} className={cn(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        {/* Row 1: Logo (centered) */}
        <div className={styles.topRow}>
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

          {/* Mobile menu button */}
          <button className={styles.mobileButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Row 2: Navigation + Utility items */}
        <div className={styles.bottomRow}>
          <nav className={styles.nav}>
            <div className={cn(styles.navItem, styles.pastelPink, activeMenu === 'care' && styles.active)}>
              <button onClick={() => toggleMenu('care')}>
                {t('care')}
              </button>
            </div>
            <div className={cn(styles.navItem, styles.pastelBlue, activeMenu === 'patient' && styles.active)}>
              <button onClick={() => toggleMenu('patient')}>
                {t('patientResources')}
              </button>
            </div>
            <div className={cn(styles.navItem, styles.pastelGreen, activeMenu === 'trust' && styles.active)}>
              <button onClick={() => toggleMenu('trust')}>
                {t('trustSafety')}
              </button>
            </div>
          </nav>

          <div className={styles.utilityItems}>
            {status !== "authenticated" && (
              <>
                <Link href="/apply" className={styles.appointmentParams}>
                  {tCommon('requestAppointment')}
                </Link>
                <Link href="/login" className={styles.loginLink}>
                  <User className="w-4 h-4" />
                  {tCommon('login')}
                </Link>
              </>
            )}

            {/* Language Selector */}
            <div className={styles.languageSelector}>
              <button
                onClick={() => toggleMenu('language')}
                className={styles.languageButton}
              >
                <div className={styles.flagStack}>
                  {orderedLanguages.map((language, index) => (
                    <span
                      key={language?.code}
                      className={cn(
                        styles.flagCircle,
                        index === 0 && styles.flagActive,
                        index === 1 && styles.flagBehind1,
                        index === 2 && styles.flagBehind2
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={language?.flag} alt={language?.name} />
                    </span>
                  ))}
                </div>
                <ChevronDown className={styles.flagChevron} />
              </button>

              {activeMenu === 'language' && (
                <div className={styles.languageDropdown}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLocale(language.code);
                        setActiveMenu(null);
                      }}
                      className={cn(styles.languageOption, locale === language.code && styles.active)}
                    >
                      <span className={styles.flagCircleSmall}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={language.flag} alt={language.name} />
                      </span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

        {/* Row 3: Submenu (appears on menu item click) */}
        <AnimatePresence mode="wait">
          {(activeMenu === 'care' || activeMenu === 'patient' || activeMenu === 'trust') && (
            <motion.div
              key={activeMenu}
              className={styles.submenuRow}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.submenuContent}>
                {activeMenu === 'care' && (
                  <>
                    {[
                      { href: '/patient-centered-care', label: t('patientCenteredCare') },
                      { href: '/about-gmed', label: t('aboutGmed') },
                      { href: '/apply', label: t('requestAppointment') },
                      { href: '/locations', label: t('locations') },
                    ].map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                      >
                        <Link href={link.href} onClick={handleLinkClick} className={cn(styles.submenuLink, pathname === link.href && styles.active)}>
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
                {activeMenu === 'patient' && (
                  <>
                    {[
                      { href: '/patient-services', label: t('patientServices') },
                      { href: '/medical-records', label: t('medicalRecords') },
                      { href: '/insurance', label: t('insuranceBilling') },
                    ].map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                      >
                        <Link href={link.href} onClick={handleLinkClick} className={cn(styles.submenuLink, pathname === link.href && styles.active)}>
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
                {activeMenu === 'trust' && (
                  <>
                    {[
                      { href: '/privacy-policy', label: t('privacyPolicy') },
                      { href: '/data-security', label: t('dataSecurity') },
                      { href: '/hipaa-compliance', label: t('hipaaCompliance') },
                      { href: '/patient-rights', label: t('patientRights') },
                    ].map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                      >
                        <Link href={link.href} onClick={handleLinkClick} className={cn(styles.submenuLink, pathname === link.href && styles.active)}>
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.mobileMenuContent}>
                {/* Navigation */}
                <nav className={styles.mobileNav}>
                  {/* Care Menu */}
                  <div className={styles.mobileNavItem}>
                    <button
                      onClick={() => setMobileSubmenu(mobileSubmenu === 'care' ? null : 'care')}
                      className={cn(styles.mobileNavButton, mobileSubmenu === 'care' && styles.active)}
                    >
                      {t('care')}
                      <ChevronRight className={cn(styles.mobileChevron, mobileSubmenu === 'care' && styles.rotated)} />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenu === 'care' && (
                        <motion.div
                          className={styles.mobileSubmenu}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link href="/patient-centered-care" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/patient-centered-care' && styles.active)}>
                            {t('patientCenteredCare')}
                          </Link>
                          <Link href="/about-gmed" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/about-gmed' && styles.active)}>
                            {t('aboutGmed')}
                          </Link>
                          <Link href="/apply" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/apply' && styles.active)}>
                            {t('requestAppointment')}
                          </Link>
                          <Link href="/locations" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/locations' && styles.active)}>
                            {t('locations')}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Patient Resources Menu */}
                  <div className={styles.mobileNavItem}>
                    <button
                      onClick={() => setMobileSubmenu(mobileSubmenu === 'patient' ? null : 'patient')}
                      className={cn(styles.mobileNavButton, mobileSubmenu === 'patient' && styles.active)}
                    >
                      {t('patientResources')}
                      <ChevronRight className={cn(styles.mobileChevron, mobileSubmenu === 'patient' && styles.rotated)} />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenu === 'patient' && (
                        <motion.div
                          className={styles.mobileSubmenu}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link href="/patient-services" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/patient-services' && styles.active)}>
                            {t('patientServices')}
                          </Link>
                          <Link href="/medical-records" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/medical-records' && styles.active)}>
                            {t('medicalRecords')}
                          </Link>
                          <Link href="/insurance" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/insurance' && styles.active)}>
                            {t('insuranceBilling')}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Trust & Safety Menu */}
                  <div className={styles.mobileNavItem}>
                    <button
                      onClick={() => setMobileSubmenu(mobileSubmenu === 'trust' ? null : 'trust')}
                      className={cn(styles.mobileNavButton, mobileSubmenu === 'trust' && styles.active)}
                    >
                      {t('trustSafety')}
                      <ChevronRight className={cn(styles.mobileChevron, mobileSubmenu === 'trust' && styles.rotated)} />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenu === 'trust' && (
                        <motion.div
                          className={styles.mobileSubmenu}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link href="/privacy-policy" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/privacy-policy' && styles.active)}>
                            {t('privacyPolicy')}
                          </Link>
                          <Link href="/data-security" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/data-security' && styles.active)}>
                            {t('dataSecurity')}
                          </Link>
                          <Link href="/hipaa-compliance" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/hipaa-compliance' && styles.active)}>
                            {t('hipaaCompliance')}
                          </Link>
                          <Link href="/patient-rights" onClick={closeMobileMenu} className={cn(styles.mobileSubmenuLink, pathname === '/patient-rights' && styles.active)}>
                            {t('patientRights')}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>

                {/* Divider */}
                <div className={styles.mobileDivider} />

                {/* Actions */}
                <div className={styles.mobileActions}>
                  {status !== "authenticated" && (
                    <>
                      <Link href="/apply" onClick={closeMobileMenu} className={styles.mobileApplyButton}>
                        {tCommon('requestAppointment')}
                      </Link>
                      <Link href="/login" onClick={closeMobileMenu} className={styles.mobileLoginLink}>
                        <User className="w-5 h-5" />
                        {tCommon('login')}
                      </Link>
                    </>
                  )}
                </div>

                {/* Language Selector */}
                <div className={styles.mobileLanguages}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLocale(language.code);
                      }}
                      className={cn(styles.mobileLanguageOption, locale === language.code && styles.active)}
                    >
                      <span className={styles.flagCircleSmall}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={language.flag} alt={language.name} />
                      </span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

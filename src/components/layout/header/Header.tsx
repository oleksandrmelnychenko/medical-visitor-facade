"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User, ChevronDown } from "lucide-react";
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
          <button className={styles.mobileButton}>
            <Menu className="w-6 h-6" />
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

    </header>
  );
}

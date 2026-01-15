"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, User, ChevronDown, Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import styles from "./header.module.scss";

export function Header() {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const { locale, setLocale } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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

  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const languages = [
    { code: 'de' as const, name: 'Deutsch', flag: 'https://flagcdn.com/w80/de.png' },
    { code: 'en' as const, name: 'English', flag: 'https://flagcdn.com/w80/gb.png' },
    { code: 'ru' as const, name: 'Русский', flag: 'https://flagcdn.com/w80/ru.png' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  // Helper to close menu on link click
  const handleLinkClick = () => setActiveMenu(null);

  return (
    <header ref={headerRef} className={cn(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        <div className={styles.navWrapper}>
          {/* Logo and Navigation - Left aligned */}
          <div className={styles.leftSection}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png"
                alt="Agency for Patient Care"
                width={150}
                height={40}
                className={styles.logo}
                priority
              />
            </Link>

            {/* Navigation */}
            <nav className={styles.nav}>
              <div className={styles.navItem}>
                <button onClick={() => toggleMenu('care')}>
                  {t('care')}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className={styles.navItem}>
                <button onClick={() => toggleMenu('patient')}>
                  {t('patientResources')}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className={styles.navItem}>
                <button onClick={() => toggleMenu('trust')}>
                  {t('trustSafety')}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>

          {/* Right aligned section */}
          <div className={styles.rightSection}>
            {/* Language Selector - Stacked Flags */}
            <div className={styles.languageSelector}>
              <button
                onClick={() => toggleMenu('language')}
                className={styles.languageButton}
              >
                <div className={styles.flagStack}>
                  {/* Reorder languages so current is first */}
                  {[
                    currentLanguage,
                    ...languages.filter(l => l.code !== locale)
                  ].map((language, index) => (
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

            <Link href="/appointment" className={styles.appointmentParams}>
              {tCommon('requestAppointment')}
            </Link>
            <a href="#login" className={styles.loginLink}>
              <User className="w-4 h-4" />
              {tCommon('login')}
            </a>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className={styles.themeIcon} />
              ) : (
                <Moon className={styles.themeIcon} />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button className={styles.mobileButton}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Dropdown Menus */}
      {activeMenu === 'care' && (
        <div className={styles.megaMenu}>
          <div className={styles.megaMenuContent}>
            <div className={styles.menuGrid}>
               <div className={styles.menuLinks}>
                 <Link href="/patient-centered-care" onClick={handleLinkClick} className={styles.menuLink}>{t('patientCenteredCare')}</Link>
                 <Link href="/about-gmed" onClick={handleLinkClick} className={styles.menuLink}>{t('aboutGmed')}</Link>
                 <Link href="/appointment" onClick={handleLinkClick} className={styles.menuLink}>{t('requestAppointment')}</Link>
                 <Link href="/find-doctor" onClick={handleLinkClick} className={styles.menuLink}>{t('findDoctor')}</Link>
                 <Link href="/locations" onClick={handleLinkClick} className={styles.menuLink}>{t('locations')}</Link>
               </div>
               <div></div>
               <div className="flex items-center justify-center">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img
                   src="https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTcyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                   alt="Medical Professional"
                   className={styles.menuImage}
                 />
               </div>
            </div>
          </div>
        </div>
      )}

      {activeMenu === 'patient' && (
         <div className={styles.megaMenu}>
          <div className={styles.megaMenuContent}>
            <div className={styles.menuGrid}>
               <div className={styles.menuLinks}>
                 <Link href="/patient-services" onClick={handleLinkClick} className={styles.menuLink}>{t('patientServices')}</Link>
                 <Link href="/medical-records" onClick={handleLinkClick} className={styles.menuLink}>{t('medicalRecords')}</Link>
                 <Link href="/insurance" onClick={handleLinkClick} className={styles.menuLink}>{t('insuranceBilling')}</Link>
                 <Link href="/patient-portal" onClick={handleLinkClick} className={styles.menuLink}>{t('patientPortal')}</Link>
               </div>
               <div></div>
               <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img
                   src="https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTcyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                   alt="Patient Care"
                   className={styles.menuImage}
                 />
               </div>
            </div>
          </div>
        </div>
      )}

      {activeMenu === 'trust' && (
         <div className={styles.megaMenu}>
          <div className={styles.megaMenuContent}>
            <div className={styles.menuGrid}>
               <div className={styles.menuLinks}>
                 <Link href="/privacy-policy" onClick={handleLinkClick} className={styles.menuLink}>{t('privacyPolicy')}</Link>
                 <Link href="/data-security" onClick={handleLinkClick} className={styles.menuLink}>{t('dataSecurity')}</Link>
                 <Link href="/hipaa-compliance" onClick={handleLinkClick} className={styles.menuLink}>{t('hipaaCompliance')}</Link>
                 <Link href="/patient-rights" onClick={handleLinkClick} className={styles.menuLink}>{t('patientRights')}</Link>
               </div>
               <div></div>
               <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img
                   src="https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTcyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                   alt="Trust & Confidentiality"
                   className={styles.menuImage}
                 />
               </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}

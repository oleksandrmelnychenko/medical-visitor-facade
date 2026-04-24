"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from "react";
import { User, House, ArrowUpRight, ArrowLeft, Layers } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/shared/lib/cn";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LogoSvg } from "./LogoSvg";
import { LogoSvgOld } from "./LogoSvgOld";
import styles from "./Header.module.scss";

const LANGUAGES = [
  { code: "de", label: "DE", fullName: "Deutsch" },
  { code: "en", label: "EN", fullName: "English" },
  { code: "ru", label: "RU", fullName: "Русский" },
  { code: "es", label: "ES", fullName: "Español" },
] as const;

type SupportedLocale = (typeof LANGUAGES)[number]["code"];

type HeaderContextValue = {
  pathname: string;
  locale: string;
  isLoginPage: boolean;
  isApplyPage: boolean;
  isMembershipPage: boolean;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  showStickyFullBrand: boolean;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  handleLanguageSelect: (code: SupportedLocale) => void;
  isMenuLinkActive: (href: string, type: "route" | "external") => boolean;
};

const HeaderContext = createContext<HeaderContextValue | null>(null);

function useHeaderContext() {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("Header client components must be rendered inside HeaderInteractiveRoot.");
  }

  return context;
}

export function HeaderInteractiveRoot({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString();
  const currentPathWithSearch = currentSearch
    ? `${pathname}?${currentSearch}`
    : pathname;

  const [mobileMenuState, setMobileMenuState] = useState({
    routeKey: currentPathWithSearch,
    open: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobileMenuOpen = mobileMenuState.routeKey === currentPathWithSearch && mobileMenuState.open;

  const handleResize = useEffectEvent(() => {
    if (window.innerWidth > 768) {
      setMobileMenuState((prev) => ({ ...prev, open: false }));
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
      setMobileMenuState((prev) => ({ ...prev, open: false }));
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isMobileMenuOpen]);

  const isLoginPage = pathname === "/login";
  const isApplyPage = pathname === "/apply";
  const isMembershipPage = pathname === "/membership";
  const showStickyFullBrand = isScrolled || isApplyPage || isMembershipPage;

  const closeMobileMenu = () => {
    setMobileMenuState({ routeKey: currentPathWithSearch, open: false });
  };
  const toggleMobileMenu = () => {
    setMobileMenuState((prev) => {
      const isCurrentRoute = prev.routeKey === currentPathWithSearch;

      return {
        routeKey: currentPathWithSearch,
        open: isCurrentRoute ? !prev.open : true,
      };
    });
  };

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

  const value: HeaderContextValue = {
    pathname,
    locale,
    isLoginPage,
    isApplyPage,
    isMembershipPage,
    isScrolled,
    isMobileMenuOpen,
    showStickyFullBrand,
    closeMobileMenu,
    toggleMobileMenu,
    handleLanguageSelect,
    isMenuLinkActive,
  };

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
}

export function HeaderLoginGate({
  login,
  main,
}: {
  login: ReactNode;
  main: ReactNode;
}) {
  const { isLoginPage } = useHeaderContext();

  return isLoginPage ? <>{login}</> : <>{main}</>;
}

export function HeaderLoginFab({ ariaLabel }: { ariaLabel: string }) {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        prefetch={false}
        className={cn(styles.mobileLoginFab, styles.mobileHomeFab)}
        aria-label={ariaLabel}
      >
        <House size={24} aria-hidden="true" />
      </Link>
    </header>
  );
}

export function HeaderStickyShell({ children }: { children: ReactNode }) {
  const { isScrolled, isMobileMenuOpen } = useHeaderContext();

  return (
    <div
      className={cn(
        styles.stickyHeader,
        styles.visible,
        isScrolled && styles.stickyHeaderScrolled,
        isMobileMenuOpen && styles.noShadow,
      )}
    >
      {children}
    </div>
  );
}

export function HeaderBrandLink({ ariaLabel }: { ariaLabel: string }) {
  const { pathname, showStickyFullBrand } = useHeaderContext();

  return (
    <Link
      href="/"
      className={cn(styles.stickyLogoLink, showStickyFullBrand && styles.stickyLogoLinkWordmark)}
      aria-label={ariaLabel}
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
  );
}

export function HeaderTaglineMeta({ children }: { children: ReactNode }) {
  const { showStickyFullBrand } = useHeaderContext();

  return (
    <span
      className={cn(
        styles.stickyTaglineMeta,
        showStickyFullBrand && styles.stickyTaglineMetaVisible,
      )}
      aria-hidden={!showStickyFullBrand}
    >
      {children}
    </span>
  );
}

export function HeaderLocaleSwitcher({
  ariaLabel,
  mobile = false,
}: {
  ariaLabel: string;
  mobile?: boolean;
}) {
  const { locale, handleLanguageSelect } = useHeaderContext();

  return (
    <div
      className={mobile ? styles.menuLanguageRow : styles.stickyLocaleGroup}
      role="group"
      aria-label={ariaLabel}
    >
      {LANGUAGES.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => handleLanguageSelect(language.code)}
          className={cn(
            mobile ? styles.menuLanguageButton : styles.stickyLocaleButton,
            locale === language.code
              && (mobile ? styles.menuLanguageButtonActive : styles.stickyLocaleButtonActive),
          )}
          aria-pressed={locale === language.code}
          aria-label={language.fullName}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}

export function HeaderProgramsLink({ label }: { label: string }) {
  const { isMembershipPage } = useHeaderContext();

  return (
    <Link
      href="/membership"
      prefetch={false}
      className={cn(
        styles.stickyNavLink,
        isMembershipPage && styles.stickyNavLinkActive,
      )}
      aria-current={isMembershipPage ? "page" : undefined}
    >
      <Layers size={16} strokeWidth={2} aria-hidden="true" />
      <span className={styles.stickyNavLinkLabel}>{label}</span>
    </Link>
  );
}

export function HeaderApplyLink({
  label,
  mobile = false,
}: {
  label: string;
  mobile?: boolean;
}) {
  const { isApplyPage, closeMobileMenu } = useHeaderContext();

  if (isApplyPage) {
    return null;
  }

  if (mobile) {
    return (
      <Link
        href="/apply"
        prefetch={false}
        onClick={closeMobileMenu}
        className={styles.menuApplyButton}
      >
        <span className={styles.menuApplyButtonIcon} aria-hidden="true">
          <ArrowUpRight />
        </span>
        <span className={styles.menuApplyButtonLabel}>{label}</span>
      </Link>
    );
  }

  return (
    <Link href="/apply" prefetch={false} className={styles.stickyButton}>
      <span className={styles.stickyButtonIcon} aria-hidden="true">
        <ArrowUpRight />
      </span>
      <span className={styles.stickyButtonLabel}>{label}</span>
    </Link>
  );
}

export function HeaderLoginLink({
  label,
  mobile = false,
}: {
  label: string;
  mobile?: boolean;
}) {
  const { closeMobileMenu } = useHeaderContext();

  if (mobile) {
    return (
      <Link
        href="/login"
        prefetch={false}
        onClick={closeMobileMenu}
        className={styles.menuMetaLink}
      >
        <span className={styles.menuMetaLinkAvatar} aria-hidden="true">
          <User size={16} strokeWidth={2} />
        </span>
        {label}
        <ArrowUpRight aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link href="/login" prefetch={false} className={styles.stickyLoginLink}>
      <User size={16} strokeWidth={2} aria-hidden="true" />
      <span className={styles.stickyLoginLabel}>{label}</span>
    </Link>
  );
}

export function HeaderMenuToggle({
  menuLabel,
  openMenuLabel,
  closeMenuLabel,
}: {
  menuLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}) {
  const { isMobileMenuOpen, toggleMobileMenu } = useHeaderContext();

  return (
    <button
      type="button"
      onClick={toggleMobileMenu}
      aria-label={isMobileMenuOpen ? closeMenuLabel : openMenuLabel}
      aria-expanded={isMobileMenuOpen}
      className={cn(
        styles.stickyMenuPill,
        styles.stickyMenuPillMobileOnly,
        isMobileMenuOpen && styles.stickyMenuPillOpen,
      )}
    >
      <span className={styles.stickyMenuPillLabel} aria-hidden="true">
        <span className={styles.stickyMenuPillLabelTrack}>
          <span className={styles.stickyMenuPillLabelText}>{menuLabel}</span>
          <span className={styles.stickyMenuPillLabelText}>{closeMenuLabel}</span>
        </span>
      </span>
      <span className={styles.stickyMenuPillDots} aria-hidden="true">
        <span />
        <span />
      </span>
    </button>
  );
}

export function HeaderPageShell({ children }: { children: ReactNode }) {
  const { isApplyPage } = useHeaderContext();

  return (
    <header className={cn(styles.header, isApplyPage && styles.headerTransparent)}>
      {children}
    </header>
  );
}

export function HeaderMenuBackdrop() {
  const { isMobileMenuOpen, closeMobileMenu } = useHeaderContext();

  return (
    <div
      className={cn(styles.mobileMenuBackdrop, isMobileMenuOpen && styles.mobileMenuBackdropOpen)}
      onClick={closeMobileMenu}
      aria-hidden="true"
    />
  );
}

export function HeaderMenuShell({ children }: { children: ReactNode }) {
  const { isMobileMenuOpen } = useHeaderContext();

  return (
    <div
      className={cn(
        styles.mobileMenu,
        isMobileMenuOpen && styles.mobileMenuOpen,
        styles.mobileMenuWithSticky,
      )}
    >
      {children}
    </div>
  );
}

export function HeaderMenuRouteLink({
  label,
  href,
  type = "route",
}: {
  label: string;
  href: string;
  type?: "route" | "external";
}) {
  const { closeMobileMenu, isMenuLinkActive } = useHeaderContext();
  const active = isMenuLinkActive(href, type);

  return (
    <Link
      href={href}
      prefetch={false}
      onClick={closeMobileMenu}
      className={styles.menuShowcaseLink}
    >
      <span className={styles.menuShowcaseText}>{label}</span>
      <span className={styles.menuShowcaseArrow} aria-hidden="true">
        <ArrowLeft />
      </span>
      {active ? <span className={styles.menuShowcaseDot} aria-hidden="true" /> : null}
    </Link>
  );
}

export function HeaderMobileFooterLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const { closeMobileMenu } = useHeaderContext();

  return (
    <Link
      href={href}
      onClick={closeMobileMenu}
      className={styles.mobileFooterLink}
    >
      <span className={styles.mobileFooterLinkText}>{label}</span>
      <span className={styles.mobileFooterLinkArrow} aria-hidden="true">
        <ArrowLeft />
      </span>
    </Link>
  );
}

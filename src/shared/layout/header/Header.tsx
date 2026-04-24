import { getTranslations } from "next-intl/server";
import {
  HeaderApplyLink,
  HeaderBrandLink,
  HeaderInteractiveRoot,
  HeaderLocaleSwitcher,
  HeaderLoginFab,
  HeaderLoginGate,
  HeaderLoginLink,
  HeaderMenuBackdrop,
  HeaderMenuRouteLink,
  HeaderMenuShell,
  HeaderMenuToggle,
  HeaderMobileFooterLink,
  HeaderPageShell,
  HeaderProgramsLink,
  HeaderStickyShell,
  HeaderTaglineMeta,
} from "./Header.client";
import styles from "./Header.module.scss";

export async function Header() {
  const [tCommon, tFooter, tHome] = await Promise.all([
    getTranslations("common"),
    getTranslations("footer"),
    getTranslations("home"),
  ]);

  const menuShowcaseLinks = [
    { label: tCommon("home"), href: "/" },
    { label: tCommon("services"), href: "/#journey" },
    { label: tHome("faq.title"), href: "/#faq" },
    { label: tCommon("programs"), href: "/membership" },
  ] as const;

  const mobileFooterLinks = [
    { label: tFooter("financialAssistance"), href: "/pro-bono" },
    { label: tFooter("privacyPolicy"), href: "/privacy-policy" },
    { label: tFooter("impressum"), href: "/legal-notice" },
  ] as const;

  return (
    <HeaderInteractiveRoot>
      <HeaderLoginGate
        login={<HeaderLoginFab ariaLabel={tCommon("home")} />}
        main={(
          <>
            <div className="headerOffset" aria-hidden="true" />
            <HeaderStickyShell>
              <div className={styles.stickyContainer}>
                <HeaderBrandLink ariaLabel="Medical Concierge Agency" />
                <HeaderTaglineMeta>Medical Concierge Agency</HeaderTaglineMeta>

                <div className={styles.stickyActions}>
                  <HeaderLocaleSwitcher ariaLabel={tCommon("language")} />
                  <HeaderProgramsLink label={tCommon("programs")} />
                  <HeaderApplyLink label={tCommon("headerRequestAppointment")} />
                  <HeaderLoginLink label={tCommon("login")} />
                  <HeaderMenuToggle
                    menuLabel={tCommon("menu")}
                    openMenuLabel={tCommon("openMenu")}
                    closeMenuLabel={tCommon("closeMenu")}
                  />
                </div>
              </div>
            </HeaderStickyShell>

            <HeaderPageShell>
              <HeaderMenuBackdrop />

              <HeaderMenuShell>
                <div className={styles.mobileMenuContent}>
                  <div className={styles.menuDropdownStack}>
                    <div className={styles.menuShowcaseCard}>
                      <nav className={styles.menuShowcaseNav} aria-label={tCommon("menu")}>
                        {menuShowcaseLinks.map((item) => (
                          <HeaderMenuRouteLink key={item.label} label={item.label} href={item.href} />
                        ))}
                      </nav>

                      <div className={styles.menuShowcaseFooter}>
                        <HeaderLoginLink label={tCommon("login")} mobile />
                      </div>
                    </div>

                    <HeaderApplyLink label={tCommon("headerRequestAppointment")} mobile />
                    <HeaderLocaleSwitcher ariaLabel={tCommon("language")} mobile />

                    <div className={styles.mobileFooterLinks}>
                      {mobileFooterLinks.map((item) => (
                        <HeaderMobileFooterLink key={item.href} label={item.label} href={item.href} />
                      ))}
                    </div>
                  </div>
                </div>
              </HeaderMenuShell>
            </HeaderPageShell>
          </>
        )}
      />
    </HeaderInteractiveRoot>
  );
}

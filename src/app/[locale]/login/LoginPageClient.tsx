"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./LoginPageClient.module.scss";

function isValidIdentifier(value: string) {
  const trimmedValue = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
  const isPhone = /^\+?[0-9\s().-]{5,}$/.test(trimmedValue);

  return isEmail || isPhone;
}

export function LoginPageClient() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(
    null
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!identifier.trim()) {
      setFeedback({ type: "error", message: tAuth("identifierRequired") });
      return;
    }

    if (!isValidIdentifier(identifier)) {
      setFeedback({ type: "error", message: tAuth("invalidPhoneOrEmail") });
      return;
    }

    if (!password.trim()) {
      setFeedback({ type: "error", message: tAuth("passwordRequired") });
      return;
    }

    if (password.trim().length < 6) {
      setFeedback({ type: "error", message: tAuth("passwordMinLength") });
      return;
    }

    setFeedback({ type: "success", message: tAuth("applicationPending") });
  };

  return (
    <main className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.shellSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.shell}>
            <Link href="/" className={styles.brandLink} aria-label="GMED home">
              <Image
                src="/assets/gmed_logo.png"
                alt="GMED - Medical Concierge Agency"
                width={220}
                height={60}
                className={styles.logo}
                priority
              />
            </Link>
            <p className={styles.brandTagline}>
              {tFooter.rich("companyName", {
                accent: (chunks) => <span className={styles.brandAccent}>{chunks}</span>,
              })}
            </p>

            <div className={styles.formIsland}>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formHeading}>
                  <h1 className={styles.formTitle}>{tAuth("welcomeTitle")}</h1>
                  <p className={styles.formSubtitle}>{tAuth("welcomeSubtitle")}</p>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.srOnly} htmlFor="identifier">
                    {tAuth("phoneOrEmail")}
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    className={styles.input}
                    placeholder={tAuth("phoneOrEmail")}
                    autoComplete="username"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.srOnly} htmlFor="password">
                    {tAuth("password")}
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={styles.input}
                      placeholder={tAuth("passwordPlaceholder")}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword((currentValue) => !currentValue)}
                      aria-label={showPassword ? tAuth("hidePassword") : tAuth("showPassword")}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {feedback ? (
                  <p
                    className={cn(
                      styles.feedback,
                      feedback.type === "error" ? styles.feedbackError : styles.feedbackSuccess
                    )}
                  >
                    {feedback.message}
                  </p>
                ) : null}

                <div className={styles.submitButtonFrame}>
                  <button className={styles.submitButton} type="submit">
                    <LogIn size={18} />
                    {tAuth("signIn")}
                  </button>
                </div>

                <p className={styles.confidentialityNotice}>{tAuth("confidentialityNotice")}</p>

                <div className={styles.linkRow}>
                  <Link href="/apply" className={styles.secondaryLink}>
                    {tCommon("requestAppointment")}
                  </Link>
                  <Link href="/privacy-policy" className={styles.secondaryLink}>
                    {tAuth("privacyPolicyLink")}
                  </Link>
                </div>

                <div className={styles.mollieBadge}>
                  <a
                    href="https://www.mollie.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mollieButton}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className={styles.mollieIcon} aria-hidden="true">
                      <path d="M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z" fill="currentColor" opacity="0.15" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z" fill="currentColor" />
                    </svg>
                    {tAuth("payWithMollie")}
                  </a>
                  <p className={styles.mollieTrust}>
                    {tAuth("securePoweredBy")}{" "}
                    <a
                      href="https://www.mollie.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mollieLink}
                    >
                      Mollie
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

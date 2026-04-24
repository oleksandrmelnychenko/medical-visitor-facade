"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpLeft, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./LoginForm.module.scss";

type FieldKey = "identifier" | "password";

function isValidIdentifier(value: string) {
  const trimmedValue = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
  const isPhone = /^\+?[0-9\s().-]{5,}$/.test(trimmedValue);

  return isEmail || isPhone;
}

function isValidPassword(value: string) {
  return value.trim().length >= 6;
}

export function LoginForm() {
  const tAuth = useTranslations("auth");
  const tFooter = useTranslations("footer");
  const tNotFound = useTranslations("notFound");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    identifier: false,
    password: false,
  });

  const identifierValue = identifier.trim();
  const passwordValue = password.trim();
  const identifierValid = identifierValue.length > 0 && isValidIdentifier(identifier);
  const passwordValid = isValidPassword(password);

  const showIdentifierError = touched.identifier && !identifierValid;
  const showPasswordError = touched.password && !passwordValid;

  const identifierErrorMessage = identifierValue.length === 0
    ? tAuth("identifierRequired")
    : tAuth("invalidPhoneOrEmail");
  const passwordErrorMessage = passwordValue.length === 0
    ? tAuth("passwordRequired")
    : tAuth("passwordMinLength");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(null);

    if (!identifierValid || !passwordValid) {
      setTouched({ identifier: true, password: true });
      return;
    }

    setSuccess(tAuth("applicationPending"));
  };

  return (
    <main className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.shellSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.shell}>
            <Link href="/" className={styles.brandLink} aria-label="GMED home">
              <Image
                src="/assets/logo.png"
                alt="Medical Concierge Agency"
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
                    name="identifier"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, identifier: true }))}
                    className={cn(styles.input, showIdentifierError && styles.inputError)}
                    placeholder={tAuth("phoneOrEmail")}
                    autoComplete="username"
                    aria-invalid={showIdentifierError}
                    aria-describedby={showIdentifierError ? "login-identifier-error" : undefined}
                  />
                  {showIdentifierError ? (
                    <span id="login-identifier-error" className={styles.fieldError}>
                      {identifierErrorMessage}
                    </span>
                  ) : null}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.srOnly} htmlFor="password">
                    {tAuth("password")}
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                      className={cn(styles.input, showPasswordError && styles.inputError)}
                      placeholder={tAuth("passwordPlaceholder")}
                      autoComplete="current-password"
                      aria-invalid={showPasswordError}
                      aria-describedby={showPasswordError ? "login-password-error" : undefined}
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
                  {showPasswordError ? (
                    <span id="login-password-error" className={styles.fieldError}>
                      {passwordErrorMessage}
                    </span>
                  ) : null}
                </div>

                {success ? (
                  <p
                    className={cn(styles.feedback, styles.feedbackSuccess)}
                    role="status"
                    aria-live="polite"
                  >
                    {success}
                  </p>
                ) : null}

                <div className={styles.submitButtonFrame}>
                  <button className={styles.submitButton} type="submit">
                    <span className={styles.submitButtonLabel}>{tAuth("signIn")}</span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>

                <Link href="/" className={styles.desktopHomeLabel}>
                  <ArrowUpLeft aria-hidden="true" />
                  {tNotFound("backHome")}
                </Link>

                <p className={styles.confidentialityNotice}>{tAuth("confidentialityNotice")}</p>

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

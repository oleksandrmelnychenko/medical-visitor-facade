"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  CreditCard,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { GmedHeaderLogo } from "@/components/branding/GmedHeaderLogo/GmedHeaderLogo";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./LoginPageClient.module.scss";

export type LoginPaymentState =
  | "canceled"
  | "expired"
  | "failed"
  | "paid"
  | "pending"
  | "unknown"
  | "unavailable"
  | null;

type LoginPageClientProps = {
  paymentState: LoginPaymentState;
};

function isValidIdentifier(value: string) {
  const trimmedValue = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
  const isPhone = /^\+?[0-9\s().-]{5,}$/.test(trimmedValue);

  return isEmail || isPhone;
}

export function LoginPageClient({ paymentState }: LoginPageClientProps) {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(
    null
  );
  const paymentFeedback =
    paymentState === "paid"
      ? { type: "success" as const, message: tAuth("paymentStatusPaid") }
      : paymentState === "pending"
        ? { type: "info" as const, message: tAuth("paymentStatusPending") }
        : paymentState === "failed"
          ? { type: "error" as const, message: tAuth("paymentStatusFailed") }
          : paymentState === "canceled"
            ? { type: "info" as const, message: tAuth("paymentStatusCanceled") }
            : paymentState === "expired"
              ? { type: "error" as const, message: tAuth("paymentStatusExpired") }
              : paymentState === "unknown"
                ? { type: "info" as const, message: tAuth("paymentStatusUnknown") }
                : paymentState === "unavailable"
                  ? { type: "error" as const, message: tAuth("paymentUnavailable") }
                  : null;

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
            <div className={styles.brandRow}>
              <Link href="/" className={styles.brandLink} aria-label="GMED home">
                <GmedHeaderLogo className={styles.wordmark} title="GMED" />
              </Link>
            </div>

            <div className={styles.contentGrid}>
              <section className={styles.introPanel}>
                <p className={styles.brandTagline}>
                  {tFooter.rich("companyName", {
                    accent: (chunks) => <span className={styles.brandAccent}>{chunks}</span>,
                  })}
                </p>
                <h1 className={styles.pageTitle}>{tAuth("welcomeTitle")}</h1>
                <p className={styles.pageLead}>{tAuth("welcomeSubtitle")}</p>
                <p className={styles.confidentialityNotice}>{tAuth("confidentialityNotice")}</p>

                <div className={styles.linkRow}>
                  <Link href="/apply" className={styles.applyCtaLink}>
                    <span className={styles.applyCtaLabel}>{tCommon("requestAppointment")}</span>
                    <span className={styles.applyCtaArrow} aria-hidden="true">
                      <svg viewBox="0 0 40 40" fill="none" className={styles.applyCtaArrowIcon}>
                        <path
                          d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </Link>
                  <Link href="/privacy-policy" className={styles.secondaryLink}>
                    {tAuth("privacyPolicyLink")}
                  </Link>
                </div>
              </section>

              <div className={styles.actionColumn}>
                <div className={styles.formPanel}>
                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.formHeading}>
                      <p className={styles.formEyebrow}>({tAuth("signIn")})</p>
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

                    <button className={styles.submitButton} type="submit">
                      <LogIn size={18} />
                      {tAuth("signIn")}
                    </button>
                  </form>
                </div>

                <aside className={styles.paymentPanel} aria-labelledby="mollie-frame-title">
                  <div className={styles.paymentPanelInner}>
                    <div className={styles.paymentHeader}>
                      <p className={styles.paymentEyebrow}>({tAuth("paymentSectionTitle")})</p>
                      <p id="mollie-frame-title" className={styles.paymentSecureLine}>
                        <ShieldCheck size={14} aria-hidden="true" />
                        <span>{tAuth("paymentSecureLine")}</span>
                      </p>
                    </div>

                    {paymentFeedback ? (
                      <p
                        className={cn(
                          styles.feedback,
                          styles.paymentFeedback,
                          paymentFeedback.type === "error"
                            ? styles.feedbackError
                            : paymentFeedback.type === "success"
                              ? styles.feedbackSuccess
                              : styles.feedbackInfo
                        )}
                      >
                        {paymentFeedback.message}
                      </p>
                    ) : null}

                    <button className={styles.paymentButton} type="button">
                      <CreditCard size={18} />
                      {tAuth("paymentButton")}
                    </button>

                    <p className={styles.paymentFootnote}>{tAuth("paymentFrameFootnote")}</p>

                    <a
                      href="https://www.mollie.com/"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.paymentPatternLink}
                    >
                      <span className={styles.paymentPatternDots} aria-hidden="true" />
                      <span>{tAuth("paymentExternalLink")}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

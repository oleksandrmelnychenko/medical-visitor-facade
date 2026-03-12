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
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

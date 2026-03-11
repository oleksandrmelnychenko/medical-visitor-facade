"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
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
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={tAuth("welcomeTitle")}
            subtitle={tAuth("welcomeSubtitle")}
            variant="page"
            titleAs="h1"
            theme="beige"
          />
          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.formSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                {tAuth("signIn")}
              </button>

              <p className={styles.confidentialityNotice}>{tAuth("confidentialityNotice")}</p>

              <div className={styles.linkRow}>
                <Link href="/apply" className={styles.secondaryLink}>
                  {tAuth("createAccount")}
                </Link>
                <Link href="/privacy-policy" className={styles.secondaryLink}>
                  {tAuth("privacyPolicyLink")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

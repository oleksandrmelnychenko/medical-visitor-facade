"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import authStyles from "@/components/auth/Auth.module.scss";
import pageStyles from "@/styles/page.module.scss";

function isValidIdentifier(value: string) {
  const trimmedValue = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
  const isPhone = /^\+?[0-9\s().-]{5,}$/.test(trimmedValue);

  return isEmail || isPhone;
}

export function LoginPageClient() {
  const tAuth = useTranslations("auth");
  const tPortal = useTranslations("patientPortal");
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
    <main className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            overline={tAuth("overline")}
            title={tAuth("welcomeTitle")}
            subtitle={tPortal("login.description")}
            align="left"
            variant="page"
            titleAs="h1"
          />

          <div className={pageStyles.gridTwo} style={{ alignItems: "start" }}>
            <div className={cn(pageStyles.formCard, pageStyles.stackMd)}>
              <div className={pageStyles.stackMd} style={{ gap: "1.25rem" }}>
                <div className={pageStyles.cardRow}>
                  <ShieldCheck size={20} />
                  <div>
                    <h2 className={pageStyles.cardTitle}>{tPortal("login.title")}</h2>
                    <p className={pageStyles.cardText}>{tAuth("welcomeSubtitle")}</p>
                  </div>
                </div>

                <div className={pageStyles.checkList}>
                  <div className={pageStyles.checkItem}>
                    <span className={pageStyles.checkBullet}>
                      <span className={pageStyles.checkBulletInner} />
                    </span>
                    <p className={pageStyles.cardText}>{tPortal("features.records.description")}</p>
                  </div>
                  <div className={pageStyles.checkItem}>
                    <span className={pageStyles.checkBullet}>
                      <span className={pageStyles.checkBulletInner} />
                    </span>
                    <p className={pageStyles.cardText}>{tPortal("features.messaging.description")}</p>
                  </div>
                  <div className={pageStyles.checkItem}>
                    <span className={pageStyles.checkBullet}>
                      <span className={pageStyles.checkBulletInner} />
                    </span>
                    <p className={pageStyles.cardText}>{tPortal("help.description")}</p>
                  </div>
                </div>
              </div>

              <div className={pageStyles.buttonRow}>
                <Link href="/apply" className={pageStyles.buttonSolid}>
                  {tAuth("createAccount")}
                </Link>
                <Link href="/privacy-policy" className={pageStyles.buttonOutline}>
                  {tAuth("privacyPolicyLink")}
                </Link>
              </div>
            </div>

            <div className={pageStyles.formCard}>
              <form className={authStyles.form} onSubmit={handleSubmit} noValidate>
                <div className={authStyles.simpleFormGroup}>
                  <label className={authStyles.label} htmlFor="identifier">
                    {tAuth("phoneOrEmail")}
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    className={authStyles.simpleInput}
                    placeholder={tAuth("phoneOrEmail")}
                    autoComplete="username"
                  />
                </div>

                <div className={authStyles.simpleFormGroup}>
                  <label className={authStyles.label} htmlFor="password">
                    {tAuth("password")}
                  </label>
                  <div className={authStyles.passwordWrapper}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={authStyles.simpleInput}
                      placeholder={tAuth("passwordPlaceholder")}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className={authStyles.passwordToggle}
                      onClick={() => setShowPassword((currentValue) => !currentValue)}
                      aria-label={showPassword ? tAuth("hidePassword") : tAuth("showPassword")}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {feedback ? (
                  <p
                    className={
                      feedback.type === "error" ? authStyles.formError : authStyles.formSuccess
                    }
                  >
                    {feedback.message}
                  </p>
                ) : null}

                <button className={authStyles.submitButton} type="submit">
                  <LockKeyhole size={16} />
                  {tAuth("signIn")}
                </button>
              </form>

              <p className={authStyles.confidentialityNotice}>{tAuth("confidentialityNotice")}</p>
              <div className={pageStyles.buttonRow}>
                <Link href="/apply" className={pageStyles.linkMuted}>
                  {tPortal("help.contactSupport")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

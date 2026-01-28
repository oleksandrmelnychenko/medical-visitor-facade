"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./forgot-password.module.scss";
import formStyles from "@/components/auth/Auth.module.scss";

type Step = "phone" | "code" | "newPassword" | "success";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgotPassword");
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d+]/g, "");
    if (value && !value.startsWith("+")) {
      value = "+" + value;
    }
    if (value.length > 16) value = value.slice(0, 16);
    setPhone(value);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const phoneRegex = /^\+[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      setError(t("invalidPhone"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("sendError"));
        return;
      }

      setStep("code");
    } catch {
      setError(t("sendError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (code.length !== 6) {
      setError(t("invalidCode"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("verifyError"));
        return;
      }

      setStep("newPassword");
    } catch {
      setError(t("verifyError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError(t("passwordMinLength"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("resetError"));
        return;
      }

      setStep("success");
    } catch {
      setError(t("resetError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
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
            {step === "phone" && (
              <form className={formStyles.form} onSubmit={handleSendCode} noValidate>
                <p className={styles.instruction}>{t("enterPhone")}</p>

                {error && <div className={formStyles.formError}>{error}</div>}

                <div className={formStyles.simpleFormGroup}>
                  <label htmlFor="phone" className={formStyles.srOnly}>{t("phone")}</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    className={formStyles.simpleInput}
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                <button type="submit" className={formStyles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? t("sending") : t("sendCode")}
                </button>

                <Link href="/login" className={styles.backLink}>
                  <ArrowLeft size={16} />
                  {t("backToLogin")}
                </Link>
              </form>
            )}

            {step === "code" && (
              <form className={formStyles.form} onSubmit={handleVerifyCode} noValidate>
                <p className={styles.instruction}>{t("enterCode", { phone })}</p>

                {error && <div className={formStyles.formError}>{error}</div>}

                <div className={formStyles.simpleFormGroup}>
                  <label htmlFor="code" className={formStyles.srOnly}>{t("code")}</label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder={t("codePlaceholder")}
                    className={cn(formStyles.simpleInput, styles.codeInput)}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  />
                </div>

                <button type="submit" className={formStyles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? t("verifying") : t("verify")}
                </button>

                <button
                  type="button"
                  className={styles.resendButton}
                  onClick={() => setStep("phone")}
                >
                  {t("resendCode")}
                </button>
              </form>
            )}

            {step === "newPassword" && (
              <form className={formStyles.form} onSubmit={handleResetPassword} noValidate>
                <p className={styles.instruction}>{t("enterNewPassword")}</p>

                {error && <div className={formStyles.formError}>{error}</div>}

                <div className={formStyles.simpleFormGroup}>
                  <label htmlFor="newPassword" className={formStyles.srOnly}>{t("newPassword")}</label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder={t("newPasswordPlaceholder")}
                    className={formStyles.simpleInput}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className={formStyles.simpleFormGroup}>
                  <label htmlFor="confirmPassword" className={formStyles.srOnly}>{t("confirmPassword")}</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder={t("confirmPasswordPlaceholder")}
                    className={formStyles.simpleInput}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className={formStyles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? t("resetting") : t("resetPassword")}
                </button>
              </form>
            )}

            {step === "success" && (
              <div className={styles.successMessage}>
                <h2>{t("successTitle")}</h2>
                <p>{t("successMessage")}</p>
                <Link href="/login" className={formStyles.submitButton}>
                  {t("goToLogin")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

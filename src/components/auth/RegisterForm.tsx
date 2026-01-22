"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import styles from "./auth.module.scss";

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || t("registrationFailed"));
      return;
    }

    // Auto sign in after successful registration
    const signInResult = await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: false,
    });

    if (signInResult?.error) {
      setError(t("signInAfterRegisterFailed"));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  // Phone mask handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 15) value = value.slice(0, 15);
    e.target.value = value.length > 0 ? `+${value}` : "";
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && <div className={styles.formError}>{error}</div>}

      {/* First Name field */}
      <div className={styles.formGroup}>
        <input
          id="firstName"
          type="text"
          placeholder=" "
          className={cn(styles.input, errors.firstName && styles.error)}
          {...register("firstName")}
        />
        <label htmlFor="firstName" className={styles.label}>
          {t("firstName")}
        </label>
        {errors.firstName && (
          <span className={styles.errorMessage}>{errors.firstName.message}</span>
        )}
      </div>

      {/* Last Name field */}
      <div className={styles.formGroup}>
        <input
          id="lastName"
          type="text"
          placeholder=" "
          className={cn(styles.input, errors.lastName && styles.error)}
          {...register("lastName")}
        />
        <label htmlFor="lastName" className={styles.label}>
          {t("lastName")}
        </label>
        {errors.lastName && (
          <span className={styles.errorMessage}>{errors.lastName.message}</span>
        )}
      </div>

      {/* Email field */}
      <div className={styles.formGroup}>
        <input
          id="register-email"
          type="email"
          placeholder=" "
          className={cn(styles.input, errors.email && styles.error)}
          {...register("email")}
        />
        <label htmlFor="register-email" className={styles.label}>
          {t("email")}
        </label>
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      {/* Phone field */}
      <div className={styles.formGroup}>
        <input
          id="phone"
          type="tel"
          placeholder=" "
          className={cn(styles.input, errors.phone && styles.error)}
          {...register("phone", {
            onChange: handlePhoneChange,
          })}
        />
        <label htmlFor="phone" className={styles.label}>
          {t("phone")}
        </label>
        {errors.phone && (
          <span className={styles.errorMessage}>{errors.phone.message}</span>
        )}
      </div>

      {/* Password field */}
      <div className={styles.formGroup}>
        <div className={styles.passwordWrapper}>
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className={cn(styles.input, errors.password && styles.error)}
            {...register("password")}
          />
          <label htmlFor="register-password" className={styles.label}>
            {t("password")}
          </label>
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      {/* Confirm Password field */}
      <div className={styles.formGroup}>
        <div className={styles.passwordWrapper}>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder=" "
            className={cn(styles.input, errors.confirmPassword && styles.error)}
            {...register("confirmPassword")}
          />
          <label htmlFor="confirmPassword" className={styles.label}>
            {t("confirmPassword")}
          </label>
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className={styles.errorMessage}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Consent checkboxes */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("consentData")}
          />
          <span className={styles.checkboxCustom}></span>
          <span className={styles.checkboxText}>{t("consentData")}</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("consentMarketing")}
          />
          <span className={styles.checkboxCustom}></span>
          <span className={styles.checkboxText}>{t("consentMarketing")}</span>
        </label>
      </div>

      {errors.consentData && (
        <span className={styles.errorMessage}>{errors.consentData.message}</span>
      )}

      {/* Submit button */}
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? t("creatingAccount") : t("createAccount")}
      </button>

      {/* Confidentiality notice */}
      <p className={styles.confidentialityNotice}>
        {t("confidentialityNotice")}
      </p>

      {/* Privacy policy link */}
      <Link href="/privacy-policy" className={styles.policyLink}>
        {t("privacyPolicyLink")}
      </Link>
    </form>
  );
}

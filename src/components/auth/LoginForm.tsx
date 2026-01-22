"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import styles from "./auth.module.scss";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError(t("invalidCredentials"));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && <div className={styles.formError}>{error}</div>}

      {/* Email field */}
      <div className={styles.formGroup}>
        <input
          id="email"
          type="email"
          placeholder=" "
          className={cn(styles.input, errors.email && styles.error)}
          {...register("email")}
        />
        <label htmlFor="email" className={styles.label}>
          {t("email")}
        </label>
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      {/* Password field */}
      <div className={styles.formGroup}>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className={cn(styles.input, errors.password && styles.error)}
            {...register("password")}
          />
          <label htmlFor="password" className={styles.label}>
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

      {/* Forgot password link */}
      <Link href="/forgot-password" className={styles.forgotPassword}>
        {t("forgotPassword")}
      </Link>

      {/* Submit button */}
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? t("signingIn") : t("signIn")}
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

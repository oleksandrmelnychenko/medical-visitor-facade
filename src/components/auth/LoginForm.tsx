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
      phone: data.phone,
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

      {/* Phone field */}
      <div className={styles.simpleFormGroup}>
        <input
          id="phone"
          type="tel"
          placeholder={t("phone")}
          className={cn(styles.simpleInput, errors.phone && styles.error)}
          {...register("phone")}
          autoComplete="off"
          autoFocus
        />
        {errors.phone && (
          <span className={styles.errorMessage}>{errors.phone.message}</span>
        )}
      </div>

      {/* Password field */}
      <div className={styles.simpleFormGroup}>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            className={cn(styles.simpleInput, errors.password && styles.error)}
            {...register("password")}
            autoComplete="new-password"
          />
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

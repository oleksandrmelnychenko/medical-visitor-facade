"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./login.module.scss";
import formStyles from "@/components/auth/Auth.module.scss";

type FormErrors = {
  identifier?: string;
  password?: string;
};

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ identifier?: boolean; password?: boolean }>({});

  const validateIdentifier = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return t('identifierRequired');
    }

    if (trimmed.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return t('invalidEmail');
      }
      return undefined;
    }

    const phoneRegex = /^\+[0-9]{10,15}$/;
    if (!phoneRegex.test(trimmed.replace(/\s/g, ""))) {
      return t('invalidPhoneOrEmail');
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return t('passwordRequired');
    }
    if (value.length < 6) {
      return t('passwordMinLength');
    }
    return undefined;
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
    if (touched.identifier) {
      setErrors(prev => ({ ...prev, identifier: validateIdentifier(value) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // Show validation after user starts typing (at least 1 character)
    if (value.length > 0) {
      setTouched(prev => ({ ...prev, password: true }));
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleBlur = (field: "identifier" | "password") => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === "identifier") {
      setErrors(prev => ({ ...prev, identifier: validateIdentifier(identifier) }));
    } else {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const identifierError = validateIdentifier(identifier);
    const passwordError = validatePassword(password);

    setErrors({ identifier: identifierError, password: passwordError });
    setTouched({ identifier: true, password: true });

    if (identifierError || passwordError) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        identifier: identifier.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('invalidCredentials'));
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(t('invalidCredentials'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t('welcomeTitle')}
            subtitle={t('welcomeSubtitle')}
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
            <form className={formStyles.form} onSubmit={handleSubmit} autoComplete="off" noValidate>
              {error && <div className={formStyles.formError}>{error}</div>}

              <div className={formStyles.simpleFormGroup}>
                <label htmlFor="identifier" className={formStyles.srOnly}>{t('phoneOrEmail')}</label>
                <input
                  id="identifier"
                  type="text"
                  placeholder={t('phoneOrEmail')}
                  className={cn(formStyles.simpleInput, errors.identifier && touched.identifier && formStyles.error)}
                  autoComplete="off"
                  value={identifier}
                  onChange={handleIdentifierChange}
                  onBlur={() => handleBlur("identifier")}
                />
                {errors.identifier && touched.identifier && (
                  <span className={formStyles.errorMessage}>{errors.identifier}</span>
                )}
              </div>

              <div className={formStyles.simpleFormGroup}>
                <label htmlFor="password" className={formStyles.srOnly}>{t('password')}</label>
                <div className={formStyles.passwordWrapper}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('password')}
                    className={cn(formStyles.simpleInput, errors.password && touched.password && formStyles.error)}
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur("password")}
                  />
                  <button
                    type="button"
                    className={formStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                  >
                    {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <span className={formStyles.errorMessage}>{errors.password}</span>
                )}
              </div>

              <Link href="/forgot-password" className={formStyles.forgotPassword}>
                {t('forgotPassword')}
              </Link>

              <button type="submit" className={formStyles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? t('signingIn') : t('signIn')}
              </button>

              <p className={formStyles.confidentialityNotice}>
                {t('confidentialityNotice')}
              </p>

              <Link href="/privacy-policy" className={formStyles.policyLink}>
                {t('privacyPolicyLink')}
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

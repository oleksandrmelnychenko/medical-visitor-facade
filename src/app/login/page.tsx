"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./login.module.scss";
import formStyles from "@/components/auth/auth.module.scss";

type FormErrors = {
  phone?: string;
  password?: string;
};

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ phone?: boolean; password?: boolean }>({});

  const validatePhone = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Введите номер телефона";
    }
    // Phone should start with + and have at least 10 digits
    const phoneRegex = /^\+[0-9]{10,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ""))) {
      return "Неверный формат телефона (например: +4917612345678)";
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return "Введите пароль";
    }
    if (value.length < 6) {
      return "Пароль должен быть не менее 6 символов";
    }
    return undefined;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (touched.phone) {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleBlur = (field: "phone" | "password") => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === "phone") {
      setErrors(prev => ({ ...prev, phone: validatePhone(phone) }));
    } else {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    setErrors({ phone: phoneError, password: passwordError });
    setTouched({ phone: true, password: true });

    if (phoneError || passwordError) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        phone: phone.replace(/\s/g, ""),
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
            overline={t('overline')}
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

              {/* Phone field */}
              <div className={formStyles.simpleFormGroup}>
                <input
                  id="phone"
                  type="tel"
                  placeholder={t('phone')}
                  className={cn(formStyles.simpleInput, errors.phone && touched.phone && formStyles.error)}
                  autoComplete="off"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur("phone")}
                />
                {errors.phone && touched.phone && (
                  <span className={formStyles.errorMessage}>{errors.phone}</span>
                )}
              </div>

              {/* Password field */}
              <div className={formStyles.simpleFormGroup}>
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
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <span className={formStyles.errorMessage}>{errors.password}</span>
                )}
              </div>

              {/* Forgot password link */}
              <Link href="/forgot-password" className={formStyles.forgotPassword}>
                {t('forgotPassword')}
              </Link>

              {/* Submit button */}
              <button type="submit" className={formStyles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? t('signingIn') : t('signIn')}
              </button>

              {/* Confidentiality notice */}
              <p className={formStyles.confidentialityNotice}>
                {t('confidentialityNotice')}
              </p>

              {/* Privacy policy link */}
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

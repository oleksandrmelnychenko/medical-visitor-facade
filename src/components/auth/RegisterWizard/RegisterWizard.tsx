"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "../Auth.module.scss";

const step1Schema = z.object({
  firstName: z
    .string()
    .min(1, "Введите имя")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя слишком длинное"),
  lastName: z
    .string()
    .min(1, "Введите фамилию")
    .min(2, "Фамилия должна содержать минимум 2 символа")
    .max(50, "Фамилия слишком длинная"),
  email: z
    .string()
    .min(1, "Введите email")
    .email("Неверный формат email"),
  phone: z
    .string()
    .min(1, "Введите номер телефона")
    .regex(/^\+[0-9]{10,15}$/, "Неверный формат телефона (например: +4917612345678)"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
  confirmPassword: z
    .string()
    .min(1, "Подтвердите пароль"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const step2Schema = z.object({
  currentLocation: z
    .string({ message: "Please select your location" })
    .min(1, "Please select your location")
    .refine((val) => ["germany", "eu", "other"].includes(val), {
      message: "Please select your location",
    }),
  hasInsurance: z.enum(["yes", "no"]).optional(),
  canComeToGermany: z.enum(["yes", "no", "need_help"]).optional(),
  isEuResident: z.enum(["yes", "no"]).optional(),
});

const step3Schema = z.object({
  needCharter: z.boolean(),
  needTransport: z.boolean(),
  needVisa: z.boolean(),
  needTranslator: z.boolean(),
  needHotel: z.boolean(),
  clientNotes: z.string().max(2000, "Максимум 2000 символов").optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = {
  currentLocation: string;
  hasInsurance?: "yes" | "no";
  canComeToGermany?: "yes" | "no" | "need_help";
  isEuResident?: "yes" | "no";
};
type Step3Data = z.infer<typeof step3Schema>;

export function RegisterWizard() {
  const t = useTranslations("register");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState<Step1Data | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<Step2Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: personalData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: questionnaireData || {
      currentLocation: "",
      hasInsurance: undefined,
      canComeToGermany: undefined,
      isEuResident: undefined,
    },
    mode: "onSubmit",
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      needCharter: false,
      needTransport: false,
      needVisa: false,
      needTranslator: false,
      needHotel: false,
      clientNotes: "",
    },
  });

  const currentLocation = step2Form.watch("currentLocation");

  useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      router.push("/");
    }
  }, [showSuccess, countdown, router]);

  const handleStep1Submit = (data: Step1Data) => {
    setPersonalData(data);
    setStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setQuestionnaireData(data);
    setStep(3);
  };

  const handleStep3Submit = async (data: Step3Data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const fullData = {
      ...personalData,
      ...questionnaireData,
      ...data,
    };

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setShowSuccess(true);
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "Произошла ошибка при отправке заявки");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d+]/g, "");
    if (value && !value.startsWith("+")) {
      value = "+" + value;
    }
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value;
    step1Form.setValue("phone", value, { shouldValidate: true });
  };

  if (showSuccess) {
    return (
      <div className={styles.successOverlay}>
        <motion.div
          className={styles.successModal}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle className={styles.successIcon} size={64} />
          <h2 className={styles.successTitle}>{t('successTitle')}</h2>
          <p className={styles.successMessage}>{t('successMessage')}</p>
          <p className={styles.successRedirect}>
            {t('redirecting', { seconds: countdown })}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.progressBar}>
        <div className={cn(styles.progressStep, step === 1 && styles.active)}>
          <span className={styles.stepLabel}>1 {t('step1Title')}</span>
        </div>
        <div className={cn(styles.progressStep, step === 2 && styles.active)}>
          <span className={styles.stepLabel}>2 {t('step2Title')}</span>
        </div>
        <div className={cn(styles.progressStep, step === 3 && styles.active)}>
          <span className={styles.stepLabel}>3 {t('step3Title')}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            className={styles.form}
            onSubmit={step1Form.handleSubmit(handleStep1Submit)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.formGroup}>
              <input
                id="firstName"
                type="text"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.firstName && styles.error)}
                {...step1Form.register("firstName")}
              />
              <label htmlFor="firstName" className={styles.label}>
                {t('firstName')}
              </label>
              {step1Form.formState.errors.firstName && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.firstName.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                id="lastName"
                type="text"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.lastName && styles.error)}
                {...step1Form.register("lastName")}
              />
              <label htmlFor="lastName" className={styles.label}>
                {t('lastName')}
              </label>
              {step1Form.formState.errors.lastName && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.lastName.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                id="email"
                type="email"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.email && styles.error)}
                {...step1Form.register("email")}
              />
              <label htmlFor="email" className={styles.label}>
                {t('email')}
              </label>
              {step1Form.formState.errors.email && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                id="phone"
                type="tel"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.phone && styles.error)}
                {...step1Form.register("phone", {
                  onChange: handlePhoneChange,
                })}
              />
              <label htmlFor="phone" className={styles.label}>
                {t('phone')}
              </label>
              {step1Form.formState.errors.phone && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.phone.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                id="password"
                type="password"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.password && styles.error)}
                {...step1Form.register("password")}
              />
              <label htmlFor="password" className={styles.label}>
                {t('password')}
              </label>
              {step1Form.formState.errors.password && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.password.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                id="confirmPassword"
                type="password"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.confirmPassword && styles.error)}
                {...step1Form.register("confirmPassword")}
              />
              <label htmlFor="confirmPassword" className={styles.label}>
                {t('confirmPassword')}
              </label>
              {step1Form.formState.errors.confirmPassword && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              {t('next')}
              <ArrowRight size={18} />
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            className={styles.form}
            onSubmit={step2Form.handleSubmit(handleStep2Submit)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button type="button" className={styles.backButton} onClick={goBack}>
              <span className={styles.backArrow}>‹</span> <span className={styles.backText}>{t('back')}</span>
            </button>

            <div className={styles.questionBlock}>
              <p className={styles.questionText}>{t('whereAreYou')}</p>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="germany"
                    className={styles.radioInput}
                    {...step2Form.register("currentLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>{t('germany')}</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="eu"
                    className={styles.radioInput}
                    {...step2Form.register("currentLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>{t('euNotGermany')}</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="other"
                    className={styles.radioInput}
                    {...step2Form.register("currentLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>{t('otherCountry')}</span>
                </label>
              </div>
              {step2Form.formState.errors.currentLocation && (
                <span className={styles.errorMessage}>
                  {step2Form.formState.errors.currentLocation.message}
                </span>
              )}
            </div>

            {currentLocation === "germany" && (
              <div className={styles.questionBlock}>
                <p className={styles.questionText}>{t('hasInsurance')}</p>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="yes"
                      className={styles.radioInput}
                      {...step2Form.register("hasInsurance")}
                    />
                    <span className={styles.radioCustom} />
                    <span>{t('yesInsurance')}</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="no"
                      className={styles.radioInput}
                      {...step2Form.register("hasInsurance")}
                    />
                    <span className={styles.radioCustom} />
                    <span>{t('noInsurance')}</span>
                  </label>
                </div>
              </div>
            )}

            {currentLocation && currentLocation !== "germany" && (
              <>
                <div className={styles.questionBlock}>
                  <p className={styles.questionText}>{t('canComeToGermany')}</p>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="yes"
                        className={styles.radioInput}
                        {...step2Form.register("canComeToGermany")}
                      />
                      <span className={styles.radioCustom} />
                      <span>{t('yes')}</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="no"
                        className={styles.radioInput}
                        {...step2Form.register("canComeToGermany")}
                      />
                      <span className={styles.radioCustom} />
                      <span>{t('no')}</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="need_help"
                        className={styles.radioInput}
                        {...step2Form.register("canComeToGermany")}
                      />
                      <span className={styles.radioCustom} />
                      <span>{t('needHelp')}</span>
                    </label>
                  </div>
                </div>

                <div className={styles.questionBlock}>
                  <p className={styles.questionText}>{t('isEuResident')}</p>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="yes"
                        className={styles.radioInput}
                        {...step2Form.register("isEuResident")}
                      />
                      <span className={styles.radioCustom} />
                      <span>{t('yes')}</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="no"
                        className={styles.radioInput}
                        {...step2Form.register("isEuResident")}
                      />
                      <span className={styles.radioCustom} />
                      <span>{t('no')}</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            <button type="submit" className={styles.submitButton}>
              {t('next')}
              <ArrowRight size={18} />
            </button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            className={styles.form}
            onSubmit={step3Form.handleSubmit(handleStep3Submit)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button type="button" className={styles.backButton} onClick={goBack}>
              <span className={styles.backArrow}>‹</span> <span className={styles.backText}>{t('back')}</span>
            </button>

            {submitError && <div className={styles.formError}>{submitError}</div>}

            <div className={styles.questionBlock}>
              <p className={styles.questionText}>{t('whatServices')}</p>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needCharter")}
                  />
                  <span className={styles.checkboxCustom} />
                  <span className={styles.checkboxText}>{t('charterFlight')}</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needTransport")}
                  />
                  <span className={styles.checkboxCustom} />
                  <span className={styles.checkboxText}>{t('personalTransport')}</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needVisa")}
                  />
                  <span className={styles.checkboxCustom} />
                  <span className={styles.checkboxText}>{t('visaSupport')}</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needTranslator")}
                  />
                  <span className={styles.checkboxCustom} />
                  <span className={styles.checkboxText}>{t('personalTranslator')}</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needHotel")}
                  />
                  <span className={styles.checkboxCustom} />
                  <span className={styles.checkboxText}>{t('hotelBooking')}</span>
                </label>
              </div>
            </div>

            <div className={styles.questionBlock}>
              <p className={styles.questionText}>{t('notesLabel')}</p>
              <div className={styles.textareaWrapper}>
                <textarea
                  className={styles.textarea}
                  placeholder={t('notesPlaceholder')}
                  maxLength={2000}
                  rows={4}
                  {...step3Form.register("clientNotes")}
                />
                <span className={styles.charCount}>
                  {step3Form.watch("clientNotes")?.length || 0} / 2000
                </span>
              </div>
              {step3Form.formState.errors.clientNotes && (
                <span className={styles.errorMessage}>
                  {step3Form.formState.errors.clientNotes.message}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

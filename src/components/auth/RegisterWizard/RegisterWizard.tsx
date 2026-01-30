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

const createStep1Schema = (t: (key: string) => string) => z.object({
  firstName: z
    .string()
    .min(1, t('validationFirstName'))
    .min(2, t('validationFirstNameMin'))
    .max(50, t('validationFirstNameMax')),
  lastName: z
    .string()
    .min(1, t('validationLastName'))
    .min(2, t('validationLastNameMin'))
    .max(50, t('validationLastNameMax')),
  email: z
    .string()
    .min(1, t('validationEmail'))
    .email(t('validationEmailFormat')),
  phone: z
    .string()
    .min(1, t('validationPhone'))
    .regex(/^\+[0-9]{10,15}$/, t('validationPhoneFormat')),
  password: z
    .string()
    .min(1, t('validationPassword'))
    .min(8, t('validationPasswordMin'))
    .regex(/[A-Z]/, t('validationPasswordUppercase'))
    .regex(/[0-9]/, t('validationPasswordNumber')),
  confirmPassword: z
    .string()
    .min(1, t('validationConfirmPassword')),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('validationPasswordMismatch'),
  path: ["confirmPassword"],
});

const createStep2Schema = (t: (key: string) => string) => z.object({
  currentLocation: z
    .string({ message: t('validationLocation') })
    .min(1, t('validationLocation'))
    .refine((val) => ["germany", "eu", "other"].includes(val), {
      message: t('validationLocation'),
    }),
  hasInsurance: z.enum(["yes", "no"]).optional(),
  canComeToGermany: z.enum(["yes", "no", "need_help"]).optional(),
  isEuResident: z.enum(["yes", "no"]).optional(),
});

const createStep3Schema = (t: (key: string) => string) => z.object({
  needCharter: z.boolean(),
  needTransport: z.boolean(),
  needVisa: z.boolean(),
  needTranslator: z.boolean(),
  needHotel: z.boolean(),
  clientNotes: z.string().max(2000, t('validationNotesMax')).optional(),
});

type Step1Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};
type Step2Data = {
  currentLocation: string;
  hasInsurance?: "yes" | "no";
  canComeToGermany?: "yes" | "no" | "need_help";
  isEuResident?: "yes" | "no";
};
type Step3Data = {
  needCharter: boolean;
  needTransport: boolean;
  needVisa: boolean;
  needTranslator: boolean;
  needHotel: boolean;
  clientNotes?: string;
};

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

  const step1Schema = createStep1Schema(t);
  const step2Schema = createStep2Schema(t);
  const step3Schema = createStep3Schema(t);

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
              <label htmlFor="firstName" className={styles.label}>
                {t('firstName')}
              </label>
              <input
                id="firstName"
                type="text"
                className={cn(styles.input, step1Form.formState.errors.firstName && styles.error)}
                {...step1Form.register("firstName")}
              />
              {step1Form.formState.errors.firstName && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.firstName.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                {t('lastName')}
              </label>
              <input
                id="lastName"
                type="text"
                className={cn(styles.input, step1Form.formState.errors.lastName && styles.error)}
                {...step1Form.register("lastName")}
              />
              {step1Form.formState.errors.lastName && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.lastName.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                className={cn(styles.input, step1Form.formState.errors.email && styles.error)}
                {...step1Form.register("email")}
              />
              {step1Form.formState.errors.email && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                {t('phone')}
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+49..."
                className={cn(styles.input, step1Form.formState.errors.phone && styles.error)}
                {...step1Form.register("phone", {
                  onChange: handlePhoneChange,
                })}
              />
              {step1Form.formState.errors.phone && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.phone.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                {t('password')}
              </label>
              <input
                id="password"
                type="password"
                className={cn(styles.input, step1Form.formState.errors.password && styles.error)}
                {...step1Form.register("password")}
              />
              {step1Form.formState.errors.password && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.password.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                {t('confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={cn(styles.input, step1Form.formState.errors.confirmPassword && styles.error)}
                {...step1Form.register("confirmPassword")}
              />
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

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./auth.module.scss";

// Validation schemas
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
});

const step2Schema = z.object({
  currentLocation: z.enum(["germany", "eu", "other"], {
    errorMap: () => ({ message: "Выберите ваше местоположение" }),
  }),
  hasInsurance: z.enum(["yes", "no"]).optional(),
  canComeToGermany: z.enum(["yes", "no", "need_help"]).optional(),
  isEuResident: z.enum(["yes", "no"]).optional(),
  preferredLocation: z.enum(["munich", "berlin", "frankfurt", "nuremberg"], {
    errorMap: () => ({ message: "Выберите город" }),
  }),
});

const step3Schema = z.object({
  needCharter: z.boolean(),
  needTransport: z.boolean(),
  needVisa: z.boolean(),
  needTranslator: z.boolean(),
  needHotel: z.boolean(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

export function RegisterWizard() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState<Step1Data | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<Step2Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: personalData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onBlur",
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: questionnaireData || {
      currentLocation: undefined,
      hasInsurance: undefined,
      canComeToGermany: undefined,
      isEuResident: undefined,
      preferredLocation: "munich",
    },
    mode: "onBlur",
  });

  // Step 3 form
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      needCharter: false,
      needTransport: false,
      needVisa: false,
      needTranslator: false,
      needHotel: false,
    },
  });

  // Watch current location to conditionally show insurance question
  const currentLocation = step2Form.watch("currentLocation");

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

    // Combine all data
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

      // Success - redirect to dashboard or success page
      router.push("/dashboard");
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

  // Phone mask handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove all non-digits except +
    value = value.replace(/[^\d+]/g, "");
    // Ensure it starts with +
    if (value && !value.startsWith("+")) {
      value = "+" + value;
    }
    // Limit length
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value;
    step1Form.setValue("phone", value, { shouldValidate: true });
  };

  return (
    <div className={styles.wizardContainer}>
      {/* Progress indicator */}
      <div className={styles.progressBar}>
        <div className={cn(styles.progressStep, step >= 1 && styles.active)}>
          <span className={styles.stepNumber}>1</span>
          <span className={styles.stepLabel}>Данные</span>
        </div>
        <div className={styles.progressLine}>
          <div className={cn(styles.progressFill, step >= 2 && styles.active)} />
        </div>
        <div className={cn(styles.progressStep, step >= 2 && styles.active)}>
          <span className={styles.stepNumber}>2</span>
          <span className={styles.stepLabel}>Анкета</span>
        </div>
        <div className={styles.progressLine}>
          <div className={cn(styles.progressFill, step >= 3 && styles.active)} />
        </div>
        <div className={cn(styles.progressStep, step >= 3 && styles.active)}>
          <span className={styles.stepNumber}>3</span>
          <span className={styles.stepLabel}>Услуги</span>
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
            {/* First Name */}
            <div className={styles.formGroup}>
              <input
                id="firstName"
                type="text"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.firstName && styles.error)}
                {...step1Form.register("firstName")}
              />
              <label htmlFor="firstName" className={styles.label}>
                Имя *
              </label>
              {step1Form.formState.errors.firstName && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className={styles.formGroup}>
              <input
                id="lastName"
                type="text"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.lastName && styles.error)}
                {...step1Form.register("lastName")}
              />
              <label htmlFor="lastName" className={styles.label}>
                Фамилия *
              </label>
              {step1Form.formState.errors.lastName && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.lastName.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <input
                id="email"
                type="email"
                placeholder=" "
                className={cn(styles.input, step1Form.formState.errors.email && styles.error)}
                {...step1Form.register("email")}
              />
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              {step1Form.formState.errors.email && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
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
                Телефон *
              </label>
              {step1Form.formState.errors.phone && (
                <span className={styles.errorMessage}>
                  {step1Form.formState.errors.phone.message}
                </span>
              )}
            </div>

            {/* Next button */}
            <button type="submit" className={styles.submitButton}>
              Далее
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
            {/* Back button */}
            <button type="button" className={styles.backButton} onClick={goBack}>
              <ArrowLeft size={18} />
              Назад
            </button>

            {/* Current Location */}
            <div className={styles.questionBlock}>
              <p className={styles.questionText}>Где вы сейчас находитесь? *</p>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="germany"
                    className={styles.radioInput}
                    {...step2Form.register("currentLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Германия</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="eu"
                    className={styles.radioInput}
                    {...step2Form.register("currentLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Евросоюз (не Германия)</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="other"
                    className={styles.radioInput}
                    {...step2Form.register("currentLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Другая страна</span>
                </label>
              </div>
              {step2Form.formState.errors.currentLocation && (
                <span className={styles.errorMessage}>
                  {step2Form.formState.errors.currentLocation.message}
                </span>
              )}
            </div>

            {/* Insurance - only show if in Germany */}
            {currentLocation === "germany" && (
              <div className={styles.questionBlock}>
                <p className={styles.questionText}>Есть ли у вас медицинская страховка в Германии?</p>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="yes"
                      className={styles.radioInput}
                      {...step2Form.register("hasInsurance")}
                    />
                    <span className={styles.radioCustom} />
                    <span>Да, есть страховка</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="no"
                      className={styles.radioInput}
                      {...step2Form.register("hasInsurance")}
                    />
                    <span className={styles.radioCustom} />
                    <span>Нет страховки</span>
                  </label>
                </div>
              </div>
            )}

            {/* Can come to Germany - only show if NOT in Germany */}
            {currentLocation && currentLocation !== "germany" && (
              <>
                <div className={styles.questionBlock}>
                  <p className={styles.questionText}>Можете ли вы приехать в Германию?</p>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="yes"
                        className={styles.radioInput}
                        {...step2Form.register("canComeToGermany")}
                      />
                      <span className={styles.radioCustom} />
                      <span>Да</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="no"
                        className={styles.radioInput}
                        {...step2Form.register("canComeToGermany")}
                      />
                      <span className={styles.radioCustom} />
                      <span>Нет</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="need_help"
                        className={styles.radioInput}
                        {...step2Form.register("canComeToGermany")}
                      />
                      <span className={styles.radioCustom} />
                      <span>Нужна помощь с организацией поездки</span>
                    </label>
                  </div>
                </div>

                {/* EU Resident */}
                <div className={styles.questionBlock}>
                  <p className={styles.questionText}>Являетесь ли вы резидентом Евросоюза?</p>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="yes"
                        className={styles.radioInput}
                        {...step2Form.register("isEuResident")}
                      />
                      <span className={styles.radioCustom} />
                      <span>Да</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="no"
                        className={styles.radioInput}
                        {...step2Form.register("isEuResident")}
                      />
                      <span className={styles.radioCustom} />
                      <span>Нет</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Preferred Location */}
            <div className={styles.questionBlock}>
              <p className={styles.questionText}>Выберите предпочтительный город: *</p>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="munich"
                    className={styles.radioInput}
                    {...step2Form.register("preferredLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Мюнхен</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="berlin"
                    className={styles.radioInput}
                    {...step2Form.register("preferredLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Берлин</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="frankfurt"
                    className={styles.radioInput}
                    {...step2Form.register("preferredLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Франкфурт</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="nuremberg"
                    className={styles.radioInput}
                    {...step2Form.register("preferredLocation")}
                  />
                  <span className={styles.radioCustom} />
                  <span>Нюрнберг</span>
                </label>
              </div>
              {step2Form.formState.errors.preferredLocation && (
                <span className={styles.errorMessage}>
                  {step2Form.formState.errors.preferredLocation.message}
                </span>
              )}
            </div>

            {/* Next button */}
            <button type="submit" className={styles.submitButton}>
              Далее
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
            {/* Back button */}
            <button type="button" className={styles.backButton} onClick={goBack}>
              <ArrowLeft size={18} />
              Назад
            </button>

            {submitError && <div className={styles.formError}>{submitError}</div>}

            {/* Additional Services */}
            <div className={styles.questionBlock}>
              <p className={styles.questionText}>Какие услуги вам могут понадобиться?</p>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needCharter")}
                  />
                  <span className={styles.checkboxCustom} />
                  <div className={styles.checkboxContent}>
                    <span className={styles.checkboxTitle}>Чартерный рейс</span>
                    <span className={styles.checkboxDesc}>Частный перелёт без очередей и пересадок</span>
                  </div>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needTransport")}
                  />
                  <span className={styles.checkboxCustom} />
                  <div className={styles.checkboxContent}>
                    <span className={styles.checkboxTitle}>Личный транспорт</span>
                    <span className={styles.checkboxDesc}>Премиальный автомобиль с водителем</span>
                  </div>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needVisa")}
                  />
                  <span className={styles.checkboxCustom} />
                  <div className={styles.checkboxContent}>
                    <span className={styles.checkboxTitle}>Визовая поддержка</span>
                    <span className={styles.checkboxDesc}>Визы, приглашения, оформление документов</span>
                  </div>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needTranslator")}
                  />
                  <span className={styles.checkboxCustom} />
                  <div className={styles.checkboxContent}>
                    <span className={styles.checkboxTitle}>Личный переводчик</span>
                    <span className={styles.checkboxDesc}>Сопровождение на всех встречах и консультациях</span>
                  </div>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    {...step3Form.register("needHotel")}
                  />
                  <span className={styles.checkboxCustom} />
                  <div className={styles.checkboxContent}>
                    <span className={styles.checkboxTitle}>Бронирование отеля</span>
                    <span className={styles.checkboxDesc}>Подберём размещение рядом с клиникой</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </button>

            {/* Confidentiality notice */}
            <p className={styles.confidentialityNotice}>
              {t("confidentialityNotice")}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

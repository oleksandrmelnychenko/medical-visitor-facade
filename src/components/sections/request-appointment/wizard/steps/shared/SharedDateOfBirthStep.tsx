"use client";

import React, { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import formStyles from "@/components/auth/Auth.module.scss";
import { useWizard } from "../../WizardContext";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

type DobPart = "day" | "month" | "year";

const DOB_PART_ORDER: DobPart[] = ["day", "month", "year"];
const DOB_PART_LENGTHS: Record<DobPart, number> = {
  day: 2,
  month: 2,
  year: 4,
};

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function parseDobParts(value: string) {
  const splitParts = value.split(/\D+/).filter(Boolean);

  if (splitParts.length === 3) {
    return {
      day: digitsOnly(splitParts[0]).slice(0, 2),
      month: digitsOnly(splitParts[1]).slice(0, 2),
      year: digitsOnly(splitParts[2]).slice(0, 4),
    };
  }

  const digits = digitsOnly(value);

  return {
    day: digits.slice(0, 2),
    month: digits.slice(2, 4),
    year: digits.slice(4, 8),
  };
}

function isValidDob(day: string, month: string, year: string) {
  if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
    return false;
  }

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (
    !Number.isInteger(dayNumber) ||
    !Number.isInteger(monthNumber) ||
    !Number.isInteger(yearNumber) ||
    monthNumber < 1 ||
    monthNumber > 12 ||
    dayNumber < 1 ||
    dayNumber > 31
  ) {
    return false;
  }

  const candidateDate = new Date(yearNumber, monthNumber - 1, dayNumber);
  const today = new Date();

  return (
    candidateDate.getFullYear() === yearNumber &&
    candidateDate.getMonth() === monthNumber - 1 &&
    candidateDate.getDate() === dayNumber &&
    candidateDate <= today
  );
}

function getDobPartValue(part: DobPart, values: { day: string; month: string; year: string }) {
  if (part === "day") return values.day;
  if (part === "month") return values.month;
  return values.year;
}

export function SharedDateOfBirthStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const initialParts = parseDobParts(data.dateOfBirth || "");
  const [day, setDay] = useState(initialParts.day);
  const [month, setMonth] = useState(initialParts.month);
  const [year, setYear] = useState(initialParts.year);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const isComplete = day.length === 2 && month.length === 2 && year.length === 4;
  const isDobValid = isValidDob(day, month, year);
  const showInvalidState = isComplete && !isDobValid;

  const focusPart = useCallback((part: DobPart) => {
    const inputMap = {
      day: dayRef,
      month: monthRef,
      year: yearRef,
    };

    inputMap[part].current?.focus();
    inputMap[part].current?.select();
  }, []);

  const setPartValue = useCallback((part: DobPart, value: string) => {
    if (part === "day") setDay(value);
    if (part === "month") setMonth(value);
    if (part === "year") setYear(value);
  }, []);

  const applyParsedDate = useCallback((rawValue: string) => {
    const parsed = parseDobParts(rawValue);
    setDay(parsed.day);
    setMonth(parsed.month);
    setYear(parsed.year);

    if (parsed.year.length === 4) {
      requestAnimationFrame(() => focusPart("year"));
      return;
    }

    if (parsed.day.length === 2 && parsed.month.length === 2) {
      requestAnimationFrame(() => focusPart("year"));
      return;
    }

    if (parsed.day.length === 2) {
      requestAnimationFrame(() => focusPart("month"));
      return;
    }

    requestAnimationFrame(() => focusPart("day"));
  }, [focusPart]);

  const handleContinue = useCallback(() => {
    if (!isDobValid) return;
    updateData({ dateOfBirth: `${day}.${month}.${year}` });
    router.push("/apply?type=new&step=phone");
  }, [day, isDobValid, month, router, updateData, year]);

  const handleBack = useCallback(() => {
    router.push("/apply?type=new&step=patient-name");
  }, [router]);

  const handlePartChange = useCallback((part: DobPart, rawValue: string) => {
    const nextValue = digitsOnly(rawValue).slice(0, DOB_PART_LENGTHS[part]);
    setPartValue(part, nextValue);

    if (nextValue.length === DOB_PART_LENGTHS[part]) {
      const currentIndex = DOB_PART_ORDER.indexOf(part);
      const nextPart = DOB_PART_ORDER[currentIndex + 1];

      if (nextPart) {
        requestAnimationFrame(() => focusPart(nextPart));
      }
    }
  }, [focusPart, setPartValue]);

  const handlePartPaste = useCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = event.clipboardData.getData("text");

    if (!pastedValue) return;

    const parsed = parseDobParts(pastedValue);
    const looksLikeFullDate =
      parsed.day.length > 0 &&
      parsed.month.length > 0 &&
      parsed.year.length > 0;

    if (!looksLikeFullDate) return;

    event.preventDefault();
    applyParsedDate(pastedValue);
  }, [applyParsedDate]);

  const handlePartKeyDown = useCallback((part: DobPart, event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentValue = getDobPartValue(part, { day, month, year });
    const currentIndex = DOB_PART_ORDER.indexOf(part);
    const previousPart = DOB_PART_ORDER[currentIndex - 1];
    const nextPart = DOB_PART_ORDER[currentIndex + 1];

    if (event.key === "Enter") {
      event.preventDefault();
      if (isDobValid) {
        handleContinue();
      }
      return;
    }

    if (event.key === "Backspace" && currentValue.length === 0 && previousPart) {
      event.preventDefault();
      focusPart(previousPart);
      return;
    }

    if (event.key === "ArrowLeft" && previousPart) {
      event.preventDefault();
      focusPart(previousPart);
      return;
    }

    if (event.key === "ArrowRight" && nextPart) {
      event.preventDefault();
      focusPart(nextPart);
    }
  }, [day, focusPart, handleContinue, isDobValid, month, year]);

  const handlePartBlur = useCallback((part: DobPart) => {
    if (part === "year") return;

    const currentValue = getDobPartValue(part, { day, month, year });

    if (currentValue.length === 1) {
      setPartValue(part, currentValue.padStart(2, "0"));
    }
  }, [day, month, setPartValue, year]);

  return (
    <WizardStepLayout
      title={t("sharedDob.title")}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={styles.dobFieldset}>
            <div className={styles.dobSegmented} role="group" aria-label={t("sharedDob.title")}>
              <div className={styles.dobSegment}>
                <input
                  ref={dayRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday-day"
                  value={day}
                  onChange={e => handlePartChange("day", e.target.value)}
                  onPaste={handlePartPaste}
                  onKeyDown={e => handlePartKeyDown("day", e)}
                  onBlur={() => handlePartBlur("day")}
                  onFocus={e => e.currentTarget.select()}
                  placeholder={t("sharedDob.day")}
                  aria-label={t("sharedDob.day")}
                  aria-required="true"
                  className={styles.dobSegmentInput}
                  maxLength={2}
                  autoFocus
                />
              </div>
              <div className={styles.dobSegment}>
                <input
                  ref={monthRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday-month"
                  value={month}
                  onChange={e => handlePartChange("month", e.target.value)}
                  onPaste={handlePartPaste}
                  onKeyDown={e => handlePartKeyDown("month", e)}
                  onBlur={() => handlePartBlur("month")}
                  onFocus={e => e.currentTarget.select()}
                  placeholder={t("sharedDob.month")}
                  aria-label={t("sharedDob.month")}
                  aria-required="true"
                  className={styles.dobSegmentInput}
                  maxLength={2}
                />
              </div>
              <div className={styles.dobSegment}>
                <input
                  ref={yearRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday-year"
                  value={year}
                  onChange={e => handlePartChange("year", e.target.value)}
                  onPaste={handlePartPaste}
                  onKeyDown={e => handlePartKeyDown("year", e)}
                  onFocus={e => e.currentTarget.select()}
                  placeholder={t("sharedDob.year")}
                  aria-label={t("sharedDob.year")}
                  aria-required="true"
                  className={styles.dobSegmentInput}
                  maxLength={4}
                />
              </div>
            </div>
            <p className={cn(styles.dobHint, showInvalidState && styles.dobHintError)}>
              {showInvalidState ? t("sharedDob.invalid") : t("sharedDob.hint")}
            </p>
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!isDobValid}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          {t("continue")}
        </button>
      </div>
    </WizardStepLayout>
  );
}

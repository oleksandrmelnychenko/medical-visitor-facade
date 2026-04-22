"use client";

import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { ClipboardList, Phone, Route, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import type { WizardData } from "../types";
import styles from "@/features/apply/ApplyPage.module.scss";

interface ReviewSummaryProps {
  data: WizardData;
  uploadedMedicalFiles?: File[];
}

interface SummaryRow {
  label: string;
  value: string;
}

interface SummarySection {
  icon: LucideIcon;
  key: string;
  title: string;
  rows: SummaryRow[];
}

const SERVICE_LABELS: Record<string, string> = {
  driver: "driver",
  concierge: "concierge",
  "medical-transport": "medicalTransport",
  "air-ambulance": "airAmbulance",
  "business-aviation": "businessAviation",
  none: "none",
  "not-sure": "notSure",
};

const LOCATION_LABELS: Record<NonNullable<WizardData["locationDetailed"]>, string> = {
  germany: "germany",
  eu_not_germany: "euNotGermany",
  outside_eu: "outsideEu",
};

const LEGAL_SEX_LABELS: Record<NonNullable<WizardData["legalSex"]>, string> = {
  female: "female",
  male: "male",
  diverse: "diverse",
  no_entry: "noEntry",
};

const PREFERRED_LOCATION_LABELS: Record<NonNullable<WizardData["preferredLocation"]>, string> = {
  no_preference: "noPreference",
  munich: "munich",
  berlin: "berlin",
  hamburg: "hamburg",
  cologne: "cologne",
};

const VISIT_TIMING_LABELS: Record<NonNullable<WizardData["visitTiming"]>, string> = {
  asap: "asap",
  next_few_months: "nextFewMonths",
  not_sure: "notSure",
};

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function ReviewSummary({ data, uploadedMedicalFiles = [] }: ReviewSummaryProps) {
  const t = useTranslations("appointment.newPatient");
  const tMembership = useTranslations("membership");

  const sections = useMemo<SummarySection[]>(() => {
    const yesNo = (value: string | boolean | null | undefined) => {
      if (value === true || value === "yes") {
        return t("reviewSummary.yes");
      }

      if (value === false || value === "no") {
        return t("reviewSummary.no");
      }

      return t("reviewSummary.notProvided");
    };

    const medicalRecords = () => {
      if (data.hasMedicalRecords === "yes") return t("recordsPatient.yes");
      if (data.hasMedicalRecords === "no") return t("recordsPatient.no");
      if (data.hasMedicalRecords === "none") return t("recordsPatient.none");
      return t("reviewSummary.notProvided");
    };

    const location = data.locationDetailed
      ? t(`location3.${LOCATION_LABELS[data.locationDetailed]}`)
      : t("reviewSummary.notProvided");
    const selectedProgram = data.selectedProgram
      ? tMembership(`${data.selectedProgram}.title`)
      : "";

    const fullName = [data.firstName, data.middleName, data.lastName, data.suffix]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(" ");

    const address = [
      data.streetAddress,
      data.city,
      data.state && data.state !== "0" ? data.state : "",
      data.zipCode && data.zipCode !== "0" ? data.zipCode : "",
      data.country,
    ]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(", ");

    const services = data.services
      .map((value) => {
        const key = SERVICE_LABELS[value];
        return key ? t(`services.${key}`) : value;
      })
      .filter(Boolean)
      .join(", ");

    const whatsappValue =
      data.whatsappConsent === true && hasText(data.whatsappNumber)
        ? data.whatsappNumber
        : data.whatsappConsent === false
          ? t("reviewSummary.no")
          : t("reviewSummary.notProvided");

    const eligibilityRows: SummaryRow[] = [{ label: t("reviewSummary.location"), value: location }];

    if (selectedProgram) {
      eligibilityRows.push({
        label: tMembership("selection.summaryLabel"),
        value: selectedProgram,
      });
    }

    if (data.locationDetailed && data.locationDetailed !== "germany") {
      if (!selectedProgram) {
        eligibilityRows.push({
          label: t("reviewSummary.membership"),
          value:
            data.wantsMembership === "yes"
              ? t("becomeMember.yes")
              : data.wantsMembership === "no"
                ? t("becomeMember.no")
                : t("reviewSummary.notProvided"),
        });
      }

      eligibilityRows.push(
        { label: t("reviewSummary.travel"), value: yesNo(data.canTravel) },
        { label: t("reviewSummary.records"), value: medicalRecords() }
      );

      if (data.hasMedicalRecords === "yes") {
        eligibilityRows.push(
          {
            label: t("reviewSummary.recordsLanguage"),
            value: yesNo(data.recordsInAcceptedLanguage),
          },
          {
            label: t("reviewSummary.travelDocuments"),
            value: yesNo(data.hasTravelDocuments),
          }
        );
      }
    }

    const patientRows: SummaryRow[] = [
      {
        label: t("reviewSummary.name"),
        value: fullName || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.dateOfBirth"),
        value: data.dateOfBirth || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.legalSex"),
        value: data.legalSex
          ? t(`sharedLegalSex.${LEGAL_SEX_LABELS[data.legalSex]}`)
          : t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.interpreter"),
        value: yesNo(data.needsInterpreter),
      },
    ];

    if (data.needsInterpreter === "yes") {
      patientRows.push({
        label: t("reviewSummary.primaryLanguage"),
        value: data.primaryLanguage || t("reviewSummary.notProvided"),
      });
    }

    const contactRows: SummaryRow[] = [
      {
        label: t("reviewSummary.phone"),
        value: data.phones[0]?.number || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.email"),
        value: data.email || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.whatsapp"),
        value: whatsappValue,
      },
    ];

    const requestRows: SummaryRow[] = [
      {
        label: t("reviewSummary.services"),
        value: services || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.address"),
        value: address || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.primaryConcern"),
        value: data.primaryConcernText || t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.healthRisk"),
        value: yesNo(data.hasHealthRiskForTravel),
      },
    ];

    if (data.hasHealthRiskForTravel === "no") {
      requestRows.push({
        label: t("reviewSummary.currentTreatment"),
        value: yesNo(data.currentlyInTreatment),
      });
    }

    if (uploadedMedicalFiles.length > 0) {
      requestRows.push({
        label: t("reviewSummary.attachments"),
        value: uploadedMedicalFiles.map((file) => file.name).join("\n"),
      });
    }

    requestRows.push({
      label: t("reviewSummary.insurance"),
      value: yesNo(data.hasInsurance),
    });

    if (data.hasInsurance === "yes") {
      requestRows.push({
        label: t("reviewSummary.insuranceCoverage"),
        value:
          data.insuranceCoversGermany === "yes"
            ? t("reviewSummary.yes")
            : data.insuranceCoversGermany === "no"
              ? t("reviewSummary.no")
              : data.insuranceCoversGermany === "not_sure"
                ? t("reviewSummary.notSure")
                : t("reviewSummary.notProvided"),
      });
    }

    requestRows.push(
      {
        label: t("reviewSummary.preferredLocation"),
        value: data.preferredLocation
          ? t(`preferredLocation.${PREFERRED_LOCATION_LABELS[data.preferredLocation]}`)
          : t("reviewSummary.notProvided"),
      },
      {
        label: t("reviewSummary.visitTiming"),
        value: data.visitTiming
          ? t(`visitTiming.${VISIT_TIMING_LABELS[data.visitTiming]}`)
          : t("reviewSummary.notProvided"),
      }
    );

    if (hasText(data.message)) {
      requestRows.push({
        label: t("reviewSummary.message"),
        value: data.message,
      });
    }

    return [
      { key: "eligibility", title: t("reviewSummary.eligibility"), icon: Route, rows: eligibilityRows },
      { key: "patient", title: t("reviewSummary.patient"), icon: UserRound, rows: patientRows },
      { key: "contact", title: t("reviewSummary.contact"), icon: Phone, rows: contactRows },
      { key: "request", title: t("reviewSummary.request"), icon: ClipboardList, rows: requestRows },
    ];
  }, [data, t, tMembership, uploadedMedicalFiles]);

  return (
    <section className={styles.wizardReviewCard} aria-label={t("reviewSummary.title")}>
      <div className={styles.wizardReviewHeader}>
        <h3 className={styles.wizardReviewTitle}>{t("reviewSummary.title")}</h3>
      </div>

      <div className={styles.wizardReviewGrid}>
        {sections.map((section) => (
          <section key={section.key} className={styles.wizardReviewSection}>
            <div className={styles.wizardReviewSectionHeading}>
              <section.icon className={styles.wizardReviewSectionIcon} aria-hidden="true" />
              <h4 className={styles.wizardReviewSectionTitle}>{section.title}</h4>
            </div>
            <dl className={styles.wizardReviewList}>
              {section.rows.map((row) => (
                <div key={`${section.key}-${row.label}`} className={styles.wizardReviewRow}>
                  <dt className={styles.wizardReviewLabel}>{row.label}</dt>
                  <dd className={styles.wizardReviewValue}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { WizardProvider } from "./WizardContext";
import { getAccessibleWizardStep } from "./flow";
import { LocationStep } from "./steps/LocationStep";
import { TravelReadyStep } from "./steps/TravelReadyStep";
import { MedicalRecordsStep } from "./steps/MedicalRecordsStep";
import { TravelDocumentsStep } from "./steps/TravelDocumentsStep";
import { ExitNoTravelStep } from "./steps/ExitNoTravelStep";
import { ExitNoRecordsStep } from "./steps/ExitNoRecordsStep";
import { MedicalRecordsLanguageStep } from "./steps/shared/MedicalRecordsLanguageStep";

// Shared new steps
import { WelcomeStep } from "./steps/shared/WelcomeStep";
import { MemberCheckStep } from "./steps/shared/MemberCheckStep";
import { AccountCheckStep } from "./steps/shared/AccountCheckStep";
import { BecomeMemberStep } from "./steps/shared/BecomeMemberStep";
import { useWizard } from "./WizardContext";
import type { MembershipPlanType, WizardStep } from "./types";
import styles from "../RequestAppointment/RequestAppointment.module.scss";

const PatientFlowStepView = dynamic(
  () => import("./PatientFlowStepView").then((module) => module.PatientFlowStepView),
  { loading: () => null }
);

const LateFlowStepView = dynamic(
  () => import("./LateFlowStepView").then((module) => module.LateFlowStepView),
  { loading: () => null }
);

const PATIENT_FLOW_STEPS = [
  "health-intro",
  "patient-name",
  "patient-dob",
  "phone",
  "whatsapp-consent",
  "email-consent",
  "no-contact-exit",
  "primary-language",
  "legal-sex",
  "interpreter",
 ] as const satisfies readonly WizardStep[];

const LATE_FLOW_STEPS = [
  "services",
  "address",
  "concern-intro",
  "primary-concern",
  "current-treatment",
  "health-risk",
  "insurance-intro",
  "insurance",
  "insurance-coverage",
  "wrap-up-intro",
  "preferred-location",
  "visit-timing",
  "anything-else",
  "review",
 ] as const satisfies readonly WizardStep[];

type PatientFlowStep = (typeof PATIENT_FLOW_STEPS)[number];
type LateFlowStep = (typeof LATE_FLOW_STEPS)[number];

function normalizeMembershipPlan(value: string | null): MembershipPlanType {
  return value === "portal" || value === "reserve" ? value : null;
}

function isPatientFlowStep(step: WizardStep): step is PatientFlowStep {
  return (PATIENT_FLOW_STEPS as readonly WizardStep[]).includes(step);
}

function isLateFlowStep(step: WizardStep): step is LateFlowStep {
  return (LATE_FLOW_STEPS as readonly WizardStep[]).includes(step);
}

let patientFlowPrefetchPromise: Promise<unknown> | null = null;
let lateFlowPrefetchPromise: Promise<unknown> | null = null;

function preloadPatientFlow() {
  if (!patientFlowPrefetchPromise) {
    patientFlowPrefetchPromise = import("./PatientFlowStepView");
  }

  return patientFlowPrefetchPromise;
}

function preloadLateFlow() {
  if (!lateFlowPrefetchPromise) {
    lateFlowPrefetchPromise = import("./LateFlowStepView");
  }

  return lateFlowPrefetchPromise;
}

function WizardStepView() {
  const router = useRouter();
  const { data, isDraftHydrated, updateData } = useWizard();
  const searchParams = useSearchParams();
  const requestedStep = (searchParams.get("step") ?? "member-check") as WizardStep;
  const selectedPlan = normalizeMembershipPlan(searchParams.get("plan"));
  const step = isDraftHydrated
    ? getAccessibleWizardStep(requestedStep, data)
    : requestedStep;

  useEffect(() => {
    if (!isDraftHydrated || !selectedPlan || data.selectedProgram === selectedPlan) {
      return;
    }

    updateData({ selectedProgram: selectedPlan });
  }, [data.selectedProgram, isDraftHydrated, selectedPlan, updateData]);

  useEffect(() => {
    if (!isDraftHydrated || step === requestedStep) {
      return;
    }

    router.replace(`/apply?type=new&step=${step}`);
  }, [isDraftHydrated, requestedStep, router, step]);

  useEffect(() => {
    const preload = () => {
      void preloadPatientFlow();
      void preloadLateFlow();
    };

    const browser = globalThis.window;

    if (!browser) {
      return;
    }

    if ("requestIdleCallback" in browser) {
      const idleId = browser.requestIdleCallback(preload, { timeout: 1500 });
      return () => browser.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(preload, 250);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isPatientFlowStep(step) || step === "welcome" || step === "location" || step === "outside-documents") {
      void preloadPatientFlow();
    }

    if (
      isLateFlowStep(step) ||
      step === "legal-sex" ||
      step === "interpreter" ||
      step === "primary-language" ||
      step === "phone"
    ) {
      void preloadLateFlow();
    }
  }, [step]);

  let stepContent: React.ReactNode;

  switch (step) {
    case "member-check":
      stepContent = <MemberCheckStep />;
      break;
    case "account-check":
      stepContent = <AccountCheckStep />;
      break;
    case "welcome":
      stepContent = <WelcomeStep />;
      break;
    case "location":
      stepContent = <LocationStep />;
      break;
    case "become-member":
      stepContent = <BecomeMemberStep />;
      break;
    case "outside-travel":
      stepContent = <TravelReadyStep />;
      break;
    case "outside-records":
      stepContent = <MedicalRecordsStep />;
      break;
    case "records-language":
      stepContent = <MedicalRecordsLanguageStep />;
      break;
    case "outside-documents":
      stepContent = <TravelDocumentsStep />;
      break;
    case "outside-exit-travel":
      stepContent = <ExitNoTravelStep />;
      break;
    case "outside-exit-records":
      stepContent = <ExitNoRecordsStep />;
      break;
    default:
      if (isPatientFlowStep(step)) {
        stepContent = <PatientFlowStepView step={step} />;
      } else if (isLateFlowStep(step)) {
        stepContent = <LateFlowStepView step={step} />;
      } else {
        stepContent = <MemberCheckStep />;
      }
  }

  return (
    <>{stepContent}</>
  );
}

const GATE_STEPS: ReadonlySet<string> = new Set(["member-check", "account-check"]);

function SelectedProgramBannerInner() {
  const tMembership = useTranslations("membership");
  const { data } = useWizard();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") ?? "member-check";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on the entry gate — the user hasn't committed to the new-patient
  // path yet, so showing a program is premature. Returning members can
  // change the program from the portal after login.
  if (GATE_STEPS.has(currentStep)) {
    return null;
  }

  if (!data.selectedProgram || !data.accountCheckCompleted) {
    return null;
  }

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={styles.wizardProgramBanner}>
      <div className={styles.wizardProgramCopy}>
        <p className={styles.wizardProgramEyebrow}>{tMembership("selection.bannerEyebrow")}</p>
        <p className={styles.wizardProgramTitle}>{tMembership(`${data.selectedProgram}.title`)}</p>
      </div>
      <Link href="/membership" prefetch={false} className={styles.wizardProgramChangeLink}>
        {tMembership("selection.change")}
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>,
    document.body
  );
}

function SelectedProgramBanner() {
  return (
    <Suspense fallback={null}>
      <SelectedProgramBannerInner />
    </Suspense>
  );
}

export function ApplyNewPatientWizard() {
  return (
    <WizardProvider>
      <SelectedProgramBanner />
      <WizardStepView />
    </WizardProvider>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
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
import { BecomeMemberStep } from "./steps/shared/BecomeMemberStep";
import { useWizard } from "./WizardContext";
import type { WizardStep } from "./types";

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
  "additional-concerns",
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
  const { data, isDraftHydrated } = useWizard();
  const searchParams = useSearchParams();
  const requestedStep = (searchParams.get("step") ?? "member-check") as WizardStep;
  const step = isDraftHydrated
    ? getAccessibleWizardStep(requestedStep, data)
    : requestedStep;

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

  switch (step) {
    // Shared start
    case "member-check":
      return <MemberCheckStep />;
    case "welcome":
      return <WelcomeStep />;
    case "location":
      return <LocationStep />;

    // Non-Germany eligibility
    case "become-member":
      return <BecomeMemberStep />;
    case "outside-travel":
      return <TravelReadyStep />;
    case "outside-records":
      return <MedicalRecordsStep />;
    case "records-language":
      return <MedicalRecordsLanguageStep />;
    case "outside-documents":
      return <TravelDocumentsStep />;
    case "outside-exit-travel":
      return <ExitNoTravelStep />;
    case "outside-exit-records":
      return <ExitNoRecordsStep />;

    default:
      if (isPatientFlowStep(step)) {
        return <PatientFlowStepView step={step} />;
      }

      if (isLateFlowStep(step)) {
        return <LateFlowStepView step={step} />;
      }

      return <MemberCheckStep />;
  }
}

export function ApplyNewPatientWizard() {
  return (
    <WizardProvider>
      <WizardStepView />
    </WizardProvider>
  );
}

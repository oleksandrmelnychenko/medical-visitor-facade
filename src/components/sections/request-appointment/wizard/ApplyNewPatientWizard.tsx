"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "@/i18n/navigation";
import { WizardProvider } from "./WizardContext";
import { WizardProgressBar } from "./components/WizardProgressBar";
import { getAccessibleWizardStep } from "./flow";
import { buildPath } from "./wizard-path";
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

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

const slideTransition = { duration: 0.28, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] };

function WizardStepView() {
  const router = useRouter();
  const { data, isDraftHydrated } = useWizard();
  const searchParams = useSearchParams();
  const requestedStep = (searchParams.get("step") ?? "member-check") as WizardStep;
  const step = isDraftHydrated
    ? getAccessibleWizardStep(requestedStep, data)
    : requestedStep;

  const prevStepRef = useRef(step);
  const path = useMemo(() => buildPath(data), [data]);
  const currentIndex = path.indexOf(step);
  const prevIndex = path.indexOf(prevStepRef.current);
  const direction = currentIndex >= prevIndex ? 1 : -1;

  useEffect(() => {
    prevStepRef.current = step;
  }, [step]);

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
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
      >
        {stepContent}
      </motion.div>
    </AnimatePresence>
  );
}

export function ApplyNewPatientWizard() {
  return (
    <WizardProvider>
      <WizardProgressBar />
      <WizardStepView />
    </WizardProvider>
  );
}

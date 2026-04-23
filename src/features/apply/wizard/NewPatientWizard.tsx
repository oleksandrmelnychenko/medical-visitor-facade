"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { WizardProvider } from "./WizardContext";
import { getAccessibleWizardStep } from "./flow";
import { Location } from "./steps/eligibility/Location";
import { TravelReady } from "./steps/eligibility/TravelReady";
import { MedicalRecords } from "./steps/eligibility/MedicalRecords";
import { TravelDocuments } from "./steps/eligibility/TravelDocuments";
import { ExitNoTravel } from "./steps/eligibility/ExitNoTravel";
import { ExitNoRecords } from "./steps/eligibility/ExitNoRecords";
import { MedicalRecordsLanguage } from "./steps/eligibility/MedicalRecordsLanguage";

// Shared new steps
import { Welcome } from "./steps/entry/Welcome";
import { MemberCheck } from "./steps/entry/MemberCheck";
import { AccountCheck } from "./steps/entry/AccountCheck";
import { BecomeMember } from "./steps/eligibility/BecomeMember";
import { useWizard } from "./WizardContext";
import type { MembershipPlanType, WizardStep } from "./types";
import styles from "@/features/apply/ApplyPage.module.scss";

const PatientFlow = dynamic(
  () => import("./views/PatientFlow").then((module) => module.PatientFlow),
  { loading: () => null }
);

const LateFlow = dynamic(
  () => import("./views/LateFlow").then((module) => module.LateFlow),
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
  if (value === "portal") {
    return "standard";
  }

  return value === "standard" || value === "care" || value === "reserve"
    ? value
    : null;
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
    patientFlowPrefetchPromise = import("./views/PatientFlow");
  }

  return patientFlowPrefetchPromise;
}

function preloadLateFlow() {
  if (!lateFlowPrefetchPromise) {
    lateFlowPrefetchPromise = import("./views/LateFlow");
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
      stepContent = <MemberCheck />;
      break;
    case "account-check":
      stepContent = <AccountCheck />;
      break;
    case "welcome":
      stepContent = <Welcome />;
      break;
    case "location":
      stepContent = <Location />;
      break;
    case "become-member":
      stepContent = <BecomeMember />;
      break;
    case "outside-travel":
      stepContent = <TravelReady />;
      break;
    case "outside-records":
      stepContent = <MedicalRecords />;
      break;
    case "records-language":
      stepContent = <MedicalRecordsLanguage />;
      break;
    case "outside-documents":
      stepContent = <TravelDocuments />;
      break;
    case "outside-exit-travel":
      stepContent = <ExitNoTravel />;
      break;
    case "outside-exit-records":
      stepContent = <ExitNoRecords />;
      break;
    default:
      if (isPatientFlowStep(step)) {
        stepContent = <PatientFlow step={step} />;
      } else if (isLateFlowStep(step)) {
        stepContent = <LateFlow step={step} />;
      } else {
        stepContent = <MemberCheck />;
      }
  }

  return (
    <>{stepContent}</>
  );
}

const GATE_STEPS: ReadonlySet<string> = new Set(["member-check", "account-check"]);

const subscribeMounted = () => () => {};
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

function SelectedProgramBannerInner() {
  const tMembership = useTranslations("membership");
  const { data } = useWizard();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") ?? "member-check";
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot
  );

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

export function NewPatientWizard() {
  return (
    <WizardProvider>
      <SelectedProgramBanner />
      <WizardStepView />
    </WizardProvider>
  );
}

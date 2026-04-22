import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RequestAppointment } from "@/components/sections/request-appointment/RequestAppointment";
import {
  getBreadcrumbItems,
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/shared/lib/seo";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
import { getAccessibleWizardStep } from "@/components/sections/request-appointment/wizard/flow";
import {
  getWizardDataFromCookieValue,
  isWizardStep,
  WIZARD_PROGRESS_COOKIE_NAME,
} from "@/components/sections/request-appointment/wizard/progress-cookie";

type ApplyPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    type?: string | string[];
    step?: string | string[];
  }>;
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isPatientType(value: string | undefined): value is "new" | "returning" | "physician" {
  return value === "new" || value === "returning" || value === "physician";
}

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "appointment.title"),
    getLocalizedMessage(safeLocale, "appointment.subtitle"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/apply",
    title,
    description,
    noIndex: true,
  });
}

export default async function AppointmentPage({ params, searchParams }: ApplyPageProps) {
  const [{ locale }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const safeLocale = normalizeLanguage(locale);
  const requestedType = getSingleSearchParam(resolvedSearchParams.type);
  const requestedStepParam = getSingleSearchParam(resolvedSearchParams.step);
  const activeType = isPatientType(requestedType) ? requestedType : null;

  if (activeType === "new" || (!activeType && requestedStepParam)) {
    const cookieStore = await cookies();
    const cookieData = getWizardDataFromCookieValue(
      cookieStore.get(WIZARD_PROGRESS_COOKIE_NAME)?.value
    );
    const requestedStep = isWizardStep(requestedStepParam) ? requestedStepParam : "member-check";
    const accessibleStep = getAccessibleWizardStep(requestedStep, cookieData);
    const hasInvalidStep = Boolean(requestedStepParam && !isWizardStep(requestedStepParam));
    const shouldRedirect =
      requestedType !== "new" || hasInvalidStep || accessibleStep !== requestedStep;

    if (shouldRedirect) {
      redirect(`/${safeLocale}/apply?type=new&step=${accessibleStep}`);
    }
  }

  const [homeLabel, pageTitle] = await Promise.all([
    getLocalizedMessage(safeLocale, "common.home"),
    getLocalizedMessage(safeLocale, "appointment.title"),
  ]);

  return (
    <main>
      <BreadcrumbJsonLd
        items={getBreadcrumbItems(safeLocale, [
          { name: homeLabel, path: "" },
          { name: pageTitle, path: "/apply" },
        ])}
      />
      <RequestAppointment />
    </main>
  );
}

import { Metadata } from "next";
import { RequestAppointment } from "@/components/sections/request-appointment/RequestAppointment";
import {
  getAlternateLanguages,
  getBreadcrumbItems,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
type ApplyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const title = await getLocalizedMessage(safeLocale, "appointment.title");
  const description = await getLocalizedMessage(safeLocale, "appointment.subtitle");

  return {
    title,
    description,
    alternates: getAlternateLanguages("/apply", safeLocale),
  };
}

export default async function AppointmentPage({ params }: ApplyPageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const homeLabel = await getLocalizedMessage(safeLocale, "common.home");
  const pageTitle = await getLocalizedMessage(safeLocale, "appointment.title");

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

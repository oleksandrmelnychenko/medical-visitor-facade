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
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "appointment.title"),
    getLocalizedMessage(safeLocale, "appointment.subtitle"),
  ]);

  return {
    title,
    description,
    alternates: getAlternateLanguages("/apply", safeLocale),
  };
}

export default async function AppointmentPage({ params }: ApplyPageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
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

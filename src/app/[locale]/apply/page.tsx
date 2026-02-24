import { Metadata } from "next";
import { RequestAppointment } from "@/components/sections/request-appointment/RequestAppointment";
import { getAlternateLanguages } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const metadata: Metadata = {
  title: "Apply for Membership",
  description: "Apply to become a GMED Agency member. Get personalized medical concierge services, clinic selection, and patient support in Germany.",
  alternates: getAlternateLanguages("/apply"),
};

export default function AppointmentPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/de` },
        { name: "Apply", url: `${baseUrl}/de/apply` },
      ]} />
      <RequestAppointment />
    </main>
  );
}

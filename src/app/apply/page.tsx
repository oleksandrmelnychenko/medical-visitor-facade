import { Metadata } from "next";
import { RequestAppointment } from "@/components/sections/request-appointment/RequestAppointment";

export const metadata: Metadata = {
  title: "Apply for Membership",
  description: "Apply to become a GMED Agency member. Get personalized medical concierge services, clinic selection, and patient support in Germany.",
  alternates: {
    canonical: "/apply",
  },
};

export default function AppointmentPage() {
  return (
    <main>
      <RequestAppointment />
    </main>
  );
}

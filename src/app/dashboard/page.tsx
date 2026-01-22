import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardContent } from "./DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/patient-portal");
  }

  return <DashboardContent user={session.user} />;
}

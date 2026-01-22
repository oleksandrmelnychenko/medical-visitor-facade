import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardContent } from "./DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <DashboardContent
      user={{
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone,
        role: session.user.role,
      }}
    />
  );
}

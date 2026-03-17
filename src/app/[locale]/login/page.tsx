import { Metadata } from "next";
import {
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";
import { LoginPageClient } from "./LoginPageClient";

type LoginPaymentState =
  | "canceled"
  | "expired"
  | "failed"
  | "paid"
  | "pending"
  | "unknown"
  | "unavailable"
  | null;

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ payment?: string | string[] | undefined }>;
};

function parsePaymentState(payment: string | string[] | undefined): LoginPaymentState {
  const rawValue = Array.isArray(payment) ? payment[0] : payment;

  switch (rawValue) {
    case "paid":
    case "pending":
    case "failed":
    case "canceled":
    case "expired":
    case "unknown":
    case "unavailable":
      return rawValue;
    default:
      return null;
  }
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "auth.signIn"),
    getLocalizedMessage(safeLocale, "auth.welcomeSubtitle"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/login",
    title,
    description,
    noIndex: true,
  });
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { payment } = await searchParams;

  return <LoginPageClient paymentState={parsePaymentState(payment)} />;
}

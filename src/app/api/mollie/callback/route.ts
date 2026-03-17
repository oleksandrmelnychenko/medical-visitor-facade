import { NextRequest, NextResponse } from "next/server";
import { defaultLanguage, normalizeLanguage } from "@/lib/seo";
import {
  MOLLIE_PAYMENT_ID_COOKIE,
  MOLLIE_PAYMENT_LOCALE_COOKIE,
  getMolliePayment,
} from "@/lib/mollie";

export const runtime = "nodejs";

function clearCheckoutCookies(response: NextResponse) {
  response.cookies.set(MOLLIE_PAYMENT_ID_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(MOLLIE_PAYMENT_LOCALE_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function buildLoginRedirect(request: NextRequest, locale: string, paymentState: string) {
  return new URL(`/${locale}/login?payment=${paymentState}`, request.url);
}

function mapPaymentStatus(status: string) {
  switch (status) {
    case "paid":
      return "paid";
    case "authorized":
    case "open":
    case "pending":
      return "pending";
    case "canceled":
      return "canceled";
    case "expired":
      return "expired";
    case "failed":
      return "failed";
    default:
      return "unknown";
  }
}

export async function GET(request: NextRequest) {
  const locale = normalizeLanguage(
    request.cookies.get(MOLLIE_PAYMENT_LOCALE_COOKIE)?.value || defaultLanguage
  );
  const paymentId = request.cookies.get(MOLLIE_PAYMENT_ID_COOKIE)?.value;

  if (!paymentId) {
    const response = NextResponse.redirect(buildLoginRedirect(request, locale, "unknown"), 303);
    clearCheckoutCookies(response);
    return response;
  }

  try {
    const payment = await getMolliePayment(paymentId);
    const response = NextResponse.redirect(
      buildLoginRedirect(request, locale, mapPaymentStatus(payment.status)),
      303
    );

    clearCheckoutCookies(response);
    return response;
  } catch (error) {
    console.error("Mollie callback error:", error);
    const response = NextResponse.redirect(buildLoginRedirect(request, locale, "unknown"), 303);

    clearCheckoutCookies(response);
    return response;
  }
}

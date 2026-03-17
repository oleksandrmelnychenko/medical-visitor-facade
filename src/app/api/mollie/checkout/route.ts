import { NextRequest, NextResponse } from "next/server";
import { normalizeLanguage } from "@/lib/seo";
import {
  MOLLIE_PAYMENT_ID_COOKIE,
  MOLLIE_PAYMENT_LOCALE_COOKIE,
  createMolliePayment,
  isMollieConfigured,
} from "@/lib/mollie";

export const runtime = "nodejs";

function normalizeOrigin(origin: string) {
  return origin.replace(/\/+$/, "");
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const rawLocale = formData.get("locale");
  const locale = normalizeLanguage(typeof rawLocale === "string" ? rawLocale : "en");

  if (!isMollieConfigured()) {
    return NextResponse.redirect(new URL(`/${locale}/login?payment=unavailable`, request.url), 303);
  }

  const origin = normalizeOrigin(process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin);
  const webhookUrl = normalizeOrigin(process.env.MOLLIE_WEBHOOK_URL || `${origin}/api/mollie/webhook`);

  try {
    const payment = await createMolliePayment({
      redirectUrl: `${origin}/api/mollie/callback`,
      webhookUrl,
      metadata: {
        locale,
        source: "login-screen",
      },
    });

    const checkoutHref = payment._links?.checkout?.href;

    if (!checkoutHref) {
      throw new Error("Missing Mollie checkout URL");
    }

    const response = NextResponse.redirect(checkoutHref, 303);

    response.cookies.set(MOLLIE_PAYMENT_ID_COOKIE, payment.id, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set(MOLLIE_PAYMENT_LOCALE_COOKIE, locale, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Mollie checkout error:", error);
    return NextResponse.redirect(new URL(`/${locale}/login?payment=unavailable`, request.url), 303);
  }
}

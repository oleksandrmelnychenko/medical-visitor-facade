import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale?: string;
};

function getIntakeConfig() {
  const baseUrl = process.env.CONTACT_INTAKE_URL?.trim().replace(/\/+$/, "");
  const token = process.env.CONTACT_INTAKE_TOKEN?.trim();

  if (!baseUrl || !token) {
    return null;
  }

  return { baseUrl, token };
}

function sanitizeString(value: unknown, max = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function sanitizePhone(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[^\d+\s()-]/g, "").trim().slice(0, 32);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const payload: ContactPayload = {
    name: sanitizeString(raw.name, 120),
    email: sanitizeString(raw.email, 160),
    phone: sanitizePhone(raw.phone),
    message: sanitizeString(raw.message, 2000),
    locale: sanitizeString(raw.locale, 8) || undefined,
  };

  if (!payload.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (!payload.phone || payload.phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  }

  const config = getIntakeConfig();

  if (!config) {
    console.info("[contact] intake not configured, payload:", payload);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const response = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.token}`,
      },
      body: JSON.stringify({
        source: "contact-form",
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[contact] intake rejected", response.status, text);
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] intake failed", error);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}

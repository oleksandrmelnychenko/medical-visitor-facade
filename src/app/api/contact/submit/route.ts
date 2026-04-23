import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

const NO_STORE_HEADERS = { "cache-control": "no-store, private, max-age=0" } as const;
const MAX_BODY_BYTES = 32 * 1024;

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

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Payload too large", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  if (!body || typeof body !== "object") {
    return jsonError("Invalid payload", 400);
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
    return jsonError("Name is required", 400);
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return jsonError("Valid email is required", 400);
  }

  if (!payload.phone || payload.phone.replace(/\D/g, "").length < 6) {
    return jsonError("Phone is required", 400);
  }

  const config = getIntakeConfig();

  if (!config) {
    console.info("[contact] intake not configured, payload:", payload);
    return NextResponse.json({ ok: true, forwarded: false }, { headers: NO_STORE_HEADERS });
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
      return jsonError("Upstream error", 502);
    }
  } catch (error) {
    console.error("[contact] intake failed", error);
    return jsonError("Network error", 502);
  }

  return NextResponse.json({ ok: true, forwarded: true }, { headers: NO_STORE_HEADERS });
}

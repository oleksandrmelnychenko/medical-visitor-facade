import { validateEmail, validateName } from "@/features/apply/wizard/validation";

export type ContactFieldKey = "name" | "email" | "phone";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale?: string;
};

export type ContactFieldErrors = Partial<Record<ContactFieldKey, true>>;

export type ContactActionState = {
  status: "idle" | "success" | "error" | "rate-limited" | "validation-error";
  fieldErrors: ContactFieldErrors;
  requestId: number;
};

export const initialContactActionState: ContactActionState = {
  status: "idle",
  fieldErrors: {},
  requestId: 0,
};

type ContactValidationResult =
  | { ok: true; payload: ContactPayload }
  | { ok: false; fieldErrors: ContactFieldErrors };

type ContactForwardResult =
  | { ok: true; forwarded: boolean }
  | { ok: false; error: "Upstream error" | "Network error" };

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

export function validatePhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 6;
}

export function sanitizePhone(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[^\d+\s()-]/g, "").trim().slice(0, 32);
}

export function parseContactPayload(raw: Record<string, unknown>): ContactValidationResult {
  const payload: ContactPayload = {
    name: sanitizeString(raw.name, 120),
    email: sanitizeString(raw.email, 160),
    phone: sanitizePhone(raw.phone),
    message: sanitizeString(raw.message, 2000),
    locale: sanitizeString(raw.locale, 8) || undefined,
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!validateName(payload.name)) {
    fieldErrors.name = true;
  }

  if (!validateEmail(payload.email)) {
    fieldErrors.email = true;
  }

  if (!validatePhone(payload.phone)) {
    fieldErrors.phone = true;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, payload };
}

export async function forwardContactPayload(payload: ContactPayload): Promise<ContactForwardResult> {
  const config = getIntakeConfig();

  if (!config) {
    console.info("[contact] intake not configured, payload:", payload);
    return { ok: true, forwarded: false };
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
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[contact] intake rejected", response.status, text);
      return { ok: false, error: "Upstream error" };
    }
  } catch (error) {
    console.error("[contact] intake failed", error);
    return { ok: false, error: "Network error" };
  }

  return { ok: true, forwarded: true };
}

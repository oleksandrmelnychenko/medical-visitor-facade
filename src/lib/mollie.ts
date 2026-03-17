import "server-only";

const MOLLIE_API_URL = "https://api.mollie.com/v2";

export const MOLLIE_PAYMENT_ID_COOKIE = "mollie_payment_id";
export const MOLLIE_PAYMENT_LOCALE_COOKIE = "mollie_payment_locale";

export type MolliePaymentStatus =
  | "authorized"
  | "canceled"
  | "expired"
  | "failed"
  | "open"
  | "paid"
  | "pending";

type MollieLink = {
  href: string;
  type?: string;
};

export type MolliePayment = {
  id: string;
  status: MolliePaymentStatus;
  _links?: {
    checkout?: MollieLink;
  };
};

type CreateMolliePaymentOptions = {
  redirectUrl: string;
  webhookUrl: string;
  metadata?: Record<string, string>;
};

type MollieConfig = {
  apiKey: string;
  amount: string;
  currency: string;
  description: string;
};

function normalizeAmount(amount: string) {
  const trimmedAmount = amount.trim();

  if (!/^\d+\.\d{2}$/.test(trimmedAmount)) {
    throw new Error("MOLLIE_PAYMENT_AMOUNT must use the format 10.00");
  }

  return trimmedAmount;
}

function getMollieConfig(): MollieConfig | null {
  const apiKey = process.env.MOLLIE_API_KEY?.trim();
  const amount = process.env.MOLLIE_PAYMENT_AMOUNT?.trim();

  if (!apiKey || !amount) {
    return null;
  }

  return {
    apiKey,
    amount: normalizeAmount(amount),
    currency: process.env.MOLLIE_PAYMENT_CURRENCY?.trim() || "EUR",
    description: process.env.MOLLIE_PAYMENT_DESCRIPTION?.trim() || "Portal access payment",
  };
}

export function isMollieConfigured() {
  return getMollieConfig() !== null;
}

async function mollieRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getMollieConfig();

  if (!config) {
    throw new Error("Mollie is not configured");
  }

  const response = await fetch(`${MOLLIE_API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const payloadText = await response.text();
  const payload = payloadText ? (JSON.parse(payloadText) as Record<string, unknown>) : null;

  if (!response.ok) {
    const detail =
      payload && typeof payload.detail === "string"
        ? payload.detail
        : payload && typeof payload.title === "string"
          ? payload.title
          : "Mollie request failed";

    throw new Error(detail);
  }

  return payload as T;
}

export async function createMolliePayment({
  redirectUrl,
  webhookUrl,
  metadata,
}: CreateMolliePaymentOptions) {
  const config = getMollieConfig();

  if (!config) {
    throw new Error("Mollie is not configured");
  }

  return mollieRequest<MolliePayment>("/payments", {
    method: "POST",
    body: JSON.stringify({
      amount: {
        currency: config.currency,
        value: config.amount,
      },
      description: config.description,
      redirectUrl,
      webhookUrl,
      metadata,
    }),
  });
}

export async function getMolliePayment(paymentId: string) {
  return mollieRequest<MolliePayment>(`/payments/${paymentId}`);
}

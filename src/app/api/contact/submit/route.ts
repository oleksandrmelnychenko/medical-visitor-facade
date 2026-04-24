import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/shared/lib/rate-limit";
import {
  type ContactPayload,
  forwardContactPayload,
  parseContactPayload,
} from "@/features/home/sections/contact/contact-submission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

const NO_STORE_HEADERS = { "cache-control": "no-store, private, max-age=0" } as const;
const MAX_BODY_BYTES = 32 * 1024;

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE_HEADERS });
}

function createResponseHeaders(rateLimitHeaders: HeadersInit = {}) {
  return { ...NO_STORE_HEADERS, ...rateLimitHeaders };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Payload too large", 413);
  }

  const rateLimit = await enforceRateLimit(request.headers, "contact");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: createResponseHeaders(rateLimit.headers) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: createResponseHeaders(rateLimit.headers) },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400, headers: createResponseHeaders(rateLimit.headers) },
    );
  }

  const payloadResult = parseContactPayload(body as Record<string, unknown>);

  if (!payloadResult.ok) {
    const errorMessage =
      payloadResult.fieldErrors.name ? "Name is required"
      : payloadResult.fieldErrors.email ? "Valid email is required"
      : "Phone is required";

    return NextResponse.json(
      { error: errorMessage },
      { status: 400, headers: createResponseHeaders(rateLimit.headers) },
    );
  }

  const payload: ContactPayload = payloadResult.payload;
  const submission = await forwardContactPayload(payload);

  if (!submission.ok) {
    return NextResponse.json(
      { error: submission.error },
      { status: 502, headers: createResponseHeaders(rateLimit.headers) },
    );
  }

  return NextResponse.json(
    { ok: true, forwarded: submission.forwarded },
    { headers: createResponseHeaders(rateLimit.headers) },
  );
}

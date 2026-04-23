import { NextResponse } from "next/server";
import type { SubmissionBundle } from "@/features/apply/wizard/submission";
import { validateWizardSubmission } from "@/features/apply/wizard/flow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const NO_STORE_HEADERS = { "cache-control": "no-store, private, max-age=0" } as const;
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

function getIntakeConfig() {
  const baseUrl = process.env.LEAD_INTAKE_URL?.trim().replace(/\/+$/, "");
  const token = process.env.LEAD_INTAKE_TOKEN?.trim();

  if (!baseUrl || !token) {
    return null;
  }

  return { baseUrl, token };
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("multipart/form-data")) {
      return jsonError("Invalid request format", 400);
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > MAX_UPLOAD_BYTES) {
      return jsonError("Payload too large", 413);
    }

    const formData = await request.formData();
    const rawBundle = formData.get("bundle");

    if (typeof rawBundle !== "string") {
      return jsonError("Invalid bundle format", 400);
    }

    let bundle: SubmissionBundle;
    try {
      bundle = JSON.parse(rawBundle) as SubmissionBundle;
    } catch {
      return jsonError("Invalid bundle format", 400);
    }

    if (!bundle.payload || !bundle.summary) {
      return jsonError("Invalid bundle format", 400);
    }

    const validationErrors = validateWizardSubmission(bundle.payload);
    if (validationErrors.length > 0) {
      return jsonError("Incomplete or invalid application data", 400);
    }

    const config = getIntakeConfig();
    if (!config) {
      console.error("Lead intake endpoint not configured");
      return jsonError("Service configuration error", 500);
    }

    const forward = new FormData();
    forward.append("bundle", rawBundle);
    for (const entry of formData.getAll("files")) {
      if (entry instanceof File && entry.size > 0) {
        forward.append("files", entry, entry.name);
      }
    }

    const forwardHeaders = new Headers({
      "x-intake-token": config.token,
    });
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
      forwardHeaders.set("x-forwarded-for", forwardedFor);
    }
    const userAgent = request.headers.get("user-agent");
    if (userAgent) {
      forwardHeaders.set("user-agent", userAgent);
    }

    const upstream = await fetch(
      `${config.baseUrl}/api/v1/public/lead-intake`,
      {
        method: "POST",
        headers: forwardHeaders,
        body: forward,
        cache: "no-store",
      }
    );

    const upstreamBody = (await upstream.json().catch(() => ({}))) as {
      lead_id?: string;
      attachment_count?: number;
      error?: string;
      message?: string;
    };

    if (!upstream.ok) {
      console.error("Lead intake upstream error", {
        status: upstream.status,
        body: upstreamBody,
      });
      return jsonError("Failed to submit request", 502);
    }

    return NextResponse.json(
      {
        success: true,
        leadId: upstreamBody.lead_id,
        uploadedFileCount: upstreamBody.attachment_count ?? 0,
      },
      { headers: NO_STORE_HEADERS },
    );
  } catch (err) {
    console.error("Submit error:", err);
    return jsonError("Failed to submit request", 500);
  }
}

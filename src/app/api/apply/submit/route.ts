import { NextResponse } from "next/server";
import type { SubmissionBundle } from "@/features/apply/wizard/submission";
import { validateWizardSubmission } from "@/features/apply/wizard/flow";

export const runtime = "nodejs";

function getIntakeConfig() {
  const baseUrl = process.env.LEAD_INTAKE_URL?.trim().replace(/\/+$/, "");
  const token = process.env.LEAD_INTAKE_TOKEN?.trim();

  if (!baseUrl || !token) {
    return null;
  }

  return { baseUrl, token };
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const rawBundle = formData.get("bundle");

    if (typeof rawBundle !== "string") {
      return NextResponse.json(
        { error: "Invalid bundle format" },
        { status: 400 }
      );
    }

    let bundle: SubmissionBundle;
    try {
      bundle = JSON.parse(rawBundle) as SubmissionBundle;
    } catch {
      return NextResponse.json(
        { error: "Invalid bundle format" },
        { status: 400 }
      );
    }

    if (!bundle.payload || !bundle.summary) {
      return NextResponse.json(
        { error: "Invalid bundle format" },
        { status: 400 }
      );
    }

    const validationErrors = validateWizardSubmission(bundle.payload);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: "Incomplete or invalid application data" },
        { status: 400 }
      );
    }

    const config = getIntakeConfig();
    if (!config) {
      console.error("Lead intake endpoint not configured");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: "Failed to submit request" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: upstreamBody.lead_id,
      uploadedFileCount: upstreamBody.attachment_count ?? 0,
    });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}

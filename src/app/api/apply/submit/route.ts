import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { SalesforceBundle } from "@/components/sections/request-appointment/wizard/salesforce-bundle";
import { validateWizardSubmission } from "@/components/sections/request-appointment/wizard/flow";
import {
  bundleToCsvRow,
  generateCsv,
} from "@/components/sections/request-appointment/wizard/salesforce-bundle";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let bundle: SalesforceBundle;
    let uploadedFiles: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const rawBundle = formData.get("bundle");

      if (typeof rawBundle !== "string") {
        return NextResponse.json(
          { error: "Invalid bundle format" },
          { status: 400 }
        );
      }

      bundle = JSON.parse(rawBundle) as SalesforceBundle;
      uploadedFiles = formData
        .getAll("files")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    } else {
      bundle = await request.json();
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

    const salesforceEmail = process.env.SALESFORCE_EMAIL;
    if (!salesforceEmail) {
      console.error("SALESFORCE_EMAIL env var is not set");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    const row = bundleToCsvRow(bundle);
    const csv = generateCsv(row);
    const csvBuffer = Buffer.from(csv, "utf-8");

    const timestamp = bundle.submittedAt
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .replace("Z", "");
    const filename = `salesforce-lead-${bundle.flow}-${timestamp}.csv`;

    const uploadedAttachments = await Promise.all(
      uploadedFiles.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || "application/octet-stream",
      }))
    );

    const { error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || "noreply@gmed-health.com",
      to: salesforceEmail,
      subject: `New Patient Lead - ${bundle.flow} - ${bundle.summary.fullName}`,
      text: [
        `New patient lead submitted via website.`,
        ``,
        `Name: ${bundle.summary.fullName}`,
        `Email: ${bundle.summary.email}`,
        `Phone: ${bundle.summary.primaryPhone}`,
        `Location: ${bundle.summary.locationDetailed || "not specified"}`,
        `Flow: ${bundle.flow}`,
        `Submitted: ${bundle.submittedAt}`,
        uploadedAttachments.length
          ? `Uploaded files: ${uploadedAttachments.map((file) => file.filename).join(", ")}`
          : `Uploaded files: none`,
        ``,
        `CSV file attached for Salesforce import.`,
      ].join("\n"),
      attachments: [
        {
          filename,
          content: csvBuffer,
          contentType: "text/csv",
        },
        ...uploadedAttachments,
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

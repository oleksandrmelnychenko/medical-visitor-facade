import { NextResponse } from "next/server";
import type { SalesforceBundle } from "@/components/sections/request-appointment/wizard/salesforce-bundle";
import { validateWizardSubmission } from "@/components/sections/request-appointment/wizard/flow";
import { submitBundleToSalesforce } from "./salesforce";

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

    const result = await submitBundleToSalesforce(bundle, uploadedFiles);

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      uploadedFileCount: result.uploadedFileCount,
    });
  } catch (err) {
    console.error("Submit error:", err);
    const errorMessage =
      err instanceof Error &&
      err.message.toLowerCase().includes("missing salesforce environment")
        ? "Service configuration error"
        : "Failed to submit request";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

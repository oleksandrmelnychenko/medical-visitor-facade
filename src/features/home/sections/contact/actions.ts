"use server";

import { headers } from "next/headers";
import { enforceRateLimit } from "@/shared/lib/rate-limit";
import {
  forwardContactPayload,
  parseContactPayload,
  type ContactActionState,
} from "./contact-submission";

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const requestHeaders = await headers();
  const rateLimit = await enforceRateLimit(requestHeaders, "contact");

  if (!rateLimit.allowed) {
    return {
      status: "rate-limited",
      fieldErrors: {},
      requestId: Date.now(),
    };
  }

  const payloadResult = parseContactPayload({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    locale: formData.get("locale"),
  });

  if (!payloadResult.ok) {
    return {
      status: "validation-error",
      fieldErrors: payloadResult.fieldErrors,
      requestId: Date.now(),
    };
  }

  const submission = await forwardContactPayload(payloadResult.payload);

  return {
    status: submission.ok ? "success" : "error",
    fieldErrors: {},
    requestId: Date.now(),
  };
}

import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { prisma } from "@/lib/prisma";

// TODO: Connect SMS provider (Twilio, etc.)
// For now this is a placeholder that stores the code in database

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { phone, isActive: true },
    });

    if (!user) {
      // Don't reveal if user exists - return success anyway
      return NextResponse.json({ success: true });
    }

    // Generate 6-digit code using cryptographically secure random
    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store reset code (you may need to add this table to your schema)
    await prisma.passwordReset.upsert({
      where: { userId: user.id },
      update: { code, expiresAt },
      create: { userId: user.id, code, expiresAt },
    });

    // TODO: Send SMS with code
    // await sendSMS(phone, `Your verification code: ${code}`);
    console.log(`[DEV] Password reset code for ${phone}: ${code}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to send code" },
      { status: 500 }
    );
  }
}

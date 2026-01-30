import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userRole = session.user.role;
    const isAdminOrManager = userRole === "ADMIN" || userRole === "MANAGER";

    const application = await prisma.application.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (!isAdminOrManager && application.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Mark messages as read where:
    // - For admin/manager: mark messages from clients as read
    // - For client: mark messages from admin/manager as read
    const senderRolesToMark = isAdminOrManager
      ? ["CLIENT"]
      : ["ADMIN", "MANAGER"];

    await prisma.message.updateMany({
      where: {
        applicationId: id,
        senderRole: { in: senderRolesToMark as ("CLIENT" | "MANAGER" | "ADMIN")[] },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to mark messages as read:", error);
    return NextResponse.json(
      { error: "Failed to mark messages as read" },
      { status: 500 }
    );
  }
}

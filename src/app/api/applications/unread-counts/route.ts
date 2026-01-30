import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    const isAdminOrManager = userRole === "ADMIN" || userRole === "MANAGER";

    if (!isAdminOrManager) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get unread message counts grouped by applicationId
    // For admin/manager, count unread messages from clients
    const unreadCounts = await prisma.message.groupBy({
      by: ["applicationId"],
      where: {
        senderRole: "CLIENT",
        isRead: false,
      },
      _count: {
        id: true,
      },
    });

    // Transform to a map of applicationId -> count
    const countsMap: Record<string, number> = {};
    for (const item of unreadCounts) {
      countsMap[item.applicationId] = item._count.id;
    }

    return NextResponse.json({
      success: true,
      data: countsMap,
    });
  } catch (error) {
    console.error("Failed to fetch unread counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch unread counts" },
      { status: 500 }
    );
  }
}

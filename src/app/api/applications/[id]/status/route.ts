import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum([
    "NEW",
    "IN_REVIEW",
    "CONTACTED",
    "COMPLETED",
    "CANCELLED",
  ]),
  comment: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "ADMIN" && userRole !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const validationResult = statusSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { status, comment } = validationResult.data;

    const application = await prisma.application.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const [updatedApplication] = await prisma.$transaction([
      prisma.application.update({
        where: { id },
        data: { status },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              phone: true,
              firstName: true,
              lastName: true,
            },
          },
          location: true,
          insurance: true,
          travelAbility: true,
          services: {
            include: {
              service: true,
            },
          },
        },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: id,
          oldStatus: application.status,
          newStatus: status,
          changedBy: session.user.id,
          comment: comment || null,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Failed to update application status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

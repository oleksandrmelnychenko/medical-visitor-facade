import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { hash } from "bcryptjs";
import { z } from "zod";

// Validation schema for application submission
const applicationSchema = z.object({
  // Personal data (Step 1)
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),

  // Questionnaire (Step 2)
  currentLocation: z.string().min(1, "Location is required"),
  hasInsurance: z.enum(["yes", "no"]).optional(),
  canComeToGermany: z.enum(["yes", "no", "need_help"]).optional(),
  isEuResident: z.enum(["yes", "no"]).optional(),
  // Services (Step 3)
  needCharter: z.boolean().default(false),
  needTransport: z.boolean().default(false),
  needVisa: z.boolean().default(false),
  needTranslator: z.boolean().default(false),
  needHotel: z.boolean().default(false),
  // Notes
  clientNotes: z.string().max(2000, "Notes cannot exceed 2000 characters").optional(),
});

// POST - Create new application (public, but with validation)
export async function POST(request: NextRequest) {
  try {
    // Check for CSRF token in header (NextAuth handles this automatically for forms)
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Sanitize input (basic XSS prevention)
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, "").trim();
    data.firstName = sanitize(data.firstName);
    data.lastName = sanitize(data.lastName);
    data.email = sanitize(data.email).toLowerCase();
    data.phone = sanitize(data.phone);

    // Start transaction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await prisma.$transaction(async (tx: any) => {
      // Check if user exists by email or phone
      let user = await tx.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { phone: data.phone },
          ],
        },
      });

      // Create user if not exists
      if (!user) {
        // Hash the user-provided password
        const hashedPassword = await hash(data.password, 12);

        user = await tx.user.create({
          data: {
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        });
      } else {
        // Update user name if provided
        if (data.firstName || data.lastName) {
          user = await tx.user.update({
            where: { id: user.id },
            data: {
              firstName: data.firstName || user.firstName,
              lastName: data.lastName || user.lastName,
            },
          });
        }
      }

      // Get reference IDs in parallel for better performance
      const [location, insurance, travelAbility] = await Promise.all([
        tx.location.findFirst({
          where: { code: data.currentLocation },
        }),
        data.hasInsurance
          ? tx.insuranceStatus.findFirst({
              where: { code: data.hasInsurance },
            })
          : Promise.resolve(null),
        data.canComeToGermany
          ? tx.travelAbility.findFirst({
              where: { code: data.canComeToGermany },
            })
          : Promise.resolve(null),
      ]);

      // Generate application number (format: APP-YYYYMMDD-XXXX)
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      const randomSuffix = Math.random().toString(36).slice(-4).toUpperCase();
      const applicationNum = `APP-${dateStr}-${randomSuffix}`;

      // Create application
      const application = await tx.application.create({
        data: {
          applicationNum,
          userId: user.id,
          locationId: location?.id,
          insuranceId: insurance?.id,
          travelAbilityId: travelAbility?.id,
          isEuResident: data.isEuResident === "yes" ? true : data.isEuResident === "no" ? false : null,
          status: "NEW",
          clientNotes: data.clientNotes || null,
        },
      });

      // Create status history entry
      await tx.applicationStatusHistory.create({
        data: {
          applicationId: application.id,
          newStatus: "NEW",
          comment: "Application submitted via website",
        },
      });

      // Get selected services
      const selectedServices: string[] = [];
      if (data.needCharter) selectedServices.push("charter");
      if (data.needTransport) selectedServices.push("transport");
      if (data.needVisa) selectedServices.push("visa");
      if (data.needTranslator) selectedServices.push("translator");
      if (data.needHotel) selectedServices.push("hotel");

      // Link services to application
      if (selectedServices.length > 0) {
        const services = await tx.service.findMany({
          where: { code: { in: selectedServices } },
        });

        await tx.applicationService.createMany({
          data: services.map((service: { id: string }) => ({
            applicationId: application.id,
            serviceId: service.id,
          })),
        });
      }

      return {
        applicationId: application.id,
        applicationNum: application.applicationNum,
        userId: user.id,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Application submission error:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));

    // Handle unique constraint errors
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit application", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// GET - List applications (protected - requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check role - only ADMIN and MANAGER can list all applications
    const userRole = session.user.role;
    const isAdminOrManager = userRole === "ADMIN" || userRole === "MANAGER";

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100); // Max 100 per page

    // Build where clause
    const where: Record<string, unknown> = {};

    // Non-admin users can only see their own applications
    if (!isAdminOrManager) {
      where.userId = session.user.id;
    } else if (userId) {
      where.userId = userId;
    }

    if (status) {
      where.status = status;
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              phone: true,
              firstName: true,
              lastName: true,
              // Never expose password
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
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      data: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

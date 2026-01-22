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

  // Questionnaire (Step 2)
  currentLocation: z.enum(["germany", "eu", "other"]),
  hasInsurance: z.enum(["yes", "no"]).optional(),
  canComeToGermany: z.enum(["yes", "no", "need_help"]).optional(),
  isEuResident: z.enum(["yes", "no"]).optional(),
  preferredLocation: z.enum(["munich", "berlin", "frankfurt", "nuremberg"]),

  // Services (Step 3)
  needCharter: z.boolean().default(false),
  needTransport: z.boolean().default(false),
  needVisa: z.boolean().default(false),
  needTranslator: z.boolean().default(false),
  needHotel: z.boolean().default(false),
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
        // Generate temporary password (user will set it later or login via phone)
        const tempPassword = await hash(Math.random().toString(36).slice(-12), 12);

        user = await tx.user.create({
          data: {
            email: data.email,
            phone: data.phone,
            password: tempPassword,
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

      // Get reference IDs
      const location = await tx.location.findUnique({
        where: { code: data.currentLocation },
      });

      const city = await tx.city.findUnique({
        where: { code: data.preferredLocation },
      });

      const insurance = data.hasInsurance
        ? await tx.insuranceStatus.findUnique({
            where: { code: data.hasInsurance },
          })
        : null;

      const travelAbility = data.canComeToGermany
        ? await tx.travelAbility.findUnique({
            where: { code: data.canComeToGermany },
          })
        : null;

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
          preferredCityId: city?.id,
          insuranceId: insurance?.id,
          travelAbilityId: travelAbility?.id,
          isEuResident: data.isEuResident === "yes" ? true : data.isEuResident === "no" ? false : null,
          status: "NEW",
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

    // Handle unique constraint errors
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit application" },
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
          preferredCity: true,
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

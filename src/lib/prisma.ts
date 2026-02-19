import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(connectionString: string) {
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

const prismaFallback = new Proxy({} as PrismaClient, {
  get() {
    throw new Error(
      "Database connection string not found. Set POSTGRES_PRISMA_URL or DATABASE_URL in your environment.",
    );
  },
});

if (!connectionString && process.env.NODE_ENV === "development") {
  console.warn(
    "[DB] POSTGRES_PRISMA_URL/DATABASE_URL is missing. Database-backed routes will fail until env is configured.",
  );
}

export const prisma =
  globalForPrisma.prisma ??
  (connectionString ? createPrismaClient(connectionString) : prismaFallback);

if (process.env.NODE_ENV !== "production") {
  if (connectionString) {
    globalForPrisma.prisma = prisma;
  }
}

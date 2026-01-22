import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if we're in build mode (no DATABASE_URL available)
const isBuildTime = !process.env.DATABASE_URL;

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // During build time, return a proxy that throws on actual use
    // This allows the build to pass while failing at runtime if used without DB
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === 'then') return undefined; // For Promise detection
        throw new Error(`Database not configured. Set DATABASE_URL environment variable.`);
      },
    });
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && !isBuildTime) {
  globalForPrisma.prisma = prisma;
}

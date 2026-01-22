import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import type { UserRole } from "@prisma/client";

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string;
    role: UserRole;
    phone?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      phone?: string | null;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    phone?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Phone or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        const identifier = (credentials.identifier as string).trim();
        const password = credentials.password as string;

        // Determine if identifier is email or phone
        const isEmail = identifier.includes("@");

        // Find user by phone or email with additional security checks
        const user = await prisma.user.findFirst({
          where: {
            ...(isEmail ? { email: identifier.toLowerCase() } : { phone: identifier }),
            isActive: true, // Only allow active users
          },
        });

        if (!user) {
          // Prevent timing attacks - always hash even if user not found
          await compare(password, "$2a$12$dummy.hash.to.prevent.timing.attacks");
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Combine firstName and lastName for the name field
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

        return {
          id: user.id,
          email: user.email,
          name: fullName || user.email,
          role: user.role,
          phone: user.phone,
        };
      },
    }),
  ],

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every hour
  },

  // JWT configuration
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Custom pages
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Security callbacks
  callbacks: {
    // Add role and other data to JWT token
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }

      // Handle session update
      if (trigger === "update" && session) {
        token.name = session.name;
      }

      return token;
    },

    // Add role and other data to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
      }
      return session;
    },

  },

  // Events for logging/auditing
  events: {
    async signIn({ user }) {
      console.log(`[AUTH] User signed in: ${user.email}`);
    },
    async signOut() {
      console.log(`[AUTH] User signed out`);
    },
  },

  // Trust the host header
  trustHost: true,

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
});

// Helper function to check if user has required role
export function hasRole(userRole: UserRole | undefined, requiredRoles: UserRole[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

// Helper function to check if user is admin
export function isAdmin(userRole: UserRole | undefined): boolean {
  return hasRole(userRole, ["ADMIN"]);
}

// Helper function to check if user is manager or admin
export function isManagerOrAdmin(userRole: UserRole | undefined): boolean {
  return hasRole(userRole, ["ADMIN", "MANAGER"]);
}

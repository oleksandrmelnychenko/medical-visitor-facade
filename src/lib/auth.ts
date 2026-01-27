import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import type { UserRole } from "@prisma/client";

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

        const isEmail = identifier.includes("@");

        const user = await prisma.user.findFirst({
          where: {
            ...(isEmail ? { email: identifier.toLowerCase() } : { phone: identifier }),
            isActive: true,
          },
        });

        if (!user) {
          await compare(password, "$2a$12$dummy.hash.to.prevent.timing.attacks");
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        if (user.role === "CLIENT") {
          const completedApplication = await prisma.application.findFirst({
            where: {
              userId: user.id,
              status: "COMPLETED",
            },
          });

          if (!completedApplication) {
            throw new Error("APPLICATION_PENDING");
          }
        }

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

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },

  jwt: {
    maxAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }

      if (trigger === "update" && session) {
        token.name = session.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
      }
      return session;
    },

  },

  events: {
    async signIn({ user }) {
      console.log(`[AUTH] User signed in: ${user.email}`);
    },
    async signOut() {
      console.log(`[AUTH] User signed out`);
    },
  },

  trustHost: true,

  debug: process.env.NODE_ENV === "development",
});

export function hasRole(userRole: UserRole | undefined, requiredRoles: UserRole[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

export function isAdmin(userRole: UserRole | undefined): boolean {
  return hasRole(userRole, ["ADMIN"]);
}

export function isManagerOrAdmin(userRole: UserRole | undefined): boolean {
  return hasRole(userRole, ["ADMIN", "MANAGER"]);
}

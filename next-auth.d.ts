import { Role } from "@/types";
import NextAuth, { DefaultSession } from "next-auth";

export type ExternalUser = DefaultSession["user"] & {
  role: Role;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      username: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}

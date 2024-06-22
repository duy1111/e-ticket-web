import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch("https://api.nodeforge.site/" + "auth/refresh", {
    method: "POST",
    body: JSON.stringify({
      refreshToken: token.refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {},
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      // const existingUser = jwtDecode(user?.accessToken || "") as any;

      // if (!existingUser || !existingUser.isVerified) {
      //   return false;
      // }

      return true;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < jwtDecode(token.accessToken).exp!) return token;

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = jwtDecode(token.accessToken);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.JWT_SECRET,
  ...authConfig,
});

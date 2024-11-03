import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Credentials from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/db";
import bcrypt from "bcryptjs";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "john.doe@example.com"},
        password: {label: "Password", type: "password", placeholder: "Your password"},
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {email},
        });

        // Await the comparison
        const isValidPassword = await bcrypt.compare(password, user?.password || "");

        if (isValidPassword) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({session, token}) {
      // @ts-expect-error - session.user is not defined
      session.user = token.user;
      return session;
    },
    async jwt({token, user}) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});

import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
});

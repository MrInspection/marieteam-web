"use server"

import {SignUpProps, SignInProps} from "./auth.schema";
import {prisma} from "@/lib/db";
import {signIn} from "@/auth/auth";
import bcrypt from "bcryptjs";

export async function SignUpAction({name, email, password}: SignUpProps, callbackUrl: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  if(await prisma.user.findFirst({where: {email}})) {
    throw new Error("The email is already linked to an account.")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: `https://avatar.vercel.sh/${name.replace(/\s+/g, "")}`
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl,
  })
}

export async function SignInAction({email, password}: SignInProps, callbackUrl: string) {
  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl,
  })
}

export async function SignInWithGoogle(callbackUrl: string) {
  await signIn("google", {
    redirectTo: callbackUrl,
  })
}

export async function SignInWithGitHub(callbackUrl: string) {
  await signIn("github", {
    redirectTo: callbackUrl,
  })
}

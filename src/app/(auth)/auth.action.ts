"use server"

import {SignUpProps, SignInProps} from "./auth.schema";
import {prisma} from "@/lib/db";
import {signIn} from "@/auth/auth";
import bcrypt from "bcryptjs";

export async function signUpAction({name, email, password}: SignUpProps, callbackUrl: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

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

export async function signInAction({email, password}: SignInProps, callbackUrl: string) {
  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl,
  })
}

export async function signInWithGoogle(callbackUrl: string) {
  await signIn("google", {
    redirectTo: callbackUrl,
  })
}

export async function signInWithGitHub(callbackUrl: string) {
  await signIn("github", {
    redirectTo: callbackUrl,
  })
}

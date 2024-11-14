"use client"

import {Button, buttonVariants} from "@/components/ui/button";
import {ChevronRightIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import {BiLogoGoogle} from "react-icons/bi";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {SignInProps, SignInSchema} from "@/app/(auth)/auth.schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {signInAction, signInWithGitHub, signInWithGoogle} from "@/app/(auth)/auth.action";

export function SignInForm({callbackUrl}: { callbackUrl: string }) {

  const form = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignInProps) {
    try {
      await signInAction(values, callbackUrl)
      toast.success("You will be redirected")
    } catch (error) {
      toast.error("Your email or password is incorrect.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <Link href="/" className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4")}>
        <ChevronLeft className="size-4"/> Home
      </Link>
      <div className="container max-w-md">
        <div className="mb-8">
          <Image
            src="/branding/marieteam-black.svg"
            alt="MarieTeam Logo" width={120} height={120}
            className="size-12 mb-6 dark:invert" draggable
          />
          <h1 className="text-xl font-bold">Sign in to MarieTeam</h1>
          <p className="text-muted-foreground">
            Don&apos;t have an account? {" "}
            <Link href={`/sign-up?callbackUrl=${callbackUrl}`} className="font-medium text-violet-500">
              Sign up
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="alex.delacroix@splabs.fr" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Your password" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mb-4">
                Continue <ChevronRightIcon className="size-4"/>
              </Button>
            </div>
          </form>
        </Form>
        <section className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="h-px w-full bg-input"/>
            <span className="text-xs text-muted-foreground">OR</span>
            <span className="h-px w-full bg-input"/>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => signInWithGitHub(callbackUrl)}>
              <GitHubLogoIcon className="size-4"/> Continue with GitHub
            </Button>
            <Button variant="outline" onClick={() => signInWithGoogle(callbackUrl)}>
              <BiLogoGoogle className="size-4"/> Continue with Google
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            By signing in, you agree to our {" "}
            <Link href="/privacy-policy" className="font-medium text-violet-500">
              Privacy Policy
            </Link>.
          </div>
        </section>
      </div>
    </div>
  )
}

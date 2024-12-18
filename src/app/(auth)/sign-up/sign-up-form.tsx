"use client"

import {Button, buttonVariants} from "@/components/ui/button";
import {ChevronRightIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import {BiLogoGoogle} from "react-icons/bi";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {SignUpProps, SignUpSchema} from "@/app/(auth)/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {signInWithGitHub, signInWithGoogle, signUpAction} from "@/app/(auth)/auth.action";

export function SignUpForm({callbackUrl}: { callbackUrl: string }) {

  const form = useForm<SignUpProps>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignUpProps) {
    try {
      await signUpAction(values, callbackUrl)
      toast.success("You will be redirected...")
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`)
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
            src={"/branding/marieteam-black.svg"}
            alt="MarieTeam Logo" width={120} height={120}
            className="size-12 mb-6 dark:invert" draggable
          />
          <h1 className="text-xl font-bold">Sign up to MarieTeam</h1>
          <p className="text-muted-foreground">
            Already have an account? {" "}
            <Link href="/sign-in" className="font-medium text-violet-500">
              Sign in
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Alex DELACROIX" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
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
                    <FormDescription>Your password must be 12 characters long, contain at least one uppercase letter,
                      one lowercase letter, one number, and one special character.</FormDescription>
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
            By signing up, you agree to our {" "}
            <Link href="/privacy-policy" className="font-medium text-violet-500">
              Privacy Policy
            </Link>.
          </div>
        </section>
      </div>
    </div>
  )
}

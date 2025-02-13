"use client"

import {Button} from "@/components/ui/button";
import {ChevronRightIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import {BiLogoGoogle} from "react-icons/bi";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {EyeIcon, EyeOffIcon, Loader2} from "lucide-react";
import Link from "next/link";
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
import {SignInAction, SignInWithGitHub, SignInWithGoogle} from "@/app/(auth)/auth.action";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";

export function SignInForm({callbackUrl}: { callbackUrl: string }) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {mutate: connectUser, isPending: isConnectingUser} = useMutation({
    mutationFn: async (data: SignInProps) => {
      await SignInAction(data, callbackUrl)
    },
    onError: (error) => {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`)
    }
  })

  async function onSubmit(values: SignInProps) {
    connectUser(values)
  }

  return (
    <section className="container max-w-md">
      <div className="mb-8">
        <Image
          src="/branding/marieteam-black.svg"
          alt="MarieTeam Logo" width={120} height={120}
          className="size-12 mb-6 dark:invert" draggable
        />
        <h1 className="text-xl font-bold tracking-tight mb-0.5">Sign in to MarieTeam</h1>
        <p className="text-muted-foreground">
          Don&apos;t have an account? {" "}
          <Link href={`/sign-up?callbackUrl=${callbackUrl}`} className="font-medium text-blue-500">
            Sign Up
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
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Your password" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-none h-8 w-8 px-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeIcon className="size-4"/> : <EyeOffIcon className="size-4"/>}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mb-4" disabled={isConnectingUser}>
              {isConnectingUser ? (
                <div className="inline-flex items-center">
                  <Loader2 className="size-4 animate-spin mr-2"/> Logging in...</div>
              ) : (
                <div className="inline-flex items-center gap-2">
                  Continue <ChevronRightIcon className="size-4"/>
                </div>
              )}
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
          <Button variant="outline" onClick={() => SignInWithGitHub(callbackUrl)}>
            <GitHubLogoIcon className="size-4"/> Continue with GitHub
          </Button>
          <Button variant="outline" onClick={() => SignInWithGoogle(callbackUrl)}>
            <BiLogoGoogle className="size-4"/> Continue with Google
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          By signing in, you agree to our {" "}
          <Link href="/privacy-policy" className="font-medium text-blue-500">
            Privacy Policy
          </Link>.
        </div>
      </section>


    </section>
  )
}

import {ReactNode} from "react"
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import { redirect } from "next/navigation";
import {auth} from "@/auth/auth";
import Image from "next/image";

export default  async function AuthLayout({children}: Readonly<{ children: ReactNode }>) {
  const session = await auth()
  if (session) return redirect("/")

  return (
    <main className="grid min-h-svh xl:grid-cols-3">
      <div className="flex flex-col items-center justify-center">
        <Link href="/" className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4")}>
          <ChevronLeft className="size-4"/> Back
        </Link>
        {children}
      </div>
      <section className="max-xl:hidden col-span-2 bg-blue-50/50 relative pt-10 pl-24 gap-3 overflow-hidden flex flex-col flex-1 w-full">
        <Image
          src="/images/marieteam.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={1000}
          height={1000}
        />
      </section>
    </main>
  )
}
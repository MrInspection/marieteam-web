import Image from "next/image";
import Link from "next/link";
import {SignInButton} from "@/features/auth/signin-button";
import UserMenu from "@/features/auth/user-menu";
import {auth} from "@/auth/auth";

export default async function SiteHeader() {
    const session = await auth()
    const user = session?.user
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-y bg-background/95
             backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center justify-between max-md:px-6">
                    <Link href={"/"} className={"flex items-center gap-2"}>
                        <Image
                            className="size-10"
                            src="/branding/marieteam-logo.svg"
                            alt="Next.js logo"
                            width={180}
                            height={38}
                            priority
                            draggable={false}
                        />
                            <p className="font-bold">Spectron Labs</p>
                    </Link>
                    <div className="flex items-center gap-2">
                        {user ? <UserMenu /> : <>
                            <SignInButton />
                        </>}
                    </div>
                </div>
            </header>
        </>
    )
}

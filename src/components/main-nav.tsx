"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"

import {Anchor} from "lucide-react";

export function MainNav() {
    const pathname = usePathname()
    return (
        <div className="mr-4 hidden md:flex items-center justify-between ">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Anchor className="size-5 rotate-45" />
                <span className="hidden font-bold sm:inline-block">MarieTeam</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium lg:gap-6 ">
                <Link href="/#destinations" className={cn("transition-colors hover:text-foreground/80",
                    pathname === "/#destinations" ? "text-foreground" : "text-foreground/60")}> Destinations
                </Link>
                <Link href="/bookings" className={cn("transition-colors hover:text-foreground/80",
                    pathname === "/bookings" ? "text-foreground" : "text-foreground/60")}> Bookings
                </Link>
                <Link href="/contact" className={cn("transition-colors hover:text-foreground/80",
                    pathname === "/contact" ? "text-foreground" : "text-foreground/60")}> Contact
                </Link>
            </nav>
        </div>
    )
}
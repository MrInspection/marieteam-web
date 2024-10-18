"use client"

import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Anchor} from "lucide-react";

export default function InvalidConfiguration() {
    return (
        <>
            <main className="flex-grow flex items-center justify-center mx-auto my-60">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto text-center">
                        <Badge variant="outline" className="text-sm mb-4">400</Badge>
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Invalid Server Request
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Sorry, we couldn&apos;t find the crossing you&apos;re looking for. This is perhaps a temporary issue, so please try again later.
                        </p>
                        <div className={"flex items-center justify-center gap-2"}>
                            <Link href="/" className={cn(buttonVariants({variant: "outline"}))}>
                                Go back home
                            </Link>
                            <Link href="/bookings" className={cn(buttonVariants())}>
                                <Anchor className={"size-4 mr-2 rotate-45"} />
                                Book a trip
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}
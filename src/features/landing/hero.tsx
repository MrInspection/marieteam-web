import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import React from "react";

export function LandingHero() {
    return (
        <section className="container flex flex-col items-center justify-center">

            <h1 className="text-6xl">Book your dream vacation with MarieTeam</h1>



            <Link href={"/bookings"} className={cn(buttonVariants({ size: "lg" }), "mt-10")}>
                Book your dream vacation
                <ArrowRight className={"size-4"}/>
            </Link>
        </section>
    )
}
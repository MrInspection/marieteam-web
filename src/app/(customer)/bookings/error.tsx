"use client"

import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function InvalidRequest() {
  return (
    <main className="flex-grow flex items-center justify-center mx-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <Badge variant="outline" className="text-sm mb-4">400</Badge>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Bad Request
          </h3>
          <p className="text-muted-foreground mb-6 text-pretty">
            It seems we&apos;re experiencing some technical difficulties. Not to worry, our team is working on it. In
            the meantime, try refreshing the page or visiting us a bit later.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Link href="/" className={buttonVariants()}>
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
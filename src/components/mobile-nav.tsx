"use client";

import * as React from "react";
import Link, {LinkProps} from "next/link";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Anchor, Bug, Home} from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className={"pl-2 font-bold sm:inline-block"}>MarieTeam</span>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-10">
        <div className={"flex items-center gap-2"}>
          <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
            <Anchor className="mr-2 size-5 rotate-45"/>
            <span className="font-bold">MarieTeam Corp.</span>
          </MobileLink>
        </div>
        <Separator className={"mt-4 mr-0 pr-0"}/>
        <div className="my-5">
          <div className="flex flex-col space-y-3 text-lg">
            <MobileLink href={"/"} className="flex items-center text-muted-foreground" onOpenChange={setOpen}>
              <Home className="mr-2 size-5"/>
              <span className="">Home</span>
            </MobileLink>
            <MobileLink href={"/bookings"} className="flex items-center text-muted-foreground" onOpenChange={setOpen}>
              <Anchor className="mr-2 size-5"/>
              <span className="">Bookings</span>
            </MobileLink>
            <MobileLink href={"/"} className="flex items-center text-muted-foreground" onOpenChange={setOpen}>
              <Bug className="mr-2 size-5"/>
              <span className="">Contact</span>
            </MobileLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
                      href,
                      onOpenChange,
                      className,
                      children,
                      ...props
                    }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

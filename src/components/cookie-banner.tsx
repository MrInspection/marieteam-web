"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookieConsent", choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      className="sticky bottom-0 border-t max-sm:py-6 py-4 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40"
    >
      <div className="container max-w-7xl flex max-sm:flex-col max-md:gap-4 items-center justify-between">
        <p className="text-sm">
          MarieTeam only uses necessary cookies to provide you with a better experience, in accordance
          with our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4">
            Privacy Policy
          </Link>.
        </p>
        <div className="flex items-center gap-2 max-sm:w-full">
          <Button
            size="sm"
            variant="outline"
            className="max-sm:w-1/2"
            onClick={() => handleConsent("declined")}
          >
            Decline
          </Button>
          <Button size="sm" className="max-sm:w-1/2" onClick={() => handleConsent("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
}

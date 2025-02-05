import type {Metadata} from "next";
import "./globals.css";
import {EB_Garamond, Inter} from "next/font/google";
import React from "react";
import {Toaster} from "@/components/ui/sonner";
import {cn} from "@/lib/utils";
import Providers from "@/utils/providers";
import {CookieBanner} from "@/components/cookie-banner";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"})
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Moussax - MarieTeam",
  description: "Your marine transportation company. Book your dream vacation with ease.",
  openGraph: {
    url: "https://marieteam.vercel.app",
    title: "MarieTeam",
    description: "Your marine transportation company. Book your dream vacation with ease.",
    images: [
      {
        url: "https://marieteam.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "MarieTeam",
      },
    ],
  }
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
    <body className="font-sans" suppressHydrationWarning={true}>
    <Providers>
      {children}
    </Providers>
    <Toaster/>
    <CookieBanner />
    </body>
    </html>
  );
}

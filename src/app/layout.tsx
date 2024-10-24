import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarieTeam - Your marine transportation company",
  description: "Spectron Labs",
};

export default  function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
                <SiteHeader/>
                {children}
                <SiteFooter/>
            </div>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}

import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "MarieTeam",
    description: "Your marine transportation company. A Spectron Labs project.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}

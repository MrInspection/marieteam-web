import type { Metadata } from "next";
import "../styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarieTeam - Your maritime transportation company",
  description: "Spectron Labs",
};

export default function RootLayout({ children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SiteHeader />
        {children}
      <SiteFooter />
      </body>
    </html>
  );
}

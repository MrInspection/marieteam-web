import React from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader/>
      {children}
      <SiteFooter/>
    </div>
  );
}
"use client"

import {QueryClient, QueryClientProvider } from '@tanstack/react-query'

import {useState, PropsWithChildren} from "react";
import {ThemeProvider} from "@/components/theme-provider";

export default function Providers({children}: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
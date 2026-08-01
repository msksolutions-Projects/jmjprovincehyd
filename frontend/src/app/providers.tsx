import type { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { theme } from "@/theme/theme";
import { queryClient } from "./queryClient";
import { AppErrorBoundary } from "@/components/common/AppErrorBoundary";

/** Single composition point for every app-wide provider. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppErrorBoundary>{children}</AppErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

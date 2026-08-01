import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/common/SkipLink";
import { BackToTopButton } from "@/components/common/BackToTopButton";

export function AppLayout() {
  const { pathname } = useLocation();

  // Reset scroll on navigation and move focus to the new page's main region.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <SkipLink />
      <SiteHeader />
      <Box component="main" id="main-content" tabIndex={-1} sx={{ flex: 1, outline: "none" }}>
        <Outlet />
      </Box>
      <SiteFooter />
      <BackToTopButton />
    </Box>
  );
}

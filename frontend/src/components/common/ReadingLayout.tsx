import { useEffect, useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import { READING_WIDTH } from "@/theme/theme";
import type { ContentHeading } from "@/types/content";

export interface ReadingLayoutProps {
  headings: ContentHeading[];
  children: ReactNode;
  /** Show the table of contents only when the page is long enough to need it. */
  minHeadingsForToc?: number;
}

/** Highlights the section currently in view. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function ReadingLayout({
  headings,
  children,
  minHeadingsForToc = 3,
}: ReadingLayoutProps) {
  const tocHeadings = headings.filter((h) => h.level === 2);
  const showToc = tocHeadings.length >= minHeadingsForToc;
  const active = useActiveHeading(tocHeadings.map((h) => h.id));

  const tocList = (
    <List dense disablePadding component="nav" aria-label="Sections on this page">
      {tocHeadings.map((heading) => (
        <ListItemButton
          key={heading.id}
          component="a"
          href={`#${heading.id}`}
          selected={active === heading.id}
          sx={{
            borderLeft: 2,
            borderColor: active === heading.id ? "secondary.main" : "divider",
            pl: 1.5,
            py: 0.75,
          }}
        >
          <ListItemText
            primary={heading.title}
            slotProps={{
              primary: {
                variant: "body2",
                fontWeight: active === heading.id ? 700 : 500,
                color: active === heading.id ? "primary.main" : "text.secondary",
              },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 3, lg: 6 },
        gridTemplateColumns: { xs: "1fr", lg: showToc ? "minmax(0,1fr) 260px" : "1fr" },
        alignItems: "start",
      }}
    >
      <Box sx={{ maxWidth: READING_WIDTH, minWidth: 0 }}>
        {showToc && (
          <Accordion sx={{ display: { xs: "block", lg: "none" }, mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography
                variant="subtitle2"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <ListRoundedIcon fontSize="small" /> On this page
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>{tocList}</AccordionDetails>
          </Accordion>
        )}
        {children}
      </Box>

      {showToc && (
        <Box
          component="aside"
          aria-label="Table of contents"
          sx={{ display: { xs: "none", lg: "block" }, position: "sticky", top: 104 }}
        >
          <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            On this page
          </Typography>
          {tocList}
          <Link
            href="#main-content"
            variant="caption"
            sx={{ display: "inline-block", mt: 2, pl: 1.5 }}
          >
            Back to top
          </Link>
        </Box>
      )}
    </Box>
  );
}

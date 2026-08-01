import { Box, Container, Link, Stack, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

export interface PageHeaderCrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Intermediate crumbs. "Home" and the current page are added automatically. */
  breadcrumbs?: PageHeaderCrumb[];
}

/** Compact banner opening every interior page. */
export function PageHeader({ eyebrow, title, description, breadcrumbs = [] }: PageHeaderProps) {
  return (
    <Box
      component="header"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: { xs: 4, md: 6 } }}
    >
      <Container>
        <Breadcrumbs
          aria-label="Breadcrumb"
          separator={<NavigateNextRoundedIcon fontSize="small" />}
          sx={{
            mb: 2,
            color: "rgba(255,255,255,.75)",
            "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,.45)" },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontWeight: 400 }}
          >
            <HomeRoundedIcon fontSize="small" /> Home
          </Link>
          {breadcrumbs.map((crumb) =>
            crumb.href ? (
              <Link key={crumb.label} component={RouterLink} to={crumb.href} color="inherit" sx={{ fontWeight: 400 }}>
                {crumb.label}
              </Link>
            ) : (
              <Typography key={crumb.label} color="inherit" variant="body2">
                {crumb.label}
              </Typography>
            ),
          )}
          <Typography color="inherit" variant="body2" aria-current="page">
            {title}
          </Typography>
        </Breadcrumbs>

        <Stack spacing={1.5} sx={{ maxWidth: 820 }}>
          {eyebrow && (
            <Typography variant="overline" sx={{ color: "rgba(255,255,255,.72)" }}>
              {eyebrow}
            </Typography>
          )}
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
            {title}
          </Typography>
          {description && (
            <Typography sx={{ color: "rgba(255,255,255,.82)", maxWidth: 760, fontSize: "1.0625rem" }}>
              {description}
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

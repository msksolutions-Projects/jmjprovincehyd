import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link as RouterLink } from "react-router-dom";

export interface Crumb {
  label: string;
  href?: string;
}

export function BreadcrumbNavigation({ trail }: { trail: Crumb[] }) {
  if (trail.length === 0) return null;
  return (
    <Breadcrumbs
      aria-label="Breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
      sx={{ mb: 2 }}
    >
      {trail.map((crumb, index) =>
        crumb.href && index < trail.length - 1 ? (
          <Link key={crumb.label} component={RouterLink} to={crumb.href} color="inherit">
            {crumb.label}
          </Link>
        ) : (
          <Typography key={crumb.label} color="text.primary" aria-current="page" variant="body2">
            {crumb.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}

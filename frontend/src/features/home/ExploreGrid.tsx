import type { SvgIconComponent } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink } from "react-router-dom";

export interface ExploreItem {
  label: string;
  description: string;
  href: string;
  icon: SvgIconComponent;
}

export interface ExploreGridProps {
  eyebrow: string;
  title: string;
  intro?: string;
  items: ExploreItem[];
}

/**
 * Rows rather than cards: an icon, a label, a line of explanation and an arrow.
 * Reads as a directory of ways in, which is what the section is for.
 */
export function ExploreGrid({ eyebrow, title, intro, items }: ExploreGridProps) {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 12 } }}>
      <Container>
        <Box sx={{ maxWidth: 760, mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" color="secondary.main" sx={{ display: "block", mb: 1.5 }}>
            {eyebrow}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.18 }}>
            {title}
          </Typography>
          {intro && (
            <Typography sx={{ mt: 2.5, fontSize: "1.0625rem", color: "text.secondary" }}>
              {intro}
            </Typography>
          )}
        </Box>

        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "grid",
            gap: 0,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          {items.map(({ icon: Icon, ...item }) => (
            <Box
              component="li"
              key={item.href}
              sx={{ borderBottom: 1, borderColor: "divider", "&:nth-of-type(odd)": { md: { borderRight: 1 } } }}
            >
              <Box
                component={RouterLink}
                to={item.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  px: { xs: 0, md: 3 },
                  py: 3,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background-color .18s ease",
                  "&:hover": { bgcolor: "action.hover" },
                  "&:hover .explore-arrow": { transform: "translate(3px,-3px)" },
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "action.selected",
                    color: "primary.main",
                  }}
                >
                  <Icon />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="h5" sx={{ lineHeight: 1.3 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.description}
                  </Typography>
                </Box>
                <ArrowOutwardRoundedIcon
                  className="explore-arrow"
                  sx={{ color: "secondary.main", transition: "transform .18s ease" }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

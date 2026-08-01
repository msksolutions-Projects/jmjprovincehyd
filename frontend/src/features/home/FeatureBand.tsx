import type { ReactNode } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";

export interface FeatureBandAction {
  label: string;
  href: string;
}

export interface FeatureBandProps {
  eyebrow: string;
  /** One large declarative sentence — not a paragraph. */
  statement: ReactNode;
  body?: string;
  image: string;
  imageAlt: string;
  actions?: FeatureBandAction[];
  /** Photograph on the right by default; `reverse` puts it on the left. */
  reverse?: boolean;
  tone?: "light" | "dark";
}

export function FeatureBand({
  eyebrow,
  statement,
  body,
  image,
  imageAlt,
  actions = [],
  reverse = false,
  tone = "light",
}: FeatureBandProps) {
  const dark = tone === "dark";

  return (
    <Box
      component="section"
      sx={{
        bgcolor: dark ? "primary.main" : "background.paper",
        color: dark ? "common.white" : "text.primary",
        py: { xs: 7, md: 12 },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "center",
          }}
        >
          <Box sx={{ order: { md: reverse ? 2 : 1 } }}>
            <Typography
              variant="overline"
              sx={{ display: "block", mb: 2, color: dark ? "rgba(255,255,255,.7)" : "secondary.main" }}
            >
              {eyebrow}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
              }}
            >
              {statement}
            </Typography>
            {body && (
              <Typography
                sx={{
                  mt: 3,
                  maxWidth: 520,
                  fontSize: "1.0625rem",
                  color: dark ? "rgba(255,255,255,.82)" : "text.secondary",
                }}
              >
                {body}
              </Typography>
            )}
            {actions.length > 0 && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
                {actions.map((action, index) => (
                  <Button
                    key={action.href}
                    component={RouterLink}
                    to={action.href}
                    size="large"
                    variant={index === 0 ? "contained" : "outlined"}
                    color={dark && index === 0 ? "secondary" : "primary"}
                    endIcon={index === 0 ? <ArrowForwardRoundedIcon /> : undefined}
                    sx={
                      dark && index > 0
                        ? {
                            color: "common.white",
                            borderColor: "rgba(255,255,255,.5)",
                            "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,.08)" },
                          }
                        : undefined
                    }
                  >
                    {action.label}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>

          <Box
            sx={{
              order: { md: reverse ? 1 : 2 },
              borderRadius: 3,
              overflow: "hidden",
              aspectRatio: "4 / 3",
              bgcolor: "action.hover",
            }}
          >
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

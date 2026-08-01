import { Box, Typography } from "@mui/material";

export function SectionTitle({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <Box sx={{ maxWidth: align === "center" ? 760 : 720, mx: align === "center" ? "auto" : 0, textAlign: align }}>
      {eyebrow && <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800, letterSpacing: ".12em" }}>{eyebrow}</Typography>}
      <Typography variant="h3" sx={{ mt: .5 }}>{title}</Typography>
      {description && <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: { xs: "1rem", md: "1.08rem" } }}>{description}</Typography>}
    </Box>
  );
}

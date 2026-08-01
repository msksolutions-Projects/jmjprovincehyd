import { Link } from "@mui/material";

/** First tab stop on every page. Visible only when focused. */
export function SkipLink() {
  return (
    <Link
      href="#main-content"
      sx={{
        position: "absolute",
        left: -9999,
        top: 0,
        zIndex: (t) => t.zIndex.tooltip + 1,
        px: 2.5,
        py: 1.5,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 0,
        fontWeight: 700,
        textDecoration: "none",
        "&:focus": { left: 8, top: 8 },
      }}
    >
      Skip to content
    </Link>
  );
}

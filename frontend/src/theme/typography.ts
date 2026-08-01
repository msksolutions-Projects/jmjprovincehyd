import type { TypographyVariantsOptions } from "@mui/material/styles";

export const SERIF = '"Lora", Georgia, "Times New Roman", serif';
export const SANS = '"Inter", "Segoe UI", Roboto, Arial, sans-serif';

/**
 * Dignified serif for headings, highly legible sans for body and UI.
 * Sizes use clamp() so type scales fluidly without breakpoint churn.
 */
export const typography: TypographyVariantsOptions = {
  fontFamily: SANS,
  h1: {
    fontFamily: SERIF,
    fontWeight: 600,
    fontSize: "clamp(2rem, 1.5rem + 2.1vw, 3rem)",
    lineHeight: 1.16,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily: SERIF,
    fontWeight: 600,
    fontSize: "clamp(1.625rem, 1.35rem + 1.3vw, 2.25rem)",
    lineHeight: 1.22,
    letterSpacing: "-0.015em",
  },
  h3: {
    fontFamily: SERIF,
    fontWeight: 600,
    fontSize: "clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)",
    lineHeight: 1.3,
  },
  h4: { fontFamily: SERIF, fontWeight: 600, fontSize: "1.375rem", lineHeight: 1.35 },
  h5: { fontFamily: SANS, fontWeight: 700, fontSize: "1.125rem", lineHeight: 1.4 },
  h6: { fontFamily: SANS, fontWeight: 700, fontSize: "1rem", lineHeight: 1.45 },
  subtitle1: { fontSize: "1.0625rem", lineHeight: 1.6, color: undefined },
  subtitle2: { fontWeight: 600, fontSize: "0.9375rem", lineHeight: 1.5 },
  body1: { fontSize: "1rem", lineHeight: 1.75 },
  body2: { fontSize: "0.9375rem", lineHeight: 1.65 },
  caption: { fontSize: "0.8125rem", lineHeight: 1.5 },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    lineHeight: 1.6,
  },
  button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
};

import { alpha } from "@mui/material/styles";
import type { PaletteOptions } from "@mui/material/styles";

/**
 * Approved institutional palette. These six values are the single source of
 * truth for colour across the application — no component may hardcode a hex.
 */
export const brand = {
  primary: "#064789",
  primaryDark: "#043A70",
  primaryLight: "#1F5FA0",
  secondary: "#427AA1",
  secondaryDark: "#356784",
  secondaryLight: "#6796B6",
  background: "#EBF2FA",
  surface: "#FFFFFF",
  text: "#102A43",
  muted: "#52677A",
} as const;

/** State colours are reserved strictly for status communication. */
export const status = {
  success: "#2E7D5B",
  warning: "#B26A00",
  error: "#B3261E",
  info: brand.secondary,
} as const;

export const palette: PaletteOptions = {
  mode: "light",
  primary: {
    main: brand.primary,
    dark: brand.primaryDark,
    light: brand.primaryLight,
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: brand.secondary,
    dark: brand.secondaryDark,
    light: brand.secondaryLight,
    contrastText: "#FFFFFF",
  },
  background: { default: brand.background, paper: brand.surface },
  text: { primary: brand.text, secondary: brand.muted, disabled: alpha(brand.text, 0.38) },
  divider: alpha(brand.secondary, 0.22),
  success: { main: status.success, contrastText: "#FFFFFF" },
  warning: { main: status.warning, contrastText: "#FFFFFF" },
  error: { main: status.error, contrastText: "#FFFFFF" },
  info: { main: status.info, contrastText: "#FFFFFF" },
  action: {
    hover: alpha(brand.secondary, 0.08),
    selected: alpha(brand.primary, 0.1),
    focus: alpha(brand.primary, 0.16),
    disabledBackground: alpha(brand.muted, 0.12),
  },
};

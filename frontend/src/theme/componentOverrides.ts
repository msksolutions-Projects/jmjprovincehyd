import { alpha } from "@mui/material/styles";
import type { Components, Theme } from "@mui/material/styles";
import { brand } from "./palette";
import { SANS } from "./typography";

/** Focus ring used everywhere. Never removed, only restyled. */
const focusRing = {
  outline: `3px solid ${alpha(brand.secondary, 0.55)}`,
  outlineOffset: 2,
  borderRadius: 6,
};

export const componentOverrides: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      html: { scrollBehavior: "smooth", WebkitTextSizeAdjust: "100%" },
      body: {
        minWidth: 320,
        backgroundColor: brand.background,
        fontFamily: SANS,
        textRendering: "optimizeLegibility",
      },
      "::selection": { backgroundColor: alpha(brand.secondary, 0.25) },
      "*:focus-visible": focusRing,
      "@media (prefers-reduced-motion: reduce)": {
        html: { scrollBehavior: "auto" },
        "*, *::before, *::after": {
          animationDuration: "0.01ms !important",
          transitionDuration: "0.01ms !important",
        },
      },
      img: { maxWidth: "100%" },
    },
  },
  MuiContainer: { defaultProps: { maxWidth: "lg" } },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: 10, minHeight: 44, paddingInline: 20 },
      sizeSmall: { minHeight: 36, paddingInline: 14 },
      sizeLarge: { minHeight: 52, paddingInline: 28, fontSize: "1rem" },
      outlined: { borderWidth: 1.5, "&:hover": { borderWidth: 1.5 } },
    },
  },
  MuiIconButton: { styleOverrides: { root: { borderRadius: 10 } } },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        border: `1px solid ${alpha(brand.secondary, 0.2)}`,
        boxShadow: "0 1px 2px rgba(16,42,67,0.04)",
        transition: "box-shadow .2s ease, border-color .2s ease",
      },
    },
  },
  MuiCardActionArea: { styleOverrides: { root: { borderRadius: "inherit" } } },
  MuiPaper: { styleOverrides: { rounded: { borderRadius: 14 } } },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 8, fontWeight: 600 },
      outlined: { borderColor: alpha(brand.secondary, 0.4) },
    },
  },
  MuiTextField: { defaultProps: { variant: "outlined" } },
  MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10, backgroundColor: brand.surface } } },
  MuiFormHelperText: { styleOverrides: { root: { marginLeft: 2, fontSize: "0.8125rem" } } },
  MuiAppBar: { defaultProps: { elevation: 0, color: "inherit" } },
  MuiLink: {
    defaultProps: { underline: "hover" },
    styleOverrides: { root: { color: brand.primary, fontWeight: 500 } },
  },
  MuiTableCell: {
    styleOverrides: {
      root: { borderColor: alpha(brand.secondary, 0.18) },
      head: {
        fontWeight: 700,
        backgroundColor: alpha(brand.secondary, 0.1),
        color: brand.text,
        whiteSpace: "nowrap",
      },
    },
  },
  MuiTableSortLabel: { styleOverrides: { root: { "&:focus-visible": focusRing } } },
  MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
  MuiDialogTitle: { styleOverrides: { root: { fontWeight: 700 } } },
  MuiAccordion: {
    defaultProps: { disableGutters: true, elevation: 0 },
    styleOverrides: {
      root: {
        border: `1px solid ${alpha(brand.secondary, 0.2)}`,
        borderRadius: 12,
        "&::before": { display: "none" },
        "& + &": { marginTop: 8 },
      },
    },
  },
  MuiAccordionSummary: { styleOverrides: { root: { minHeight: 56, paddingInline: 16 } } },
  MuiBreadcrumbs: {
    styleOverrides: { li: { fontSize: "0.875rem" }, separator: { marginInline: 6 } },
  },
  MuiTab: { styleOverrides: { root: { minHeight: 48, textTransform: "none", fontWeight: 600 } } },
  MuiTooltip: { styleOverrides: { tooltip: { fontSize: "0.8125rem", borderRadius: 8 } } },
  MuiSkeleton: { styleOverrides: { root: { backgroundColor: alpha(brand.secondary, 0.12) } } },
  MuiAlert: { styleOverrides: { root: { borderRadius: 12 } } },
};

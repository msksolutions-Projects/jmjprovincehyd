import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { palette, brand, status } from "./palette";
import { typography } from "./typography";
import { componentOverrides } from "./componentOverrides";

/** Maximum comfortable measure for long-form reading. */
export const READING_WIDTH = 780;

let theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 12 },
  spacing: 8,
  components: componentOverrides,
});

theme = responsiveFontSizes(theme, { factor: 2 });

export { theme, brand, status };
/** Back-compat alias for modules that imported the old flat palette object. */
export const legacyPalette = brand;

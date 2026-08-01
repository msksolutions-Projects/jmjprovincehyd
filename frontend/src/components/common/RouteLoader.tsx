import { Box, CircularProgress, Typography } from "@mui/material";
export function RouteLoader() {
  return <Box sx={{ minHeight: 420, display: "grid", placeItems: "center" }}><Box sx={{ textAlign: "center" }}><CircularProgress /><Typography color="text.secondary" sx={{ mt: 2 }}>Loading content…</Typography></Box></Box>;
}

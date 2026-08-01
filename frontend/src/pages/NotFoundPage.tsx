import { Button, Container, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link as RouterLink } from "react-router-dom";
export function NotFoundPage() { return <Container sx={{ py: 12, textAlign: "center" }}><Typography variant="h1" color="primary.main">404</Typography><Typography variant="h4" sx={{ mt: 1 }}>Page not found</Typography><Typography color="text.secondary" sx={{ mt: 1.5 }}>The page may have moved or the address may be incorrect.</Typography><Button component={RouterLink} to="/" variant="contained" startIcon={<HomeRoundedIcon />} sx={{ mt: 3 }}>Return home</Button></Container>; }

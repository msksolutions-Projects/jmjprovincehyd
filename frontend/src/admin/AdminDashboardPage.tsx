import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  CircularProgress,
} from "@mui/material";
import authService, { type AdminUser } from "./authService";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .verify()
      .then((res) => {
        if (res.success) setAdmin(res.admin);
        else navigate("/admin/login");
      })
      .catch(() => navigate("/admin/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    { title: "News", desc: "Create and manage news articles", to: "/admin/news" },
    { title: "Notices", desc: "Post announcements and notices", to: "/admin/notices" },
    { title: "Gallery", desc: "Manage photo galleries", to: "/admin/gallery" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            JMJ Admin
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {admin?.name}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome, {admin?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your website content from here.
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea component={RouterLink} to={card.to} sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight={600}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.desc}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import authService from "./authService";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%", boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="primary">
              JMJ Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hyderabad Province Content Management
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                disabled={loading}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Stack>
          </form>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            sx={{ mt: 3 }}
          >
            Authorized administrators only
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
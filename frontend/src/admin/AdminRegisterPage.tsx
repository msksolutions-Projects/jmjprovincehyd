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

export function AdminRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const result = await authService.register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to register.");
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
      <Card sx={{ maxWidth: 440, width: "100%", boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="primary">
              Create Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              First-time setup for JMJ Hyderabad Province
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Full Name" value={form.name} onChange={update("name")} required fullWidth disabled={loading} />
              <TextField label="Email" type="email" value={form.email} onChange={update("email")} required fullWidth disabled={loading} />
              <TextField label="Phone" value={form.phone} onChange={update("phone")} fullWidth disabled={loading} />
              <TextField label="Password" type="password" value={form.password} onChange={update("password")} required fullWidth disabled={loading} helperText="At least 8 characters" />
              <TextField label="Confirm Password" type="password" value={form.confirmPassword} onChange={update("confirmPassword")} required fullWidth disabled={loading} />
              <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
                {loading ? "Creating..." : "Register"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
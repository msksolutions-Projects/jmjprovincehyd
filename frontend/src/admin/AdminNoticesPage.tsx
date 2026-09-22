import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, AppBar, Toolbar, Typography, Button, Container, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, Stack, CircularProgress, TextField, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert,
} from "@mui/material";
import adminApi from "./adminApi";
import authService from "./authService";

interface NoticeItem {
  _id: string;
  title: string;
  content: string;
  category: string;
  urgency: string;
  status: string;
  createdAt: string;
}

const CATEGORIES = ["general", "holiday", "event", "meeting", "urgent", "academic", "administrative"];
const URGENCIES = ["low", "medium", "high", "critical"];

const EMPTY_FORM = {
  title: "", content: "", category: "general", urgency: "medium", status: "published",
};

export function AdminNoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadNotices = () => {
    setLoading(true);
    adminApi.get("/notices", { params: { status: "", limit: 100 } })
      .then((res) => setNotices(res.data.data || []))
      .catch(() => setNotices([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    authService.verify().catch(() => navigate("/admin/login"));
    loadNotices();
  }, [navigate]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setOpen(true);
  };

  const openEdit = (item: NoticeItem) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      content: item.content,
      category: item.category,
      urgency: item.urgency,
      status: item.status,
    });
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.put(`/notices/${editingId}`, form);
      } else {
        await adminApi.post("/notices", form);
      }
      setOpen(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      loadNotices();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save notice");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await adminApi.delete(`/notices/${id}`);
      loadNotices();
    } catch {
      alert("Failed to delete");
    }
  };

  const urgencyColor = (u: string) =>
    u === "critical" ? "error" : u === "high" ? "warning" : u === "medium" ? "info" : "default";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>← Dashboard</Button>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>Notices Management</Typography>
          <Button color="inherit" variant="outlined" onClick={openCreate}>+ Post Notice</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
        ) : (
          <Card>
            <CardContent>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Title</b></TableCell>
                      <TableCell><b>Category</b></TableCell>
                      <TableCell><b>Urgency</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell align="right"><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notices.length === 0 ? (
                      <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        No notices yet. Click "Post Notice" to add one.
                      </TableCell></TableRow>
                    ) : (
                      notices.map((item) => (
                        <TableRow key={item._id} hover>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Chip label={item.urgency} size="small" color={urgencyColor(item.urgency) as any} />
                          </TableCell>
                          <TableCell>
                            <Chip label={item.status} size="small"
                              color={item.status === "published" ? "success" : "default"} />
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell align="right">
                            <Button size="small" onClick={() => openEdit(item)}>Edit</Button>
                            <Button size="small" color="error" onClick={() => handleDelete(item._id)}>Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Notice" : "Post a Notice"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={form.title} onChange={update("title")} fullWidth required />
            <TextField label="Content" value={form.content} onChange={update("content")} fullWidth multiline rows={5} required
              helperText="At least 50 characters" />
            <TextField label="Category" value={form.category} onChange={update("category")} select fullWidth>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField label="Urgency" value={form.urgency} onChange={update("urgency")} select fullWidth>
              {URGENCIES.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
            </TextField>
            <TextField label="Status" value={form.status} onChange={update("status")} select fullWidth>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
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

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
}

const CATEGORIES = ["announcements", "celebrations", "education", "healthcare", "social-services", "events", "other"];

const EMPTY_FORM = {
  title: "", excerpt: "", content: "", category: "announcements", status: "published",
};

export function AdminNewsPage() {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadNews = () => {
    setLoading(true);
    adminApi.get("/news", { params: { limit: 100, status: "" } })
      .then((res) => setNews(res.data.data || []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    authService.verify().catch(() => navigate("/admin/login"));
    loadNews();
  }, [navigate]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
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
        await adminApi.put(`/news/${editingId}`, form);
      } else {
        await adminApi.post("/news", form);
      }
      setOpen(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      loadNews();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save news");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this news article?")) return;
    try {
      await adminApi.delete(`/news/${id}`);
      loadNews();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>← Dashboard</Button>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>News Management</Typography>
          <Button color="inherit" variant="outlined" onClick={openCreate}>+ Create News</Button>
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
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell align="right"><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {news.length === 0 ? (
                      <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        No news articles yet. Click "Create News" to add one.
                      </TableCell></TableRow>
                    ) : (
                      news.map((item) => (
                        <TableRow key={item._id} hover>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.category}</TableCell>
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
        <DialogTitle>{editingId ? "Edit News Article" : "Create News Article"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={form.title} onChange={update("title")} fullWidth required />
            <TextField label="Excerpt (short summary)" value={form.excerpt} onChange={update("excerpt")} fullWidth multiline rows={2} required />
            <TextField label="Content" value={form.content} onChange={update("content")} fullWidth multiline rows={5} required
              helperText="At least 100 characters" />
            <TextField label="Category" value={form.category} onChange={update("category")} select fullWidth>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
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
            {saving ? "Saving..." : editingId ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
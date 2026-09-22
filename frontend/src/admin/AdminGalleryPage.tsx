import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, AppBar, Toolbar, Typography, Button, Container, Card, CardMedia,
  CardContent, Grid, Stack, CircularProgress, TextField, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, Chip,
} from "@mui/material";
import adminApi from "./adminApi";
import authService from "./authService";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: string;
  coverImage?: { url: string };
  createdAt: string;
}

const CATEGORIES = [
  "formation", "education", "healthcare", "social-services",
  "events", "celebrations", "pilgrimages", "meetings", "other",
];

const EMPTY_FORM = {
  title: "", description: "", category: "events", status: "published",
};

export function AdminGalleryPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadItems = () => {
    setLoading(true);
    adminApi.get("/gallery", { params: { status: "", limit: 200 } })
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    authService.verify().catch(() => navigate("/admin/login"));
    loadItems();
  }, [navigate]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openUpload = () => {
    setEditingId(null);
    setFile(null);
    setForm(EMPTY_FORM);
    setError("");
    setOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditingId(item._id);
    setFile(null);
    setForm({
      title: item.title,
      description: item.description || "",
      category: item.category,
      status: item.status,
    });
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    setError("");

    if (editingId) {
      setSaving(true);
      try {
        await adminApi.put(`/gallery/${editingId}`, form);
        setOpen(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
        loadItems();
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to save changes");
      } finally {
        setSaving(false);
      }
      return;
    }

    if (!file) {
      setError("Please choose an image file");
      return;
    }
    setSaving(true);
    try {
      const data = new FormData();
      data.append("image", file);
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("status", form.status);

      await adminApi.post("/gallery", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpen(false);
      setFile(null);
      setForm(EMPTY_FORM);
      loadItems();
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await adminApi.delete(`/gallery/${id}`);
      loadItems();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>← Dashboard</Button>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>Gallery Management</Typography>
          <Button color="inherit" variant="outlined" onClick={openUpload}>+ Upload Photo</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
        ) : items.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
            No photos uploaded yet. Click "Upload Photo" to add one.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card>
                  {item.coverImage?.url && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.coverImage.url}
                      alt={item.title}
                      sx={{ objectFit: "cover" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {item.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
                      <Chip label={item.category} size="small" variant="outlined" />
                      <Chip label={item.status} size="small"
                        color={item.status === "published" ? "success" : "default"} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" onClick={() => openEdit(item)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(item._id)}>Delete</Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Photo Details" : "Upload a Photo"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack spacing={2} sx={{ mt: 1 }}>
            {!editingId && (
              <Button variant="outlined" component="label">
                {file ? file.name : "Choose Image File"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </Button>
            )}
            {editingId && (
              <Alert severity="info">
                The photo itself cannot be replaced. Delete and re-upload to change the image.
              </Alert>
            )}
            <TextField label="Title" value={form.title} onChange={update("title")} fullWidth required />
            <TextField label="Description (optional)" value={form.description}
              onChange={update("description")} fullWidth multiline rows={2} />
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
            {saving ? "Saving..." : editingId ? "Save Changes" : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
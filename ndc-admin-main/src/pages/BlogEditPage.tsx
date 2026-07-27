import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, IconButton, Paper, Stack, TextField, Typography, Switch, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ImageControl } from "../components/ImageControl";
import { getBlogById, addBlog, updateBlog, getBlogs } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";

const emptyForm = {
  postId: 0,
  title: "",
  description: "",
  blogImage: "",
  content: [""],
  order: 0,
  isActive: true,
};

export function BlogEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const isNew = postId === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) {
      getBlogs().then((res) => {
        const maxId = res.data.reduce((m: number, b: any) => Math.max(m, b.postId), 0);
        setForm({ ...emptyForm, postId: maxId + 1, order: maxId + 1 });
      });
      return;
    }
    setLoading(true);
    getBlogById(Number(postId))
      .then((res) => setForm(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId, isNew]);

  function updateParagraph(i: number, value: string) {
    const content = [...form.content];
    content[i] = value;
    setForm({ ...form, content });
  }
  function addParagraph() {
    setForm({ ...form, content: [...form.content, ""] });
  }
  function removeParagraph(i: number) {
    setForm({ ...form, content: form.content.filter((_, idx) => idx !== i) });
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      if (isNew) {
        await addBlog(form);
      } else {
        await updateBlog(Number(postId), form);
      }
      triggerRevalidate("/blog");
      triggerRevalidate(`/blog/${form.postId}`);
      navigate("/blogs");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  return (
    <Paper sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h6">{isNew ? "New Blog Post" : `Edit Blog Post #${form.postId}`}</Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
        <TextField
          label="Description (excerpt)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          multiline
          minRows={3}
          fullWidth
        />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Cover Image
          </Typography>
          <ImageControl value={form.blogImage} onChange={(url) => setForm({ ...form, blogImage: url })} />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Content (one box per paragraph block, rendered in order)
          </Typography>
          <Stack spacing={2}>
            {form.content.map((p, i) => (
              <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                <TextField value={p} onChange={(e) => updateParagraph(i, e.target.value)} multiline minRows={3} fullWidth />
                <IconButton onClick={() => removeParagraph(i)} disabled={form.content.length <= 1}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Button startIcon={<AddIcon />} onClick={addParagraph} sx={{ alignSelf: "flex-start" }}>
              Add paragraph
            </Button>
          </Stack>
        </Box>

        <Stack direction="row" spacing={3} alignItems="center">
          <TextField
            label="Order"
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            sx={{ width: 120 }}
          />
          <FormControlLabel
            control={<Switch checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />}
            label="Active"
          />
        </Stack>

        <Box>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

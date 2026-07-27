import { useEffect, useState } from "react";
import { Alert, Box, Button, Paper, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { getPage, putPage } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";

// Generic fallback editor: works immediately for ANY Mixed-data singleton
// page, since its shape mirrors the real data-export JSON verbatim. This is
// what makes every page dynamically editable from day one — bespoke forms
// (Blogs, Department tabs, Site Settings) layer nicer UX on top over time,
// this is the safety net underneath all of them.
export function JsonPageEditor({ title, route }: { title: string; route: string }) {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPage(route)
      .then((res) => setRaw(JSON.stringify(res?.data ?? {}, null, 2)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [route]);

  async function handleSave() {
    setError(null);
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      setError("Invalid JSON — fix the syntax before saving.");
      return;
    }
    setSaving(true);
    try {
      await putPage(route, parsed);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute(route);
      if (publicPath) triggerRevalidate(publicPath);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Raw content editor. Every field visible on the public page lives somewhere in this JSON object — edit the
          value, keep the surrounding structure (quotes, commas, brackets) intact, then Save.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {savedAt && <Alert severity="success">Saved.</Alert>}
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <TextField
            multiline
            minRows={20}
            maxRows={40}
            value={raw}
            onChange={(e) => {
              setRaw(e.target.value);
              setSavedAt(null);
            }}
            fullWidth
            slotProps={{ input: { sx: { fontFamily: "monospace", fontSize: 13 } } }}
          />
        )}
        <Box>
          <Button variant="contained" onClick={handleSave} disabled={loading || saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

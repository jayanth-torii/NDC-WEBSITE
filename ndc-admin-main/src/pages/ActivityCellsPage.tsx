import { useEffect, useState } from "react";
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { ACTIVITY_GROUPS } from "../config/adminPages";
import { getActivityCellById, updateActivityCell } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";

export function ActivityCellsPage() {
  const groups = Object.keys(ACTIVITY_GROUPS);
  const [group, setGroup] = useState(groups[0]);
  const [cellId, setCellId] = useState(ACTIVITY_GROUPS[groups[0]][0]);

  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSavedAt(null);
    getActivityCellById(cellId)
      .then((res) => setRaw(JSON.stringify(res?.data ?? {}, null, 2)))
      .catch((err) => {
        // 404 on a cell that hasn't been seeded yet is expected — start empty.
        if (err.response?.status === 404) setRaw("{}");
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [cellId]);

  async function handleSave() {
    setError(null);
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      setError("Invalid JSON — fix the syntax before saving.");
      return;
    }
    setSaving(true);
    try {
      await updateActivityCell(cellId, group, parsed);
      setSavedAt(Date.now());
      triggerRevalidate(`/activities/${group}/${cellId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            select
            label="Group"
            value={group}
            onChange={(e) => {
              const g = e.target.value;
              setGroup(g);
              setCellId(ACTIVITY_GROUPS[g][0]);
            }}
            sx={{ minWidth: 320 }}
          >
            {groups.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Cell" value={cellId} onChange={(e) => setCellId(e.target.value)} sx={{ minWidth: 260 }}>
            {ACTIVITY_GROUPS[group].map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">{cellId}</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {savedAt && <Alert severity="success">Saved.</Alert>}
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <TextField
              multiline
              minRows={18}
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
    </Stack>
  );
}

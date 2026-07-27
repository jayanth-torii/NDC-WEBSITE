import { useEffect, useState } from "react";
import { Alert, Box, Button, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography, CircularProgress } from "@mui/material";
import { DEPARTMENT_TABS, PROGRAMME_CODES } from "../config/adminPages";
import { getDepartmentTab, updateDepartmentTab } from "../services/data.service";

// One page = the 12 department sub-type collections, all keyed internally by
// programme code. Select a programme, then a tab; each tab edits that one
// programme's slice of the corresponding sub-type document.
// No revalidate call here: the public Department cluster is a client
// component that fetches live on every mount (Tier 1, not server-rendered
// with ISR), so there's no server cache to bust.
export function DepartmentEditorPage() {
  const [programme, setProgramme] = useState(PROGRAMME_CODES[0]);
  const [tabIndex, setTabIndex] = useState(0);
  const activeTab = DEPARTMENT_TABS[tabIndex];

  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [fullDoc, setFullDoc] = useState<Record<string, any>>({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSavedAt(null);
    getDepartmentTab(activeTab.route)
      .then((res) => {
        const doc = res?.data || {};
        setFullDoc(doc);
        setRaw(JSON.stringify(doc[programme] ?? {}, null, 2));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeTab.route, programme]);

  async function handleSave() {
    setError(null);
    let parsed;
    try {
      parsed = raw.trim() === "" ? undefined : JSON.parse(raw);
    } catch {
      setError("Invalid JSON — fix the syntax before saving.");
      return;
    }
    setSaving(true);
    try {
      const merged = { ...fullDoc, [programme]: parsed };
      await updateDepartmentTab(activeTab.route, merged);
      setFullDoc(merged);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <TextField
          select
          label="Programme"
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
          sx={{ minWidth: 220 }}
        >
          {PROGRAMME_CODES.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>
      </Paper>
      <Paper>
        <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} variant="scrollable" scrollButtons="auto">
          {DEPARTMENT_TABS.map((t) => (
            <Tab key={t.key} label={t.label} />
          ))}
        </Tabs>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">
            {activeTab.label} — {programme}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If this programme has no content for this tab yet, the box below starts empty — fill in the same shape
            used by other programmes on this tab.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {savedAt && <Alert severity="success">Saved.</Alert>}
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <TextField
              multiline
              minRows={16}
              maxRows={36}
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

import { useEffect, useState } from "react";
import { Box, NativeSelect, Spinner, Stack, Text } from "@chakra-ui/react";
import { MdGroups as CellIcon } from "react-icons/md";
import { ACTIVITY_GROUPS } from "../config/adminPages";
import { getActivityCellById, updateActivityCell } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { StructuredEditorBody } from "../components/StructuredEditorBody";
import { Callout, EditorHeader, Panel, SaveBar } from "../components/editorKit";

export function ActivityCellsPage() {
  const groups = Object.keys(ACTIVITY_GROUPS);
  const [group, setGroup] = useState(groups[0]);
  const [cellId, setCellId] = useState(ACTIVITY_GROUPS[groups[0]][0]);

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSavedAt(null);
    getActivityCellById(cellId)
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => {
        // 404 on a cell that hasn't been seeded yet is expected — start empty.
        if (err.response?.status === 404) setData({});
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [cellId]);

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateActivityCell(cellId, group, data);
      setSavedAt(Date.now());
      triggerRevalidate(`/activities/${group}/${cellId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap={4}>
      <Panel p={4}>
        <Stack direction="row" gap={4}>
          <Box>
            <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
              Group
            </Text>
            <NativeSelect.Root maxW="360px" size="sm">
              <NativeSelect.Field
                value={group}
                onChange={(e) => {
                  const g = e.target.value;
                  setGroup(g);
                  setCellId(ACTIVITY_GROUPS[g][0]);
                }}
              >
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
              Cell
            </Text>
            <NativeSelect.Root maxW="300px" size="sm">
              <NativeSelect.Field value={cellId} onChange={(e) => setCellId(e.target.value)}>
                {ACTIVITY_GROUPS[group].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
        </Stack>
      </Panel>

      <EditorHeader icon={CellIcon} eyebrow="Activity Cells" title={cellId} subtitle={group.replace(/-/g, " ")} />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
            <StructuredEditorBody data={data} onChange={setData} />
          </Panel>
          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes revalidate the public activities page."
          />
        </>
      )}
    </Stack>
  );
}

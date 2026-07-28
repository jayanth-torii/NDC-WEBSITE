import { useEffect, useState } from "react";
import { NativeSelect, Spinner, Stack, Tabs, Text } from "@chakra-ui/react";
import { MdApartment as DeptIcon } from "react-icons/md";
import { DEPARTMENT_TABS, PROGRAMME_CODES } from "../config/adminPages";
import { getDepartmentTab, updateDepartmentTab } from "../services/data.service";
import { StructuredEditorBody } from "../components/StructuredEditorBody";
import { Callout, EditorHeader, Panel, SaveBar } from "../components/editorKit";

// One page = the 12 department sub-type collections, all keyed internally by
// programme code. Select a programme, then a tab; each tab edits that one
// programme's slice of the corresponding sub-type document.
// No revalidate call here: the public Department cluster is a client
// component that fetches live on every mount (Tier 1, not server-rendered
// with ISR), so there's no server cache to bust.
export function DepartmentEditorPage() {
  const [programme, setProgramme] = useState(PROGRAMME_CODES[0]);
  const [tabKey, setTabKey] = useState(DEPARTMENT_TABS[0].key);
  const activeTab = DEPARTMENT_TABS.find((t) => t.key === tabKey) || DEPARTMENT_TABS[0];

  const [data, setData] = useState<any>({});
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
        setData(doc[programme] ?? {});
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeTab.route, programme]);

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      const merged = { ...fullDoc, [programme]: data };
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
    <Stack gap={4}>
      <Panel p={4}>
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={2}>
          Programme
        </Text>
        <NativeSelect.Root maxW="240px" size="sm">
          <NativeSelect.Field value={programme} onChange={(e) => setProgramme(e.target.value)}>
            {PROGRAMME_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Panel>

      <Tabs.Root value={tabKey} onValueChange={(e) => setTabKey(e.value)}>
        <Panel overflowX="auto">
          <Tabs.List borderBottom="none" px={2}>
            {DEPARTMENT_TABS.map((t) => (
              <Tabs.Trigger
                key={t.key}
                value={t.key}
                color="gray.500"
                fontWeight={600}
                _selected={{ color: "brand.navy", borderColor: "brand.orange" }}
                whiteSpace="nowrap"
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Panel>
      </Tabs.Root>

      <EditorHeader
        icon={DeptIcon}
        eyebrow="Departments"
        title={`${activeTab.label} — ${programme}`}
        subtitle="If this programme has no content for this tab yet, the form below starts empty — fill in the same fields used by other programmes on this tab."
      />
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
            summary="Changes apply to this programme's tab only."
          />
        </>
      )}
    </Stack>
  );
}

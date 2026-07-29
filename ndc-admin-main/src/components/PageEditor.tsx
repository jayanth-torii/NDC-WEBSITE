import { useEffect, useMemo, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { MdDescription as PageIcon, MdFolder as SectionIcon } from "react-icons/md";
import { getPage, putPage } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import { StructuredEditorBody } from "./StructuredEditorBody";
import { HIDDEN_KEYS, humanize } from "./fieldHeuristics";
import { Callout, EditorHeader, EditorLayout, Panel, SaveBar, SectionHead, type TabCardSpec } from "./editorKit";

// Generic editor for every "singleton page" collection that hasn't earned a
// bespoke page (Certificate Courses, Contact Us, Research, Research Forum,
// Students, Blog Banner, Apply Now — see SidebarContent.tsx's `/page/:title/
// :route` entries). Since the shape is arbitrary schemaless JSON per route
// (see fieldHeuristics.ts), tabs can't be hand-authored per page like the
// bespoke pages — they're derived at runtime from the document's own
// top-level keys, one tab per key, same sidebar-tabs "studio" shape as every
// other content editor in this app. Each tab renders that single key wrapped
// in its own `{ [key]: value }` object so it flows through the exact same
// AutoForm heuristics (image/pdf/video/map controls, arrays, nesting) as
// every bespoke page, then merges the edited value back under that one key.
export function PageEditor({ title, route, eyebrow = "Content Manager" }: { title: string; route: string; eyebrow?: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [tabKey, setTabKey] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTabKey(null);
    getPage(route)
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [route]);

  const tabs: TabCardSpec[] = useMemo(() => {
    if (!data || typeof data !== "object" || Array.isArray(data)) return [];
    return Object.keys(data)
      .filter((k) => !HIDDEN_KEYS.has(k))
      .map((k) => ({ id: k, label: humanize(k), icon: SectionIcon }));
  }, [data]);

  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((t) => t.id === tabKey)) {
      setTabKey(tabs[0].id);
    }
  }, [tabs, tabKey]);

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await putPage(route, data);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute(route);
      if (publicPath) triggerRevalidate(publicPath);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  const activeTab = tabKey && tabs.some((t) => t.id === tabKey) ? tabKey : tabs[0]?.id;

  return (
    <Box>
      <Box mb={6}>
        <EditorHeader
          icon={PageIcon}
          eyebrow={eyebrow}
          title={title}
          subtitle="Edits save directly to the live database and revalidate the public page."
          stats={tabs.length ? [{ value: tabs.length, label: "Sections" }] : undefined}
          mode={savedAt ? "edit" : undefined}
        />
        {error && <Box mt={4}><Callout tone="error">{error}</Callout></Box>}
        {savedAt && <Box mt={4}><Callout tone="success">Saved.</Callout></Box>}
      </Box>

      {loading ? (
        <Box py={10} textAlign="center">
          <Spinner size="xl" color="brand.orange" />
        </Box>
      ) : activeTab ? (
        <EditorLayout tabs={tabs} activeTab={activeTab} onChange={setTabKey}>
          <Panel p={5}>
            <SectionHead icon={SectionIcon} title={humanize(activeTab)} />
            <StructuredEditorBody
              data={{ [activeTab]: data[activeTab] }}
              onChange={(next) => setData((prev: any) => ({ ...prev, [activeTab]: next[activeTab] }))}
            />
          </Panel>
          <Box mt={6}>
            <SaveBar
              saving={saving}
              onSave={handleSave}
              label={saving ? "Saving..." : "Save"}
              summary="Changes apply immediately and revalidate the public page."
            />
          </Box>
        </EditorLayout>
      ) : (
        <Box>
          <Panel p={6}>
            <StructuredEditorBody data={data} onChange={setData} />
          </Panel>
          <Box mt={6}>
            <SaveBar
              saving={saving}
              onSave={handleSave}
              label={saving ? "Saving..." : "Save"}
              summary="Changes apply immediately and revalidate the public page."
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

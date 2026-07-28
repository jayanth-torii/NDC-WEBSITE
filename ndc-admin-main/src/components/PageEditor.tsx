import { useEffect, useState } from "react";
import { Spinner, Stack } from "@chakra-ui/react";
import { MdDescription as PageIcon } from "react-icons/md";
import { getPage, putPage } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import { StructuredEditorBody } from "./StructuredEditorBody";
import { Callout, EditorHeader, Panel, SaveBar } from "./editorKit";

// Structured content editor: fetches a singleton page's data, renders it as
// proper fields (image previews, PDF view/download, repeatable lists — no
// raw JSON in the primary view), and PUTs the edited object back on Save.
export function PageEditor({ title, route, eyebrow = "Content Manager" }: { title: string; route: string; eyebrow?: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPage(route)
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [route]);

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

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={PageIcon}
        eyebrow={eyebrow}
        title={title}
        subtitle="Edits save directly to the live database and revalidate the public page."
        mode={savedAt ? "edit" : undefined}
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
            summary="Changes apply immediately and revalidate the public page."
          />
        </>
      )}
    </Stack>
  );
}

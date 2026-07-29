import { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { MdDescription as PageIcon } from "react-icons/md";
import { getPage, putPage } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import { StructuredEditorBody } from "./StructuredEditorBody";
import { Callout, EditorHeader, Panel, SaveBar } from "./editorKit";

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
    <Box>
      <Box mb={6}>
        <EditorHeader
          icon={PageIcon}
          eyebrow={eyebrow}
          title={title}
          subtitle="Edits save directly to the live database and revalidate the public page."
          mode={savedAt ? "edit" : undefined}
        />
        {error && <Box mt={4}><Callout tone="error">{error}</Callout></Box>}
        {savedAt && <Box mt={4}><Callout tone="success">Saved.</Callout></Box>}
      </Box>

      {loading ? (
        <Box py={10} textAlign="center">
          <Spinner size="xl" color="brand.orange" />
        </Box>
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

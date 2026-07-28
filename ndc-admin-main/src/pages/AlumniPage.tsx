import { useEffect, useState } from "react";
import { Box, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import { MdGroups as AlumniIcon, MdImage as BannerIcon, MdTrackChanges as VisionIcon, MdGroup as AssociationIcon } from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getAlumni, updateAlumni } from "../services/data.service";
import { Callout, EditorHeader, IconBtn, Panel, RowCard, SaveBar, SectionHead, AddButton } from "../components/editorKit";

// Dedicated Alumni editor. Real doc shape (confirmed via ndc-web-main's
// src/app/alumni/page.tsx + src/components/Alumni/VisionMission.tsx +
// Association.tsx): { BannerSection, VisionMission: { title, Sections[] },
// AlumniAssciation: { title, description } }. Sections are matched by
// SUBSTRING (title.toLowerCase().includes("vision"|"mission")), not exact
// title match like IQAC — so each section's own existing title is preserved
// on update, only used as a fallback when creating a brand new section.

function getSectionByKeyword(sections: any[], keyword: string) {
  return (sections ?? []).find((s) => s?.title?.toLowerCase().includes(keyword));
}
function setSectionByKeyword(sections: any[], keyword: string, patch: any, fallbackTitle: string) {
  const list = sections ? [...sections] : [];
  const idx = list.findIndex((s) => s?.title?.toLowerCase().includes(keyword));
  if (idx === -1) list.push({ title: fallbackTitle, ...patch });
  else list[idx] = { ...list[idx], ...patch };
  return list;
}

function StringListEditor({
  items,
  onChange,
  addLabel = "Add item",
  placeholder,
  multiline = false,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  function updateItem(i: number, value: string) {
    const next = [...items];
    next[i] = value;
    onChange(next);
  }
  function addItem() {
    onChange([...items, ""]);
  }
  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  return (
    <Stack gap={2}>
      {items.map((item, i) => (
        <RowCard key={i} align={multiline ? "flex-start" : "center"} mb={0}>
          {multiline ? (
            <Textarea value={item} onChange={(e) => updateItem(i, e.target.value)} rows={2} bg="white" border="none" px={0} flex="1" />
          ) : (
            <Input value={item} onChange={(e) => updateItem(i, e.target.value)} bg="white" size="sm" flex="1" placeholder={placeholder} />
          )}
          <IconBtn aria-label="Remove item" tone="danger" confirm={false} onClick={() => removeItem(i)} />
        </RowCard>
      ))}
      <AddButton dashed size="sm" onClick={addItem}>
        {addLabel}
      </AddButton>
    </Stack>
  );
}

export function AlumniPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAlumni()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const visionMission = data?.VisionMission ?? {};
  const sections: any[] = visionMission.Sections ?? [];
  const association = data?.AlumniAssciation ?? {};

  const vision = getSectionByKeyword(sections, "vision");
  const mission = getSectionByKeyword(sections, "mission");

  function updateBannerField(field: "eyebrow" | "title" | "subtitle" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }

  function updateVisionMissionField(field: "title", value: string) {
    setData((prev: any) => ({ ...prev, VisionMission: { ...(prev?.VisionMission ?? {}), [field]: value } }));
  }

  function updateSections(nextSections: any[]) {
    setData((prev: any) => ({ ...prev, VisionMission: { ...(prev?.VisionMission ?? {}), Sections: nextSections } }));
  }

  function updateAssociationField(field: "title" | "description", value: string) {
    setData((prev: any) => ({ ...prev, AlumniAssciation: { ...(prev?.AlumniAssciation ?? {}), [field]: value } }));
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateAlumni(data);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={AlumniIcon}
        eyebrow="Alumni"
        title="Alumni Management"
        subtitle="Manage the public Alumni Association page."
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
            <SectionHead icon={BannerIcon} title="Banner" subtitle="Shown at the top of the public Alumni page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Eyebrow
                </Text>
                <Input value={banner.eyebrow ?? ""} onChange={(e) => updateBannerField("eyebrow", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={banner.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Subtitle
                </Text>
                <Textarea value={banner.subtitle ?? ""} onChange={(e) => updateBannerField("subtitle", e.target.value)} rows={2} bg="white" />
              </Box>
              <ImageControl label="Banner Image" value={banner.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead icon={VisionIcon} title="Vision & Mission" subtitle="The two cards shown on the public page." />
            <Stack gap={5}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={visionMission.title ?? ""} onChange={(e) => updateVisionMissionField("title", e.target.value)} bg="white" />
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Vision Card Title
                </Text>
                <Input
                  value={vision?.title ?? ""}
                  onChange={(e) => updateSections(setSectionByKeyword(sections, "vision", { title: e.target.value }, "Our Vision"))}
                  bg="white"
                />
                <Text fontSize="sm" fontWeight={600} mt={3} mb={2}>
                  Vision Description
                </Text>
                <StringListEditor
                  items={vision?.Description ?? []}
                  onChange={(Description) => updateSections(setSectionByKeyword(sections, "vision", { Description }, "Our Vision"))}
                  addLabel="Add paragraph"
                  multiline
                />
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Mission Card Title
                </Text>
                <Input
                  value={mission?.title ?? ""}
                  onChange={(e) => updateSections(setSectionByKeyword(sections, "mission", { title: e.target.value }, "Our Mission"))}
                  bg="white"
                />
                <Text fontSize="sm" fontWeight={600} mt={3} mb={2}>
                  Mission Description
                </Text>
                <StringListEditor
                  items={mission?.Description ?? []}
                  onChange={(Description) => updateSections(setSectionByKeyword(sections, "mission", { Description }, "Our Mission"))}
                  addLabel="Add paragraph"
                  multiline
                />
              </Box>
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead icon={AssociationIcon} title="Alumni Association" subtitle="The dark objectives card shown on the public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={association.title ?? ""} onChange={(e) => updateAssociationField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea
                  value={association.description ?? ""}
                  onChange={(e) => updateAssociationField("description", e.target.value)}
                  rows={6}
                  bg="white"
                />
                <Text fontSize="xs" color="gray.400" mt={1}>
                  Written as plain sentences — the public page splits this into an intro paragraph plus one objective card per remaining
                  sentence.
                </Text>
              </Box>
            </Stack>
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Alumni page once saved."
          />
        </>
      )}
    </Stack>
  );
}

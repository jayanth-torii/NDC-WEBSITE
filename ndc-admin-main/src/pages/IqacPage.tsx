import { useEffect, useState } from "react";
import { Box, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdVerified as IqacIcon,
  MdImage as BannerIcon,
  MdInfo as AboutIcon,
  MdTrackChanges as VisionIcon,
  MdChecklist as ObjectivesIcon,
  MdGroups as CompositionIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getIqac, updateIqac } from "../services/data.service";
import { AddButton, Callout, EditorHeader, EmptyState, IconBtn, Panel, RowCard, SaveBar, SectionHead } from "../components/editorKit";

// Dedicated IQAC editor. Real doc shape (confirmed via ndc-web-main's
// src/app/iqac/page.tsx + src/components/IQAC/About.tsx + CompositionCell.tsx)
// is much smaller than NCET's IQAC editor (no Stats/Peer-Team/Document-Hub/
// Accreditation/NAAC-Reports/Policies — those features don't exist on NDC's
// site): { BannerSection, AboutVisionMissionSections: { title,
// AboutDescription[], VisionMission: { sections }, AccordienSection[] },
// CompositionOfIQACCell: { title, tableSection[] } }.
//
// The public About.tsx component finds sections by EXACT title match
// (sections.find(s => s.title === "Our Vision"), AccordienSection.find(s =>
// s.title === "Objectives")) — getSection/setSection below always preserve
// those literal titles so the public page keeps rendering these blocks.

function getSection(sections: any[], title: string) {
  return (sections ?? []).find((s) => s?.title === title);
}
function setSection(sections: any[], title: string, patch: any) {
  const list = sections ? [...sections] : [];
  const idx = list.findIndex((s) => s?.title === title);
  if (idx === -1) list.push({ title, ...patch });
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

export function IqacPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getIqac()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const about = data?.AboutVisionMissionSections ?? {};
  const aboutDescription: string[] = about.AboutDescription ?? [];
  const visionMissionSections: any[] = about.VisionMission?.sections ?? [];
  const accordionSections: any[] = about.AccordienSection ?? [];
  const composition = data?.CompositionOfIQACCell ?? {};
  const compositionTable: any[] = composition.tableSection ?? [];

  const vision = getSection(visionMissionSections, "Our Vision");
  const mission = getSection(visionMissionSections, "Our Mission");
  const objectives = getSection(accordionSections, "Objectives");
  const functionsSection = getSection(accordionSections, "Functions");

  function updateBannerField(field: "eyebrow" | "title" | "subtitle" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }

  function updateAboutField(field: "title" | "AboutDescription", value: any) {
    setData((prev: any) => ({ ...prev, AboutVisionMissionSections: { ...(prev?.AboutVisionMissionSections ?? {}), [field]: value } }));
  }

  function updateVisionMissionSections(nextSections: any[]) {
    setData((prev: any) => ({
      ...prev,
      AboutVisionMissionSections: {
        ...(prev?.AboutVisionMissionSections ?? {}),
        VisionMission: { ...(prev?.AboutVisionMissionSections?.VisionMission ?? {}), sections: nextSections },
      },
    }));
  }

  function updateAccordionSections(nextSections: any[]) {
    setData((prev: any) => ({
      ...prev,
      AboutVisionMissionSections: { ...(prev?.AboutVisionMissionSections ?? {}), AccordienSection: nextSections },
    }));
  }

  function updateComposition(field: "title" | "tableSection", value: any) {
    setData((prev: any) => ({ ...prev, CompositionOfIQACCell: { ...(prev?.CompositionOfIQACCell ?? {}), [field]: value } }));
  }

  function updateCompositionRow(i: number, field: "name" | "designation" | "role", value: string) {
    const next = compositionTable.map((row, idx) => (idx === i ? { ...row, [field]: value } : row));
    updateComposition("tableSection", next);
  }
  function addCompositionRow() {
    updateComposition("tableSection", [...compositionTable, { name: "", designation: "", role: "" }]);
  }
  function removeCompositionRow(i: number) {
    updateComposition(
      "tableSection",
      compositionTable.filter((_, idx) => idx !== i)
    );
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateIqac(data);
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
        icon={IqacIcon}
        eyebrow="IQAC"
        title="IQAC Management"
        subtitle="Manage the public Internal Quality Assurance Cell page."
        stats={[{ value: compositionTable.length, label: "Committee Members" }]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
            <SectionHead icon={BannerIcon} title="Banner" subtitle="Shown at the top of the public IQAC page." />
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
            <SectionHead icon={AboutIcon} title="About" subtitle="Intro copy shown above the Vision & Mission cards." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={about.title ?? ""} onChange={(e) => updateAboutField("title", e.target.value)} bg="white" placeholder="About IQAC" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Description
                </Text>
                <StringListEditor
                  items={aboutDescription}
                  onChange={(v) => updateAboutField("AboutDescription", v)}
                  addLabel="Add paragraph"
                  multiline
                />
              </Box>
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead icon={VisionIcon} title="Vision & Mission" subtitle="The two cards shown side-by-side on the public page." />
            <Stack gap={5}>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Our Vision
                </Text>
                <Textarea
                  value={vision?.description ?? ""}
                  onChange={(e) => updateVisionMissionSections(setSection(visionMissionSections, "Our Vision", { description: e.target.value }))}
                  rows={3}
                  bg="white"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Our Mission (bullet points)
                </Text>
                <StringListEditor
                  items={mission?.points ?? []}
                  onChange={(points) => updateVisionMissionSections(setSection(visionMissionSections, "Our Mission", { points }))}
                  addLabel="Add point"
                  placeholder="Mission point"
                />
              </Box>
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead icon={ObjectivesIcon} title="Objectives & Functions" subtitle="The two highlighted grids further down the public page." />
            <Stack gap={5}>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Objectives
                </Text>
                <StringListEditor
                  items={objectives?.ListPoints ?? []}
                  onChange={(ListPoints) => updateAccordionSections(setSection(accordionSections, "Objectives", { ListPoints }))}
                  addLabel="Add objective"
                  placeholder="Objective"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Functions
                </Text>
                <StringListEditor
                  items={functionsSection?.ListPoints ?? []}
                  onChange={(ListPoints) => updateAccordionSections(setSection(accordionSections, "Functions", { ListPoints }))}
                  addLabel="Add function"
                  placeholder="Function"
                />
              </Box>
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead icon={CompositionIcon} title="Composition of IQAC Cell" subtitle="The committee table shown on the public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input
                  value={composition.title ?? ""}
                  onChange={(e) => updateComposition("title", e.target.value)}
                  bg="white"
                  placeholder="Composition of IQAC Cell"
                />
              </Box>

              {compositionTable.length === 0 ? (
                <EmptyState title="No committee members yet" hint="Add a member to populate the public table." />
              ) : (
                <Stack gap={2}>
                  {compositionTable.map((row, i) => (
                    <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                      <Stack flex="1" minW="200px" gap={2}>
                        <Input value={row.name ?? ""} onChange={(e) => updateCompositionRow(i, "name", e.target.value)} placeholder="Name" size="sm" bg="white" />
                        <Input
                          value={row.designation ?? ""}
                          onChange={(e) => updateCompositionRow(i, "designation", e.target.value)}
                          placeholder="Designation"
                          size="sm"
                          bg="white"
                        />
                      </Stack>
                      <Stack flex="1" minW="160px" gap={2}>
                        <Input value={row.role ?? ""} onChange={(e) => updateCompositionRow(i, "role", e.target.value)} placeholder="Category / Role" size="sm" bg="white" />
                      </Stack>
                      <IconBtn aria-label="Remove member" tone="danger" onClick={() => removeCompositionRow(i)} />
                    </RowCard>
                  ))}
                </Stack>
              )}
              <Box>
                <AddButton dashed size="sm" onClick={addCompositionRow}>
                  Add Member
                </AddButton>
              </Box>
            </Stack>
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public IQAC page once saved."
          />
        </>
      )}
    </Stack>
  );
}

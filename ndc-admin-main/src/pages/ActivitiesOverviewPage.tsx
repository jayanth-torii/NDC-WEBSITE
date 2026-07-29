import { useEffect, useState } from "react";
import { Box, Grid, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdEventNote as ActivitiesIcon,
  MdImage as BannerIcon,
  MdInfo as KnowIcon,
  MdTheaterComedy as CulturalIcon,
  MdStar as HighlightIcon,
  MdDeleteOutline as RemoveTableIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getActivitiesPage, updateActivitiesPage } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import {
  AddButton,
  CardHeader,
  Callout,
  EditorHeader,
  IconBtn,
  Panel,
  RowCard,
  SaveBar,
  SectionHead,
  SubtleCard,
} from "../components/editorKit";

// Dedicated Activities overview editor. Real doc shape (confirmed via GET
// /activities-page + ndc-web-main's src/app/activities/page.tsx +
// components/Activities/*): { BannerSection: {title,image}, Know_Every_Thing:
// {title,description,image}, Cultural_And_Leadership_Activities: {title,
// Sections: [{TabName, About, VisionMission:[{title,description,points[]}],
// OtherSections:[{title, ListPoints:[{text}]}], images:string[],
// Table_Section: {title, Rows:[{Slno,name,role}]} | null}]}, Activities:
// {title,description,image} }.
//
// The bottom-level "Activities" key is a single highlight card (title/
// description/image) distinct from the "Cultural_And_Leadership_Activities"
// tabs above it — labeled "Activities Highlight" here to avoid confusion
// with the page as a whole.

function stringsToListPoints(points: string[]): { text: string }[] {
  return points.map((text) => ({ text }));
}
function listPointsToStrings(points: { text?: string }[] | undefined): string[] {
  return (points ?? []).map((p) => p.text ?? "");
}

function StringListEditor({
  items,
  onChange,
  addLabel = "Add item",
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  placeholder?: string;
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
        <RowCard key={i} mb={0}>
          <Input value={item} onChange={(e) => updateItem(i, e.target.value)} bg="white" size="sm" flex="1" placeholder={placeholder} />
          <IconBtn aria-label="Remove item" tone="danger" confirm={false} onClick={() => removeItem(i)} />
        </RowCard>
      ))}
      <AddButton dashed size="xs" onClick={addItem}>
        {addLabel}
      </AddButton>
    </Stack>
  );
}

export function ActivitiesOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getActivitiesPage()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const know = data?.Know_Every_Thing ?? {};
  const cultural = data?.Cultural_And_Leadership_Activities ?? {};
  const sections: any[] = cultural.Sections ?? [];
  const highlight = data?.Activities ?? {};

  function updateBannerField(field: "title" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }
  function updateKnowField(field: "title" | "description" | "image", value: string) {
    setData((prev: any) => ({ ...prev, Know_Every_Thing: { ...(prev?.Know_Every_Thing ?? {}), [field]: value } }));
  }
  function updateHighlightField(field: "title" | "description" | "image", value: string) {
    setData((prev: any) => ({ ...prev, Activities: { ...(prev?.Activities ?? {}), [field]: value } }));
  }
  function updateCulturalField(field: "title" | "Sections", value: any) {
    setData((prev: any) => ({
      ...prev,
      Cultural_And_Leadership_Activities: { ...(prev?.Cultural_And_Leadership_Activities ?? {}), [field]: value },
    }));
  }
  function updateSectionField(i: number, field: string, value: any) {
    updateCulturalField(
      "Sections",
      sections.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  }
  function addSection() {
    updateCulturalField("Sections", [
      ...sections,
      { TabName: "New Tab", About: "", VisionMission: [], OtherSections: [], images: [], Table_Section: null },
    ]);
  }
  function removeSection(i: number) {
    updateCulturalField(
      "Sections",
      sections.filter((_, idx) => idx !== i)
    );
  }

  // Vision/Mission items within one tab
  function updateVmItem(sectionIdx: number, vmIdx: number, field: "title" | "description" | "points", value: any) {
    const vm = sections[sectionIdx]?.VisionMission ?? [];
    updateSectionField(
      sectionIdx,
      "VisionMission",
      vm.map((v: any, idx: number) => (idx === vmIdx ? { ...v, [field]: value } : v))
    );
  }
  function addVm(sectionIdx: number) {
    const vm = sections[sectionIdx]?.VisionMission ?? [];
    updateSectionField(sectionIdx, "VisionMission", [...vm, { title: "", description: "", points: [] }]);
  }
  function removeVm(sectionIdx: number, vmIdx: number) {
    const vm = sections[sectionIdx]?.VisionMission ?? [];
    updateSectionField(
      sectionIdx,
      "VisionMission",
      vm.filter((_: any, idx: number) => idx !== vmIdx)
    );
  }

  // Other sections (bullet groups) within one tab
  function updateOtherItem(sectionIdx: number, otherIdx: number, field: "title" | "ListPoints", value: any) {
    const other = sections[sectionIdx]?.OtherSections ?? [];
    updateSectionField(
      sectionIdx,
      "OtherSections",
      other.map((o: any, idx: number) => (idx === otherIdx ? { ...o, [field]: value } : o))
    );
  }
  function addOther(sectionIdx: number) {
    const other = sections[sectionIdx]?.OtherSections ?? [];
    updateSectionField(sectionIdx, "OtherSections", [...other, { title: "", ListPoints: [] }]);
  }
  function removeOther(sectionIdx: number, otherIdx: number) {
    const other = sections[sectionIdx]?.OtherSections ?? [];
    updateSectionField(
      sectionIdx,
      "OtherSections",
      other.filter((_: any, idx: number) => idx !== otherIdx)
    );
  }

  // Images within one tab
  function updateSectionImage(sectionIdx: number, imgIdx: number, url: string) {
    const images: string[] = sections[sectionIdx]?.images ?? [];
    updateSectionField(
      sectionIdx,
      "images",
      images.map((img, idx) => (idx === imgIdx ? url : img))
    );
  }
  function addSectionImage(sectionIdx: number) {
    const images: string[] = sections[sectionIdx]?.images ?? [];
    updateSectionField(sectionIdx, "images", [...images, ""]);
  }
  function removeSectionImage(sectionIdx: number, imgIdx: number) {
    const images: string[] = sections[sectionIdx]?.images ?? [];
    updateSectionField(
      sectionIdx,
      "images",
      images.filter((_, idx) => idx !== imgIdx)
    );
  }

  // Table section (nullable) within one tab
  function addTableSection(sectionIdx: number) {
    updateSectionField(sectionIdx, "Table_Section", { title: "", Rows: [] });
  }
  function removeTableSection(sectionIdx: number) {
    updateSectionField(sectionIdx, "Table_Section", null);
  }
  function updateTableTitle(sectionIdx: number, title: string) {
    const table = sections[sectionIdx]?.Table_Section;
    updateSectionField(sectionIdx, "Table_Section", { ...(table ?? { Rows: [] }), title });
  }
  function updateTableRow(sectionIdx: number, rowIdx: number, field: "Slno" | "name" | "role", value: string) {
    const table = sections[sectionIdx]?.Table_Section;
    const rows: any[] = table?.Rows ?? [];
    updateSectionField(sectionIdx, "Table_Section", {
      ...table,
      Rows: rows.map((r, idx) => (idx === rowIdx ? { ...r, [field]: value } : r)),
    });
  }
  function addTableRow(sectionIdx: number) {
    const table = sections[sectionIdx]?.Table_Section;
    const rows: any[] = table?.Rows ?? [];
    updateSectionField(sectionIdx, "Table_Section", { ...table, Rows: [...rows, { Slno: String(rows.length + 1), name: "", role: "" }] });
  }
  function removeTableRow(sectionIdx: number, rowIdx: number) {
    const table = sections[sectionIdx]?.Table_Section;
    const rows: any[] = table?.Rows ?? [];
    updateSectionField(sectionIdx, "Table_Section", { ...table, Rows: rows.filter((_, idx) => idx !== rowIdx) });
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateActivitiesPage(data);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute("/activities-page");
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
        icon={ActivitiesIcon}
        eyebrow="Activities"
        title="Activities Overview"
        subtitle="Manage the public Activities landing page."
        stats={[{ value: sections.length, label: "Activity Tabs" }]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          {/* Banner */}
          <Panel p={6}>
            <SectionHead icon={BannerIcon} title="Banner" subtitle="Shown at the top of the public Activities page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={banner.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="white" />
              </Box>
              <ImageControl label="Banner Image" value={banner.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
            </Stack>
          </Panel>

          {/* Know Every Thing */}
          <Panel p={6}>
            <SectionHead icon={KnowIcon} title="Know Everything" subtitle="The introductory summary section." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={know.title ?? ""} onChange={(e) => updateKnowField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea value={know.description ?? ""} onChange={(e) => updateKnowField("description", e.target.value)} rows={4} bg="white" />
              </Box>
              <ImageControl label="Image" value={know.image ?? ""} onChange={(url) => updateKnowField("image", url)} />
            </Stack>
          </Panel>

          {/* Cultural & Leadership Activities */}
          <Panel p={6}>
            <SectionHead icon={CulturalIcon} title="Cultural & Leadership Activities" subtitle="The tabbed activity groups (theatre, clubs, cells, etc.)." />
            <Box mb={4}>
              <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                Section Title
              </Text>
              <Input value={cultural.title ?? ""} onChange={(e) => updateCulturalField("title", e.target.value)} bg="white" />
            </Box>

            <Stack gap={4}>
              {sections.map((section, sIdx) => {
                const vm: any[] = section.VisionMission ?? [];
                const other: any[] = section.OtherSections ?? [];
                const images: string[] = section.images ?? [];
                const table = section.Table_Section;
                return (
                  <SubtleCard key={sIdx}>
                    <CardHeader justify="space-between">
                      <Input
                        value={section.TabName ?? ""}
                        onChange={(e) => updateSectionField(sIdx, "TabName", e.target.value)}
                        bg="white"
                        fontWeight={700}
                        flex="1"
                        maxW="360px"
                      />
                      <IconBtn
                        aria-label="Delete tab"
                        tone="danger"
                        confirmMessage={`Delete the "${section.TabName || "Untitled"}" tab and everything in it?`}
                        onClick={() => removeSection(sIdx)}
                      />
                    </CardHeader>
                    <Box p={4}>
                      <Stack gap={5}>
                        <Box>
                          <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                            About
                          </Text>
                          <Textarea
                            value={section.About ?? ""}
                            onChange={(e) => updateSectionField(sIdx, "About", e.target.value)}
                            rows={2}
                            bg="white"
                          />
                        </Box>

                        {/* Vision / Mission */}
                        <Box>
                          <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
                            Vision / Mission Blocks
                          </Text>
                          <Stack gap={3}>
                            {vm.map((item, vmIdx) => (
                              <RowCard key={vmIdx} align="flex-start" wrap="wrap" mb={0}>
                                <Stack flex="1" minW="240px" gap={2}>
                                  <Input
                                    value={item.title ?? ""}
                                    onChange={(e) => updateVmItem(sIdx, vmIdx, "title", e.target.value)}
                                    placeholder="e.g. Vision, Mission"
                                    size="sm"
                                    bg="white"
                                    fontWeight={600}
                                  />
                                  <Textarea
                                    value={item.description ?? ""}
                                    onChange={(e) => updateVmItem(sIdx, vmIdx, "description", e.target.value)}
                                    placeholder="Description"
                                    rows={2}
                                    size="sm"
                                    bg="white"
                                  />
                                  <StringListEditor
                                    items={item.points ?? []}
                                    onChange={(v) => updateVmItem(sIdx, vmIdx, "points", v)}
                                    addLabel="Add point"
                                  />
                                </Stack>
                                <IconBtn aria-label="Remove block" tone="danger" onClick={() => removeVm(sIdx, vmIdx)} />
                              </RowCard>
                            ))}
                            <AddButton dashed size="xs" onClick={() => addVm(sIdx)}>
                              Add Vision/Mission Block
                            </AddButton>
                          </Stack>
                        </Box>

                        {/* Other sections (bullet groups) */}
                        <Box>
                          <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
                            Bullet Point Groups
                          </Text>
                          <Stack gap={3}>
                            {other.map((item, oIdx) => (
                              <RowCard key={oIdx} align="flex-start" wrap="wrap" mb={0}>
                                <Stack flex="1" minW="240px" gap={2}>
                                  <Input
                                    value={item.title ?? ""}
                                    onChange={(e) => updateOtherItem(sIdx, oIdx, "title", e.target.value)}
                                    placeholder="e.g. Objectives"
                                    size="sm"
                                    bg="white"
                                    fontWeight={600}
                                  />
                                  <StringListEditor
                                    items={listPointsToStrings(item.ListPoints)}
                                    onChange={(v) => updateOtherItem(sIdx, oIdx, "ListPoints", stringsToListPoints(v))}
                                    addLabel="Add bullet point"
                                  />
                                </Stack>
                                <IconBtn aria-label="Remove group" tone="danger" onClick={() => removeOther(sIdx, oIdx)} />
                              </RowCard>
                            ))}
                            <AddButton dashed size="xs" onClick={() => addOther(sIdx)}>
                              Add Bullet Point Group
                            </AddButton>
                          </Stack>
                        </Box>

                        {/* Images */}
                        <Box>
                          <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
                            Images ({images.length})
                          </Text>
                          <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3} maxH="440px" overflowY="auto" pr={1} mb={2}>
                            {images.map((url, imgIdx) => (
                              <SubtleCard key={imgIdx} mb={0}>
                                <CardHeader justify="space-between">
                                  <Text fontWeight={600} fontSize="xs">
                                    Image {imgIdx + 1}
                                  </Text>
                                  <IconBtn aria-label="Remove image" tone="danger" size="xs" onClick={() => removeSectionImage(sIdx, imgIdx)} />
                                </CardHeader>
                                <Box p={2}>
                                  <ImageControl value={url} onChange={(u) => updateSectionImage(sIdx, imgIdx, u)} />
                                </Box>
                              </SubtleCard>
                            ))}
                          </Grid>
                          <AddButton dashed size="xs" onClick={() => addSectionImage(sIdx)}>
                            Add Image
                          </AddButton>
                        </Box>

                        {/* Table section */}
                        <Box>
                          <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
                            Coordinators Table
                          </Text>
                          {table ? (
                            <Stack gap={3}>
                              <Input
                                value={table.title ?? ""}
                                onChange={(e) => updateTableTitle(sIdx, e.target.value)}
                                placeholder="Table title (e.g. Committee coordinators)"
                                size="sm"
                                bg="white"
                              />
                              <Stack gap={2}>
                                {(table.Rows ?? []).map((row: any, rIdx: number) => (
                                  <RowCard key={rIdx} wrap="wrap" mb={0}>
                                    <Box w="70px">
                                      <Input
                                        value={row.Slno ?? ""}
                                        onChange={(e) => updateTableRow(sIdx, rIdx, "Slno", e.target.value)}
                                        placeholder="#"
                                        size="sm"
                                        bg="white"
                                      />
                                    </Box>
                                    <Input
                                      value={row.name ?? ""}
                                      onChange={(e) => updateTableRow(sIdx, rIdx, "name", e.target.value)}
                                      placeholder="Name"
                                      size="sm"
                                      bg="white"
                                      flex="2"
                                      minW="160px"
                                    />
                                    <Input
                                      value={row.role ?? ""}
                                      onChange={(e) => updateTableRow(sIdx, rIdx, "role", e.target.value)}
                                      placeholder="Role"
                                      size="sm"
                                      bg="white"
                                      flex="1"
                                      minW="140px"
                                    />
                                    <IconBtn aria-label="Remove row" tone="danger" onClick={() => removeTableRow(sIdx, rIdx)} />
                                  </RowCard>
                                ))}
                                <AddButton dashed size="xs" onClick={() => addTableRow(sIdx)}>
                                  Add Row
                                </AddButton>
                              </Stack>
                              <Box>
                                <AddButton
                                  dashed
                                  size="xs"
                                  icon={RemoveTableIcon}
                                  onClick={() => removeTableSection(sIdx)}
                                  color="red.500"
                                  borderColor="red.200"
                                >
                                  Remove Table
                                </AddButton>
                              </Box>
                            </Stack>
                          ) : (
                            <AddButton dashed size="sm" onClick={() => addTableSection(sIdx)}>
                              Add Coordinators Table
                            </AddButton>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  </SubtleCard>
                );
              })}
              <AddButton dashed size="sm" onClick={addSection}>
                Add Tab
              </AddButton>
            </Stack>
          </Panel>

          {/* Activities highlight */}
          <Panel p={6}>
            <SectionHead icon={HighlightIcon} title="Activities Highlight" subtitle="A single featured highlight card on the page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={highlight.title ?? ""} onChange={(e) => updateHighlightField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea
                  value={highlight.description ?? ""}
                  onChange={(e) => updateHighlightField("description", e.target.value)}
                  rows={3}
                  bg="white"
                />
              </Box>
              <ImageControl label="Image" value={highlight.image ?? ""} onChange={(url) => updateHighlightField("image", url)} />
            </Stack>
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Activities page once saved."
          />
        </>
      )}
    </Stack>
  );
}

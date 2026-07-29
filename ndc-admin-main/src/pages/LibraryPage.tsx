import { useEffect, useState } from "react";
import { Box, Dialog, Flex, IconButton, Input, Portal, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdLocalLibrary as LibraryIcon,
  MdInfo as AboutIcon,
  MdCloudDownload as ResourcesIcon,
  MdEventNote as EventsIcon,
  MdFolder as TabIcon,
  MdClose,
} from "react-icons/md";
import { getLibrary, updateLibrary } from "../services/data.service";
import {
  AddButton,
  Callout,
  EditorHeader,
  EditorLayout,
  EmptyState,
  GhostButton,
  IconBtn,
  IconChip,
  Panel,
  PrimaryButton,
  RowCard,
  SaveBar,
  SectionHead,
  SubtleCard,
  CardHeader,
  type TabCardSpec,
} from "../components/editorKit";

// Sidebar tab list — one entry per always-visible content section below.
// Digital Resources' own tab-name list (resoursesTable) is a separate,
// nested record-management concept and keeps its existing Add/Edit/Delete
// dialogs untouched.
const LIBRARY_TABS: TabCardSpec[] = [
  { id: "about", label: "About Library", icon: AboutIcon },
  { id: "resources", label: "Digital Resources", icon: ResourcesIcon },
  { id: "events", label: "Events & Rules", icon: EventsIcon },
];

// Dedicated Library editor. Real doc shape (confirmed via ndc-web-main's
// src/app/library/page.tsx + src/components/Library/{AboutLibrary,Resources,
// EventsRules}.tsx): { aboutLibrary: {title, aboutText[], dropdowns:[{title,
// content:[{items[]}]}]}, digitalResources: {title, resoursesTable:
// Record<tabName,{sn,name,link}[]>}, EventsAndRules: {title, events[],
// rulesRegulations:{title, sections[]}} }. No BannerSection — the public
// page hardcodes its hero banner, so there's nothing real to bind here.
// "resoursesTable" (misspelled) must be preserved exactly; it's a dynamic
// tab-name -> rows map, the same shape GalleryPage.tsx's tabImages solved.

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

function getDropdownItems(dropdown: any): string[] {
  return dropdown?.content?.[0]?.items ?? [];
}
function withDropdownItems(dropdown: any, items: string[]) {
  const restContent = Array.isArray(dropdown?.content) ? dropdown.content.slice(1) : [];
  return { ...dropdown, content: [{ ...(dropdown?.content?.[0] ?? {}), items }, ...restContent] };
}

export function LibraryPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [tabKey, setTabKey] = useState(LIBRARY_TABS[0].id);

  const [addTabOpen, setAddTabOpen] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [editTab, setEditTab] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getLibrary()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const aboutLibrary = data?.aboutLibrary ?? {};
  const aboutText: string[] = aboutLibrary.aboutText ?? [];
  const dropdowns: any[] = aboutLibrary.dropdowns ?? [];

  const digitalResources = data?.digitalResources ?? {};
  const resoursesTable: Record<string, any[]> = digitalResources.resoursesTable ?? {};
  const tabNames = Object.keys(resoursesTable);

  const eventsAndRules = data?.EventsAndRules ?? {};
  const events: string[] = eventsAndRules.events ?? [];
  const rulesRegulations = eventsAndRules.rulesRegulations ?? {};
  const rules: string[] = rulesRegulations.sections ?? [];

  function updateAboutField(field: "title" | "aboutText" | "dropdowns", value: any) {
    setData((prev: any) => ({ ...prev, aboutLibrary: { ...(prev?.aboutLibrary ?? {}), [field]: value } }));
  }
  function updateDropdownTitle(i: number, title: string) {
    updateAboutField(
      "dropdowns",
      dropdowns.map((d, idx) => (idx === i ? { ...d, title } : d))
    );
  }
  function updateDropdownItems(i: number, items: string[]) {
    updateAboutField(
      "dropdowns",
      dropdowns.map((d, idx) => (idx === i ? withDropdownItems(d, items) : d))
    );
  }
  function addDropdown() {
    updateAboutField("dropdowns", [...dropdowns, { title: "New Section", content: [{ items: [] }] }]);
  }
  function removeDropdown(i: number) {
    updateAboutField(
      "dropdowns",
      dropdowns.filter((_, idx) => idx !== i)
    );
  }

  function updateDigitalResourcesField(field: "title" | "resoursesTable", value: any) {
    setData((prev: any) => ({ ...prev, digitalResources: { ...(prev?.digitalResources ?? {}), [field]: value } }));
  }
  function updateResoursesTable(next: Record<string, any[]>) {
    updateDigitalResourcesField("resoursesTable", next);
  }
  function openAddTab() {
    setNewTabName("");
    setAddTabOpen(true);
  }
  function handleAddTab() {
    const name = newTabName.trim();
    if (!name || resoursesTable[name]) return;
    updateResoursesTable({ ...resoursesTable, [name]: [] });
    setAddTabOpen(false);
  }
  function openEditTab(name: string) {
    setEditTab(name);
    setRenameValue(name);
  }
  function renameTab(oldName: string, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) return;
    const next = { ...resoursesTable };
    const rows = next[oldName] ?? [];
    delete next[oldName];
    next[trimmed] = rows;
    updateResoursesTable(next);
    setEditTab(trimmed);
  }
  function deleteTab(name: string) {
    const next = { ...resoursesTable };
    delete next[name];
    updateResoursesTable(next);
  }
  function updateResourceRow(tabName: string, rowIdx: number, field: "sn" | "name" | "link", value: any) {
    const rows = (resoursesTable[tabName] ?? []).map((r, i) => (i === rowIdx ? { ...r, [field]: value } : r));
    updateResoursesTable({ ...resoursesTable, [tabName]: rows });
  }
  function addResourceRow(tabName: string) {
    const rows = resoursesTable[tabName] ?? [];
    updateResoursesTable({ ...resoursesTable, [tabName]: [...rows, { sn: rows.length + 1, name: "", link: "" }] });
  }
  function removeResourceRow(tabName: string, rowIdx: number) {
    const rows = (resoursesTable[tabName] ?? []).filter((_, i) => i !== rowIdx);
    updateResoursesTable({ ...resoursesTable, [tabName]: rows });
  }

  function updateEventsField(field: "title" | "events", value: any) {
    setData((prev: any) => ({ ...prev, EventsAndRules: { ...(prev?.EventsAndRules ?? {}), [field]: value } }));
  }
  function updateRulesField(field: "title" | "sections", value: any) {
    setData((prev: any) => ({
      ...prev,
      EventsAndRules: { ...(prev?.EventsAndRules ?? {}), rulesRegulations: { ...(prev?.EventsAndRules?.rulesRegulations ?? {}), [field]: value } },
    }));
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateLibrary(data);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  const editingRows = editTab ? resoursesTable[editTab] ?? [] : [];

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={LibraryIcon}
        eyebrow="Library"
        title="Library Management"
        subtitle="Manage the public Library page content."
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <EditorLayout tabs={LIBRARY_TABS} activeTab={tabKey} onChange={setTabKey}>
          <Panel p={5}>
          {tabKey === "about" && (
          <>
            <SectionHead icon={AboutIcon} title="About Library" subtitle="Intro copy and the two highlight cards." />
            <Stack gap={5}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={aboutLibrary.title ?? ""} onChange={(e) => updateAboutField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  About Text
                </Text>
                <StringListEditor items={aboutText} onChange={(v) => updateAboutField("aboutText", v)} addLabel="Add paragraph" multiline />
              </Box>

              <Stack gap={4}>
                {dropdowns.map((dropdown, i) => (
                  <SubtleCard key={i}>
                    <CardHeader justify="space-between">
                      <Input
                        value={dropdown.title ?? ""}
                        onChange={(e) => updateDropdownTitle(i, e.target.value)}
                        bg="white"
                        fontWeight={700}
                        flex="1"
                        maxW="360px"
                      />
                      <IconBtn aria-label="Delete section" tone="danger" onClick={() => removeDropdown(i)} />
                    </CardHeader>
                    <Box p={4}>
                      <StringListEditor
                        items={getDropdownItems(dropdown)}
                        onChange={(items) => updateDropdownItems(i, items)}
                        addLabel="Add point"
                      />
                    </Box>
                  </SubtleCard>
                ))}
                <AddButton dashed size="sm" onClick={addDropdown}>
                  Add Section
                </AddButton>
              </Stack>
            </Stack>
          </>
          )}

          {tabKey === "resources" && (
          <>
            <SectionHead icon={ResourcesIcon} title="Digital Resources" subtitle="Tabbed resource tables shown on the public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={digitalResources.title ?? ""} onChange={(e) => updateDigitalResourcesField("title", e.target.value)} bg="white" />
              </Box>

              {tabNames.length === 0 ? (
                <EmptyState icon={ResourcesIcon} title="No resource tabs yet" hint="Add a tab to get started." />
              ) : (
                <Stack gap={2}>
                  {tabNames.map((name) => (
                    <Flex key={name} align="center" gap={3} p={3} bg="white" border="1px solid" borderColor="gray.100" borderRadius="lg" wrap="wrap">
                      <IconChip icon={TabIcon} size={16} box={36} onDark={false} />
                      <Box flex="1" minW="160px">
                        <Text fontWeight={600} fontSize="sm">
                          {name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {(resoursesTable[name] ?? []).length} resources
                        </Text>
                      </Box>
                      <GhostButton size="xs" onClick={() => openEditTab(name)}>
                        Edit
                      </GhostButton>
                      <IconBtn
                        aria-label="Delete tab"
                        tone="danger"
                        size="xs"
                        confirmMessage={`Delete tab "${name}" and all its resources?`}
                        onClick={() => deleteTab(name)}
                      />
                    </Flex>
                  ))}
                </Stack>
              )}
              <Box>
                <AddButton dashed size="sm" onClick={openAddTab}>
                  Add Tab
                </AddButton>
              </Box>
            </Stack>
          </>
          )}

          {tabKey === "events" && (
          <>
            <SectionHead icon={EventsIcon} title="Events & Rules" subtitle="Campus life copy plus the rules & regulations grid." />
            <Stack gap={5}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={eventsAndRules.title ?? ""} onChange={(e) => updateEventsField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Events (intro paragraphs)
                </Text>
                <StringListEditor items={events} onChange={(v) => updateEventsField("events", v)} addLabel="Add paragraph" multiline />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Rules & Regulations Title
                </Text>
                <Input value={rulesRegulations.title ?? ""} onChange={(e) => updateRulesField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Rules
                </Text>
                <StringListEditor items={rules} onChange={(v) => updateRulesField("sections", v)} addLabel="Add rule" />
              </Box>
            </Stack>
          </>
          )}
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Library page once saved."
          />
        </EditorLayout>
      )}

      {/* Add Tab modal */}
      <Dialog.Root open={addTabOpen} onOpenChange={(e) => setAddTabOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add Resource Tab</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Tab Name
                  </Text>
                  <Input
                    value={newTabName}
                    onChange={(e) => setNewTabName(e.target.value)}
                    placeholder="e.g., E-Books, Journals..."
                    bg="white"
                  />
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <GhostButton onClick={() => setAddTabOpen(false)}>Cancel</GhostButton>
                <PrimaryButton onClick={handleAddTab} disabled={!newTabName.trim() || !!resoursesTable[newTabName.trim()]}>
                  Create
                </PrimaryButton>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close" size="sm" variant="ghost" position="absolute" top={3} right={3}>
                  <MdClose size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Edit Tab modal */}
      <Dialog.Root open={editTab !== null} onOpenChange={(e) => !e.open && setEditTab(null)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit Resource Tab</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Tab Name
                    </Text>
                    <Flex gap={2}>
                      <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} bg="white" />
                      <GhostButton
                        size="sm"
                        onClick={() => editTab && renameTab(editTab, renameValue)}
                        disabled={!renameValue.trim() || renameValue === editTab}
                      >
                        Rename
                      </GhostButton>
                    </Flex>
                  </Box>

                  <AddButton dashed size="sm" onClick={() => editTab && addResourceRow(editTab)}>
                    Add Resource
                  </AddButton>

                  {editingRows.length === 0 ? (
                    <EmptyState title="No resources yet" />
                  ) : (
                    <Stack gap={2} maxH="360px" overflowY="auto" pr={1}>
                      {editingRows.map((row, i) => (
                        <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                          <Box w="70px">
                            <Input
                              type="number"
                              value={row.sn ?? ""}
                              onChange={(e) => editTab && updateResourceRow(editTab, i, "sn", Number(e.target.value))}
                              size="sm"
                              bg="white"
                              placeholder="#"
                            />
                          </Box>
                          <Stack flex="1" minW="200px" gap={2}>
                            <Input
                              value={row.name ?? ""}
                              onChange={(e) => editTab && updateResourceRow(editTab, i, "name", e.target.value)}
                              placeholder="Resource name"
                              size="sm"
                              bg="white"
                            />
                            <Input
                              value={row.link ?? ""}
                              onChange={(e) => editTab && updateResourceRow(editTab, i, "link", e.target.value)}
                              placeholder="Link URL"
                              size="sm"
                              bg="white"
                            />
                          </Stack>
                          <IconBtn aria-label="Remove resource" tone="danger" onClick={() => editTab && removeResourceRow(editTab, i)} />
                        </RowCard>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <GhostButton onClick={() => setEditTab(null)}>Close</GhostButton>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close" size="sm" variant="ghost" position="absolute" top={3} right={3}>
                  <MdClose size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
}

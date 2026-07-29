import { useEffect, useState } from "react";
import { Box, Grid, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdApartment as DeptIcon,
  MdImage as BannerIcon,
  MdSchool as ProgrammesIcon,
  MdPublic as CollabIcon,
  MdWorkspacePremium as CoursesIcon,
  MdTranslate as LanguageIcon,
  MdRecordVoiceOver as HodIcon,
  MdGroups as FacultyIcon,
  MdScience as ResearchIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { humanize } from "../components/fieldHeuristics";
import { getPage, putPage } from "../services/data.service";
import { API_ROUTES } from "../services/route";
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
  SubtleCard,
  TabCardGrid,
  type TabCardSpec,
} from "../components/editorKit";

// Bespoke studio-style editor for the /departments-page singleton — the
// public Departments overview page. Real doc shape (confirmed via GET
// /departments-page): { BannerSection: {title,image}, Programmes:
// {title,description,image}, International_Collaboration: {title,image,
// Details:[{title,descriptions:string[]}]}, Professional_Courses: {title,
// TabsSection:[{TabName,points:string[]}]}, Language_Department: {title,
// AboutDescription:string[], VisionMission:{title,sections:[{title,
// description,points[]}]}, AccordienSection:[{title,ListPoints:string[]}]},
// Message_From_Hods: {title, Hods:[{TabName,name,designation,message,
// image}]}, Faculty_And_Publications: {title, Department_Faculties:
// {TabName,columns,Rows:[...]}, Books_Published: {TabName,columns,
// TableRow:[...]}}, Research_And_Awards: {title, Sections:[{TabName,
// ListPoints:string[]}]} }.
//
// Tab layout (TabCardGrid) replaces the old flat single-scroll AutoForm page
// — same "studio" pattern as NCET's admin departments-page editors
// (GlobalDepartmentEditor.js / DepartmentDetailsEditor.js), rebuilt in
// Chakra v3 with this app's own navy/orange tokens and NDC's real content
// (NCET's tab set — Hero/Browse/Why/Empowering — doesn't apply here; NDC's
// actual 8 sections are used instead).
//
// Faculty & Publications has two differently-shaped tables (one keyed
// "Rows", one "TableRow", with different field names per row) — rather than
// hard-coding both, RecordsTableEditor below handles any {TabName, columns,
// <rows array under whatever key it uses>} shape generically, rendering one
// input per field actually present on each row.

const TABS: TabCardSpec[] = [
  { id: "banner", label: "Banner", desc: "Top hero", icon: BannerIcon },
  { id: "programmes", label: "Programmes", desc: "Intro block", icon: ProgrammesIcon },
  { id: "collaboration", label: "Global Ties", desc: "Int'l collabs", icon: CollabIcon },
  { id: "courses", label: "Pro Courses", desc: "CA / CMA / etc.", icon: CoursesIcon },
  { id: "language", label: "Language Dept", desc: "Vision & aims", icon: LanguageIcon },
  { id: "hods", label: "HOD Messages", desc: "Per-language HODs", icon: HodIcon },
  { id: "faculty", label: "Faculty", desc: "Staff & books", icon: FacultyIcon },
  { id: "research", label: "Research", desc: "Papers & awards", icon: ResearchIcon },
];

const ROUTE = API_ROUTES.DEPARTMENTS_PAGE.GET;

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
      <AddButton dashed size="xs" onClick={addItem}>
        {addLabel}
      </AddButton>
    </Stack>
  );
}

function findRowsKey(table: any): string {
  if (!table) return "Rows";
  const arrKey = Object.keys(table).find((k) => Array.isArray(table[k]));
  return arrKey || "Rows";
}

function RecordsTableEditor({ table, onChange }: { table: any; onChange: (t: any) => void }) {
  const rowsKey = findRowsKey(table);
  const columns: string[] = table?.columns ?? [];
  const rows: any[] = table?.[rowsKey] ?? [];

  function updateField(field: string, value: any) {
    onChange({ ...table, [field]: value });
  }
  function updateRow(i: number, key: string, value: string) {
    updateField(
      rowsKey,
      rows.map((r, idx) => (idx === i ? { ...r, [key]: value } : r))
    );
  }
  function addRow() {
    const sample = rows[0] ?? { Slno: "" };
    const blank = Object.fromEntries(Object.keys(sample).map((k) => [k, ""]));
    updateField(rowsKey, [...rows, blank]);
  }
  function removeRow(i: number) {
    updateField(
      rowsKey,
      rows.filter((_, idx) => idx !== i)
    );
  }

  return (
    <Stack gap={3}>
      <Box>
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
          Table Name
        </Text>
        <Input value={table?.TabName ?? ""} onChange={(e) => updateField("TabName", e.target.value)} bg="white" size="sm" />
      </Box>
      <Box>
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
          Column Headers
        </Text>
        <StringListEditor items={columns} onChange={(v) => updateField("columns", v)} addLabel="Add column" />
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
          Rows ({rows.length})
        </Text>
        <Stack gap={2} maxH="440px" overflowY="auto" pr={1} mb={2}>
          {rows.map((row, i) => (
            <SubtleCard key={i} mb={0}>
              <CardHeader justify="space-between">
                <Text fontWeight={600} fontSize="xs">
                  Row {i + 1}
                </Text>
                <IconBtn aria-label="Remove row" tone="danger" size="xs" onClick={() => removeRow(i)} />
              </CardHeader>
              <Box p={3}>
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={2}>
                  {Object.keys(row).map((key) => (
                    <Box key={key}>
                      <Text fontSize="9px" fontWeight={600} color="gray.400" mb={1} textTransform="uppercase">
                        {humanize(key)}
                      </Text>
                      <Input value={row[key] ?? ""} onChange={(e) => updateRow(i, key, e.target.value)} size="sm" bg="white" />
                    </Box>
                  ))}
                </Grid>
              </Box>
            </SubtleCard>
          ))}
        </Stack>
        <AddButton dashed size="xs" onClick={addRow}>
          Add Row
        </AddButton>
      </Box>
    </Stack>
  );
}

export function DepartmentsOverviewPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPage(ROUTE)
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const programmes = data?.Programmes ?? {};
  const collab = data?.International_Collaboration ?? {};
  const details: any[] = collab.Details ?? [];
  const courses = data?.Professional_Courses ?? {};
  const tabsSection: any[] = courses.TabsSection ?? [];
  const lang = data?.Language_Department ?? {};
  const aboutDescription: string[] = lang.AboutDescription ?? [];
  const visionMission = lang.VisionMission ?? {};
  const vmSections: any[] = visionMission.sections ?? [];
  const accordionSections: any[] = lang.AccordienSection ?? [];
  const hodsSection = data?.Message_From_Hods ?? {};
  const hods: any[] = hodsSection.Hods ?? [];
  const facPub = data?.Faculty_And_Publications ?? {};
  const research = data?.Research_And_Awards ?? {};
  const researchSections: any[] = research.Sections ?? [];

  function updateBannerField(field: "title" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }
  function updateProgrammesField(field: "title" | "description" | "image", value: string) {
    setData((prev: any) => ({ ...prev, Programmes: { ...(prev?.Programmes ?? {}), [field]: value } }));
  }

  function updateCollabField(field: "title" | "image" | "Details", value: any) {
    setData((prev: any) => ({ ...prev, International_Collaboration: { ...(prev?.International_Collaboration ?? {}), [field]: value } }));
  }
  function updateDetailField(i: number, field: "title" | "descriptions", value: any) {
    updateCollabField(
      "Details",
      details.map((d, idx) => (idx === i ? { ...d, [field]: value } : d))
    );
  }
  function addDetail() {
    updateCollabField("Details", [...details, { title: "", descriptions: [] }]);
  }
  function removeDetail(i: number) {
    updateCollabField(
      "Details",
      details.filter((_, idx) => idx !== i)
    );
  }

  function updateCoursesField(field: "title" | "TabsSection", value: any) {
    setData((prev: any) => ({ ...prev, Professional_Courses: { ...(prev?.Professional_Courses ?? {}), [field]: value } }));
  }
  function updateCourseTabField(i: number, field: "TabName" | "points", value: any) {
    updateCoursesField(
      "TabsSection",
      tabsSection.map((t, idx) => (idx === i ? { ...t, [field]: value } : t))
    );
  }
  function addCourseTab() {
    updateCoursesField("TabsSection", [...tabsSection, { TabName: "", points: [] }]);
  }
  function removeCourseTab(i: number) {
    updateCoursesField(
      "TabsSection",
      tabsSection.filter((_, idx) => idx !== i)
    );
  }

  function updateLangField(field: "title" | "AboutDescription" | "VisionMission" | "AccordienSection", value: any) {
    setData((prev: any) => ({ ...prev, Language_Department: { ...(prev?.Language_Department ?? {}), [field]: value } }));
  }
  function updateVmField(field: "title" | "sections", value: any) {
    updateLangField("VisionMission", { ...visionMission, [field]: value });
  }
  function updateVmSection(i: number, field: "title" | "description" | "points", value: any) {
    updateVmField(
      "sections",
      vmSections.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  }
  function addVmSection() {
    updateVmField("sections", [...vmSections, { title: "", description: "", points: [] }]);
  }
  function removeVmSection(i: number) {
    updateVmField(
      "sections",
      vmSections.filter((_, idx) => idx !== i)
    );
  }
  function updateAccordionItem(i: number, field: "title" | "ListPoints", value: any) {
    updateLangField(
      "AccordienSection",
      accordionSections.map((a, idx) => (idx === i ? { ...a, [field]: value } : a))
    );
  }
  function addAccordionItem() {
    updateLangField("AccordienSection", [...accordionSections, { title: "", ListPoints: [] }]);
  }
  function removeAccordionItem(i: number) {
    updateLangField(
      "AccordienSection",
      accordionSections.filter((_, idx) => idx !== i)
    );
  }

  function updateHodsField(field: "title" | "Hods", value: any) {
    setData((prev: any) => ({ ...prev, Message_From_Hods: { ...(prev?.Message_From_Hods ?? {}), [field]: value } }));
  }
  function updateHodItem(i: number, field: "TabName" | "name" | "designation" | "message" | "image", value: string) {
    updateHodsField(
      "Hods",
      hods.map((h, idx) => (idx === i ? { ...h, [field]: value } : h))
    );
  }
  function addHod() {
    updateHodsField("Hods", [...hods, { TabName: "", name: "", designation: "", message: "", image: "" }]);
  }
  function removeHod(i: number) {
    updateHodsField(
      "Hods",
      hods.filter((_, idx) => idx !== i)
    );
  }

  function updateFacPubField(field: "title" | "Department_Faculties" | "Books_Published", value: any) {
    setData((prev: any) => ({ ...prev, Faculty_And_Publications: { ...(prev?.Faculty_And_Publications ?? {}), [field]: value } }));
  }

  function updateResearchField(field: "title" | "Sections", value: any) {
    setData((prev: any) => ({ ...prev, Research_And_Awards: { ...(prev?.Research_And_Awards ?? {}), [field]: value } }));
  }
  function updateResearchSection(i: number, field: "TabName" | "ListPoints", value: any) {
    updateResearchField(
      "Sections",
      researchSections.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  }
  function addResearchSection() {
    updateResearchField("Sections", [...researchSections, { TabName: "", ListPoints: [] }]);
  }
  function removeResearchSection(i: number) {
    updateResearchField(
      "Sections",
      researchSections.filter((_, idx) => idx !== i)
    );
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await putPage(ROUTE, data);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute(ROUTE);
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
        icon={DeptIcon}
        eyebrow="Departments"
        title="Departments Page Studio"
        subtitle="Manage the hero, programme categories, and every section of the public Departments landing page."
        stats={[
          { value: tabsSection.length, label: "Pro Courses" },
          { value: hods.length, label: "HODs" },
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <TabCardGrid tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

          <Panel p={6}>
            {activeTab === "banner" && (
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Title
                  </Text>
                  <Input value={banner.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="white" />
                </Box>
                <ImageControl label="Banner Image" value={banner.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
              </Stack>
            )}

            {activeTab === "programmes" && (
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Title
                  </Text>
                  <Input value={programmes.title ?? ""} onChange={(e) => updateProgrammesField("title", e.target.value)} bg="white" />
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Description
                  </Text>
                  <Textarea
                    value={programmes.description ?? ""}
                    onChange={(e) => updateProgrammesField("description", e.target.value)}
                    rows={3}
                    bg="white"
                  />
                </Box>
                <ImageControl label="Image" value={programmes.image ?? ""} onChange={(url) => updateProgrammesField("image", url)} />
              </Stack>
            )}

            {activeTab === "collaboration" && (
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Title
                  </Text>
                  <Input value={collab.title ?? ""} onChange={(e) => updateCollabField("title", e.target.value)} bg="white" />
                </Box>
                <ImageControl label="Image" value={collab.image ?? ""} onChange={(url) => updateCollabField("image", url)} />

                <Stack gap={3}>
                  {details.map((d, i) => (
                    <SubtleCard key={i} mb={0}>
                      <CardHeader justify="space-between">
                        <Input
                          value={d.title ?? ""}
                          onChange={(e) => updateDetailField(i, "title", e.target.value)}
                          bg="white"
                          fontWeight={700}
                          flex="1"
                          maxW="360px"
                        />
                        <IconBtn aria-label="Delete collaboration" tone="danger" onClick={() => removeDetail(i)} />
                      </CardHeader>
                      <Box p={4}>
                        <StringListEditor
                          items={d.descriptions ?? []}
                          onChange={(v) => updateDetailField(i, "descriptions", v)}
                          addLabel="Add paragraph"
                          multiline
                        />
                      </Box>
                    </SubtleCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addDetail}>
                    Add Collaboration
                  </AddButton>
                </Stack>
              </Stack>
            )}

            {activeTab === "courses" && (
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Section Title
                  </Text>
                  <Input value={courses.title ?? ""} onChange={(e) => updateCoursesField("title", e.target.value)} bg="white" />
                </Box>
                <Stack gap={3}>
                  {tabsSection.map((tab, i) => (
                    <SubtleCard key={i} mb={0}>
                      <CardHeader justify="space-between">
                        <Input
                          value={tab.TabName ?? ""}
                          onChange={(e) => updateCourseTabField(i, "TabName", e.target.value)}
                          bg="white"
                          fontWeight={700}
                          flex="1"
                          maxW="200px"
                          placeholder="e.g. CA"
                        />
                        <IconBtn aria-label="Delete course tab" tone="danger" onClick={() => removeCourseTab(i)} />
                      </CardHeader>
                      <Box p={4}>
                        <StringListEditor
                          items={tab.points ?? []}
                          onChange={(v) => updateCourseTabField(i, "points", v)}
                          addLabel="Add point"
                          multiline
                        />
                      </Box>
                    </SubtleCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addCourseTab}>
                    Add Course
                  </AddButton>
                </Stack>
              </Stack>
            )}

            {activeTab === "language" && (
              <Stack gap={5}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Title
                  </Text>
                  <Input value={lang.title ?? ""} onChange={(e) => updateLangField("title", e.target.value)} bg="white" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={600} mb={2}>
                    About Paragraphs
                  </Text>
                  <StringListEditor items={aboutDescription} onChange={(v) => updateLangField("AboutDescription", v)} addLabel="Add paragraph" multiline />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
                    {visionMission.title || "Vision & Mission"}
                  </Text>
                  <Box mb={3}>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Block Title
                    </Text>
                    <Input value={visionMission.title ?? ""} onChange={(e) => updateVmField("title", e.target.value)} bg="white" size="sm" />
                  </Box>
                  <Stack gap={3}>
                    {vmSections.map((s, i) => (
                      <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                        <Stack flex="1" minW="240px" gap={2}>
                          <Input
                            value={s.title ?? ""}
                            onChange={(e) => updateVmSection(i, "title", e.target.value)}
                            placeholder="e.g. Our Vision"
                            size="sm"
                            bg="white"
                            fontWeight={600}
                          />
                          <Textarea
                            value={s.description ?? ""}
                            onChange={(e) => updateVmSection(i, "description", e.target.value)}
                            placeholder="Description"
                            rows={2}
                            size="sm"
                            bg="white"
                          />
                          <StringListEditor items={s.points ?? []} onChange={(v) => updateVmSection(i, "points", v)} addLabel="Add point" />
                        </Stack>
                        <IconBtn aria-label="Remove block" tone="danger" onClick={() => removeVmSection(i)} />
                      </RowCard>
                    ))}
                    <AddButton dashed size="xs" onClick={addVmSection}>
                      Add Vision/Mission Block
                    </AddButton>
                  </Stack>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={2}>
                    Accordion Sections
                  </Text>
                  <Stack gap={3}>
                    {accordionSections.map((a, i) => (
                      <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                        <Stack flex="1" minW="240px" gap={2}>
                          <Input
                            value={a.title ?? ""}
                            onChange={(e) => updateAccordionItem(i, "title", e.target.value)}
                            placeholder="e.g. Aim of the Department"
                            size="sm"
                            bg="white"
                            fontWeight={600}
                          />
                          <StringListEditor
                            items={a.ListPoints ?? []}
                            onChange={(v) => updateAccordionItem(i, "ListPoints", v)}
                            addLabel="Add bullet point"
                          />
                        </Stack>
                        <IconBtn aria-label="Remove section" tone="danger" onClick={() => removeAccordionItem(i)} />
                      </RowCard>
                    ))}
                    <AddButton dashed size="xs" onClick={addAccordionItem}>
                      Add Accordion Section
                    </AddButton>
                  </Stack>
                </Box>
              </Stack>
            )}

            {activeTab === "hods" && (
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Section Title
                  </Text>
                  <Input value={hodsSection.title ?? ""} onChange={(e) => updateHodsField("title", e.target.value)} bg="white" />
                </Box>
                <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4}>
                  {hods.map((h, i) => (
                    <SubtleCard key={i} mb={0}>
                      <CardHeader justify="space-between">
                        <Input
                          value={h.TabName ?? ""}
                          onChange={(e) => updateHodItem(i, "TabName", e.target.value)}
                          bg="white"
                          fontWeight={700}
                          flex="1"
                          maxW="200px"
                          placeholder="e.g. Hindi"
                        />
                        <IconBtn aria-label="Delete HOD" tone="danger" onClick={() => removeHod(i)} />
                      </CardHeader>
                      <Box p={4}>
                        <Stack gap={3}>
                          <Input
                            value={h.name ?? ""}
                            onChange={(e) => updateHodItem(i, "name", e.target.value)}
                            placeholder="Name"
                            size="sm"
                            bg="white"
                          />
                          <Input
                            value={h.designation ?? ""}
                            onChange={(e) => updateHodItem(i, "designation", e.target.value)}
                            placeholder="Designation"
                            size="sm"
                            bg="white"
                          />
                          <Textarea
                            value={h.message ?? ""}
                            onChange={(e) => updateHodItem(i, "message", e.target.value)}
                            placeholder="Message"
                            rows={3}
                            size="sm"
                            bg="white"
                          />
                          <ImageControl value={h.image ?? ""} onChange={(url) => updateHodItem(i, "image", url)} />
                        </Stack>
                      </Box>
                    </SubtleCard>
                  ))}
                </Grid>
                <AddButton dashed size="sm" onClick={addHod}>
                  Add HOD
                </AddButton>
              </Stack>
            )}

            {activeTab === "faculty" && (
              <Stack gap={6}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Section Title
                  </Text>
                  <Input value={facPub.title ?? ""} onChange={(e) => updateFacPubField("title", e.target.value)} bg="white" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={3}>
                    Department Faculties
                  </Text>
                  <RecordsTableEditor
                    table={facPub.Department_Faculties ?? {}}
                    onChange={(t) => updateFacPubField("Department_Faculties", t)}
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.navy" mb={3}>
                    Books Published
                  </Text>
                  <RecordsTableEditor table={facPub.Books_Published ?? {}} onChange={(t) => updateFacPubField("Books_Published", t)} />
                </Box>
              </Stack>
            )}

            {activeTab === "research" && (
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Section Title
                  </Text>
                  <Input value={research.title ?? ""} onChange={(e) => updateResearchField("title", e.target.value)} bg="white" />
                </Box>
                <Stack gap={3}>
                  {researchSections.map((s, i) => (
                    <SubtleCard key={i} mb={0}>
                      <CardHeader justify="space-between">
                        <Input
                          value={s.TabName ?? ""}
                          onChange={(e) => updateResearchSection(i, "TabName", e.target.value)}
                          bg="white"
                          fontWeight={700}
                          flex="1"
                          maxW="280px"
                          placeholder="e.g. Research Papers"
                        />
                        <IconBtn aria-label="Delete section" tone="danger" onClick={() => removeResearchSection(i)} />
                      </CardHeader>
                      <Box p={4}>
                        <StringListEditor
                          items={s.ListPoints ?? []}
                          onChange={(v) => updateResearchSection(i, "ListPoints", v)}
                          addLabel="Add entry"
                          multiline
                        />
                      </Box>
                    </SubtleCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addResearchSection}>
                    Add Section
                  </AddButton>
                </Stack>
              </Stack>
            )}
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Departments page once saved."
          />
        </>
      )}
    </Stack>
  );
}

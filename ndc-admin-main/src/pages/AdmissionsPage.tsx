import { useEffect, useState } from "react";
import { Badge, Box, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdHowToReg as AdmissionsIcon,
  MdImage as BannerIcon,
  MdSchool as CoursesIcon,
  MdAssignment as ProcedureIcon,
  MdFolder as DocumentsIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getAdmissions, updateAdmissions } from "../services/data.service";
import {
  AddButton,
  CardHeader,
  Callout,
  EditorHeader,
  EditorLayout,
  EmptyState,
  IconBtn,
  Panel,
  RowCard,
  SaveBar,
  SectionHead,
  SubtleCard,
  type TabCardSpec,
} from "../components/editorKit";

const ADMISSIONS_TABS: TabCardSpec[] = [
  { id: "banner", label: "Banner", icon: BannerIcon },
  { id: "courses", label: "Courses & Eligibility", icon: CoursesIcon },
  { id: "procedure", label: "Application Procedure", icon: ProcedureIcon },
  { id: "documents", label: "Important Documents", icon: DocumentsIcon },
];

// Dedicated Admissions editor. Real doc shape (confirmed via ndc-web-main's
// src/app/admissions/page.tsx + src/components/Admission/{Courses,Documents,
// Procedure}.tsx): { BannerSection: {title,image}, coursesEligibility: {
// title, tabsCourses: [{tabTitle, rowContent:[{course,eligibility,duration}]}]
// }, applicationProcedure: {image,title,procedures:[{title,description}]},
// ImportentDocuments: {title, tabs:[{title,note,content:string[]}]} } — the
// "ImportentDocuments" key spelling is exactly what the backend/public site
// use and must be preserved.

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

export function AdmissionsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [tabKey, setTabKey] = useState(ADMISSIONS_TABS[0].id);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdmissions()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const coursesEligibility = data?.coursesEligibility ?? {};
  const tabsCourses: any[] = coursesEligibility.tabsCourses ?? [];
  const applicationProcedure = data?.applicationProcedure ?? {};
  const procedures: any[] = applicationProcedure.procedures ?? [];
  const importantDocuments = data?.ImportentDocuments ?? {};
  const docTabs: any[] = importantDocuments.tabs ?? [];

  function updateBannerField(field: "title" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }

  function updateCoursesField(field: "title" | "tabsCourses", value: any) {
    setData((prev: any) => ({ ...prev, coursesEligibility: { ...(prev?.coursesEligibility ?? {}), [field]: value } }));
  }
  function updateTabTitle(tabIdx: number, value: string) {
    updateCoursesField(
      "tabsCourses",
      tabsCourses.map((t, i) => (i === tabIdx ? { ...t, tabTitle: value } : t))
    );
  }
  function addCourseTab() {
    updateCoursesField("tabsCourses", [...tabsCourses, { tabTitle: "New Programme", rowContent: [] }]);
  }
  function removeCourseTab(tabIdx: number) {
    updateCoursesField(
      "tabsCourses",
      tabsCourses.filter((_, i) => i !== tabIdx)
    );
  }
  function updateCourseRow(tabIdx: number, rowIdx: number, field: "course" | "eligibility" | "duration", value: string) {
    updateCoursesField(
      "tabsCourses",
      tabsCourses.map((t, i) => {
        if (i !== tabIdx) return t;
        const rows = (t.rowContent ?? []).map((r: any, ri: number) => (ri === rowIdx ? { ...r, [field]: value } : r));
        return { ...t, rowContent: rows };
      })
    );
  }
  function addCourseRow(tabIdx: number) {
    updateCoursesField(
      "tabsCourses",
      tabsCourses.map((t, i) => (i === tabIdx ? { ...t, rowContent: [...(t.rowContent ?? []), { course: "", eligibility: "", duration: "" }] } : t))
    );
  }
  function removeCourseRow(tabIdx: number, rowIdx: number) {
    updateCoursesField(
      "tabsCourses",
      tabsCourses.map((t, i) => (i === tabIdx ? { ...t, rowContent: (t.rowContent ?? []).filter((_: any, ri: number) => ri !== rowIdx) } : t))
    );
  }

  function updateProcedureField(field: "title" | "image", value: string) {
    setData((prev: any) => ({ ...prev, applicationProcedure: { ...(prev?.applicationProcedure ?? {}), [field]: value } }));
  }
  function updateProcedures(next: any[]) {
    setData((prev: any) => ({ ...prev, applicationProcedure: { ...(prev?.applicationProcedure ?? {}), procedures: next } }));
  }
  function updateProcedureRow(i: number, field: "title" | "description", value: string) {
    updateProcedures(procedures.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  }
  function addProcedureRow() {
    updateProcedures([...procedures, { title: "", description: "" }]);
  }
  function removeProcedureRow(i: number) {
    updateProcedures(procedures.filter((_, idx) => idx !== i));
  }

  function updateDocumentsField(field: "title" | "tabs", value: any) {
    setData((prev: any) => ({ ...prev, ImportentDocuments: { ...(prev?.ImportentDocuments ?? {}), [field]: value } }));
  }
  function updateDocTabField(tabIdx: number, field: "title" | "note", value: string) {
    updateDocumentsField(
      "tabs",
      docTabs.map((t, i) => (i === tabIdx ? { ...t, [field]: value } : t))
    );
  }
  function updateDocTabContent(tabIdx: number, content: string[]) {
    updateDocumentsField(
      "tabs",
      docTabs.map((t, i) => (i === tabIdx ? { ...t, content } : t))
    );
  }
  function addDocTab() {
    updateDocumentsField("tabs", [...docTabs, { title: "New Document Group", note: "", content: [] }]);
  }
  function removeDocTab(tabIdx: number) {
    updateDocumentsField(
      "tabs",
      docTabs.filter((_, i) => i !== tabIdx)
    );
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateAdmissions(data);
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
        icon={AdmissionsIcon}
        eyebrow="Admissions"
        title="Admissions Management"
        subtitle="Manage the public Admissions page."
        stats={[
          { value: tabsCourses.length, label: "Programme Tabs" },
          { value: procedures.length, label: "Procedure Steps" },
          { value: docTabs.length, label: "Document Groups" },
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <EditorLayout tabs={ADMISSIONS_TABS} activeTab={tabKey} onChange={setTabKey}>
          <Panel p={5}>
          {tabKey === "banner" && (
          <>
            <SectionHead icon={BannerIcon} title="Banner" subtitle="Shown at the top of the public Admissions page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={banner.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="white" />
              </Box>
              <ImageControl label="Banner Image" value={banner.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
            </Stack>
          </>
          )}

          {tabKey === "courses" && (
          <>
            <SectionHead icon={CoursesIcon} title="Courses & Eligibility" subtitle="Programme tabs shown on the public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={coursesEligibility.title ?? ""} onChange={(e) => updateCoursesField("title", e.target.value)} bg="white" />
              </Box>

              {tabsCourses.length === 0 && (
                <EmptyState title="No programme tabs yet" hint="Add a tab to start listing courses on the public page." />
              )}

              <Stack gap={4}>
                {tabsCourses.map((tab, tabIdx) => {
                  const rows = tab.rowContent ?? [];
                  return (
                    <SubtleCard key={tabIdx}>
                      <CardHeader justify="space-between">
                        <Input
                          value={tab.tabTitle ?? ""}
                          onChange={(e) => updateTabTitle(tabIdx, e.target.value)}
                          bg="white"
                          fontWeight={700}
                          flex="1"
                          maxW="360px"
                        />
                        <Badge colorPalette="gray" flexShrink={0}>
                          {rows.length} {rows.length === 1 ? "course" : "courses"}
                        </Badge>
                        <IconBtn
                          aria-label="Delete tab"
                          tone="danger"
                          confirmMessage="Delete this programme tab and all its rows?"
                          onClick={() => removeCourseTab(tabIdx)}
                        />
                      </CardHeader>
                      <Box p={4}>
                        <Stack gap={2}>
                          {rows.length > 0 && (
                            <Stack direction="row" gap={2} display={{ base: "none", md: "flex" }} px={1}>
                              <Text flex="1" minW="180px" fontSize="xs" fontWeight={600} color="gray.500">
                                Course / Duration
                              </Text>
                              <Text flex="2" minW="220px" fontSize="xs" fontWeight={600} color="gray.500">
                                Eligibility Criteria
                              </Text>
                            </Stack>
                          )}
                          {rows.map((row: any, rowIdx: number) => (
                            <RowCard key={rowIdx} align="flex-start" wrap="wrap" mb={0}>
                              <Stack flex="1" minW="180px" gap={2}>
                                <Input
                                  value={row.course ?? ""}
                                  onChange={(e) => updateCourseRow(tabIdx, rowIdx, "course", e.target.value)}
                                  placeholder="Course"
                                  size="sm"
                                  bg="white"
                                />
                                <Input
                                  value={row.duration ?? ""}
                                  onChange={(e) => updateCourseRow(tabIdx, rowIdx, "duration", e.target.value)}
                                  placeholder="Duration"
                                  size="sm"
                                  bg="white"
                                />
                              </Stack>
                              <Textarea
                                value={row.eligibility ?? ""}
                                onChange={(e) => updateCourseRow(tabIdx, rowIdx, "eligibility", e.target.value)}
                                placeholder="Eligibility criteria"
                                rows={2}
                                size="sm"
                                bg="white"
                                flex="2"
                                minW="220px"
                              />
                              <IconBtn aria-label="Remove course" tone="danger" onClick={() => removeCourseRow(tabIdx, rowIdx)} />
                            </RowCard>
                          ))}
                          <AddButton dashed size="sm" onClick={() => addCourseRow(tabIdx)}>
                            Add Course
                          </AddButton>
                        </Stack>
                      </Box>
                    </SubtleCard>
                  );
                })}
                <AddButton dashed size="sm" onClick={addCourseTab}>
                  Add Programme Tab
                </AddButton>
              </Stack>
            </Stack>
          </>
          )}

          {tabKey === "procedure" && (
          <>
            <SectionHead icon={ProcedureIcon} title="Application Procedure" subtitle="The step cards on the public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={applicationProcedure.title ?? ""} onChange={(e) => updateProcedureField("title", e.target.value)} bg="white" />
              </Box>
              <ImageControl label="Image" value={applicationProcedure.image ?? ""} onChange={(url) => updateProcedureField("image", url)} />

              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Steps
                </Text>
                {procedures.length === 0 && (
                  <EmptyState title="No steps yet" hint="Add a step to build out the application procedure." />
                )}
                <Stack gap={2}>
                  {procedures.map((p, i) => (
                    <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                      <Badge colorPalette="gray" flexShrink={0} mt={1}>
                        Step {i + 1}
                      </Badge>
                      <Stack flex="1" minW="220px" gap={2}>
                        <Input
                          value={p.title ?? ""}
                          onChange={(e) => updateProcedureRow(i, "title", e.target.value)}
                          placeholder="Step title"
                          size="sm"
                          bg="white"
                        />
                        <Textarea
                          value={p.description ?? ""}
                          onChange={(e) => updateProcedureRow(i, "description", e.target.value)}
                          placeholder="Step description"
                          rows={2}
                          size="sm"
                          bg="white"
                        />
                      </Stack>
                      <IconBtn aria-label="Remove step" tone="danger" onClick={() => removeProcedureRow(i)} />
                    </RowCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addProcedureRow}>
                    Add Step
                  </AddButton>
                </Stack>
              </Box>
            </Stack>
          </>
          )}

          {tabKey === "documents" && (
          <>
            <SectionHead icon={DocumentsIcon} title="Important Documents" subtitle="Document checklist tabs on the public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input value={importantDocuments.title ?? ""} onChange={(e) => updateDocumentsField("title", e.target.value)} bg="white" />
              </Box>

              {docTabs.length === 0 && (
                <EmptyState title="No document groups yet" hint="Add a group to start the checklist shown on the public page." />
              )}

              <Stack gap={4}>
                {docTabs.map((tab, tabIdx) => (
                  <SubtleCard key={tabIdx}>
                    <CardHeader justify="space-between">
                      <Input
                        value={tab.title ?? ""}
                        onChange={(e) => updateDocTabField(tabIdx, "title", e.target.value)}
                        bg="white"
                        fontWeight={700}
                        flex="1"
                        maxW="360px"
                      />
                      <Badge colorPalette="gray" flexShrink={0}>
                        {(tab.content ?? []).length} {(tab.content ?? []).length === 1 ? "item" : "items"}
                      </Badge>
                      <IconBtn
                        aria-label="Delete document tab"
                        tone="danger"
                        confirmMessage="Delete this document group and all its checklist items?"
                        onClick={() => removeDocTab(tabIdx)}
                      />
                    </CardHeader>
                    <Box p={4}>
                      <Stack gap={4}>
                        <Box>
                          <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                            Note
                          </Text>
                          <Textarea
                            value={tab.note ?? ""}
                            onChange={(e) => updateDocTabField(tabIdx, "note", e.target.value)}
                            rows={2}
                            bg="white"
                          />
                        </Box>
                        <Box>
                          <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                            Checklist Items
                          </Text>
                          <StringListEditor
                            items={tab.content ?? []}
                            onChange={(content) => updateDocTabContent(tabIdx, content)}
                            addLabel="Add item"
                            placeholder="Document item"
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </SubtleCard>
                ))}
                <AddButton dashed size="sm" onClick={addDocTab}>
                  Add Document Group
                </AddButton>
              </Stack>
            </Stack>
          </>
          )}
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Admissions page once saved."
          />
        </EditorLayout>
      )}
    </Stack>
  );
}

import { useEffect, useState } from "react";
import { Accordion, Box, Flex, IconButton, Input, NativeSelect, Portal, Spinner, Stack, Text, Dialog } from "@chakra-ui/react";
import {
  MdQuiz as QuestionBankIcon,
  MdSchool as DeptIcon,
  MdCalendarMonth as YearIcon,
  MdLayers as SemesterIcon,
  MdArticle as SubjectIcon,
  MdEdit as EditIcon,
  MdExpandMore as ExpandMoreIcon,
  MdClose,
} from "react-icons/md";
import { getQuestionBank, updateQuestionBank } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import { FileControl } from "../components/FileControl";
import {
  AddButton,
  Callout,
  EditorHeader,
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
} from "../components/editorKit";

// Dedicated Question Bank editor. Real doc shape (confirmed via ndc-backend
// seed data + ndc-web-main's QuestionBankTabs/FindQuestionBank components):
// a strict 3-level nested object, keyed entirely by free-form department/year
// names — { [department]: { [year]: { [`semester${n}`]: [{subjectName,
// subjectPdf}] } } }. No wrapper keys, no schema. The old GenericSingletonPage
// (AutoForm over raw JSON) rendered this as a wall of identical nested
// accordions with labels like "Semester1" — unreadable at this depth. This
// editor gives each level its own purpose-built UI: a department switcher,
// year cards, collapsible semesters, and subject rows with inline PDF upload.

type Subject = { subjectName?: string; subjectPdf?: string };
type SemesterMap = Record<string, Subject[]>;
type YearMap = Record<string, SemesterMap>;
type DeptMap = Record<string, YearMap>;

function countYearPapers(semesters: SemesterMap): number {
  return Object.values(semesters ?? {}).reduce((sum: number, subs) => sum + (Array.isArray(subs) ? subs.length : 0), 0);
}
function countDeptPapers(years: YearMap): number {
  return Object.values(years ?? {}).reduce((sum: number, semesters) => sum + countYearPapers(semesters), 0);
}

const MAX_SEMESTER = 12;

function semesterNumber(key: string): number {
  return parseInt(key.replace(/[^0-9]/g, ""), 10) || 0;
}
function semesterLabel(key: string): string {
  const n = semesterNumber(key);
  return n ? `Semester ${n}` : key;
}
function sortedSemesterKeys(semesters: SemesterMap): string[] {
  return Object.keys(semesters).sort((a, b) => semesterNumber(a) - semesterNumber(b));
}
function missingSemesterNumbers(semesters: SemesterMap): number[] {
  const used = new Set(Object.keys(semesters).map(semesterNumber));
  const missing: number[] = [];
  for (let n = 1; n <= MAX_SEMESTER; n++) if (!used.has(n)) missing.push(n);
  return missing;
}
// Small shared modal for naming/renaming a department or year — both are
// free-form object keys, so renaming means delete-old-key/insert-new-key,
// which (unlike a bound "title" field) can't be done as the user types
// without remounting the input on every keystroke. A confirm-to-apply modal
// sidesteps that.
function NamePromptDialog({
  open,
  onOpenChange,
  title,
  label,
  initialValue = "",
  placeholder,
  confirmLabel = "Save",
  invalidMessage,
  isInvalid,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  label: string;
  initialValue?: string;
  placeholder?: string;
  confirmLabel?: string;
  invalidMessage?: string;
  isInvalid: (value: string) => boolean;
  onConfirm: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (open) setValue(initialValue);
  }, [open, initialValue]);
  const trimmed = value.trim();
  const invalid = !trimmed || isInvalid(trimmed);
  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={2}>
                <Text fontSize="xs" fontWeight={600} color="gray.500">
                  {label}
                </Text>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  bg="white"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !invalid) onConfirm(trimmed);
                  }}
                />
                {invalid && value && invalidMessage && (
                  <Text fontSize="xs" color="red.500">
                    {invalidMessage}
                  </Text>
                )}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <GhostButton onClick={() => onOpenChange(false)}>Cancel</GhostButton>
              <PrimaryButton onClick={() => onConfirm(trimmed)} disabled={invalid}>
                {confirmLabel}
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
  );
}

export function QuestionBankPage() {
  const [data, setData] = useState<DeptMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [deptModal, setDeptModal] = useState<null | { mode: "add" } | { mode: "rename"; oldName: string }>(null);
  const [yearModal, setYearModal] = useState<null | { mode: "add" } | { mode: "rename"; oldName: string }>(null);
  const [addSemesterFor, setAddSemesterFor] = useState<Record<string, number | "">>({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    getQuestionBank()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data || activeDept !== null) return;
    const keys = Object.keys(data);
    if (keys.length) setActiveDept(keys[0]);
  }, [data, activeDept]);

  const departments = data ?? {};
  const deptNames = Object.keys(departments);
  const totalPapers = deptNames.reduce((sum, d) => sum + countDeptPapers(departments[d]), 0);
  const activeYears: YearMap = (activeDept && departments[activeDept]) || {};
  const yearNames = Object.keys(activeYears);

  function updateDepartments(next: DeptMap) {
    setData(next);
  }

  function addDepartment(name: string) {
    if (departments[name]) return;
    updateDepartments({ ...departments, [name]: {} });
    setActiveDept(name);
    setDeptModal(null);
  }
  function renameDepartment(oldName: string, newName: string) {
    if (newName === oldName || departments[newName]) return;
    const next: DeptMap = {};
    for (const key of Object.keys(departments)) next[key === oldName ? newName : key] = departments[key];
    updateDepartments(next);
    if (activeDept === oldName) setActiveDept(newName);
    setDeptModal(null);
  }
  function deleteDepartment(name: string) {
    const next = { ...departments };
    delete next[name];
    updateDepartments(next);
    if (activeDept === name) {
      const remaining = Object.keys(next);
      setActiveDept(remaining[0] ?? null);
    }
  }

  function updateYears(deptName: string, years: YearMap) {
    updateDepartments({ ...departments, [deptName]: years });
  }
  function addYear(deptName: string, yearName: string) {
    const years = departments[deptName] ?? {};
    if (years[yearName]) return;
    updateYears(deptName, { ...years, [yearName]: {} });
    setYearModal(null);
  }
  function renameYear(deptName: string, oldName: string, newName: string) {
    const years = departments[deptName] ?? {};
    if (newName === oldName || years[newName]) return;
    const next: YearMap = {};
    for (const key of Object.keys(years)) next[key === oldName ? newName : key] = years[key];
    updateYears(deptName, next);
    setYearModal(null);
  }
  function deleteYear(deptName: string, yearName: string) {
    const years = { ...(departments[deptName] ?? {}) };
    delete years[yearName];
    updateYears(deptName, years);
  }

  function updateSemesters(deptName: string, yearName: string, semesters: SemesterMap) {
    const years = departments[deptName] ?? {};
    updateYears(deptName, { ...years, [yearName]: semesters });
  }
  function addSemester(deptName: string, yearName: string, n: number) {
    const semesters = departments[deptName]?.[yearName] ?? {};
    const key = `semester${n}`;
    if (semesters[key]) return;
    updateSemesters(deptName, yearName, { ...semesters, [key]: [] });
    setAddSemesterFor((prev) => ({ ...prev, [`${deptName}::${yearName}`]: "" }));
  }
  function deleteSemester(deptName: string, yearName: string, semKey: string) {
    const semesters = { ...(departments[deptName]?.[yearName] ?? {}) };
    delete semesters[semKey];
    updateSemesters(deptName, yearName, semesters);
  }

  function updateSubjects(deptName: string, yearName: string, semKey: string, subjects: Subject[]) {
    const semesters = departments[deptName]?.[yearName] ?? {};
    updateSemesters(deptName, yearName, { ...semesters, [semKey]: subjects });
  }
  function addSubject(deptName: string, yearName: string, semKey: string) {
    const subjects = departments[deptName]?.[yearName]?.[semKey] ?? [];
    updateSubjects(deptName, yearName, semKey, [...subjects, { subjectName: "", subjectPdf: "" }]);
  }
  function updateSubjectField(deptName: string, yearName: string, semKey: string, idx: number, field: keyof Subject, value: string) {
    const subjects = departments[deptName]?.[yearName]?.[semKey] ?? [];
    updateSubjects(
      deptName,
      yearName,
      semKey,
      subjects.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  }
  function removeSubject(deptName: string, yearName: string, semKey: string, idx: number) {
    const subjects = departments[deptName]?.[yearName]?.[semKey] ?? [];
    updateSubjects(
      deptName,
      yearName,
      semKey,
      subjects.filter((_, i) => i !== idx)
    );
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateQuestionBank(data);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute("/question-bank");
      if (publicPath) triggerRevalidate(publicPath);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  const yearKeyFor = (yearName: string) => `${activeDept}::${yearName}`;

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={QuestionBankIcon}
        eyebrow="Question Bank"
        title="Question Bank Management"
        subtitle="Manage previous-year question papers by department, year, and semester."
        stats={[
          { value: deptNames.length, label: "Departments" },
          { value: totalPapers, label: "Papers" },
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
            <SectionHead
              icon={DeptIcon}
              title="Departments"
              subtitle="Select a department to manage its question papers."
              right={
                <PrimaryButton icon={DeptIcon} size="sm" onClick={() => setDeptModal({ mode: "add" })}>
                  Add Department
                </PrimaryButton>
              }
            />

            {deptNames.length === 0 ? (
              <EmptyState icon={DeptIcon} title="No departments yet" hint="Add a department to start building its question bank." />
            ) : (
              <Stack gap={2}>
                {deptNames.map((name) => {
                  const isActive = name === activeDept;
                  return (
                    <Flex
                      key={name}
                      align="center"
                      gap={3}
                      p={3}
                      bg={isActive ? "orange.50" : "white"}
                      border="1px solid"
                      borderColor={isActive ? "brand.orange" : "gray.100"}
                      borderRadius="lg"
                      wrap="wrap"
                      _hover={{ borderColor: isActive ? "brand.orange" : "gray.200" }}
                    >
                      {/* Selecting the row lives on this inner Flex only, so the
                          Rename/Delete buttons below (siblings, not descendants)
                          never also trigger a select on the same click. */}
                      <Flex align="center" gap={3} flex="1" minW="160px" cursor="pointer" onClick={() => setActiveDept(name)}>
                        <IconChip icon={DeptIcon} size={16} box={36} onDark={false} />
                        <Box>
                          <Text fontWeight={700} fontSize="sm" color="brand.navy">
                            {name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {Object.keys(departments[name] ?? {}).length} years · {countDeptPapers(departments[name] ?? {})} papers
                          </Text>
                        </Box>
                      </Flex>
                      <GhostButton icon={EditIcon} size="xs" onClick={() => setDeptModal({ mode: "rename", oldName: name })}>
                        Rename
                      </GhostButton>
                      <IconBtn
                        aria-label="Delete department"
                        tone="danger"
                        size="xs"
                        confirmMessage={`Delete department "${name}" and all its years, semesters, and papers?`}
                        onClick={() => deleteDepartment(name)}
                      />
                    </Flex>
                  );
                })}
              </Stack>
            )}
          </Panel>

          {activeDept && (
            <Panel p={6}>
              <SectionHead
                icon={YearIcon}
                title={activeDept}
                subtitle="Years and semesters for this department."
                right={
                  <PrimaryButton icon={YearIcon} size="sm" onClick={() => setYearModal({ mode: "add" })}>
                    Add Year
                  </PrimaryButton>
                }
              />

              {yearNames.length === 0 ? (
                <EmptyState icon={YearIcon} title="No years yet" hint="Add a year to start adding semesters and papers." />
              ) : (
                <Stack gap={4}>
                  {yearNames
                    .slice()
                    .sort((a, b) => b.localeCompare(a))
                    .map((yearName) => {
                      const semesters = activeYears[yearName] ?? {};
                      const semKeys = sortedSemesterKeys(semesters);
                      const missing = missingSemesterNumbers(semesters);
                      const pendingKey = yearKeyFor(yearName);
                      const pending = addSemesterFor[pendingKey] ?? "";
                      return (
                        <SubtleCard key={yearName}>
                          <CardHeader justify="space-between">
                            <Flex align="center" gap={3} flex="1">
                              <IconChip icon={YearIcon} size={16} box={32} onDark={false} />
                              <Box>
                                <Text fontWeight={700} color="brand.navy">
                                  {yearName}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {semKeys.length} semesters · {countYearPapers(semesters)} papers
                                </Text>
                              </Box>
                            </Flex>
                            <GhostButton icon={EditIcon} size="xs" onClick={() => setYearModal({ mode: "rename", oldName: yearName })}>
                              Rename
                            </GhostButton>
                            <IconBtn
                              aria-label="Delete year"
                              tone="danger"
                              confirmMessage={`Delete year "${yearName}" and all its semesters and papers?`}
                              onClick={() => deleteYear(activeDept, yearName)}
                            />
                          </CardHeader>

                          <Box p={4}>
                            {semKeys.length === 0 ? (
                              <EmptyState icon={SemesterIcon} title="No semesters yet" />
                            ) : (
                              <Accordion.Root collapsible multiple variant="outline" mb={4}>
                                <Stack gap={3}>
                                  {semKeys.map((semKey) => {
                                    const subjects = semesters[semKey] ?? [];
                                    return (
                                      <Box key={semKey} position="relative">
                                        <Accordion.Item value={semKey} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg">
                                          <Accordion.ItemTrigger px={4} py={3} pr={12}>
                                            <Flex align="center" gap={3} flex="1">
                                              <IconChip icon={SemesterIcon} size={15} box={30} onDark={false} />
                                              <Text fontWeight={600} textAlign="left">
                                                {semesterLabel(semKey)}
                                              </Text>
                                              <Text fontSize="xs" color="gray.500">
                                                {subjects.length} {subjects.length === 1 ? "paper" : "papers"}
                                              </Text>
                                            </Flex>
                                            <Accordion.ItemIndicator>
                                              <ExpandMoreIcon size={16} />
                                            </Accordion.ItemIndicator>
                                          </Accordion.ItemTrigger>
                                          <Accordion.ItemContent>
                                            <Accordion.ItemBody px={4} pt={2} pb={4}>
                                              <Stack gap={2}>
                                                {subjects.length === 0 && (
                                                  <EmptyState icon={SubjectIcon} title="No subjects yet" hint="Add a subject and attach its question paper." />
                                                )}
                                                {subjects.map((subject, idx) => (
                                                  <RowCard key={idx} align="flex-start" wrap="wrap" mb={0}>
                                                    <Stack flex="1" minW="220px" gap={2}>
                                                      <Input
                                                        value={subject.subjectName ?? ""}
                                                        onChange={(e) =>
                                                          updateSubjectField(activeDept, yearName, semKey, idx, "subjectName", e.target.value)
                                                        }
                                                        placeholder="Subject name"
                                                        size="sm"
                                                        bg="white"
                                                        fontWeight={600}
                                                      />
                                                      <FileControl
                                                        value={subject.subjectPdf ?? ""}
                                                        onChange={(url) => updateSubjectField(activeDept, yearName, semKey, idx, "subjectPdf", url)}
                                                      />
                                                    </Stack>
                                                    <IconBtn
                                                      aria-label="Remove subject"
                                                      tone="danger"
                                                      onClick={() => removeSubject(activeDept, yearName, semKey, idx)}
                                                    />
                                                  </RowCard>
                                                ))}
                                                <AddButton dashed size="xs" onClick={() => addSubject(activeDept, yearName, semKey)}>
                                                  Add Subject
                                                </AddButton>
                                              </Stack>
                                            </Accordion.ItemBody>
                                          </Accordion.ItemContent>
                                        </Accordion.Item>
                                        <IconBtn
                                          aria-label="Delete semester"
                                          tone="danger"
                                          size="xs"
                                          position="absolute"
                                          top="10px"
                                          right="40px"
                                          zIndex={1}
                                          confirmMessage={`Delete ${semesterLabel(semKey)} and all its papers?`}
                                          onClick={() => deleteSemester(activeDept, yearName, semKey)}
                                        />
                                      </Box>
                                    );
                                  })}
                                </Stack>
                              </Accordion.Root>
                            )}

                            {missing.length > 0 && (
                              <Flex align="center" gap={2} wrap="wrap">
                                <NativeSelect.Root maxW="180px" size="sm">
                                  <NativeSelect.Field
                                    value={pending}
                                    onChange={(e) =>
                                      setAddSemesterFor((prev) => ({ ...prev, [pendingKey]: e.target.value ? Number(e.target.value) : "" }))
                                    }
                                  >
                                    <option value="">Add semester...</option>
                                    {missing.map((n) => (
                                      <option key={n} value={n}>
                                        Semester {n}
                                      </option>
                                    ))}
                                  </NativeSelect.Field>
                                  <NativeSelect.Indicator />
                                </NativeSelect.Root>
                                <AddButton
                                  dashed
                                  size="xs"
                                  onClick={() => typeof pending === "number" && addSemester(activeDept, yearName, pending)}
                                  disabled={pending === ""}
                                >
                                  Add
                                </AddButton>
                              </Flex>
                            )}
                          </Box>
                        </SubtleCard>
                      );
                    })}
                </Stack>
              )}
            </Panel>
          )}

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Question Bank page once saved."
          />
        </>
      )}

      <NamePromptDialog
        open={deptModal !== null}
        onOpenChange={(open) => !open && setDeptModal(null)}
        title={deptModal?.mode === "rename" ? "Rename Department" : "Add Department"}
        label="Department Name"
        placeholder="e.g., B.Com, BCA, MBA..."
        initialValue={deptModal?.mode === "rename" ? deptModal.oldName : ""}
        confirmLabel={deptModal?.mode === "rename" ? "Rename" : "Add"}
        invalidMessage="A department with this name already exists."
        isInvalid={(value) => {
          if (deptModal?.mode === "rename" && value === deptModal.oldName) return false;
          return !!departments[value];
        }}
        onConfirm={(value) => {
          if (deptModal?.mode === "rename") renameDepartment(deptModal.oldName, value);
          else addDepartment(value);
        }}
      />

      <NamePromptDialog
        open={yearModal !== null && activeDept !== null}
        onOpenChange={(open) => !open && setYearModal(null)}
        title={yearModal?.mode === "rename" ? "Rename Year" : "Add Year"}
        label="Year"
        placeholder="e.g., 2023, 2024..."
        initialValue={yearModal?.mode === "rename" ? yearModal.oldName : ""}
        confirmLabel={yearModal?.mode === "rename" ? "Rename" : "Add"}
        invalidMessage="This year already exists for this department."
        isInvalid={(value) => {
          if (yearModal?.mode === "rename" && value === yearModal.oldName) return false;
          return !!activeYears[value];
        }}
        onConfirm={(value) => {
          if (!activeDept) return;
          if (yearModal?.mode === "rename") renameYear(activeDept, yearModal.oldName, value);
          else addYear(activeDept, value);
        }}
      />
    </Stack>
  );
}

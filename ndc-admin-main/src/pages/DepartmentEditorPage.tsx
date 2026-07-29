import { useEffect, useState, type ComponentType } from "react";
import { Flex, NativeSelect, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  MdApartment as DeptIcon,
  MdFlag as VisionMissionIcon,
  MdRecordVoiceOver as HodIcon,
  MdTrackChanges as ObjectivesIcon,
  MdDescription as ProgrammeDetailsIcon,
  MdInfo as AboutIcon,
  MdEventNote as ActivitiesIcon,
  MdHowToReg as AdmissionIcon,
  MdMenuBook as BooksIcon,
  MdSchedule as DurationIcon,
  MdScience as ResearchIcon,
  MdListAlt as SyllabusIcon,
  MdGroups as FacultyIcon,
  MdSchool as ProgrammeIcon,
} from "react-icons/md";
import { DEPARTMENT_TABS, PROGRAMME_CODES } from "../config/adminPages";
import { getDepartmentTab, updateDepartmentTab } from "../services/data.service";
import { StructuredEditorBody } from "../components/StructuredEditorBody";
import { Callout, EditorHeader, EditorLayout, IconChip, Panel, SectionHead, SaveBar, type TabCardSpec } from "../components/editorKit";

// Studio-style redesign of the Department Details editor — same "many tabs,
// pick-a-record-then-edit" pattern NCET's admin uses for this exact feature
// (departments-page/DepartmentDetailsEditor.js: a record selector card + a
// TabCardGrid-equivalent grid of section tabs), rebuilt in Chakra v3 with
// this app's tokens. Unlike NCET, NDC has no separate "Department" listing
// collection — programmes are the fixed PROGRAMME_CODES enum, not a CRUD
// resource — so there's no equivalent of NCET's third "Departments List"
// page to port here.
//
// One page = the 12 department sub-type collections, all keyed internally by
// programme code. Select a programme, then a tab; each tab edits that one
// programme's slice of the corresponding sub-type document. Every programme
// has a genuinely different shape per tab, so the tab body stays on the
// generic StructuredEditorBody/AutoForm rather than bespoke fields (same
// reasoning as the Activity Cells detail page).
// No revalidate call here: the public Department cluster is a client
// component that fetches live on every mount (Tier 1, not server-rendered
// with ISR), so there's no server cache to bust.

const TAB_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  visionMission: VisionMissionIcon,
  hodMessage: HodIcon,
  objectives: ObjectivesIcon,
  programmeDetails: ProgrammeDetailsIcon,
  about: AboutIcon,
  activities: ActivitiesIcon,
  admissionProcess: AdmissionIcon,
  booksPatents: BooksIcon,
  courseDuration: DurationIcon,
  research: ResearchIcon,
  syllabus: SyllabusIcon,
  faculty: FacultyIcon,
};

const TAB_CARDS: TabCardSpec[] = DEPARTMENT_TABS.map((t) => ({ id: t.key, label: t.label, icon: TAB_ICONS[t.key] ?? DeptIcon }));

export function DepartmentEditorPage() {
  const [programme, setProgramme] = useState(PROGRAMME_CODES[0]);
  const [tabKey, setTabKey] = useState(DEPARTMENT_TABS[0].key);
  const activeTab = DEPARTMENT_TABS.find((t) => t.key === tabKey) || DEPARTMENT_TABS[0];

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [fullDoc, setFullDoc] = useState<Record<string, any>>({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSavedAt(null);
    getDepartmentTab(activeTab.route)
      .then((res) => {
        const doc = res?.data || {};
        setFullDoc(doc);
        setData(doc[programme] ?? {});
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeTab.route, programme]);

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      const merged = { ...fullDoc, [programme]: data };
      await updateDepartmentTab(activeTab.route, merged);
      setFullDoc(merged);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  const programmeSelector = (
    <Panel p={3} mt={3}>
      <Text fontSize="10px" fontWeight={700} color="gray.400" mb={2} textTransform="uppercase" letterSpacing="0.06em">
        Programme
      </Text>
      <NativeSelect.Root size="sm">
        <NativeSelect.Field value={programme} onChange={(e) => setProgramme(e.target.value)}>
          {PROGRAMME_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Flex align="center" gap={2} mt={3}>
        <IconChip icon={ProgrammeIcon} size={14} box={30} onDark={false} />
        <Text fontWeight={800} color="brand.navy" fontSize="xs" truncate>
          {programme}
        </Text>
      </Flex>
    </Panel>
  );

  return (
    <Stack gap={4}>
      <EditorHeader
        icon={DeptIcon}
        eyebrow="Departments"
        title="Department Details Studio"
        subtitle="Edit every section of each programme's detail page — vision & mission, HOD message, faculty, syllabus, and more."
        stats={[
          { value: PROGRAMME_CODES.length, label: "Programmes" },
          { value: DEPARTMENT_TABS.length, label: "Sections" },
        ]}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      <EditorLayout tabs={TAB_CARDS} activeTab={tabKey} onChange={setTabKey} sidebarExtra={programmeSelector}>
        {loading ? (
          <Spinner size="md" />
        ) : (
          <>
            <Panel p={5}>
              <SectionHead icon={TAB_ICONS[activeTab.key] ?? DeptIcon} title={activeTab.label} subtitle={`${programme} — this section only`} />
              <StructuredEditorBody data={data} onChange={setData} />
            </Panel>
            <SaveBar
              saving={saving}
              onSave={handleSave}
              label={saving ? "Saving..." : "Save"}
              summary="Changes apply to this programme's tab only."
            />
          </>
        )}
      </EditorLayout>
    </Stack>
  );
}

import { useEffect, useState } from "react";
import { Box, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdHome as HomeIcon,
  MdImage as BannerIcon,
  MdBarChart as StatsIcon,
  MdInfo as AboutIcon,
  MdCelebration as AnniversaryIcon,
  MdSchool as CoursesIcon,
  MdOndemandVideo as CampusLifeIcon,
  MdMenuBook as EducationIcon,
  MdNotifications as NotificationsIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { FileControl } from "../components/FileControl";
import { MapLocationControl } from "../components/MapLocationControl";
import { YoutubeControl } from "../components/YoutubeControl";
import { getHome, updateHome } from "../services/data.service";
import {
  AddButton,
  CardHeader,
  Callout,
  EditorHeader,
  EditorLayout,
  IconBtn,
  Panel,
  RowCard,
  SaveBar,
  SectionHead,
  SubtleCard,
  type TabCardSpec,
} from "../components/editorKit";

// Home is a single Mongo document (one getHome/updateHome round trip), not
// N collections x N programmes like Departments, so there's no record
// picker here — just EditorLayout's sidebar used purely as a section switcher
// so the page isn't one long scroll. All sections share one Panel; only the
// active tab's block renders inside it (same "one content surface, swap what's
// inside" shape as DepartmentsOverviewPage), so switching tabs doesn't remount
// the whole card chrome.
const HOME_TABS: TabCardSpec[] = [
  { id: "banner", label: "Hero Banner", icon: BannerIcon },
  { id: "stats", label: "Stats Strip", icon: StatsIcon },
  { id: "about", label: "About NDC", icon: AboutIcon },
  { id: "yrs25", label: "25 Years", icon: AnniversaryIcon },
  { id: "certCourses", label: "Certificate Courses", icon: CoursesIcon },
  { id: "campusLife", label: "Campus Life", icon: CampusLifeIcon },
  { id: "eduExcellence", label: "Education & Excellence", icon: EducationIcon },
  { id: "notifications", label: "Notifications", icon: NotificationsIcon },
];

// Dedicated Home page editor. Real doc shape (confirmed via GET /home +
// ndc-web-main's src/app/_landing/page.tsx destructure + each section
// component under src/components/HomePage/): { bannerSection: {location,
// slides:[{image,title,description}]}, Records: [{title,count,
// backgroundImage,icon}] (top-level array, not nested under a key),
// AboutNdcSection: {title,subTitle,description:string[],buttonText,image,
// link}, Yrs25Section: {title,description,image}, ExploreCertificateCourses:
// {image,title,link}, CampusLife: {title,videos:string[] (bare YouTube IDs,
// not full URLs)}, EducationExcellence: {title,subTitle,description,
// buttons:[{title,url}],image}, NotificationsData: {title,
// NotificationTabs:[{tabName,Data:[{title,pdf}]}]} }.
//
// A few fields exist in the data but are never rendered by the current
// public site (confirmed by reading each component's actual destructure):
// Records[].backgroundImage/icon, AboutNdcSection.subTitle,
// Yrs25Section.image, ExploreCertificateCourses.title, CampusLife.title,
// NotificationsData.title. They're intentionally left out of this editor's
// UI (no visible control) but every update function below spreads the
// existing object before patching a single field, so those dead values are
// never dropped on Save even without a field for them.

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

// Same list shape as StringListEditor, but each row is a YoutubeControl
// (thumbnail preview + "change" dialog) instead of a bare text input — same
// control AutoForm already applies to any field it detects is a YouTube ID.
function YoutubeListEditor({ items, onChange, addLabel = "Add video" }: { items: string[]; onChange: (items: string[]) => void; addLabel?: string }) {
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
        <RowCard key={i} align="center" mb={0}>
          <Box flex="1">
            <YoutubeControl value={item} onChange={(v) => updateItem(i, v)} />
          </Box>
          <IconBtn aria-label="Remove video" tone="danger" confirm={false} onClick={() => removeItem(i)} />
        </RowCard>
      ))}
      <AddButton dashed size="sm" onClick={addItem}>
        {addLabel}
      </AddButton>
    </Stack>
  );
}

export function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [tabKey, setTabKey] = useState(HOME_TABS[0].id);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getHome()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.bannerSection ?? {};
  const slides: any[] = banner.slides ?? [];
  const records: any[] = data?.Records ?? [];
  const about = data?.AboutNdcSection ?? {};
  const aboutDescription: string[] = about.description ?? [];
  const yrs25 = data?.Yrs25Section ?? {};
  const certCourses = data?.ExploreCertificateCourses ?? {};
  const campusLife = data?.CampusLife ?? {};
  const campusVideos: string[] = campusLife.videos ?? [];
  const eduExcellence = data?.EducationExcellence ?? {};
  const eduButtons: any[] = eduExcellence.buttons ?? [];
  const notifications = data?.NotificationsData ?? {};
  const notifTabs: any[] = notifications.NotificationTabs ?? [];
  const totalNotifications = notifTabs.reduce((sum, t) => sum + (t.Data?.length ?? 0), 0);

  // Banner / hero slides
  function updateBannerField(field: "location" | "slides", value: any) {
    setData((prev: any) => ({ ...prev, bannerSection: { ...(prev?.bannerSection ?? {}), [field]: value } }));
  }
  function updateSlideField(i: number, field: "image" | "title" | "description", value: string) {
    updateBannerField(
      "slides",
      slides.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  }
  function addSlide() {
    updateBannerField("slides", [...slides, { image: "", title: "", description: "" }]);
  }
  function removeSlide(i: number) {
    updateBannerField(
      "slides",
      slides.filter((_, idx) => idx !== i)
    );
  }

  // Stats / records
  function updateRecords(next: any[]) {
    setData((prev: any) => ({ ...prev, Records: next }));
  }
  function updateRecordField(i: number, field: "title" | "count", value: string) {
    updateRecords(records.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));
  }
  function addRecord() {
    updateRecords([...records, { title: "", count: "", backgroundImage: "", icon: "" }]);
  }
  function removeRecord(i: number) {
    updateRecords(records.filter((_, idx) => idx !== i));
  }

  // About NDC
  function updateAboutField(field: "title" | "description" | "buttonText" | "image" | "link", value: any) {
    setData((prev: any) => ({ ...prev, AboutNdcSection: { ...(prev?.AboutNdcSection ?? {}), [field]: value } }));
  }

  // 25 Years
  function updateYrs25Field(field: "title" | "description", value: string) {
    setData((prev: any) => ({ ...prev, Yrs25Section: { ...(prev?.Yrs25Section ?? {}), [field]: value } }));
  }

  // Certificate courses
  function updateCertCoursesField(field: "image" | "link", value: string) {
    setData((prev: any) => ({ ...prev, ExploreCertificateCourses: { ...(prev?.ExploreCertificateCourses ?? {}), [field]: value } }));
  }

  // Campus life
  function updateCampusVideos(next: string[]) {
    setData((prev: any) => ({ ...prev, CampusLife: { ...(prev?.CampusLife ?? {}), videos: next } }));
  }

  // Education excellence
  function updateEduField(field: "title" | "subTitle" | "description" | "image" | "buttons", value: any) {
    setData((prev: any) => ({ ...prev, EducationExcellence: { ...(prev?.EducationExcellence ?? {}), [field]: value } }));
  }
  function updateEduButtonField(i: number, field: "title" | "url", value: string) {
    updateEduField(
      "buttons",
      eduButtons.map((b, idx) => (idx === i ? { ...b, [field]: value } : b))
    );
  }
  function addEduButton() {
    updateEduField("buttons", [...eduButtons, { title: "", url: "" }]);
  }
  function removeEduButton(i: number) {
    updateEduField(
      "buttons",
      eduButtons.filter((_, idx) => idx !== i)
    );
  }

  // Notifications
  function updateNotifTabs(next: any[]) {
    setData((prev: any) => ({ ...prev, NotificationsData: { ...(prev?.NotificationsData ?? {}), NotificationTabs: next } }));
  }
  function updateTabName(tabIdx: number, name: string) {
    updateNotifTabs(notifTabs.map((t, i) => (i === tabIdx ? { ...t, tabName: name } : t)));
  }
  function addTab() {
    updateNotifTabs([...notifTabs, { tabName: "New Tab", Data: [] }]);
  }
  function removeTab(tabIdx: number) {
    updateNotifTabs(notifTabs.filter((_, i) => i !== tabIdx));
  }
  function updateTabData(tabIdx: number, nextItems: any[]) {
    updateNotifTabs(notifTabs.map((t, i) => (i === tabIdx ? { ...t, Data: nextItems } : t)));
  }
  function updateNotifItem(tabIdx: number, itemIdx: number, field: "title" | "pdf", value: string) {
    const items = notifTabs[tabIdx]?.Data ?? [];
    updateTabData(
      tabIdx,
      items.map((item: any, idx: number) => (idx === itemIdx ? { ...item, [field]: value } : item))
    );
  }
  function addNotifItem(tabIdx: number) {
    const items = notifTabs[tabIdx]?.Data ?? [];
    updateTabData(tabIdx, [...items, { title: "", pdf: "" }]);
  }
  function removeNotifItem(tabIdx: number, itemIdx: number) {
    const items = notifTabs[tabIdx]?.Data ?? [];
    updateTabData(
      tabIdx,
      items.filter((_: any, idx: number) => idx !== itemIdx)
    );
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateHome(data);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap={4}>
      <EditorHeader
        icon={HomeIcon}
        eyebrow="Home"
        title="Home Page Management"
        subtitle="Manage every section of the public homepage."
        stats={[
          { value: slides.length, label: "Slides" },
          { value: records.length, label: "Stats" },
          { value: totalNotifications, label: "Notifications" },
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <EditorLayout tabs={HOME_TABS} activeTab={tabKey} onChange={setTabKey}>
          <Panel p={5}>
          {/* Hero banner slides */}
          {tabKey === "banner" && (
          <>
            <SectionHead icon={BannerIcon} title="Hero Banner" subtitle="The slideshow shown at the very top of the homepage." />
            <Stack gap={4}>
              <MapLocationControl
                label="Map Location"
                value={banner.location ?? ""}
                onChange={(v) => updateBannerField("location", v)}
              />

              <Stack gap={4}>
                {slides.map((slide, i) => (
                  <SubtleCard key={i}>
                    <CardHeader justify="space-between">
                      <Text fontWeight={700} color="brand.navy">
                        Slide {i + 1}
                      </Text>
                      <IconBtn aria-label="Delete slide" tone="danger" onClick={() => removeSlide(i)} />
                    </CardHeader>
                    <Box p={4}>
                      <Stack gap={3}>
                        <Box>
                          <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                            Title
                          </Text>
                          <Input value={slide.title ?? ""} onChange={(e) => updateSlideField(i, "title", e.target.value)} bg="white" />
                        </Box>
                        <Box>
                          <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                            Description
                          </Text>
                          <Textarea
                            value={slide.description ?? ""}
                            onChange={(e) => updateSlideField(i, "description", e.target.value)}
                            rows={2}
                            bg="white"
                          />
                        </Box>
                        <ImageControl label="Slide Image" value={slide.image ?? ""} onChange={(url) => updateSlideField(i, "image", url)} />
                      </Stack>
                    </Box>
                  </SubtleCard>
                ))}
                <AddButton dashed size="sm" onClick={addSlide}>
                  Add Slide
                </AddButton>
              </Stack>
            </Stack>
          </>
          )}

          {/* Stats strip */}
          {tabKey === "stats" && (
          <>
            <SectionHead icon={StatsIcon} title="Stats Strip" subtitle="The counters row (e.g. Happy Alumni, Students Intake)." />
            <Stack gap={2}>
              {records.map((record, i) => (
                <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                  <Stack flex="1" minW="180px" gap={2}>
                    <Input
                      value={record.title ?? ""}
                      onChange={(e) => updateRecordField(i, "title", e.target.value)}
                      placeholder="Label (e.g. Happy Alumni)"
                      size="sm"
                      bg="white"
                    />
                  </Stack>
                  <Stack flex="1" minW="140px" gap={2}>
                    <Input
                      value={record.count ?? ""}
                      onChange={(e) => updateRecordField(i, "count", e.target.value)}
                      placeholder="Count (e.g. 2000+)"
                      size="sm"
                      bg="white"
                    />
                  </Stack>
                  <IconBtn aria-label="Remove stat" tone="danger" onClick={() => removeRecord(i)} />
                </RowCard>
              ))}
              <AddButton dashed size="sm" onClick={addRecord}>
                Add Stat
              </AddButton>
            </Stack>
          </>
          )}

          {/* About NDC */}
          {tabKey === "about" && (
          <>
            <SectionHead icon={AboutIcon} title="About NDC" subtitle="The introductory section about the college." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={about.title ?? ""} onChange={(e) => updateAboutField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Description Paragraphs
                </Text>
                <StringListEditor items={aboutDescription} onChange={(v) => updateAboutField("description", v)} addLabel="Add paragraph" multiline />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Button Text
                </Text>
                <Input value={about.buttonText ?? ""} onChange={(e) => updateAboutField("buttonText", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Button Link
                </Text>
                <Input value={about.link ?? ""} onChange={(e) => updateAboutField("link", e.target.value)} bg="white" placeholder="/about-ndc" />
              </Box>
              <ImageControl label="About Image" value={about.image ?? ""} onChange={(url) => updateAboutField("image", url)} />
            </Stack>
          </>
          )}

          {/* 25 Years */}
          {tabKey === "yrs25" && (
          <>
            <SectionHead icon={AnniversaryIcon} title="25 Years Section" subtitle="The anniversary/milestone banner." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={yrs25.title ?? ""} onChange={(e) => updateYrs25Field("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea value={yrs25.description ?? ""} onChange={(e) => updateYrs25Field("description", e.target.value)} rows={3} bg="white" />
              </Box>
            </Stack>
          </>
          )}

          {/* Certificate courses */}
          {tabKey === "certCourses" && (
          <>
            <SectionHead icon={CoursesIcon} title="Explore Certificate Courses" subtitle="The certificate courses promo panel." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Button Link
                </Text>
                <Input
                  value={certCourses.link ?? ""}
                  onChange={(e) => updateCertCoursesField("link", e.target.value)}
                  bg="white"
                  placeholder="/certificate-courses"
                />
              </Box>
              <ImageControl label="Section Image" value={certCourses.image ?? ""} onChange={(url) => updateCertCoursesField("image", url)} />
            </Stack>
          </>
          )}

          {/* Campus life */}
          {tabKey === "campusLife" && (
          <>
            <SectionHead icon={CampusLifeIcon} title="Campus Life Videos" subtitle="YouTube videos shown in the campus life carousel." />
            <YoutubeListEditor items={campusVideos} onChange={updateCampusVideos} addLabel="Add video" />
          </>
          )}

          {/* Education excellence */}
          {tabKey === "eduExcellence" && (
          <>
            <SectionHead icon={EducationIcon} title="Education & Excellence" subtitle="The programmes overview section." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={eduExcellence.title ?? ""} onChange={(e) => updateEduField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Subtitle
                </Text>
                <Input value={eduExcellence.subTitle ?? ""} onChange={(e) => updateEduField("subTitle", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea
                  value={eduExcellence.description ?? ""}
                  onChange={(e) => updateEduField("description", e.target.value)}
                  rows={3}
                  bg="white"
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Buttons
                </Text>
                <Stack gap={2}>
                  {eduButtons.map((btn, i) => (
                    <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                      <Stack flex="1" minW="200px" gap={2}>
                        <Input
                          value={btn.title ?? ""}
                          onChange={(e) => updateEduButtonField(i, "title", e.target.value)}
                          placeholder="Button label"
                          size="sm"
                          bg="white"
                        />
                        <Input
                          value={btn.url ?? ""}
                          onChange={(e) => updateEduButtonField(i, "url", e.target.value)}
                          placeholder="Department anchor (used as /departments#value)"
                          size="sm"
                          bg="white"
                        />
                      </Stack>
                      <IconBtn aria-label="Remove button" tone="danger" onClick={() => removeEduButton(i)} />
                    </RowCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addEduButton}>
                    Add Button
                  </AddButton>
                </Stack>
              </Box>

              <ImageControl label="Section Image" value={eduExcellence.image ?? ""} onChange={(url) => updateEduField("image", url)} />
            </Stack>
          </>
          )}

          {/* Notifications */}
          {tabKey === "notifications" && (
          <>
            <SectionHead icon={NotificationsIcon} title="Notifications" subtitle="Notification tabs and their PDF announcements." />
            <Stack gap={4}>
              {notifTabs.map((tab, tabIdx) => {
                const items: any[] = tab.Data ?? [];
                return (
                  <SubtleCard key={tabIdx}>
                    <CardHeader justify="space-between">
                      <Input
                        value={tab.tabName ?? ""}
                        onChange={(e) => updateTabName(tabIdx, e.target.value)}
                        bg="white"
                        fontWeight={700}
                        flex="1"
                        maxW="360px"
                      />
                      <IconBtn
                        aria-label="Delete tab"
                        tone="danger"
                        confirmMessage={`Delete tab "${tab.tabName}" and all ${items.length} notifications in it?`}
                        onClick={() => removeTab(tabIdx)}
                      />
                    </CardHeader>
                    <Box p={4}>
                      <Stack gap={2} maxH="420px" overflowY="auto" pr={1} mb={3}>
                        {items.map((item, itemIdx) => (
                          <RowCard key={itemIdx} align="flex-start" wrap="wrap" mb={0}>
                            <Stack flex="1" minW="220px" gap={2}>
                              <Input
                                value={item.title ?? ""}
                                onChange={(e) => updateNotifItem(tabIdx, itemIdx, "title", e.target.value)}
                                placeholder="Notification title"
                                size="sm"
                                bg="white"
                              />
                              <FileControl value={item.pdf ?? ""} onChange={(url) => updateNotifItem(tabIdx, itemIdx, "pdf", url)} />
                            </Stack>
                            <IconBtn aria-label="Remove notification" tone="danger" onClick={() => removeNotifItem(tabIdx, itemIdx)} />
                          </RowCard>
                        ))}
                      </Stack>
                      <AddButton dashed size="sm" onClick={() => addNotifItem(tabIdx)}>
                        Add Notification
                      </AddButton>
                    </Box>
                  </SubtleCard>
                );
              })}
              <AddButton dashed size="sm" onClick={addTab}>
                Add Tab
              </AddButton>
            </Stack>
          </>
          )}
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public homepage once saved."
          />
        </EditorLayout>
      )}
    </Stack>
  );
}

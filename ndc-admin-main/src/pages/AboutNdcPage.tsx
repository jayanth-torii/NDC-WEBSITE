import { useEffect, useState } from "react";
import { Box, Grid, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdInfo as AboutIcon,
  MdRecordVoiceOver as PrincipalIcon,
  MdStars as VisionIcon,
  MdNewspaper as NewsletterIcon,
  MdLocationCity as CampusIcon,
  MdAccountBalance as CouncilIcon,
  MdFactCheck as ConsiderationsIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { FileControl } from "../components/FileControl";
import { getPage, putPage } from "../services/data.service";
import { publicPathForRoute } from "../config/publicPathMap";
import { triggerRevalidate } from "../services/revalidate";
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

// Bespoke studio-style editor for the /about-ndc singleton — the public
// About NDC page. Real doc shape (confirmed by reading the original
// @ts-nocheck version of this file plus ndc-web-main's
// src/components/AboutNDC/OurCampus.tsx destructure): { aboutUs: {title,
// image, description:string[]}, VisionMission: {dropdowns:[{title,
// description:string[]}]}, principalMessage: {title, principalName,
// position, image, message:string[]}, NewsLetter: {title,
// sections:[{title,pdf}]}, OurCampuses: {title, campuses:[{collegeName,
// collegeDescription, location, link, image}]}, GoverningCouncilMembers:
// {title, members:[{name,designation,position}]}, ImportantConsiderations:
// {title, sections:[{title,pdf}]} }.
//
// `campuses[].location` is a plain city string and `campuses[].link` is a
// "Visit Website" external URL (confirmed via OurCampus.tsx) — neither is a
// Google Maps embed, so plain Inputs are used for both rather than
// MapLocationControl. No YouTube/video fields exist anywhere in this shape.
//
// The original 4-tab grouping ("About & Principal" / "Vision & Mission" /
// "Governance & News" / "Campuses & More") bundled unrelated sections
// together to keep the tab count down for its old Bootstrap tab bar. The
// sidebar EditorLayout used by every other page here has no such pressure,
// so each of the 7 top-level formData keys gets its own tab instead —
// About, Principal, Vision & Mission, Newsletters, Our Campuses, Governing
// Council, Important Considerations.
const TABS: TabCardSpec[] = [
  { id: "about", label: "About Us", desc: "Intro section", icon: AboutIcon },
  { id: "principal", label: "Principal's Message", desc: "Message & photo", icon: PrincipalIcon },
  { id: "vision", label: "Vision & Mission", desc: "Dropdown blocks", icon: VisionIcon },
  { id: "newsletter", label: "Newsletters", desc: "PDF volumes", icon: NewsletterIcon },
  { id: "campuses", label: "Our Campuses", desc: "Campus cards", icon: CampusIcon },
  { id: "council", label: "Governing Council", desc: "Member list", icon: CouncilIcon },
  { id: "considerations", label: "Important Considerations", desc: "PDF sections", icon: ConsiderationsIcon },
];

// Leading slash required: publicPathForRoute() does an exact-key lookup
// against publicPathMap.ts's "/about-ndc" entry. The pre-migration version of
// this file called getPage("about-ndc")/putPage("about-ndc", ...) without
// the slash — axios's combineURLs tolerated that for the GET/PUT calls
// themselves, but it silently broke the post-save revalidate (never matched
// the map key, so the public page's cache was never busted after a save).
const ROUTE = "/about-ndc";

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

// Shared by NewsLetter.sections and ImportantConsiderations.sections — both
// are an identically-shaped {title, pdf}[] array (a titled PDF download).
function TitlePdfListEditor({
  items,
  onChange,
  addLabel = "Add Item",
}: {
  items: any[];
  onChange: (items: any[]) => void;
  addLabel?: string;
}) {
  function updateItem(i: number, field: "title" | "pdf", value: string) {
    onChange(items.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function addItem() {
    onChange([...items, { title: "", pdf: "" }]);
  }
  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  return (
    <Stack gap={3}>
      {items.map((item, i) => (
        <SubtleCard key={i} mb={0}>
          <CardHeader justify="space-between">
            <Input
              value={item.title ?? ""}
              onChange={(e) => updateItem(i, "title", e.target.value)}
              bg="white"
              fontWeight={700}
              flex="1"
              maxW="360px"
              placeholder="Title"
            />
            <IconBtn aria-label="Remove item" tone="danger" onClick={() => removeItem(i)} />
          </CardHeader>
          <Box p={4}>
            <FileControl label="PDF File" value={item.pdf ?? ""} onChange={(url) => updateItem(i, "pdf", url)} />
          </Box>
        </SubtleCard>
      ))}
      <AddButton dashed size="sm" onClick={addItem}>
        {addLabel}
      </AddButton>
    </Stack>
  );
}

export function AboutNdcPage() {
  const [tabKey, setTabKey] = useState(TABS[0].id);
  const [formData, setFormData] = useState<any>({
    aboutUs: { title: "", image: "", description: [] },
    VisionMission: { dropdowns: [] },
    principalMessage: { title: "", principalName: "", position: "", image: "", message: [] },
    NewsLetter: { title: "", sections: [] },
    OurCampuses: { title: "", campuses: [] },
    GoverningCouncilMembers: { title: "", members: [] },
    ImportantConsiderations: { title: "", sections: [] },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getPage(ROUTE)
      .then((response: any) => {
        if (response?.data) {
          setFormData((prev: any) => ({ ...prev, ...response.data }));
          setIsEditMode(true);
        }
      })
      .catch((err) => console.error("Error fetching About data:", err))
      .finally(() => setLoading(false));
  }, []);

  const aboutUs = formData?.aboutUs ?? {};
  const aboutDescription: string[] = aboutUs.description ?? [];

  const principal = formData?.principalMessage ?? {};
  const principalMessageParas: string[] = principal.message ?? [];

  const visionMission = formData?.VisionMission ?? {};
  const dropdowns: any[] = visionMission.dropdowns ?? [];

  const newsletter = formData?.NewsLetter ?? {};
  const newsletterSections: any[] = newsletter.sections ?? [];

  const campusesSection = formData?.OurCampuses ?? {};
  const campuses: any[] = campusesSection.campuses ?? [];

  const council = formData?.GoverningCouncilMembers ?? {};
  const members: any[] = council.members ?? [];

  const considerations = formData?.ImportantConsiderations ?? {};
  const considerationsSections: any[] = considerations.sections ?? [];

  // About Us
  function updateAboutField(field: "title" | "image" | "description", value: any) {
    setFormData((prev: any) => ({ ...prev, aboutUs: { ...(prev?.aboutUs ?? {}), [field]: value } }));
  }

  // Principal's Message
  function updatePrincipalField(field: "title" | "principalName" | "position" | "image" | "message", value: any) {
    setFormData((prev: any) => ({ ...prev, principalMessage: { ...(prev?.principalMessage ?? {}), [field]: value } }));
  }

  // Vision & Mission dropdown blocks
  function updateVisionField(field: "dropdowns", value: any) {
    setFormData((prev: any) => ({ ...prev, VisionMission: { ...(prev?.VisionMission ?? {}), [field]: value } }));
  }
  function updateDropdownItem(i: number, field: "title" | "description", value: any) {
    updateVisionField(
      "dropdowns",
      dropdowns.map((d, idx) => (idx === i ? { ...d, [field]: value } : d))
    );
  }
  function addDropdown() {
    updateVisionField("dropdowns", [...dropdowns, { title: "", description: [] }]);
  }
  function removeDropdown(i: number) {
    updateVisionField(
      "dropdowns",
      dropdowns.filter((_, idx) => idx !== i)
    );
  }

  // Newsletters
  function updateNewsletterField(field: "title" | "sections", value: any) {
    setFormData((prev: any) => ({ ...prev, NewsLetter: { ...(prev?.NewsLetter ?? {}), [field]: value } }));
  }

  // Our Campuses
  function updateCampusesField(field: "title" | "campuses", value: any) {
    setFormData((prev: any) => ({ ...prev, OurCampuses: { ...(prev?.OurCampuses ?? {}), [field]: value } }));
  }
  function updateCampusItem(i: number, field: "collegeName" | "collegeDescription" | "location" | "link" | "image", value: string) {
    updateCampusesField(
      "campuses",
      campuses.map((c, idx) => (idx === i ? { ...c, [field]: value } : c))
    );
  }
  function addCampus() {
    updateCampusesField("campuses", [...campuses, { collegeName: "", collegeDescription: "", location: "", link: "", image: "" }]);
  }
  function removeCampus(i: number) {
    updateCampusesField(
      "campuses",
      campuses.filter((_, idx) => idx !== i)
    );
  }

  // Governing Council Members
  function updateCouncilField(field: "title" | "members", value: any) {
    setFormData((prev: any) => ({ ...prev, GoverningCouncilMembers: { ...(prev?.GoverningCouncilMembers ?? {}), [field]: value } }));
  }
  function updateMemberItem(i: number, field: "name" | "designation" | "position", value: string) {
    updateCouncilField(
      "members",
      members.map((m, idx) => (idx === i ? { ...m, [field]: value } : m))
    );
  }
  function addMember() {
    updateCouncilField("members", [...members, { name: "", designation: "", position: "" }]);
  }
  function removeMember(i: number) {
    updateCouncilField(
      "members",
      members.filter((_, idx) => idx !== i)
    );
  }

  // Important Considerations
  function updateConsiderationsField(field: "title" | "sections", value: any) {
    setFormData((prev: any) => ({ ...prev, ImportantConsiderations: { ...(prev?.ImportantConsiderations ?? {}), [field]: value } }));
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await putPage(ROUTE, formData);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute(ROUTE);
      if (publicPath) triggerRevalidate(publicPath);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to save data.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap={4}>
      <EditorHeader
        icon={AboutIcon}
        eyebrow="About"
        title="About NDC Page Studio"
        subtitle="Manage the college introduction, principal's message, vision & mission, newsletters, campuses, governing council, and PDF resources on the public About NDC page."
        stats={[
          { value: campuses.length, label: "Campuses" },
          { value: members.length, label: "Council" },
          { value: newsletterSections.length, label: "Newsletters" },
        ]}
        mode={isEditMode ? "edit" : "create"}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <EditorLayout tabs={TABS} activeTab={tabKey} onChange={setTabKey}>
          <Panel p={5}>
            {/* About Us */}
            {tabKey === "about" && (
              <>
                <SectionHead icon={AboutIcon} title="About Us" subtitle="The main introduction section." />
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Title
                    </Text>
                    <Input value={aboutUs.title ?? ""} onChange={(e) => updateAboutField("title", e.target.value)} bg="white" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight={600} mb={2}>
                      Description Paragraphs
                    </Text>
                    <StringListEditor
                      items={aboutDescription}
                      onChange={(v) => updateAboutField("description", v)}
                      addLabel="Add paragraph"
                      multiline
                    />
                  </Box>
                  <ImageControl label="Cover Image" value={aboutUs.image ?? ""} onChange={(url) => updateAboutField("image", url)} />
                </Stack>
              </>
            )}

            {/* Principal's Message */}
            {tabKey === "principal" && (
              <>
                <SectionHead icon={PrincipalIcon} title="Principal's Message" subtitle="Details and message from the principal." />
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Section Title
                    </Text>
                    <Input value={principal.title ?? ""} onChange={(e) => updatePrincipalField("title", e.target.value)} bg="white" />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Principal Name
                    </Text>
                    <Input
                      value={principal.principalName ?? ""}
                      onChange={(e) => updatePrincipalField("principalName", e.target.value)}
                      bg="white"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Position
                    </Text>
                    <Input value={principal.position ?? ""} onChange={(e) => updatePrincipalField("position", e.target.value)} bg="white" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight={600} mb={2}>
                      Message Paragraphs
                    </Text>
                    <StringListEditor
                      items={principalMessageParas}
                      onChange={(v) => updatePrincipalField("message", v)}
                      addLabel="Add paragraph"
                      multiline
                    />
                  </Box>
                  <ImageControl label="Principal Photo" value={principal.image ?? ""} onChange={(url) => updatePrincipalField("image", url)} />
                </Stack>
              </>
            )}

            {/* Vision & Mission */}
            {tabKey === "vision" && (
              <>
                <SectionHead icon={VisionIcon} title="Vision & Mission" subtitle="Dropdown blocks shown on the public page." />
                <Stack gap={3}>
                  {dropdowns.map((d, i) => (
                    <SubtleCard key={i} mb={0}>
                      <CardHeader justify="space-between">
                        <Input
                          value={d.title ?? ""}
                          onChange={(e) => updateDropdownItem(i, "title", e.target.value)}
                          bg="white"
                          fontWeight={700}
                          flex="1"
                          maxW="360px"
                          placeholder="e.g. Vision"
                        />
                        <IconBtn aria-label="Remove block" tone="danger" onClick={() => removeDropdown(i)} />
                      </CardHeader>
                      <Box p={4}>
                        <StringListEditor
                          items={d.description ?? []}
                          onChange={(v) => updateDropdownItem(i, "description", v)}
                          addLabel="Add paragraph"
                          multiline
                        />
                      </Box>
                    </SubtleCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addDropdown}>
                    Add Dropdown Block
                  </AddButton>
                </Stack>
              </>
            )}

            {/* Newsletters */}
            {tabKey === "newsletter" && (
              <>
                <SectionHead icon={NewsletterIcon} title="Newsletters" subtitle="Newsletter volumes, each with a PDF file." />
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Section Title
                    </Text>
                    <Input value={newsletter.title ?? ""} onChange={(e) => updateNewsletterField("title", e.target.value)} bg="white" />
                  </Box>
                  <TitlePdfListEditor
                    items={newsletterSections}
                    onChange={(v) => updateNewsletterField("sections", v)}
                    addLabel="Add Newsletter Volume"
                  />
                </Stack>
              </>
            )}

            {/* Our Campuses */}
            {tabKey === "campuses" && (
              <>
                <SectionHead icon={CampusIcon} title="Our Campuses" subtitle="Every campus card shown in the campuses carousel." />
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Section Title
                    </Text>
                    <Input value={campusesSection.title ?? ""} onChange={(e) => updateCampusesField("title", e.target.value)} bg="white" />
                  </Box>
                  <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4}>
                    {campuses.map((c, i) => (
                      <SubtleCard key={i} mb={0}>
                        <CardHeader justify="space-between">
                          <Input
                            value={c.collegeName ?? ""}
                            onChange={(e) => updateCampusItem(i, "collegeName", e.target.value)}
                            bg="white"
                            fontWeight={700}
                            flex="1"
                            maxW="260px"
                            placeholder="College Name"
                          />
                          <IconBtn aria-label="Delete campus" tone="danger" onClick={() => removeCampus(i)} />
                        </CardHeader>
                        <Box p={4}>
                          <Stack gap={3}>
                            <Input
                              value={c.location ?? ""}
                              onChange={(e) => updateCampusItem(i, "location", e.target.value)}
                              placeholder="Location"
                              size="sm"
                              bg="white"
                            />
                            <Input
                              value={c.link ?? ""}
                              onChange={(e) => updateCampusItem(i, "link", e.target.value)}
                              placeholder="Website link"
                              size="sm"
                              bg="white"
                            />
                            <Textarea
                              value={c.collegeDescription ?? ""}
                              onChange={(e) => updateCampusItem(i, "collegeDescription", e.target.value)}
                              placeholder="Description"
                              rows={3}
                              size="sm"
                              bg="white"
                            />
                            <ImageControl value={c.image ?? ""} onChange={(url) => updateCampusItem(i, "image", url)} />
                          </Stack>
                        </Box>
                      </SubtleCard>
                    ))}
                  </Grid>
                  <AddButton dashed size="sm" onClick={addCampus}>
                    Add Campus
                  </AddButton>
                </Stack>
              </>
            )}

            {/* Governing Council Members */}
            {tabKey === "council" && (
              <>
                <SectionHead icon={CouncilIcon} title="Governing Council Members" subtitle="The list of governing council members." />
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Section Title
                    </Text>
                    <Input value={council.title ?? ""} onChange={(e) => updateCouncilField("title", e.target.value)} bg="white" />
                  </Box>
                  <Stack gap={2}>
                    {members.map((m, i) => (
                      <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                        <Stack flex="1" minW="180px" gap={2}>
                          <Input
                            value={m.name ?? ""}
                            onChange={(e) => updateMemberItem(i, "name", e.target.value)}
                            placeholder="Name"
                            size="sm"
                            bg="white"
                          />
                        </Stack>
                        <Stack flex="1" minW="180px" gap={2}>
                          <Input
                            value={m.designation ?? ""}
                            onChange={(e) => updateMemberItem(i, "designation", e.target.value)}
                            placeholder="Designation"
                            size="sm"
                            bg="white"
                          />
                        </Stack>
                        <Stack flex="1" minW="180px" gap={2}>
                          <Input
                            value={m.position ?? ""}
                            onChange={(e) => updateMemberItem(i, "position", e.target.value)}
                            placeholder="Position"
                            size="sm"
                            bg="white"
                          />
                        </Stack>
                        <IconBtn aria-label="Remove member" tone="danger" onClick={() => removeMember(i)} />
                      </RowCard>
                    ))}
                    <AddButton dashed size="sm" onClick={addMember}>
                      Add Member
                    </AddButton>
                  </Stack>
                </Stack>
              </>
            )}

            {/* Important Considerations */}
            {tabKey === "considerations" && (
              <>
                <SectionHead icon={ConsiderationsIcon} title="Important Considerations" subtitle="PDF resources shown on the public page." />
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Section Title
                    </Text>
                    <Input
                      value={considerations.title ?? ""}
                      onChange={(e) => updateConsiderationsField("title", e.target.value)}
                      bg="white"
                    />
                  </Box>
                  <TitlePdfListEditor
                    items={considerationsSections}
                    onChange={(v) => updateConsiderationsField("sections", v)}
                    addLabel="Add PDF Section"
                  />
                </Stack>
              </>
            )}
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving Changes..." : "Save About Content"}
            summary="Changes apply to the public About NDC page once saved."
          />
        </EditorLayout>
      )}
    </Stack>
  );
}

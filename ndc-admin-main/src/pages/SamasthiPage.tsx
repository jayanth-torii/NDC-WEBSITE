import { useEffect, useState } from "react";
import { Box, Input, Spinner, Stack, Text, Textarea, Flex } from "@chakra-ui/react";
import {
  MdMenuBook as SamasthiIcon,
  MdImage as ImageIcon,
  MdDescription as ContentIcon,
  MdLink as LinkIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getSamashti, updateSamashti } from "../services/data.service";
import {
  AddButton,
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

const SAMASTHI_TABS: TabCardSpec[] = [
  { id: "hero", label: "Hero Section", icon: SamasthiIcon },
  { id: "sections", label: "Content Sections", icon: ContentIcon },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "links", label: "External Links", icon: LinkIcon },
];

export function SamasthiPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [tabKey, setTabKey] = useState(SAMASTHI_TABS[0].id);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSamashti()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Extract common sections (adjust based on actual data structure)
  const bannerSection = data?.bannerSection ?? {};
  const heroTitle = data?.title ?? "";
  const heroSubtitle = data?.subtitle ?? "";
  const description = data?.description ?? "";
  const sections: any[] = data?.sections ?? [];
  const gallery: any[] = data?.gallery ?? [];
  const links: any[] = data?.links ?? [];

  // Update functions
  function updateField(field: string, value: any) {
    setData((prev: any) => ({ ...prev, [field]: value }));
  }

  function updateBannerField(field: string, value: any) {
    setData((prev: any) => ({ ...prev, bannerSection: { ...(prev?.bannerSection ?? {}), [field]: value } }));
  }

  function updateSections(next: any[]) {
    setData((prev: any) => ({ ...prev, sections: next }));
  }

  function updateSectionField(i: number, field: string, value: any) {
    updateSections(sections.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  }

  function addSection() {
    updateSections([...sections, { title: "", content: "" }]);
  }

  function removeSection(i: number) {
    updateSections(sections.filter((_, idx) => idx !== i));
  }

  function updateGallery(next: any[]) {
    setData((prev: any) => ({ ...prev, gallery: next }));
  }

  function updateGalleryItem(i: number, field: string, value: any) {
    updateGallery(gallery.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  }

  function addGalleryItem() {
    updateGallery([...gallery, { image: "", caption: "" }]);
  }

  function removeGalleryItem(i: number) {
    updateGallery(gallery.filter((_, idx) => idx !== i));
  }

  function updateLinks(next: any[]) {
    setData((prev: any) => ({ ...prev, links: next }));
  }

  function updateLinkField(i: number, field: string, value: any) {
    updateLinks(links.map((link, idx) => (idx === i ? { ...link, [field]: value } : link)));
  }

  function addLink() {
    updateLinks([...links, { title: "", url: "" }]);
  }

  function removeLink(i: number) {
    updateLinks(links.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateSamashti(data);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap={6}>
      <EditorHeader
        icon={SamasthiIcon}
        eyebrow="Content Manager"
        title="Samasthi"
        subtitle="Manage the Samasthi festival and cultural activities page."
        stats={[
          { value: sections.length, label: "Sections" },
          { value: gallery.length, label: "Gallery" },
          { value: links.length, label: "Links" },
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="brand.orange" />
        </Flex>
      ) : (
        <EditorLayout tabs={SAMASTHI_TABS} activeTab={tabKey} onChange={setTabKey}>
          <Panel p={5}>
          {/* Hero Section */}
          {tabKey === "hero" && (
          <>
            <SectionHead icon={SamasthiIcon} title="Hero Section" subtitle="Main banner and introduction content" />
            <Stack gap={5}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Page Title
                </Text>
                <Input value={heroTitle} onChange={(e) => updateField("title", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Subtitle
                </Text>
                <Input value={heroSubtitle} onChange={(e) => updateField("subtitle", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea value={description} onChange={(e) => updateField("description", e.target.value)} rows={4} bg="white" />
              </Box>
              <ImageControl label="Banner Image" value={bannerSection.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
            </Stack>
          </>
          )}

          {/* Content Sections */}
          {tabKey === "sections" && (
          <>
            <SectionHead icon={ContentIcon} title="Content Sections" subtitle="Informational sections about Samasthi" />
            <Stack gap={4}>
              {sections.map((section, i) => (
                <SubtleCard key={i}>
                  <Box p={5}>
                    <Flex align="center" justify="space-between" mb={4}>
                      <Flex align="center" gap={3}>
                        <Flex align="center" justify="center" w="10" h="10" borderRadius="lg" bg="brand.navy" color="white" fontWeight={800} fontSize="sm">
                          {i + 1}
                        </Flex>
                        <Text fontWeight={800} color="brand.navy" fontSize="md">
                          Section {i + 1}
                        </Text>
                      </Flex>
                      <IconBtn aria-label="Delete section" tone="danger" onClick={() => removeSection(i)} />
                    </Flex>
                    <Stack gap={4}>
                      <Box>
                        <Text fontSize="xs" fontWeight={700} color="gray.500" mb={2} letterSpacing="0.05em">
                          TITLE
                        </Text>
                        <Input value={section.title ?? ""} onChange={(e) => updateSectionField(i, "title", e.target.value)} bg="white" />
                      </Box>
                      <Box>
                        <Text fontSize="xs" fontWeight={700} color="gray.500" mb={2} letterSpacing="0.05em">
                          CONTENT
                        </Text>
                        <Textarea
                          value={section.content ?? ""}
                          onChange={(e) => updateSectionField(i, "content", e.target.value)}
                          rows={3}
                          bg="white"
                        />
                      </Box>
                    </Stack>
                  </Box>
                </SubtleCard>
              ))}
              <AddButton dashed size="sm" onClick={addSection}>
                Add Section
              </AddButton>
            </Stack>
          </>
          )}

          {/* Gallery */}
          {tabKey === "gallery" && (
          <>
            <SectionHead icon={ImageIcon} title="Gallery" subtitle="Images and media for Samasthi" />
            <Stack gap={4}>
              {gallery.map((item, i) => (
                <SubtleCard key={i}>
                  <Box p={5}>
                    <Flex align="center" justify="space-between" mb={4}>
                      <Flex align="center" gap={3}>
                        <Flex align="center" justify="center" w="10" h="10" borderRadius="lg" bg="brand.navy" color="white" fontWeight={800} fontSize="sm">
                          {i + 1}
                        </Flex>
                        <Text fontWeight={800} color="brand.navy" fontSize="md">
                          Gallery Item {i + 1}
                        </Text>
                      </Flex>
                      <IconBtn aria-label="Delete item" tone="danger" onClick={() => removeGalleryItem(i)} />
                    </Flex>
                    <Stack gap={4}>
                      <Box>
                        <Text fontSize="xs" fontWeight={700} color="gray.500" mb={2} letterSpacing="0.05em">
                          IMAGE
                        </Text>
                        <ImageControl label="" value={item.image ?? ""} onChange={(url) => updateGalleryItem(i, "image", url)} />
                      </Box>
                      <Box>
                        <Text fontSize="xs" fontWeight={700} color="gray.500" mb={2} letterSpacing="0.05em">
                          CAPTION
                        </Text>
                        <Input
                          value={item.caption ?? ""}
                          onChange={(e) => updateGalleryItem(i, "caption", e.target.value)}
                          bg="white"
                        />
                      </Box>
                    </Stack>
                  </Box>
                </SubtleCard>
              ))}
              <AddButton dashed size="sm" onClick={addGalleryItem}>
                Add Gallery Item
              </AddButton>
            </Stack>
          </>
          )}

          {/* Links */}
          {tabKey === "links" && (
          <>
            <SectionHead icon={LinkIcon} title="External Links" subtitle="Related resources and external references" />
            <Stack gap={3}>
              {links.map((link, i) => (
                <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                  <Flex align="center" color="gray.300" mr={2}>
                    <LinkIcon size={20} />
                  </Flex>
                  <Stack flex="1" minW="200px" gap={2}>
                    <Input
                      value={link.title ?? ""}
                      onChange={(e) => updateLinkField(i, "title", e.target.value)}
                      placeholder="Link title"
                      size="sm"
                      bg="white"
                    />
                    <Input
                      value={link.url ?? ""}
                      onChange={(e) => updateLinkField(i, "url", e.target.value)}
                      placeholder="https://..."
                      size="sm"
                      bg="white"
                    />
                  </Stack>
                  <IconBtn aria-label="Remove link" tone="danger" onClick={() => removeLink(i)} />
                </RowCard>
              ))}
              <AddButton dashed size="sm" onClick={addLink}>
                Add Link
              </AddButton>
            </Stack>
          </>
          )}
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save Changes"}
            summary="Changes apply to the public Samasthi page once saved."
          />
        </EditorLayout>
      )}
    </Stack>
  );
}

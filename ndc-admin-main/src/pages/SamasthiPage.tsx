import { useEffect, useState } from "react";
import { Box, Input, Spinner, Stack, Text, Textarea, Flex, Badge, useDisclosure } from "@chakra-ui/react";
import {
  MdMenuBook as SamasthiIcon,
  MdExpandMore,
  MdExpandLess,
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
  IconBtn,
  IconChip,
  Panel,
  RowCard,
  SaveBar,
  SubtleCard,
} from "../components/editorKit";

// Collapsible section component for better organization
function CollapsibleSection({
  icon,
  title,
  subtitle,
  defaultOpen = true,
  itemCount,
  children,
}: {
  icon?: any;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  itemCount?: number;
  children: React.ReactNode;
}) {
  const { open, onToggle } = useDisclosure({ defaultOpen });

  return (
    <Box mb={6}>
      <Flex
        align="center"
        justify="space-between"
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="2xl"
        px={6}
        py={5}
        mb={4}
        cursor="pointer"
        onClick={onToggle}
        transition="all 0.3s"
        _hover={{ borderColor: "brand.orange", boxShadow: "0 4px 20px rgba(246,135,42,0.1)", transform: "translateY(-1px)" }}
        boxShadow="0 2px 12px rgba(0,0,0,0.02)"
      >
        <Flex align="center" gap={4}>
          <IconChip icon={icon} size={24} box={48} onDark={false} />
          <Box>
            <Flex align="center" gap={3}>
              <Text fontSize="lg" fontWeight={800} color="brand.navy" letterSpacing="-0.01em">
                {title}
              </Text>
              {itemCount !== undefined && (
                <Badge bg="brand.orange" color="white" px={2.5} py={1} borderRadius="full" fontSize="xs" fontWeight={700}>
                  {itemCount}
                </Badge>
              )}
            </Flex>
            {subtitle && (
              <Text fontSize="sm" fontWeight={500} color="gray.500" mt={1}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex align="center" color="brand.navy" transition="transform 0.3s" transform={open ? "rotate(180deg)" : "rotate(0deg)"}>
          {open ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
        </Flex>
      </Flex>
      {open && (
        <Box animation="fadeIn 0.3s ease-in">
          {children}
        </Box>
      )}
    </Box>
  );
}

export function SamasthiPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

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
        <>
          {/* Hero Section */}
          <CollapsibleSection
            icon={SamasthiIcon}
            title="Hero Section"
            subtitle="Main banner and introduction content"
            defaultOpen={true}
          >
            <Panel p={6} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" boxShadow="0 4px 20px -4px rgba(0,0,0,0.03)">
              <Stack gap={5}>
                <Box>
                  <Flex align="center" mb={2}>
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      PAGE TITLE
                    </Text>
                  </Flex>
                  <Input 
                    value={heroTitle} 
                    onChange={(e) => updateField("title", e.target.value)} 
                    bg="gray.50" 
                    border="1px solid" 
                    borderColor="gray.200" 
                    borderRadius="lg"
                    _focus={{ borderColor: "brand.orange", bg: "white", boxShadow: "0 0 0 3px rgba(246,135,42,0.1)" }}
                    transition="all 0.2s"
                  />
                </Box>
                <Box>
                  <Flex align="center" mb={2}>
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      SUBTITLE
                    </Text>
                  </Flex>
                  <Input 
                    value={heroSubtitle} 
                    onChange={(e) => updateField("subtitle", e.target.value)} 
                    bg="gray.50" 
                    border="1px solid" 
                    borderColor="gray.200" 
                    borderRadius="lg"
                    _focus={{ borderColor: "brand.orange", bg: "white", boxShadow: "0 0 0 3px rgba(246,135,42,0.1)" }}
                    transition="all 0.2s"
                  />
                </Box>
                <Box>
                  <Flex align="center" mb={2}>
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      DESCRIPTION
                    </Text>
                  </Flex>
                  <Textarea 
                    value={description} 
                    onChange={(e) => updateField("description", e.target.value)} 
                    rows={4} 
                    bg="gray.50"
                    _focus={{ borderColor: "brand.orange", bg: "white", boxShadow: "0 0 0 3px rgba(246,135,42,0.1)" }}
                    transition="all 0.2s"
                  />
                </Box>
                <Box>
                  <Flex align="center" mb={2}>
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      BANNER IMAGE
                    </Text>
                  </Flex>
                  <ImageControl label="" value={bannerSection.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
                </Box>
              </Stack>
            </Panel>
          </CollapsibleSection>

          {/* Content Sections */}
          <CollapsibleSection
            icon={ContentIcon}
            title="Content Sections"
            subtitle="Informational sections about Samasthi"
            defaultOpen={true}
            itemCount={sections.length}
          >
            <Panel p={6} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" boxShadow="0 4px 20px -4px rgba(0,0,0,0.03)">
              <Stack gap={5}>
                <Flex align="center" justify="space-between" mb={4}>
                  <Flex align="center">
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      SECTIONS
                    </Text>
                  </Flex>
                  <Badge bg="brand.navy" color="white" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight={700}>
                    {sections.length}
                  </Badge>
                </Flex>
                <Stack gap={4}>
                  {sections.map((section, i) => (
                    <SubtleCard key={i} bg="white" borderColor="gray.200" _hover={{ borderColor: "brand.orange", transform: "translateY(-2px)" }}>
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
                            <Input 
                              value={section.title ?? ""} 
                              onChange={(e) => updateSectionField(i, "title", e.target.value)} 
                              bg="gray.50" 
                              border="1px solid" 
                              borderColor="gray.200" 
                              borderRadius="lg"
                              _focus={{ borderColor: "brand.orange", bg: "white", boxShadow: "0 0 0 3px rgba(246,135,42,0.1)" }}
                              transition="all 0.2s"
                            />
                          </Box>
                          <Box>
                            <Text fontSize="xs" fontWeight={700} color="gray.500" mb={2} letterSpacing="0.05em">
                              CONTENT
                            </Text>
                            <Textarea
                              value={section.content ?? ""}
                              onChange={(e) => updateSectionField(i, "content", e.target.value)}
                              rows={3}
                              bg="gray.50"
                              _focus={{ borderColor: "brand.orange", bg: "white", boxShadow: "0 0 0 3px rgba(246,135,42,0.1)" }}
                              transition="all 0.2s"
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
              </Stack>
            </Panel>
          </CollapsibleSection>

          {/* Gallery */}
          <CollapsibleSection
            icon={ImageIcon}
            title="Gallery"
            subtitle="Images and media for Samasthi"
            defaultOpen={false}
            itemCount={gallery.length}
          >
            <Panel p={6} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" boxShadow="0 4px 20px -4px rgba(0,0,0,0.03)">
              <Stack gap={5}>
                <Flex align="center" justify="space-between" mb={4}>
                  <Flex align="center">
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      GALLERY ITEMS
                    </Text>
                  </Flex>
                  <Badge bg="brand.navy" color="white" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight={700}>
                    {gallery.length}
                  </Badge>
                </Flex>
                <Stack gap={4}>
                  {gallery.map((item, i) => (
                    <SubtleCard key={i} bg="white" borderColor="gray.200" _hover={{ borderColor: "brand.orange" }}>
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
                              bg="gray.50"
                              border="1px solid"
                              borderColor="gray.200"
                              borderRadius="lg"
                              _focus={{ borderColor: "brand.orange", bg: "white" }}
                              transition="all 0.2s"
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
              </Stack>
            </Panel>
          </CollapsibleSection>

          {/* Links */}
          <CollapsibleSection
            icon={LinkIcon}
            title="External Links"
            subtitle="Related resources and external references"
            defaultOpen={false}
            itemCount={links.length}
          >
            <Panel p={6} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" boxShadow="0 4px 20px -4px rgba(0,0,0,0.03)">
              <Stack gap={5}>
                <Flex align="center" justify="space-between" mb={4}>
                  <Flex align="center">
                    <Box w="1" h="4" bg="brand.orange" borderRadius="full" mr={3} />
                    <Text fontSize="sm" fontWeight={700} color="brand.navy" letterSpacing="0.02em">
                      LINKS
                    </Text>
                  </Flex>
                  <Badge bg="brand.navy" color="white" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight={700}>
                    {links.length}
                  </Badge>
                </Flex>
                <Stack gap={3}>
                  {links.map((link, i) => (
                    <RowCard key={i} align="flex-start" wrap="wrap" mb={0} bg="white" borderColor="gray.200" _hover={{ borderColor: "brand.orange", boxShadow: "0 4px 12px rgba(246,135,42,0.1)" }}>
                      <Flex align="center" color="gray.300" mr={2}>
                        <LinkIcon size={20} />
                      </Flex>
                      <Stack flex="1" minW="200px" gap={2}>
                        <Input
                          value={link.title ?? ""}
                          onChange={(e) => updateLinkField(i, "title", e.target.value)}
                          placeholder="Link title"
                          size="sm"
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _focus={{ borderColor: "brand.orange", bg: "white" }}
                          transition="all 0.2s"
                        />
                        <Input
                          value={link.url ?? ""}
                          onChange={(e) => updateLinkField(i, "url", e.target.value)}
                          placeholder="https://..."
                          size="sm"
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _focus={{ borderColor: "brand.orange", bg: "white" }}
                          transition="all 0.2s"
                        />
                      </Stack>
                      <IconBtn aria-label="Remove link" tone="danger" onClick={() => removeLink(i)} />
                    </RowCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addLink}>
                    Add Link
                  </AddButton>
                </Stack>
              </Stack>
            </Panel>
          </CollapsibleSection>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save Changes"}
            summary="Changes apply to the public Samasthi page once saved."
          />
        </>
      )}
    </Stack>
  );
}

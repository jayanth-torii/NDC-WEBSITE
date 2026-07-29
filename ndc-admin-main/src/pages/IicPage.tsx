import { useEffect, useRef, useState } from "react";
import { Box, chakra, Flex, Grid, Input, Menu, Portal, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdMoreVert as KebabIcon,
  MdEdit as EditIcon,
  MdDelete as DeleteIcon,
  MdAdd as AddIcon,
  MdPhone as PhoneIcon,
  MdPerson as PersonIcon,
  MdCheck as CheckIcon,
  MdCameraAlt as CameraIcon,
} from "react-icons/md";
import { FaUsers, FaHandshake, FaChartLine, FaChartPie } from "react-icons/fa";
import { getIic, updateIic } from "../services/data.service";
import { uploadFile } from "../services/upload.service";
import { Callout, SaveBar } from "../components/editorKit";

// Dedicated IIC editor, restyled to a client-approved mockup: a public-site-
// style shell wrapping the real editable content. Real doc shape (confirmed
// via GET /iic): { BannerSection: {eyebrow, title, subtitle, image},
// IICMembers: {title, MembersTable: [{name, designation, role, contact}]} }.
//
// The hero/nav header, footer, and "Be a Part of Innovation" CTA band from
// the original mockup were all decorative admin chrome (not bound to page
// content) and have been removed per request — this now starts directly
// with the functional Banner Management editor. Genuinely editable/real
// data: the Banner Management card (eyebrow/title/subtitle/image), the
// "Members" count (stats bar), the IICMembers section title, and every
// member card (name, designation, role, contact — add/edit/delete).
//
// One intentional deviation from a literal 1:1 copy, a functional necessity
// for an admin tool: the mockup's "View All Members" button slot is
// repurposed as "Add Member" (there'd be no way to add a member otherwise).

const ROLE_PILL = { bg: "blue.50", color: "blue.600" };

export function IicPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getIic()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const members = data?.IICMembers ?? {};
  const table: any[] = members.MembersTable ?? [];

  function updateBannerField(field: "eyebrow" | "title" | "subtitle" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }
  function updateMembersField(field: "title" | "MembersTable", value: any) {
    setData((prev: any) => ({ ...prev, IICMembers: { ...(prev?.IICMembers ?? {}), [field]: value } }));
  }
  function updateMemberRow(i: number, field: "name" | "designation" | "role" | "contact", value: string) {
    updateMembersField(
      "MembersTable",
      table.map((row, idx) => (idx === i ? { ...row, [field]: value } : row))
    );
  }
  function addMemberRow() {
    updateMembersField("MembersTable", [...table, { name: "", designation: "", role: "Member", contact: "" }]);
    setEditingIndex(table.length);
  }
  function removeMemberRow(i: number) {
    if (!window.confirm("Remove this member? This can't be undone until you re-add them.")) return;
    updateMembersField(
      "MembersTable",
      table.filter((_, idx) => idx !== i)
    );
    setEditingIndex((cur) => (cur === i ? null : cur));
  }

  async function handleBannerImageUpload(file: File) {
    setError(null);
    setUploadingBanner(true);
    try {
      const res = await uploadFile(file);
      updateBannerField("image", res.data.url);
    } catch (err: any) {
      setError(err.response?.data?.message || "Banner image upload failed.");
    } finally {
      setUploadingBanner(false);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
    }
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateIic(data);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Flex minH="60vh" align="center" justify="center">
        <Spinner size="xl" color="brand.orange" />
      </Flex>
    );
  }

  return (
    <Stack gap={0} mx="-20px" mt="-20px">
      {error && (
        <Box px={5} pt={4}>
          <Callout tone="error">{error}</Callout>
        </Box>
      )}
      {savedAt && (
        <Box px={5} pt={4}>
          <Callout tone="success">Saved.</Callout>
        </Box>
      )}

      {/* Banner Management */}
      <Box bg="gray.50" px={{ base: 5, lg: 10 }} pt="56px" pb="40px">
        <Stack align="center" gap={1} mb={7} textAlign="center">
          <Text color="brand.orange" fontWeight={800} fontSize="xs" letterSpacing="0.15em" textTransform="uppercase">
            Manage Public Page
          </Text>
          <Text color="brand.navy" fontWeight={800} fontSize="2xl">
            Banner Management
          </Text>
          <Box w="50px" h="3px" bg="brand.orange" borderRadius="full" mt={1} />
        </Stack>

        <Box bg="white" borderRadius="2xl" boxShadow="card" p={{ base: 5, lg: 8 }} maxW="1100px" mx="auto">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
            <Stack gap={4}>
              <Box>
                <Flex align="center" gap={2} mb={1}>
                  <PersonIcon color="var(--chakra-colors-gray-400)" size={14} />
                  <Text fontSize="xs" fontWeight={600} color="gray.600">
                    Eyebrow
                  </Text>
                </Flex>
                <Input value={banner.eyebrow ?? ""} onChange={(e) => updateBannerField("eyebrow", e.target.value)} bg="gray.50" borderRadius="lg" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.600" mb={1}>
                  Title
                </Text>
                <Input value={banner.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="gray.50" borderRadius="lg" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.600" mb={1}>
                  Subtitle
                </Text>
                <Textarea
                  value={banner.subtitle ?? ""}
                  onChange={(e) => updateBannerField("subtitle", e.target.value)}
                  rows={3}
                  bg="gray.50"
                  borderRadius="lg"
                />
              </Box>

              <input
                ref={bannerInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBannerImageUpload(file);
                }}
              />
              <chakra.button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                disabled={uploadingBanner}
                display="flex"
                alignItems="center"
                gap={2}
                w="fit-content"
                bg="brand.navy"
                color="white"
                fontSize="sm"
                fontWeight={700}
                px={5}
                py={2.5}
                borderRadius="lg"
                _hover={{ bg: "brand.navyDeep" }}
              >
                {uploadingBanner ? <Spinner size="xs" /> : <CameraIcon size={16} />}
                {uploadingBanner ? "Uploading..." : "Edit Banner"}
              </chakra.button>
            </Stack>

            <Box>
              <Text fontSize="xs" fontWeight={600} color="gray.600" mb={2}>
                Banner Preview
              </Text>
              <Box position="relative" borderRadius="xl" overflow="hidden" h="220px" bg="brand.navy" boxShadow="card">
                {banner.image && (
                  <chakra.img
                    src={banner.image}
                    alt="Banner preview"
                    position="absolute"
                    inset={0}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    opacity={0.55}
                    style={{ mixBlendMode: "overlay" }}
                  />
                )}
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="to-br"
                  gradientFrom="brand.navy"
                  gradientTo="rgba(14,36,85,0.2)"
                  style={{ clipPath: "polygon(0 0, 62% 0, 48% 100%, 0% 100%)" }}
                />
                <Box position="absolute" inset={0} bg="brand.orange" style={{ clipPath: "polygon(0 0, 66% 0, 52% 100%, 0% 100%)" }} zIndex={-1} />
                <Box position="absolute" bottom={5} left={6} zIndex={1}>
                  <Text color="white" fontWeight={800} fontSize="xl">
                    {banner.title || "IIC"}
                  </Text>
                  <Text color="brand.orange" fontWeight={700} fontSize="2xs" textTransform="uppercase" letterSpacing="0.1em">
                    {banner.eyebrow || "Nagarjuna Degree College"}
                  </Text>
                </Box>
              </Box>
              <Flex justify="center" gap={1.5} mt={3}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Box key={i} w="6px" h="6px" borderRadius="full" bg={i === 2 ? "brand.orange" : "gray.200"} />
                ))}
              </Flex>
            </Box>
          </Grid>
        </Box>

        {/* Stats bar */}
        <Grid
          templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr)" }}
          gap={4}
          bg="brand.navy"
          borderRadius="2xl"
          p={6}
          mt={8}
          maxW="1100px"
          mx="auto"
        >
          {[
            { icon: FaUsers, value: String(table.length).padStart(2, "0"), label: "Members", sub: "Active Members", bg: "orange.400" },
            { icon: FaHandshake, value: "01", label: "Section", sub: "IIC Section", bg: "blue.400" },
            { icon: FaChartLine, value: "10+", label: "Events", sub: "Organized", bg: "purple.400" },
            { icon: FaChartPie, value: "100+", label: "Students", sub: "Impacted", bg: "green.400" },
          ].map((s, i) => (
            <Flex key={i} align="center" gap={3}>
              <Flex w="52px" h="52px" borderRadius="full" bg={s.bg} align="center" justify="center" color="white" flex="0 0 auto">
                <s.icon size={20} />
              </Flex>
              <Box>
                <Text color="white" fontWeight={800} fontSize="xl" lineHeight={1}>
                  {s.value}
                </Text>
                <Text color="whiteAlpha.600" fontSize="2xs" fontWeight={600} textTransform="uppercase" letterSpacing="0.04em" mt="2px">
                  {s.label}
                </Text>
                <Text color="whiteAlpha.500" fontSize="2xs">
                  {s.sub}
                </Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>

      {/* Members */}
      <Box bg="white" px={{ base: 5, lg: 10 }} py="56px">
        <Stack align="center" gap={1} mb={2} textAlign="center">
          <Text color="brand.orange" fontWeight={800} fontSize="xs" letterSpacing="0.15em" textTransform="uppercase">
            Our Team
          </Text>
          <Text color="brand.navy" fontWeight={800} fontSize="2xl">
            IIC Members
          </Text>
          <Box w="50px" h="3px" bg="brand.orange" borderRadius="full" mt={1} mb={2} />
          <Text color="gray.500" fontSize="sm" maxW="480px">
            Meet the dedicated members driving innovation and collaboration.
          </Text>
        </Stack>

        <Box maxW="640px" mx="auto" mb={8}>
          <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1} textAlign="center">
            Section Title (shown on the public page)
          </Text>
          <Input
            value={members.title ?? ""}
            onChange={(e) => updateMembersField("title", e.target.value)}
            bg="gray.50"
            borderRadius="lg"
            textAlign="center"
          />
        </Box>

        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={5} maxW="1200px" mx="auto">
          {table.map((row, i) => {
            const editing = editingIndex === i;
            return (
              <Box
                key={i}
                position="relative"
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="2xl"
                boxShadow="card"
                p={5}
                textAlign="center"
              >
                <Box position="absolute" top={3} right={3}>
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Flex as="button" w="28px" h="28px" align="center" justify="center" borderRadius="md" color="gray.400" _hover={{ bg: "gray.50", color: "brand.navy" }}>
                        <KebabIcon size={18} />
                      </Flex>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value="edit" onClick={() => setEditingIndex(editing ? null : i)}>
                            {editing ? <CheckIcon size={16} style={{ marginRight: 8 }} /> : <EditIcon size={16} style={{ marginRight: 8 }} />}
                            {editing ? "Done" : "Edit"}
                          </Menu.Item>
                          <Menu.Separator />
                          <Menu.Item value="delete" color="red.500" onClick={() => removeMemberRow(i)}>
                            <DeleteIcon size={16} style={{ marginRight: 8 }} />
                            Delete
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Box>

                <Flex w="72px" h="72px" mx="auto" borderRadius="full" bg="orange.50" color="brand.orange" align="center" justify="center" mb={3}>
                  <PersonIcon size={34} />
                </Flex>

                {editing ? (
                  <Stack gap={2}>
                    <Input
                      value={row.name ?? ""}
                      onChange={(e) => updateMemberRow(i, "name", e.target.value)}
                      placeholder="Full name"
                      size="sm"
                      textAlign="center"
                      fontWeight={700}
                    />
                    <Input
                      value={row.role ?? ""}
                      onChange={(e) => updateMemberRow(i, "role", e.target.value)}
                      placeholder="Role (e.g. Chairperson)"
                      size="sm"
                      textAlign="center"
                    />
                    <Input
                      value={row.designation ?? ""}
                      onChange={(e) => updateMemberRow(i, "designation", e.target.value)}
                      placeholder="Designation"
                      size="sm"
                      textAlign="center"
                    />
                    <Input
                      value={row.contact ?? ""}
                      onChange={(e) => updateMemberRow(i, "contact", e.target.value)}
                      placeholder="Contact number"
                      size="sm"
                      textAlign="center"
                    />
                  </Stack>
                ) : (
                  <>
                    <Text fontWeight={800} color="brand.navy" fontSize="sm" truncate>
                      {row.name || "Unnamed"}
                    </Text>
                    {row.role && (
                      <Box display="inline-block" bg={ROLE_PILL.bg} color={ROLE_PILL.color} fontSize="2xs" fontWeight={700} px={2} py="2px" borderRadius="md" mt={1} mb={2}>
                        {row.role}
                      </Box>
                    )}
                    <Text fontSize="xs" color="gray.500" mb={3} truncate>
                      {row.designation || "—"}
                    </Text>
                    <Flex align="center" justify="center" gap={1.5} color="brand.navy" fontSize="xs" fontWeight={600}>
                      <PhoneIcon size={13} />
                      <Text>{row.contact || "—"}</Text>
                    </Flex>
                  </>
                )}
              </Box>
            );
          })}

          <chakra.button
            type="button"
            onClick={addMemberRow}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            border="2px dashed"
            borderColor="gray.200"
            borderRadius="2xl"
            color="gray.400"
            minH="180px"
            _hover={{ borderColor: "brand.orange", color: "brand.orange", bg: "orange.50" }}
            transition="all 0.15s"
          >
            <AddIcon size={22} />
            <Text fontSize="sm" fontWeight={700}>
              Add Member
            </Text>
          </chakra.button>
        </Grid>
      </Box>

      <Box px={5} py={5} bg="gray.50">
        <SaveBar saving={saving} onSave={handleSave} label={saving ? "Saving..." : "Save Changes"} summary="Changes apply to the public IIC page once saved." />
      </Box>
    </Stack>
  );
}

import { useEffect, useState } from "react";
import { Box, chakra, Flex, Grid, Input, Menu, Portal, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdMoreVert as KebabIcon,
  MdEdit as EditIcon,
  MdDelete as DeleteIcon,
  MdAdd as AddIcon,
  MdPhone as PhoneIcon,
  MdPerson as PersonIcon,
  MdCheck as CheckIcon,
  MdLightbulb as IicIcon,
  MdImage as BannerIcon,
  MdGroups as MembersIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getIic, updateIic } from "../services/data.service";
import { Callout, EditorHeader, EditorLayout, Panel, SaveBar, SectionHead, type TabCardSpec } from "../components/editorKit";

// IIC editor — originally a 1:1 port of a client-approved public-site-style
// mockup (full-bleed hero/stats-bar chrome instead of the admin Panel/
// EditorHeader/EditorLayout shell used by every other page). Restyled onto
// the shared studio kit for consistency with the rest of the app (explicit
// tradeoff: the approved mockup look is dropped in favor of matching every
// other editor page — Banner/Members as sidebar tabs, ImageControl instead
// of the bespoke upload button, EditorHeader instead of the fabricated
// stats bar that showed hardcoded, not-real, numbers like "10+ Events").
// Real doc shape (confirmed via GET /iic): { BannerSection: {eyebrow, title,
// subtitle, image}, IICMembers: {title, MembersTable: [{name, designation,
// role, contact}]} }. The member-card grid with inline kebab-menu edit/
// delete is kept as-is inside its tab — it's a legitimate, working directory-
// style UI for a list of people, not something that needs to become a plain
// AutoForm list.

const ROLE_PILL = { bg: "blue.50", color: "blue.600" };

const IIC_TABS: TabCardSpec[] = [
  { id: "banner", label: "Banner", icon: BannerIcon },
  { id: "members", label: "Members", icon: MembersIcon },
];

export function IicPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tabKey, setTabKey] = useState(IIC_TABS[0].id);

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
    <Stack gap={4}>
      <EditorHeader
        icon={IicIcon}
        eyebrow="IIC"
        title="Institution's Innovation Council"
        subtitle="Manage the IIC page's banner and member directory."
        stats={[{ value: table.length, label: "Members" }]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      <EditorLayout tabs={IIC_TABS} activeTab={tabKey} onChange={setTabKey}>
        <Panel p={5}>
          {tabKey === "banner" && (
            <>
              <SectionHead icon={BannerIcon} title="Banner" subtitle="Shown at the top of the public IIC page." />
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Eyebrow
                  </Text>
                  <Input value={banner.eyebrow ?? ""} onChange={(e) => updateBannerField("eyebrow", e.target.value)} bg="white" />
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Title
                  </Text>
                  <Input value={banner.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="white" />
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Subtitle
                  </Text>
                  <Textarea value={banner.subtitle ?? ""} onChange={(e) => updateBannerField("subtitle", e.target.value)} rows={3} bg="white" />
                </Box>
                <ImageControl label="Banner Image" value={banner.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
              </Stack>
            </>
          )}

          {tabKey === "members" && (
            <>
              <SectionHead icon={MembersIcon} title="IIC Members" subtitle="Add, edit, and remove member cards shown on the public page." />
              <Box maxW="480px" mb={6}>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title (shown on the public page)
                </Text>
                <Input value={members.title ?? ""} onChange={(e) => updateMembersField("title", e.target.value)} bg="white" />
              </Box>

              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={5}>
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
            </>
          )}
        </Panel>
      </EditorLayout>
      <Box px={5} py={5} bg="gray.50">
        <SaveBar saving={saving} onSave={handleSave} label={saving ? "Saving..." : "Save Changes"} summary="Changes apply to the public IIC page once saved." />
      </Box>
    </Stack>
  );
}

import { useEffect, useState } from "react";
import { Box, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import { MdLightbulb as IicIcon, MdImage as BannerIcon, MdGroups as MembersIcon } from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getIic, updateIic } from "../services/data.service";
import { AddButton, Callout, EditorHeader, EmptyState, IconBtn, Panel, RowCard, SaveBar, SectionHead } from "../components/editorKit";

// Dedicated IIC editor. Real doc shape (confirmed via ndc-web-main's
// src/app/iic/page.tsx + src/components/IIC/IICMembers.tsx) is much smaller
// than NCET's IIC editor (no Focus/Activities/ED-Cell/Reports/Gallery — those
// features don't exist on NDC's site): { BannerSection, IICMembers: { title,
// description[], MembersTable[] } }.
export function IicPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

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
  const description: string[] = members.description ?? [];
  const table: any[] = members.MembersTable ?? [];

  function updateBannerField(field: "eyebrow" | "title" | "subtitle" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }

  function updateMembersField(field: string, value: any) {
    setData((prev: any) => ({ ...prev, IICMembers: { ...(prev?.IICMembers ?? {}), [field]: value } }));
  }

  function updateDescriptionParagraph(i: number, value: string) {
    const next = [...description];
    next[i] = value;
    updateMembersField("description", next);
  }
  function addDescriptionParagraph() {
    updateMembersField("description", [...description, ""]);
  }
  function removeDescriptionParagraph(i: number) {
    updateMembersField("description", description.filter((_, idx) => idx !== i));
  }

  function updateMemberRow(i: number, field: "name" | "designation" | "role" | "contact", value: string) {
    const next = table.map((row, idx) => (idx === i ? { ...row, [field]: value } : row));
    updateMembersField("MembersTable", next);
  }
  function addMemberRow() {
    updateMembersField("MembersTable", [...table, { name: "", designation: "", role: "", contact: "" }]);
  }
  function removeMemberRow(i: number) {
    updateMembersField(
      "MembersTable",
      table.filter((_, idx) => idx !== i)
    );
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

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={IicIcon}
        eyebrow="IIC"
        title="IIC Management"
        subtitle="Manage the public Industry Institute Cell page."
        stats={[{ value: table.length, label: "Members" }]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
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
                <Textarea value={banner.subtitle ?? ""} onChange={(e) => updateBannerField("subtitle", e.target.value)} rows={2} bg="white" />
              </Box>
              <ImageControl label="Banner Image" value={banner.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead icon={MembersIcon} title="Members" subtitle="The IIC members table shown on the public page." />
            <Stack gap={5}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Section Title
                </Text>
                <Input
                  value={members.title ?? ""}
                  onChange={(e) => updateMembersField("title", e.target.value)}
                  bg="white"
                  placeholder="Industry Institute Cell (IIC) Members"
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Description
                </Text>
                <Stack gap={2}>
                  {description.map((p, i) => (
                    <RowCard key={i} align="flex-start" mb={0}>
                      <Textarea
                        value={p}
                        onChange={(e) => updateDescriptionParagraph(i, e.target.value)}
                        rows={2}
                        bg="white"
                        border="none"
                        px={0}
                        flex="1"
                      />
                      <IconBtn aria-label="Remove paragraph" tone="danger" confirm={false} onClick={() => removeDescriptionParagraph(i)} />
                    </RowCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addDescriptionParagraph}>
                    Add paragraph
                  </AddButton>
                </Stack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight={600} mb={2}>
                  Members Table
                </Text>
                {table.length === 0 ? (
                  <EmptyState title="No members yet" hint="Add a member to populate the public table." />
                ) : (
                  <Stack gap={2}>
                    {table.map((row, i) => (
                      <RowCard key={i} align="flex-start" wrap="wrap" mb={0}>
                        <Stack flex="1" minW="200px" gap={2}>
                          <Input value={row.name ?? ""} onChange={(e) => updateMemberRow(i, "name", e.target.value)} placeholder="Name" size="sm" bg="white" />
                          <Input
                            value={row.designation ?? ""}
                            onChange={(e) => updateMemberRow(i, "designation", e.target.value)}
                            placeholder="Designation"
                            size="sm"
                            bg="white"
                          />
                        </Stack>
                        <Stack flex="1" minW="160px" gap={2}>
                          <Input value={row.role ?? ""} onChange={(e) => updateMemberRow(i, "role", e.target.value)} placeholder="Role (optional)" size="sm" bg="white" />
                          <Input
                            value={row.contact ?? ""}
                            onChange={(e) => updateMemberRow(i, "contact", e.target.value)}
                            placeholder="Contact (optional)"
                            size="sm"
                            bg="white"
                          />
                        </Stack>
                        <IconBtn aria-label="Remove member" tone="danger" onClick={() => removeMemberRow(i)} />
                      </RowCard>
                    ))}
                  </Stack>
                )}
                <AddButton dashed size="sm" mt={3} onClick={addMemberRow}>
                  Add Member
                </AddButton>
              </Box>
            </Stack>
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public IIC page once saved."
          />
        </>
      )}
    </Stack>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, chakra, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { MdArrowBack as BackIcon, MdDescription as ContentIcon } from "react-icons/md";
import { ACTIVITY_GROUPS } from "../config/adminPages";
import { humanize } from "../components/fieldHeuristics";
import { ImageControl } from "../components/ImageControl";
import { getActivityCellById, updateActivityCell } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { StructuredEditorBody } from "../components/StructuredEditorBody";
import { Callout, Panel, SaveBar, SectionHead } from "../components/editorKit";

function findGroup(cellId: string): string {
  for (const [group, cells] of Object.entries(ACTIVITY_GROUPS)) {
    if (cells.includes(cellId)) return group;
  }
  return Object.keys(ACTIVITY_GROUPS)[0];
}

// Per-cell subpage — one of 16 real, independently addressable backend
// documents (ndc-backend-main's activityCell model, not an array-in-a-
// singleton) and one of 16 real public pages on the live site. Replaces the
// old ActivityCellsPage.tsx's two-dropdown single-page editor: each cell now
// gets its own dedicated route/page, matching how the data and the public
// site are actually structured.
//
// `bannerSection` is the only field common to every cell, so it gets a
// proper dedicated editor here; everything else is genuinely bespoke per
// cell (confirmed: only 1 of ~5 top-level keys overlaps between any two
// cells), so the rest is still handled by the generic StructuredEditorBody/
// AutoForm — just presented inside this page's own hero/shell instead of
// being crammed behind dropdowns.
export function ActivityCellDetailPage() {
  const { cellId = "" } = useParams<{ cellId: string }>();
  const navigate = useNavigate();
  const group = findGroup(cellId);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSavedAt(null);
    getActivityCellById(cellId)
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => {
        if (err.response?.status === 404) setData({});
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [cellId]);

  const bannerSection = data?.bannerSection ?? {};
  const { bannerSection: _omit, ...rest } = data ?? {};

  function updateBannerField(field: "title" | "image", value: string) {
    setData((prev: any) => ({ ...prev, bannerSection: { ...(prev?.bannerSection ?? {}), [field]: value } }));
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateActivityCell(cellId, group, data);
      setSavedAt(Date.now());
      triggerRevalidate(`/activities/${group}/${cellId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  // Hero heading always uses the humanized slug, not the saved banner title —
  // several cells have legacy junk titles (e.g. "api::ncc.ncc") from an old
  // CMS migration. The real saved title is still fully visible and editable
  // in the Banner panel below; this is just reliable admin-chrome, not page
  // content.
  const displayName = humanize(cellId);

  return (
    <Stack gap={5}>
      <Box
        position="relative"
        borderRadius="2xl"
        overflow="hidden"
        bg="brand.navy"
        p={{ base: 6, lg: 9 }}
        style={
          bannerSection.image
            ? {
                backgroundImage: `linear-gradient(120deg, rgba(14,36,85,0.93) 35%, rgba(14,36,85,0.55) 100%), url(${bannerSection.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <chakra.button
          type="button"
          onClick={() => navigate("/activity-cells")}
          display="flex"
          alignItems="center"
          gap={1}
          color="whiteAlpha.800"
          fontSize="sm"
          fontWeight={600}
          mb={4}
          _hover={{ color: "white" }}
        >
          <BackIcon size={16} /> Back to Activity Cells
        </chakra.button>
        <Text color="brand.orange" fontWeight={700} fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
          {humanize(group)}
        </Text>
        <Text color="white" fontWeight={800} fontSize={{ base: "2xl", lg: "3xl" }} letterSpacing="-0.01em">
          {displayName}
        </Text>
      </Box>

      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
            <SectionHead icon={ContentIcon} title="Banner" subtitle="Shown at the top of this cell's public page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input value={bannerSection.title ?? ""} onChange={(e) => updateBannerField("title", e.target.value)} bg="white" />
              </Box>
              <ImageControl label="Banner Image" value={bannerSection.image ?? ""} onChange={(url) => updateBannerField("image", url)} />
            </Stack>
          </Panel>

          <Panel p={6}>
            <SectionHead
              icon={ContentIcon}
              title="Page Content"
              subtitle="The rest of this cell's content — every cell has its own bespoke set of sections."
            />
            <StructuredEditorBody data={rest} onChange={(next) => setData((prev: any) => ({ ...prev, ...next }))} />
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes revalidate this cell's public page."
          />
        </>
      )}
    </Stack>
  );
}

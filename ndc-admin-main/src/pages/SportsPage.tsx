import { useEffect, useState } from "react";
import { Box, Grid, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import {
  MdSportsSoccer as SportsIcon,
  MdImage as BannerIcon,
  MdFlag as AboutIcon,
  MdPerson as HodIcon,
  MdCollections as GalleryIcon,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getSports, updateSports } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import {
  AddButton,
  CardHeader,
  Callout,
  EditorHeader,
  IconBtn,
  Panel,
  RowCard,
  SaveBar,
  SectionHead,
  SubtleCard,
} from "../components/editorKit";

// Dedicated Sports editor. Real doc shape (confirmed via GET /sports +
// ndc-web-main's src/app/sports/page.tsx + Sports/{AboutSections,
// HodMessage,Gallery}.tsx): { BannerSection: {eyebrow,title,subtitle,image},
// aboutSections: {title (dead — never rendered), sections: [{title,
// description, points[]}]}, HodMessage: {title,name,position,image,
// message:string[]}, gallerySection: {title, images:string[]} }.
//
// Important quirk baked into the public site: AboutSections.tsx doesn't
// index `sections` by position, it looks each one up by exact `title` string
// match ("Our Vision" / "Our Mission" / "Objectives"). Renaming one of those
// titles wouldn't just relabel a heading — that section would silently stop
// rendering on the live page entirely. So unlike every other list in this
// admin, these three are NOT a free add/remove list: the titles are fixed,
// read-only anchors, and only their description/points are editable.
//
// Only `aboutSections.title` is genuinely dead (present in data, never read
// by any component) — left out of the UI, but preserved on save since every
// update function below spreads the existing object before patching.

const VISION_TITLE = "Our Vision";
const MISSION_TITLE = "Our Mission";
const OBJECTIVES_TITLE = "Objectives";

function PointsEditor({ points, onChange }: { points: string[]; onChange: (points: string[]) => void }) {
  function updatePoint(i: number, value: string) {
    const next = [...points];
    next[i] = value;
    onChange(next);
  }
  function addPoint() {
    onChange([...points, ""]);
  }
  function removePoint(i: number) {
    onChange(points.filter((_, idx) => idx !== i));
  }
  return (
    <Stack gap={2}>
      {points.map((point, i) => (
        <RowCard key={i} mb={0}>
          <Input value={point} onChange={(e) => updatePoint(i, e.target.value)} bg="white" size="sm" flex="1" placeholder="Bullet point" />
          <IconBtn aria-label="Remove point" tone="danger" confirm={false} onClick={() => removePoint(i)} />
        </RowCard>
      ))}
      <AddButton dashed size="xs" onClick={addPoint}>
        Add Point
      </AddButton>
    </Stack>
  );
}

export function SportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSports()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const sections: any[] = data?.aboutSections?.sections ?? [];
  const vision = sections.find((s) => s.title === VISION_TITLE) ?? { title: VISION_TITLE, description: "", points: [] };
  const mission = sections.find((s) => s.title === MISSION_TITLE) ?? { title: MISSION_TITLE, description: "", points: [] };
  const objectives = sections.find((s) => s.title === OBJECTIVES_TITLE) ?? { title: OBJECTIVES_TITLE, description: "", points: [] };
  const hod = data?.HodMessage ?? {};
  const hodMessage: string[] = hod.message ?? [];
  const gallery = data?.gallerySection ?? {};
  const galleryImages: string[] = gallery.images ?? [];

  function updateBannerField(field: "eyebrow" | "title" | "subtitle" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }

  function updateAboutSection(title: string, field: "description" | "points", value: any) {
    setData((prev: any) => {
      const currentSections: any[] = prev?.aboutSections?.sections ?? [];
      const exists = currentSections.some((s) => s.title === title);
      const nextSections = exists
        ? currentSections.map((s) => (s.title === title ? { ...s, [field]: value } : s))
        : [...currentSections, { title, description: "", points: [], [field]: value }];
      return { ...prev, aboutSections: { ...(prev?.aboutSections ?? {}), sections: nextSections } };
    });
  }

  function updateHodField(field: "title" | "name" | "position" | "image" | "message", value: any) {
    setData((prev: any) => ({ ...prev, HodMessage: { ...(prev?.HodMessage ?? {}), [field]: value } }));
  }

  function updateGalleryField(field: "title" | "images", value: any) {
    setData((prev: any) => ({ ...prev, gallerySection: { ...(prev?.gallerySection ?? {}), [field]: value } }));
  }
  function updateGalleryImage(i: number, url: string) {
    updateGalleryField(
      "images",
      galleryImages.map((img, idx) => (idx === i ? url : img))
    );
  }
  function addGalleryImage() {
    updateGalleryField("images", [...galleryImages, ""]);
  }
  function removeGalleryImage(i: number) {
    updateGalleryField(
      "images",
      galleryImages.filter((_, idx) => idx !== i)
    );
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateSports(data);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute("/sports");
      if (publicPath) triggerRevalidate(publicPath);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={SportsIcon}
        eyebrow="Sports"
        title="Sports & Athletics Management"
        subtitle="Manage the public Sports page content."
        stats={[
          { value: galleryImages.length, label: "Gallery Photos" },
          { value: hodMessage.length, label: "Message Paragraphs" },
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          {/* Banner */}
            <Panel p={6}>
              <SectionHead icon={BannerIcon} title="Banner" subtitle="Shown at the top of the public Sports page." />
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

            {/* About: Vision / Mission / Objectives */}
            <Panel p={6}>
              <SectionHead icon={AboutIcon} title="Vision, Mission & Objectives" subtitle="Shown as three cards below the banner." />
              <Callout tone="info">
                These three section names are matched exactly by the public site — renaming them would make that section stop appearing, so
                only their description and bullet points are editable here.
              </Callout>
              <Stack gap={4} mt={4}>
                <SubtleCard>
                  <CardHeader>
                    <Text fontWeight={700} color="brand.navy">
                      {VISION_TITLE}
                    </Text>
                  </CardHeader>
                  <Box p={4}>
                    <Stack gap={3}>
                      <Box>
                        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                          Description
                        </Text>
                        <Textarea
                          value={vision.description ?? ""}
                          onChange={(e) => updateAboutSection(VISION_TITLE, "description", e.target.value)}
                          rows={2}
                          bg="white"
                        />
                      </Box>
                      <Box>
                        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                          Bullet Points
                        </Text>
                        <PointsEditor points={vision.points ?? []} onChange={(v) => updateAboutSection(VISION_TITLE, "points", v)} />
                      </Box>
                    </Stack>
                  </Box>
                </SubtleCard>

                <SubtleCard>
                  <CardHeader>
                    <Text fontWeight={700} color="brand.navy">
                      {MISSION_TITLE}
                    </Text>
                  </CardHeader>
                  <Box p={4}>
                    <Stack gap={3}>
                      <Box>
                        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                          Description
                        </Text>
                        <Textarea
                          value={mission.description ?? ""}
                          onChange={(e) => updateAboutSection(MISSION_TITLE, "description", e.target.value)}
                          rows={2}
                          bg="white"
                        />
                      </Box>
                      <Box>
                        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                          Bullet Points
                        </Text>
                        <PointsEditor points={mission.points ?? []} onChange={(v) => updateAboutSection(MISSION_TITLE, "points", v)} />
                      </Box>
                    </Stack>
                  </Box>
                </SubtleCard>

                <SubtleCard>
                  <CardHeader>
                    <Text fontWeight={700} color="brand.navy">
                      {OBJECTIVES_TITLE}
                    </Text>
                  </CardHeader>
                  <Box p={4}>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Bullet Points
                    </Text>
                    <Text fontSize="xs" color="gray.400" mb={2}>
                      Only the bullet points are shown on the public page for this card.
                    </Text>
                    <PointsEditor points={objectives.points ?? []} onChange={(v) => updateAboutSection(OBJECTIVES_TITLE, "points", v)} />
                  </Box>
                </SubtleCard>
              </Stack>
            </Panel>

            {/* HOD Message */}
            <Panel p={6}>
              <SectionHead icon={HodIcon} title="Director's Message" subtitle="Photo, name, and message shown in the message card." />
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Section Title
                  </Text>
                  <Input value={hod.title ?? ""} onChange={(e) => updateHodField("title", e.target.value)} bg="white" />
                </Box>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Name
                    </Text>
                    <Input value={hod.name ?? ""} onChange={(e) => updateHodField("name", e.target.value)} bg="white" />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Position
                    </Text>
                    <Input value={hod.position ?? ""} onChange={(e) => updateHodField("position", e.target.value)} bg="white" />
                  </Box>
                </Grid>
                <ImageControl label="Photo" value={hod.image ?? ""} onChange={(url) => updateHodField("image", url)} />
                <Box>
                  <Text fontSize="sm" fontWeight={600} mb={2}>
                    Message Paragraphs
                  </Text>
                  <Stack gap={2}>
                    {hodMessage.map((para, i) => (
                      <RowCard key={i} align="flex-start" mb={0}>
                        <Textarea
                          value={para}
                          onChange={(e) => {
                            const next = [...hodMessage];
                            next[i] = e.target.value;
                            updateHodField("message", next);
                          }}
                          rows={2}
                          bg="white"
                          border="none"
                          px={0}
                          flex="1"
                        />
                        <IconBtn
                          aria-label="Remove paragraph"
                          tone="danger"
                          confirm={false}
                          onClick={() => updateHodField("message", hodMessage.filter((_, idx) => idx !== i))}
                        />
                      </RowCard>
                    ))}
                    <AddButton dashed size="sm" onClick={() => updateHodField("message", [...hodMessage, ""])}>
                      Add Paragraph
                    </AddButton>
                  </Stack>
                </Box>
              </Stack>
            </Panel>

            {/* Gallery */}
            <Panel p={6}>
              <SectionHead icon={GalleryIcon} title="Gallery" subtitle="Photo grid shown at the bottom of the public page." />
              <Stack gap={4}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                    Section Title
                  </Text>
                  <Input value={gallery.title ?? ""} onChange={(e) => updateGalleryField("title", e.target.value)} bg="white" />
                </Box>
                <Stack gap={3}>
                  {galleryImages.map((url, i) => (
                    <SubtleCard key={i} mb={0}>
                      <CardHeader justify="space-between">
                        <Text fontWeight={600} fontSize="sm">
                          Image {i + 1}
                        </Text>
                        <IconBtn aria-label="Remove image" tone="danger" onClick={() => removeGalleryImage(i)} />
                      </CardHeader>
                      <Box p={3}>
                        <ImageControl value={url} onChange={(u) => updateGalleryImage(i, u)} />
                      </Box>
                    </SubtleCard>
                  ))}
                  <AddButton dashed size="sm" onClick={addGalleryImage}>
                    Add Image
                  </AddButton>
                </Stack>
              </Stack>
            </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public Sports page once saved."
          />
        </>
      )}
    </Stack>
  );
}

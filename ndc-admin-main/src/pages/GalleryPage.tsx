import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Box,
  Dialog,
  Flex,
  Grid,
  IconButton,
  Image,
  Input,
  NativeSelect,
  Portal,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  MdAdd,
  MdCategory,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdCollections as GalleryIcon,
  MdFolder as CategoryChipIcon,
  MdImage as BannerFieldIcon,
  MdPhotoLibrary,
  MdSearch,
  MdStar,
} from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getGallery, updateGallery } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { publicPathForRoute } from "../config/publicPathMap";
import { API_ROUTES } from "../services/route";
import {
  AddButton,
  Callout,
  EditorHeader,
  EmptyState,
  GhostButton,
  IconBtn,
  IconChip,
  Panel,
  PrimaryButton,
  SaveBar,
  SectionHead,
} from "../components/editorKit";

type TabImages = Record<string, string[]>;

// Gallery is a singleton document (see ndc-backend-main's createSingletonModel),
// shaped as { BannerSection: {...}, imagesSection: { tabImages: Record<category, url[]> } }
// (confirmed via ndc-web-main's public /gallery page). Unlike NCET's per-item
// collection, there's no per-image id/order — a category is just an object key,
// and an image's position in its array is its display order.
export function GalleryPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortBy, setSortBy] = useState<"name" | "count">("name");

  const [addOpen, setAddOpen] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [addImageUrl, setAddImageUrl] = useState("");

  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getGallery()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const tabImages: TabImages = data?.imagesSection?.tabImages ?? {};
  const categories = Object.keys(tabImages);
  const totalImages = categories.reduce((sum, c) => sum + (tabImages[c]?.length ?? 0), 0);
  const largestCategory = categories.reduce<{ name: string; count: number } | null>((best, c) => {
    const count = tabImages[c]?.length ?? 0;
    if (!best || count > best.count) return { name: c, count };
    return best;
  }, null);

  const groups = useMemo(() => {
    let list = categories.map((category) => ({ category, images: tabImages[category] ?? [] }));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((g) => g.category.toLowerCase().includes(q));
    }
    if (categoryFilter !== "All Categories") {
      list = list.filter((g) => g.category === categoryFilter);
    }
    return [...list].sort((a, b) =>
      sortBy === "name" ? a.category.localeCompare(b.category) : b.images.length - a.images.length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabImages, search, categoryFilter, sortBy]);

  function updateTabImages(next: TabImages) {
    setData((prev: any) => ({
      ...prev,
      imagesSection: { ...(prev?.imagesSection ?? {}), tabImages: next },
    }));
  }

  function updateBannerField(field: "title" | "description" | "image", value: string) {
    setData((prev: any) => ({
      ...prev,
      BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value },
    }));
  }

  function openAddModal(category?: string) {
    setAddCategory(category ?? "");
    setAddImageUrl("");
    setAddOpen(true);
  }

  function handleAddImage() {
    const category = addCategory.trim();
    if (!category || !addImageUrl) return;
    const next = { ...tabImages };
    next[category] = [...(next[category] ?? []), addImageUrl];
    updateTabImages(next);
    setAddOpen(false);
  }

  function removeImage(category: string, index: number) {
    const list = (tabImages[category] ?? []).filter((_, i) => i !== index);
    const next = { ...tabImages };
    if (list.length === 0) delete next[category];
    else next[category] = list;
    updateTabImages(next);
  }

  function replaceImage(category: string, index: number, url: string) {
    const list = [...(tabImages[category] ?? [])];
    list[index] = url;
    updateTabImages({ ...tabImages, [category]: list });
  }

  function renameCategory(oldName: string, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) return;
    const next = { ...tabImages };
    const images = next[oldName] ?? [];
    delete next[oldName];
    next[trimmed] = [...(next[trimmed] ?? []), ...images];
    updateTabImages(next);
    setEditCategory(trimmed);
  }

  function deleteCategory(category: string) {
    const next = { ...tabImages };
    delete next[category];
    updateTabImages(next);
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      await updateGallery(data);
      setSavedAt(Date.now());
      const publicPath = publicPathForRoute(API_ROUTES.GALLERY.GET);
      if (publicPath) triggerRevalidate(publicPath);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  const editingImages = editCategory ? tabImages[editCategory] ?? [] : [];

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={GalleryIcon}
        eyebrow="Gallery"
        title="Gallery Management"
        subtitle="Manage gallery categories and images shown on the public site."
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Saved.</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <>
          <Panel p={6}>
            <SectionHead icon={BannerFieldIcon} title="Hero Banner" subtitle="Shown at the top of the public Gallery page." />
            <Stack gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Title
                </Text>
                <Input
                  value={data?.BannerSection?.title ?? ""}
                  onChange={(e) => updateBannerField("title", e.target.value)}
                  bg="white"
                />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Description
                </Text>
                <Textarea
                  value={data?.BannerSection?.description ?? ""}
                  onChange={(e) => updateBannerField("description", e.target.value)}
                  rows={2}
                  bg="white"
                />
              </Box>
              <ImageControl
                label="Banner Image"
                value={data?.BannerSection?.image ?? ""}
                onChange={(url) => updateBannerField("image", url)}
              />
            </Stack>
          </Panel>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <StatCard icon={MdCategory} label="Total Categories" value={categories.length} tone="navy" />
            <StatCard icon={MdPhotoLibrary} label="Total Images" value={totalImages} tone="orange" />
            <StatCard
              icon={MdStar}
              label="Largest Category"
              value={largestCategory ? `${largestCategory.name} (${largestCategory.count})` : "—"}
              tone="green"
            />
          </Grid>

          <Panel p={0} overflow="hidden">
            <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="gray.100" wrap="wrap" gap={3}>
              <SectionHead icon={CategoryChipIcon} title="Categories" subtitle="Every category shown on the public gallery." />
              <PrimaryButton icon={MdAdd} onClick={() => openAddModal()}>
                Add Images
              </PrimaryButton>
            </Flex>

            <Flex p={6} gap={3} borderBottom="1px solid" borderColor="gray.100" wrap="wrap">
              <Box position="relative" maxW="320px" flex="1">
                <Box position="absolute" top="50%" left="12px" transform="translateY(-50%)" color="gray.400" pointerEvents="none">
                  <MdSearch size={18} />
                </Box>
                <Input
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  pl="38px"
                  bg="white"
                />
              </Box>
              <NativeSelect.Root maxW="220px" size="sm">
                <NativeSelect.Field value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option>All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <NativeSelect.Root maxW="200px" size="sm">
                <NativeSelect.Field value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "count")}>
                  <option value="name">Name (A–Z)</option>
                  <option value="count">Most images first</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>

            <Box p={6}>
              {groups.length === 0 ? (
                <EmptyState
                  icon={GalleryIcon}
                  title="No categories found"
                  hint={categories.length === 0 ? "Add your first image to get started." : "Try a different search or filter."}
                />
              ) : (
                <Stack gap={3}>
                  {groups.map((group) => (
                    <CategoryRow
                      key={group.category}
                      category={group.category}
                      images={group.images}
                      onPreview={(index) => setLightbox({ images: group.images, index })}
                      onEdit={() => {
                        setEditCategory(group.category);
                        setRenameValue(group.category);
                      }}
                      onDelete={() => deleteCategory(group.category)}
                    />
                  ))}
                </Stack>
              )}
              <Text mt={4} fontSize="sm" color="gray.500">
                Showing {groups.length} of {categories.length} categories
              </Text>
            </Box>
          </Panel>

          <SaveBar
            saving={saving}
            onSave={handleSave}
            label={saving ? "Saving..." : "Save"}
            summary="Changes apply to the public gallery once saved."
          />
        </>
      )}

      {/* Add Images modal */}
      <Dialog.Root open={addOpen} onOpenChange={(e) => setAddOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add Images</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Category
                    </Text>
                    <Input
                      value={addCategory}
                      onChange={(e) => setAddCategory(e.target.value)}
                      placeholder="e.g., Campus Life, Convocation..."
                      list="gallery-category-suggestions"
                      bg="white"
                    />
                    <datalist id="gallery-category-suggestions">
                      {categories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </Box>
                  <ImageControl label="Image" value={addImageUrl} onChange={setAddImageUrl} />
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <GhostButton onClick={() => setAddOpen(false)}>Cancel</GhostButton>
                <PrimaryButton onClick={handleAddImage} disabled={!addCategory.trim() || !addImageUrl}>
                  Add Image
                </PrimaryButton>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close" size="sm" variant="ghost" position="absolute" top={3} right={3}>
                  <MdClose size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Edit Category modal */}
      <Dialog.Root open={editCategory !== null} onOpenChange={(e) => !e.open && setEditCategory(null)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit Category</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                      Category Name
                    </Text>
                    <Flex gap={2}>
                      <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} bg="white" />
                      <GhostButton
                        size="sm"
                        onClick={() => editCategory && renameCategory(editCategory, renameValue)}
                        disabled={!renameValue.trim() || renameValue === editCategory}
                      >
                        Rename
                      </GhostButton>
                    </Flex>
                  </Box>

                  <AddButton dashed size="sm" onClick={() => editCategory && openAddModal(editCategory)}>
                    Add image to {editCategory}
                  </AddButton>

                  {editingImages.length === 0 ? (
                    <EmptyState icon={GalleryIcon} title="No images in this category" />
                  ) : (
                    <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={3} maxH="420px" overflowY="auto" pr={1}>
                      {editingImages.map((img, i) => (
                        <ImageControl
                          key={i}
                          value={img}
                          onChange={(url) => (url ? replaceImage(editCategory!, i, url) : removeImage(editCategory!, i))}
                        />
                      ))}
                    </Grid>
                  )}
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <GhostButton onClick={() => setEditCategory(null)}>Close</GhostButton>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close" size="sm" variant="ghost" position="absolute" top={3} right={3}>
                  <MdClose size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndexChange={(index) => setLightbox({ images: lightbox.images, index })}
        />
      )}
    </Stack>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: ComponentType<{ size?: number }>;
  label: string;
  value: string | number;
  tone: "navy" | "orange" | "green";
}) {
  const tones = {
    navy: { bg: "#eaeff8", iconBg: "#dce5f6", color: "brand.navy" },
    orange: { bg: "#fef3ec", iconBg: "#fde8d9", color: "brand.orange" },
    green: { bg: "#f0fdf4", iconBg: "#dcfce7", color: "green.600" },
  } as const;
  const t = tones[tone];
  return (
    <Box bg={t.bg} borderRadius="lg" p={5}>
      <Flex align="center" gap={3}>
        <Flex w="48px" h="48px" borderRadius="md" bg={t.iconBg} color={t.color} align="center" justify="center" flex="0 0 auto">
          <Icon size={22} />
        </Flex>
        <Box>
          <Text fontSize="xs" color="gray.500" fontWeight={500}>
            {label}
          </Text>
          <Text fontSize="lg" fontWeight={700} color="gray.900">
            {value}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

function CategoryRow({
  category,
  images,
  onPreview,
  onEdit,
  onDelete,
}: {
  category: string;
  images: string[];
  onPreview: (index: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const displayImages = images.slice(0, 3);
  const remaining = images.length - displayImages.length;
  return (
    <Flex
      align="center"
      gap={4}
      p={4}
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="lg"
      boxShadow="0 1px 3px rgba(0,0,0,0.03)"
      wrap="wrap"
    >
      <Flex align="center" gap={3} flex="1" minW="200px">
        <IconChip icon={CategoryChipIcon} size={18} box={40} onDark={false} />
        <Box>
          <Text fontWeight={600} color="gray.900" fontSize="sm">
            {category}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {images.length} {images.length === 1 ? "image" : "images"}
          </Text>
        </Box>
      </Flex>

      <Flex gap={2} flex="0 0 auto">
        {displayImages.map((src, i) => (
          <Box
            key={i}
            as="button"
            onClick={() => onPreview(i)}
            w="56px"
            h="56px"
            borderRadius="md"
            overflow="hidden"
            bg="gray.50"
            border="none"
            cursor="pointer"
            p={0}
          >
            <Image src={src} alt="" w="100%" h="100%" objectFit="cover" />
          </Box>
        ))}
        {remaining > 0 && (
          <Flex
            as="button"
            onClick={() => onPreview(3)}
            w="56px"
            h="56px"
            borderRadius="md"
            border="1px dashed"
            borderColor="gray.200"
            bg="gray.50"
            align="center"
            justify="center"
            fontSize="xs"
            fontWeight={600}
            color="gray.500"
            cursor="pointer"
          >
            +{remaining}
          </Flex>
        )}
      </Flex>

      <Flex gap={2} flex="0 0 auto">
        <GhostButton size="xs" onClick={onEdit}>
          Edit
        </GhostButton>
        <IconBtn
          aria-label="Delete category"
          tone="danger"
          size="xs"
          confirmMessage={`Delete all ${images.length} images in "${category}"?`}
          onClick={onDelete}
        />
      </Flex>
    </Flex>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const prev = () => onIndexChange((index - 1 + images.length) % images.length);
  const next = () => onIndexChange((index + 1) % images.length);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  return (
    <Box position="fixed" inset={0} zIndex={2000} bg="rgba(0,0,0,0.92)" onClick={onClose}>
      <IconButton
        aria-label="Close"
        position="absolute"
        top={6}
        right={6}
        variant="ghost"
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={onClose}
      >
        <MdClose size={22} />
      </IconButton>
      <IconButton
        aria-label="Previous image"
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        variant="ghost"
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        <MdChevronLeft size={28} />
      </IconButton>
      <Flex h="100%" align="center" justify="center" px="80px" onClick={(e) => e.stopPropagation()}>
        <Image src={images[index]} alt="" maxH="85vh" maxW="100%" objectFit="contain" borderRadius="md" />
      </Flex>
      <IconButton
        aria-label="Next image"
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        variant="ghost"
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        <MdChevronRight size={28} />
      </IconButton>
      <Text position="absolute" bottom={6} left={0} right={0} textAlign="center" color="whiteAlpha.700" fontSize="sm">
        {index + 1} / {images.length}
      </Text>
    </Box>
  );
}

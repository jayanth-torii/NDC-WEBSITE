import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Input, Stack, Switch, Text, Textarea } from "@chakra-ui/react";
import { MdArticle as BlogIcon } from "react-icons/md";
import { ImageControl } from "../components/ImageControl";
import { getBlogById, addBlog, updateBlog, getBlogs } from "../services/data.service";
import { triggerRevalidate } from "../services/revalidate";
import { AddButton, Callout, EditorHeader, IconBtn, Panel, RowCard, SaveBar } from "../components/editorKit";

const emptyForm = {
  postId: 0,
  title: "",
  description: "",
  blogImage: "",
  content: [""],
  order: 0,
  isActive: true,
};

export function BlogEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const isNew = postId === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) {
      getBlogs().then((res) => {
        const maxId = res.data.reduce((m: number, b: any) => Math.max(m, b.postId), 0);
        setForm({ ...emptyForm, postId: maxId + 1, order: maxId + 1 });
      });
      return;
    }
    setLoading(true);
    getBlogById(Number(postId))
      .then((res) => setForm(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId, isNew]);

  function updateParagraph(i: number, value: string) {
    const content = [...form.content];
    content[i] = value;
    setForm({ ...form, content });
  }
  function addParagraph() {
    setForm({ ...form, content: [...form.content, ""] });
  }
  function removeParagraph(i: number) {
    setForm({ ...form, content: form.content.filter((_, idx) => idx !== i) });
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      if (isNew) {
        await addBlog(form);
      } else {
        await updateBlog(Number(postId), form);
      }
      triggerRevalidate("/blog");
      triggerRevalidate(`/blog/${form.postId}`);
      navigate("/blogs");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  return (
    <Box maxW="800px">
      <Stack gap={5}>
        <EditorHeader
          icon={BlogIcon}
          eyebrow="Blog"
          title={isNew ? "New Blog Post" : `Edit Blog Post #${form.postId}`}
          subtitle={isNew ? "Publish a new post to the public blog." : "Update this published post."}
          mode={isNew ? "create" : "edit"}
        />
        {error && <Callout tone="error">{error}</Callout>}

        <Panel p={6}>
          <Stack gap={5}>
            <Box>
              <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                Title
              </Text>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} bg="white" />
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                Description (excerpt)
              </Text>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                bg="white"
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight={600} mb={2}>
                Cover Image
              </Text>
              <ImageControl value={form.blogImage} onChange={(url) => setForm({ ...form, blogImage: url })} />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight={600} mb={2}>
                Content (one box per paragraph block, rendered in order)
              </Text>
              <Stack gap={2}>
                {form.content.map((p, i) => (
                  <RowCard key={i} align="flex-start" mb={0}>
                    <Textarea
                      value={p}
                      onChange={(e) => updateParagraph(i, e.target.value)}
                      rows={3}
                      bg="white"
                      border="none"
                      px={0}
                      flex="1"
                    />
                    <IconBtn
                      aria-label="Remove paragraph"
                      tone="danger"
                      confirm={false}
                      onClick={() => removeParagraph(i)}
                      disabled={form.content.length <= 1}
                    />
                  </RowCard>
                ))}
                <AddButton dashed size="sm" onClick={addParagraph}>
                  Add paragraph
                </AddButton>
              </Stack>
            </Box>

            <Stack direction="row" gap={6} align="center">
              <Box maxW="120px">
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Order
                </Text>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  bg="white"
                />
              </Box>
              <Switch.Root
                checked={form.isActive}
                onCheckedChange={(e) => setForm({ ...form, isActive: e.checked })}
                colorPalette="orange"
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Active</Switch.Label>
              </Switch.Root>
            </Stack>
          </Stack>
        </Panel>

        <SaveBar
          saving={saving}
          onSave={handleSave}
          label={isNew ? "Publish" : "Save Changes"}
          summary={isNew ? "This will add a new post to the blog." : "Changes go live immediately."}
        />
      </Stack>
    </Box>
  );
}

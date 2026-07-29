import { useEffect, useRef, useState } from "react";
import { Badge, Box, Flex, Grid, Image, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import { FiCamera, FiMail, FiShield, FiCalendar, FiMapPin, FiLock } from "react-icons/fi";
import { MdPerson as ProfileIcon } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";
import { getMe, updateProfile } from "../services/data.service";
import { uploadFile } from "../services/upload.service";
import { Callout, EditorHeader, Panel, SaveBar, SectionHead } from "../components/editorKit";

// Rebuilt on the shared Chakra v3 editorKit (Panel/EditorHeader/Callout/
// SaveBar) — the previous version was written against Chakra v2 APIs
// (FormControl, useToast, Divider, isLoading/isClosable props) that don't
// exist in this app's Chakra v3.36.1, so it crashed on render. Also now
// refreshes from GET /auth/me on mount: the cached localStorage user (set at
// login) can be stale/incomplete relative to what's actually saved.

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function AvatarUpload({
  imageUrl,
  name,
  uploading,
  onUpload,
}: {
  imageUrl: string;
  name: string;
  uploading: boolean;
  onUpload: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box w="152px" h="152px" mx="auto" borderRadius="full" border="6px solid white" boxShadow="lg" bg="gray.100" position="relative" overflow="hidden">
      {imageUrl ? (
        <Image src={imageUrl} alt="Profile" objectFit="cover" w="100%" h="100%" />
      ) : (
        <Flex w="100%" h="100%" align="center" justify="center" bg="brand.navy" color="white" fontSize="56px" fontWeight="bold">
          {name?.charAt(0)?.toUpperCase() || "A"}
        </Flex>
      )}
      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        direction="column"
        align="center"
        gap={0}
        bg="blackAlpha.600"
        py={2}
        cursor="pointer"
        transition="background 0.15s"
        _hover={{ bg: "blackAlpha.700" }}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <Spinner size="xs" color="white" /> : <FiCamera color="white" size={16} />}
        <Text color="white" fontSize="2xs" fontWeight={600} mt={1}>
          {uploading ? "Uploading..." : "Change"}
        </Text>
      </Flex>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
    </Box>
  );
}

export function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    dob: user?.dob || "",
    address: user?.address || "",
    profileImage: user?.profileImage || "",
  });
  const [createdAt, setCreatedAt] = useState(user?.createdAt);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    getMe()
      .then((res) => {
        const fresh = res?.data;
        if (!fresh) return;
        updateUser(fresh);
        setFormData({
          name: fresh.name || "",
          dob: fresh.dob || "",
          address: fresh.address || "",
          profileImage: fresh.profileImage || "",
        });
        setCreatedAt(fresh.createdAt);
      })
      .catch(() => {
        // Best-effort refresh — the locally cached user from login already renders the page.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateField(field: "name" | "dob" | "address", value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAvatarUpload(file: File) {
    setError(null);
    setUploading(true);
    try {
      const res = await uploadFile(file);
      setFormData((prev) => ({ ...prev, profileImage: res.data.url }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      const res = await updateProfile(formData);
      if (res?.data) {
        updateUser(res.data);
        setCreatedAt(res.data.createdAt);
      }
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  const memberSince = formatDate(createdAt);

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={ProfileIcon}
        eyebrow="Account"
        title="Admin Profile"
        subtitle="Manage your account details and photo."
        stats={[
          { value: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Admin", label: "Role" },
          ...(memberSince ? [{ value: memberSince, label: "Member Since" }] : []),
        ]}
        mode={savedAt ? "edit" : undefined}
      />
      {error && <Callout tone="error">{error}</Callout>}
      {savedAt && <Callout tone="success">Profile updated.</Callout>}

      <Grid templateColumns={{ base: "1fr", lg: "320px 1fr" }} gap={5} alignItems="start">
        <Panel p={6} textAlign="center">
          <AvatarUpload imageUrl={formData.profileImage} name={formData.name} uploading={uploading} onUpload={handleAvatarUpload} />

          <Text fontSize="lg" fontWeight={800} color="brand.navy" mt={4}>
            {formData.name || "Admin User"}
          </Text>
          <Badge mt={1} bg="orange.50" color="brand.orange" fontWeight={700} fontSize="2xs" textTransform="uppercase" letterSpacing="wider" px={2} py={1} borderRadius="md">
            {user?.role || "Administrator"}
          </Badge>

          <Stack gap={3} mt={6} textAlign="left">
            <Flex align="center" gap={2} color="gray.600" fontSize="sm">
              <FiMail color="var(--chakra-colors-brand-navy)" />
              <Text truncate>{user?.email || "Not provided"}</Text>
            </Flex>
            <Flex align="center" gap={2} color="gray.600" fontSize="sm">
              <FiShield color="var(--chakra-colors-brand-navy)" />
              <Text>Access level: {user?.role || "Admin"}</Text>
            </Flex>
            {formData.dob && (
              <Flex align="center" gap={2} color="gray.600" fontSize="sm">
                <FiCalendar color="var(--chakra-colors-brand-navy)" />
                <Text>{formatDate(formData.dob) || formData.dob}</Text>
              </Flex>
            )}
            {formData.address && (
              <Flex align="flex-start" gap={2} color="gray.600" fontSize="sm">
                <Box mt="2px">
                  <FiMapPin color="var(--chakra-colors-brand-navy)" />
                </Box>
                <Text>{formData.address}</Text>
              </Flex>
            )}
          </Stack>
        </Panel>

        <Panel p={6}>
          <SectionHead icon={ProfileIcon} title="Personal Information" subtitle="Shown only to you and other admins." />
          <Stack gap={5}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Full Name
                </Text>
                <Input value={formData.name} onChange={(e) => updateField("name", e.target.value)} bg="white" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                  Date of Birth
                </Text>
                <Input type="date" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)} bg="white" />
              </Box>
            </Grid>

            <Box>
              <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
                Address
              </Text>
              <Textarea
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                rows={4}
                bg="white"
                placeholder="Street, city, state, PIN code"
              />
            </Box>

            <Box>
              <Flex align="center" gap={1} mb={1}>
                <Text fontSize="xs" fontWeight={600} color="gray.500">
                  Email Address
                </Text>
                <FiLock size={11} color="var(--chakra-colors-gray-400)" />
              </Flex>
              <Input value={user?.email || ""} disabled bg="gray.50" color="gray.500" />
              <Text fontSize="xs" color="gray.400" mt={1}>
                Contact a system administrator to change your email.
              </Text>
            </Box>
          </Stack>
        </Panel>
      </Grid>

      <SaveBar saving={saving} onSave={handleSave} label={saving ? "Saving..." : "Save Changes"} summary="Changes are visible only to you." />
    </Stack>
  );
}

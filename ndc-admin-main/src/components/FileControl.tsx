import { useRef, useState } from "react";
import { Badge, Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  MdPictureAsPdf as PictureAsPdfIcon,
  MdVisibility as VisibilityIcon,
  MdDownload as DownloadIcon,
  MdUploadFile as UploadIcon,
  MdDelete as DeleteIcon,
} from "react-icons/md";
import { uploadImage } from "../services/data.service";

// PDF field control — never shows the raw file URL. Just a "PDF attached"
// badge plus View (opens the file) / Download (forces a save-to-disk,
// bypassing browsers ignoring the <a download> attribute for cross-origin
// URLs) / Upload-Change / Remove actions.
export function FileControl({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file); // shared /upload endpoint — accepts PDFs too
      onChange(res.data.url);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDownload() {
    if (!value) return;
    setDownloading(true);
    try {
      const res = await fetch(value);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = decodeURIComponent(value.split("/").pop() || "document.pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(value, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="sm" p={3} bg="white">
      {label && (
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={2}>
          {label}
        </Text>
      )}
      <Flex mb={value ? 3 : 0}>
        {value ? (
          <Badge bg="rgba(246,135,42,0.1)" color="brand.navy" px={2} py={1} display="flex" alignItems="center" gap={1}>
            <PictureAsPdfIcon size={16} style={{ color: "#F6872A" }} />
            PDF attached
          </Badge>
        ) : (
          <Badge variant="outline" color="gray.400">
            No file
          </Badge>
        )}
      </Flex>
      <Flex gap={2} wrap="wrap">
        {value && (
          <Button size="xs" variant="ghost" color="brand.navy" onClick={() => window.open(value, "_blank", "noopener,noreferrer")}>
            <VisibilityIcon size={14} />
            View
          </Button>
        )}
        {value && (
          <Button size="xs" variant="ghost" color="brand.navy" disabled={downloading} onClick={handleDownload}>
            {downloading ? <Spinner size="xs" /> : <DownloadIcon size={14} />}
            Download
          </Button>
        )}
        <input ref={inputRef} type="file" accept="application/pdf" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
        <Button
          size="xs"
          variant="outline"
          borderColor="brand.navy"
          color="brand.navy"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          _hover={{ bg: "gray.50" }}
        >
          {uploading ? <Spinner size="xs" /> : <UploadIcon size={14} />}
          {uploading ? "Uploading..." : value ? "Change" : "Upload"}
        </Button>
        {value && (
          <Button size="xs" variant="outline" colorPalette="red" onClick={() => onChange("")}>
            <DeleteIcon size={14} />
            Remove
          </Button>
        )}
      </Flex>
    </Box>
  );
}

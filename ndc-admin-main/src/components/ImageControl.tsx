import { useRef, useState } from "react";
import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { MdUploadFile as UploadIcon, MdDelete as DeleteIcon, MdImage as ImageIcon } from "react-icons/md";
import { uploadImage } from "../services/data.service";

export function ImageControl({
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

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      onChange(res.data.url);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="sm" p={3} bg="white">
      {label && (
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={2}>
          {label}
        </Text>
      )}
      <Flex
        w="100%"
        h="160px"
        borderRadius="sm"
        overflow="hidden"
        bg="gray.50"
        align="center"
        justify="center"
        mb={3}
      >
        {value ? (
          <Image src={value} alt="" w="100%" h="100%" objectFit="contain" />
        ) : (
          <Flex direction="column" align="center" gap={1} color="gray.400">
            <ImageIcon size={32} />
            <Text fontSize="xs">No image</Text>
          </Flex>
        )}
      </Flex>
      <Flex gap={2} wrap="wrap">
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
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

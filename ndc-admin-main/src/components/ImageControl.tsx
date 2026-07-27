import { useRef, useState } from "react";
import { Box, Button, Stack, Typography, CircularProgress } from "@mui/material";
import { uploadImage } from "../services/data.service";

export function ImageControl({ value, onChange }: { value: string; onChange: (url: string) => void }) {
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
    }
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {value ? (
        <Box
          component="img"
          src={value}
          alt=""
          sx={{ width: 96, height: 64, objectFit: "cover", borderRadius: 1, border: "1px solid #ddd" }}
        />
      ) : (
        <Box
          sx={{
            width: 96,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #bbb",
            borderRadius: 1,
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          No image
        </Box>
      )}
      <Stack spacing={1}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button size="small" variant="outlined" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? <CircularProgress size={16} /> : value ? "Change" : "Upload"}
        </Button>
        {value && (
          <Button size="small" color="error" onClick={() => onChange("")}>
            Remove
          </Button>
        )}
        <Typography variant="caption" sx={{ wordBreak: "break-all", maxWidth: 240 }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}

// The backend's upload endpoint always returns a full S3 URL (multer-s3's
// `file.location`), and data-export's existing image/pdf paths are already
// relative to this app's own /public (from the earlier CMS-media
// localization pass). Both forms are directly usable as-is by <Image>/<img>
// — there's no backend-relative "/uploads/.." case to resolve here (unlike
// NCET's setup, which serves some media from its own disk).
export function assetUrl(value: string | null | undefined): string {
  return value || "";
}

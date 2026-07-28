// Shape-inference helpers that let AutoForm render a proper field for any
// Mixed-data JSON value without a backend schema (there isn't one — every
// content model is a schemaless `data: Mixed` document, see
// ndc-backend-main/src/utils/modelFactory.js). Detection is heuristic
// (key name + value shape), matching how NCET's admin infers icon/file
// fields from key names.

const ACRONYMS: Record<string, string> = {
  pdf: "PDF",
  url: "URL",
  id: "ID",
  iic: "IIC",
  iqac: "IQAC",
  nirf: "NIRF",
  ncc: "NCC",
  nss: "NSS",
  hod: "HOD",
  ndc: "NDC",
  ug: "UG",
  pg: "PG",
  bca: "BCA",
  bba: "BBA",
  mba: "MBA",
  mca: "MCA",
};

export function humanize(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return spaced
    .split(" ")
    .filter(Boolean)
    .map((w) => {
      const lower = w.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      return w[0].toUpperCase() + w.slice(1);
    })
    .join(" ");
}

// Internal/technical bookkeeping keys — never rendered, but preserved as-is
// (AutoForm clones-and-patches the source object rather than rebuilding it
// from rendered fields, so hiding a key never drops its value).
export const HIDDEN_KEYS = new Set([
  "_id",
  "__v",
  "id",
  "documentId",
  "createdAt",
  "updatedAt",
  "publishedAt",
]);

const IMAGE_KEY_RE = /image|banner|logo|photo|cover|avatar|picture/i;
const PDF_KEY_RE = /pdf|brochure|document|newsletter.?file|syllabus.?file|certificate.?file/i;
const IMAGE_VALUE_RE = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i;
const PDF_VALUE_RE = /\.pdf(\?.*)?$/i;

export function isImageField(key: string, value: unknown): boolean {
  if (typeof value === "string" && IMAGE_VALUE_RE.test(value)) return true;
  // Unset (null/undefined/"") fields fall back to key-name matching, so a
  // blank image field still gets an upload control before any value exists.
  if ((value == null || value === "") && IMAGE_KEY_RE.test(key)) return true;
  return false;
}

export function isPdfField(key: string, value: unknown): boolean {
  if (typeof value === "string" && PDF_VALUE_RE.test(value)) return true;
  if ((value == null || value === "") && PDF_KEY_RE.test(key)) return true;
  return false;
}

// Builds a same-shape "blank" value from a sample — used when adding a new
// row to an array so the new item matches its siblings' fields instead of
// being an empty, field-less object.
export function emptyLike(sample: any): any {
  if (Array.isArray(sample)) return [];
  if (sample !== null && typeof sample === "object") {
    const out: Record<string, any> = {};
    for (const k of Object.keys(sample)) out[k] = emptyLike(sample[k]);
    return out;
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

// Best-effort label for one item in an array-of-objects list, so the
// collapsed accordion header shows something meaningful instead of "Item 3".
export function itemLabel(item: any, index: number): string {
  if (item && typeof item === "object") {
    const candidate = item.title || item.name || item.label || item.tabName || item.cellName || item.designation;
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return `Item ${index + 1}`;
}

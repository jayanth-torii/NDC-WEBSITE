// Rewrites local-style "/images/..." and "/pdfs/..." string references to
// full S3 URLs, recursively, anywhere they appear in a JSON value. Applied
// only at seed time (writing into MongoDB) — NOT to ndc-web-main's
// data-export files, which stay on local /public paths on purpose: they're
// the offline-safe fallback the frontend renders instantly and falls back to
// if the backend/S3 is ever unreachable (see useLiveData.ts).
function s3Base() {
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  if (!bucket || !region) return null;
  return `https://${bucket}.s3.${region}.amazonaws.com`;
}

const ASSET_PATH_RE = /^\/(images|pdfs)\//;

function rewriteAssetPaths(value) {
  const base = s3Base();
  if (!base) return value;

  function walk(node) {
    if (typeof node === "string") {
      return ASSET_PATH_RE.test(node) ? `${base}${node}` : node;
    }
    if (Array.isArray(node)) {
      return node.map(walk);
    }
    if (node && typeof node === "object") {
      const out = {};
      for (const [key, val] of Object.entries(node)) out[key] = walk(val);
      return out;
    }
    return node;
  }

  return walk(value);
}

module.exports = { rewriteAssetPaths };

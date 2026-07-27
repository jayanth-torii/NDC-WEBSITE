# ndc-backend

Custom Express + MongoDB (Mongoose) API for the NDC website, replacing the
old Strapi CMS. Architecture mirrors the sibling NCET site's backend
(per-module `models/controllers/routes` folders, JWT auth, S3 uploads) but
scoped and simplified for NDC's single-maintainer reality — see
`C:\Users\Admis\.claude\plans\systematically-go-through-this-temporal-crescent.md`
for the full design rationale.

## Setup

```bash
npm install
cp .env.example .env   # then fill in real MONGO_URI / AWS_* / JWT_SECRET
npm run seed            # one-time: populate MongoDB from ndc-web-main/data-export
node seed/seedAdmin.js  # one-time: create the single admin account from ADMIN_EMAIL/ADMIN_PASSWORD
npm run dev
```

`npm run seed` expects `ndc-web-main` to be checked out as a sibling folder
(`../ndc-web-main/data-export`). Override with `DATA_EXPORT_PATH` in `.env`
if that's not the case. Both the singleton seed and the two collection seeds
(blog, activity cells) are **upserts** — safe to re-run.

## Structure

- `src/models|controllers|routes/<module>/` — one folder per content type.
  Most are generated boilerplate (see `scripts/generateSingletonModules.js`)
  wrapping a single Mongoose `data: Mixed` field — re-run that script rather
  than hand-editing if the module list changes. `blog`, `activityCell`,
  `applyNowForm`, `contactUsForm`, `auth`/`user` are hand-written (real
  schemas / custom logic, not generic CRUD).
- `src/utils/singletonFactory.js` / `modelFactory.js` — the shared CRUD/schema
  factory every generated module wraps.
- `seed/` — `manifest.js` (endpoint→model→file mapping, verified against the
  real data-export JSON, not guessed), `runSeed.js` (generic loader),
  `seedBlog.js` / `seedActivityCells.js` (the two true collections),
  `seedAdmin.js` (one-time admin account creation, deliberately not automatic
  on boot).
- `scripts/verifyLocal.js` / `runVerifyServer.js` — dev-only harnesses that
  spin up an ephemeral in-memory MongoDB (`mongodb-memory-server`, no
  Docker/system install needed) to sanity-check the whole stack. Not part of
  the running app.

## API shape

Every module is public-read (`GET`), admin-write (`PUT`/`POST`/`DELETE`,
JWT `Authorization: Bearer <token>` + `role: admin`). Singleton modules
respond `{ success, data }` where `data` is the raw content object (no
Strapi-style `{ data: {...} }` double-wrapping). Collections (`/api/blogs`,
`/api/activity-cells`) return arrays the same way.

Auth: `POST /api/auth/login { email, password } -> { token, user }`.

Uploads: `POST /api/upload` (multipart, field name `file`, admin-only) ->
`{ url, key }`, stored in S3 under `images/uploads/` or `pdfs/uploads/`
depending on mimetype.

Forms: `POST /api/apply-now-forms` and `POST /api/contact-us-forms` are
public (no auth) since the public site submits them directly; `GET` on both
is admin-only (submission inbox).

## S3 asset storage

Every image/PDF served by this API is a full S3 URL, not a local `/images/..`
path — enforced two ways:

- **New uploads** (`POST /api/upload`, via the admin panel) already write
  straight to S3 (`src/utils/upload.js`), returning the S3 URL directly.
- **Existing content** seeded from `data-export/**/data.json` still has the
  old local-style paths (`/images/about-ndc/foo.jpg`) baked in. `seed/*.js`
  runs every seeded value through `src/utils/rewriteAssetPaths.js`, which
  recursively rewrites any string matching `/images/...` or `/pdfs/...` to
  `https://<bucket>.s3.<region>.amazonaws.com/images/...` before writing to
  MongoDB. This only touches what gets written to the database — it does
  **not** modify `ndc-web-main/data-export/` itself, which stays on local
  paths on purpose (it's the frontend's offline-safe fallback bundle;
  see `useLiveData.ts`).

This works because the actual asset bucket
(`nagarjuna-degree-college-<account>-ap-south-2-an`) already contains a
verified path-for-path mirror of every file in `ndc-web-main/public/images`
and `public/pdfs` (confirmed via a full key-listing diff — 1201/1201 local
files present, zero gaps) — nothing needed re-uploading, only:
1. A public-read bucket policy (`scripts/ensureBucketPublicRead.js` —
   re-run if the policy is ever reset; safe, idempotent, no private data in
   this bucket).
2. The seed-time path rewrite above.

`next.config.ts`'s `images.remotePatterns` already allows `*.amazonaws.com`,
so `next/image` renders these URLs directly without further config.

## Known data-quality note

Blog post `id: 16` appears twice in the source `data-export/blog/data.json`
(a pre-existing issue in the original CMS export, not introduced here).
Since `Blog.postId` is unique, seeding upserts both into a single document
(last one wins) — worth flagging to whoever owns the content so the
duplicate can be resolved at the source.

## Deployment

MongoDB Atlas (separate project from NCET's) + Render or Railway for the
API (avoids the bare-VPS/manual-ops burden NCET's setup implies). The app is
stateless (media goes to S3), which is what makes a PaaS deploy this simple.

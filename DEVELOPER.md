# Developer Notes

**Maintained by:** Jayanth

## Pages

`ndc-web-main` (Next.js App Router) has **40 page routes** in `src/app`:

| Section | Count | Notes |
|---|---|---|
| Home | 1 | `_landing/page.tsx` (rendered at `/`) |
| About / Admissions / Alumni / Apply Now | 4 | |
| Blog | 2 | list (`blog`) + detail (`blog/[id]`) |
| Certificate Courses / Contact Us | 2 | |
| Departments | 3 | overview (`departments`), single dynamic detail page (`department`, driven by `?programme=`), and one dead/commented stub (`departments/ug-programmes/ai&ml`) |
| Gallery / IIC / IQAC / Library | 4 | |
| Question Bank / Research / Research Forum | 3 | |
| Samashti / Sports / Students | 3 | |
| **Activities** | **17** | overview (`activities`) + 16 cell/forum subpages across 3 groups (academic & social engagement forums, faculty-oriented cells, student-oriented cells) |

Total: 1+4+2+2+3+4+3+3+17 = **40 pages/subpages**.

(Next's build counter reports 42 static routes — that includes the auto-generated `/_not-found` page and one entry Next counts separately for the dynamic `blog/[id]` route.)

## CMS → static JSON migration status: 100% complete for content

The site used to fetch all content live from a Strapi CMS (`https://cms.nagarjunadegreecollege.co.in/api`) on every page load. That dependency has been removed for reads. All content across all 40 pages now comes from static JSON checked into `ndc-web-main/data-export/`, generated as a point-in-time export of the CMS.

**What was verified before any code changed:**
- Every one of the ~48 CMS endpoints the site uses was checked against its Strapi controller source (`ndc-cms-main`). All collection-type endpoints use custom controllers calling `entityService.findMany()` with no pagination limit, so nothing was silently capped at Strapi's default 25-per-page REST limit — the exported JSON is a complete, verified 1:1 copy of what the CMS holds.
- Confirmed the `populate=deep` param used during export has no effect on this Strapi instance (identical output with/without it), so the export matches exactly what the live site was rendering.

**What changed in code:**
- Added a `@/data-export/*` path alias in `tsconfig.json`.
- 12 `DepartmentTabs` components, `Footer`, `Banner`, `QuestionBankTabs`, `HomePage/Blogs.tsx`, and all ~37 page-level components were converted from `axios`/`fetch` calls against `BASE_URL` to static imports of their corresponding `data-export/**/data.json` file.
- Removed the now-unnecessary `loading`/`error` state and "Loading..." UI from every converted component (data is available synchronously at build time).

**What still calls the live CMS (intentionally):**
- `HomeHero.tsx`, `ContactUs/QueryForm.tsx`, `ApplyNow/QueryForm.tsx` — these **submit** forms (`apply-now-forms`, `contact-us-forms`) and must stay live; static JSON can't accept form submissions.
- A few inert files were left untouched on purpose: `DepartmentFacultyOld.tsx` (unused, never imported), the commented-out fetch in `question-bank/page.tsx`, and an unused `axios` import in `HeroCourse.tsx`.

**Validation:** `npx tsc --noEmit` → 0 errors. `npx next build` → all 42 routes compile and statically prerender with 0 errors.

## Known trade-off

Content is now a frozen snapshot (taken 2026-07-22). Future edits made in the Strapi admin panel will **not** appear on the live site until someone reruns the CMS export and rebuilds/redeploys `ndc-web-main`. There is currently no automated refresh — worth adding an npm script (or a scheduled job) if the CMS is still the intended editing surface for content.

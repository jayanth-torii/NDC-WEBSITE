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

## UI Redesign & GlobalBanner migration

### Commit `169c827` — "UI Redesign" (already committed, 149 files, +5434/-4569)

The one-line git message ("Complete structural and aesthetic overhaul of Gallery, Students, Research, Admissions, and About pages... unified GlobalBanner system") undersells the actual scope — it was a combined snapshot of everything sitting uncommitted in the working tree at the time. Fuller breakdown of what's actually in it:

- **New shared design-system primitives** in `src/components/ui/`: `Button`, `Card`, `IconChip`, `Kicker`, `PageBanner`, `Reveal` (scroll-reveal, respects `prefers-reduced-motion`), `SectionHeading`.
- **New `GlobalBanner` component** (`src/components/GlobalBanner/`) — a single banner component (eyebrow / title / subtitle / image / facts / breadcrumbs) intended to replace the ~15 one-off `*Banner.tsx` components that used to exist per page.
- **Header/Footer/Navbar rebuilt as a single unified header**, styled after the sibling NCET site: `Header.tsx` rewritten with dropdown nav groups (Academics, Students) + mobile drawer + Apply Now CTA; `Footer.tsx` rewritten with glass-card link columns, Toll Free/Email/Address contact rows, a social icon rail, and a "Powered by Torii Minds" credit; the old `Navbar.tsx` (dark utility bar + site search) was deleted, its links folded into the new Header. `next.config.ts` updated with the Torii Minds S3 image domain.
- **Global theme**: `globals.css` and `layout.tsx` updated for the design tokens the new components rely on.
- **Per-page visual redesign** using the new `ui/` primitives, touching effectively every content component across: Home, About NDC, Admissions, Contact Us, Departments (`DepartmentTabs` + `DepartmentsPage`), Students, Activities, Alumni, Gallery, Research, Library, Question Bank, Certificate Courses, IQAC, IIC, Samashti, Sports, Blog, and the shared `Breadcrumb`/`CommonComponents`.

### Uncommitted, in progress — remaining pages onto `GlobalBanner`

At the time of writing, these are modified/added but **not yet committed**:

- **Banner content added to data-export JSON** (`eyebrow` + `subtitle` fields, matching the Sports/Alumni pattern) for: `alumni`, `blog`, `iic`, `iqac`, `research`, `research-forum`, `sports`.
- **Pages wired onto `GlobalBanner`**, dropping their last dedicated banner component: `alumni/page.tsx`, `blog/page.tsx` + `blog/[id]/page.tsx`, `iic/page.tsx`, `iqac/page.tsx`, `research/page.tsx`, `research-forum/page.tsx`, `sports/page.tsx`. Deleted: `BlogsBanner.tsx`, `IICBanner.tsx`, `IqacBanner.tsx`, `ResearchForumBanner.tsx`, `SportsBanner.tsx`.
- **Supporting section redesigns**: `AboutNDC/OurCampus.tsx`, `AboutNDC/PrincipalMessage.tsx`, `Alumni/Association.tsx`, `Alumni/VisionMission.tsx`, `BlogsPage/ArticleCard.tsx`, `BlogsPage/BlogCard.tsx`, `IIC/IICMembers.tsx`, `IQAC/About.tsx`, `IQAC/CompositionCell.tsx`, `ResearchForum/Forum.tsx`, `Sports/AboutSections.tsx`, `Sports/Gallery.tsx`, `Sports/HodMessage.tsx`.
- **New untracked CSS files** (need `git add`, not just modified): `src/app/alumni/alumni-exact.css`, `src/components/AboutNDC/about-ndc.css`.
- **Also untracked, not part of this feature work** — needs a decision before the next commit: `temp_contact.html` (looks like a scratch file at the repo root) and `NCET-main/` (a full separate project folder, presumably the sibling institution's site kept locally for design reference — likely belongs in `.gitignore` rather than getting committed).

**Suggested commit message for the pending work above:**

```
Migrate remaining pages onto GlobalBanner (Alumni, Blog, IIC, IQAC, Research, Research Forum, Sports)

- Add eyebrow/subtitle banner content to data-export JSON for the 7 remaining pages
- Wire each page's GlobalBanner from that data, removing the last per-page Banner components
- Redesign supporting sections (About NDC campus/principal message, Alumni association/vision,
  Blog cards, IIC members, IQAC about/composition, Research Forum, Sports about/gallery/HOD message)
  to match the ui/ design system introduced in 169c827
```



Content is now a frozen snapshot (taken 2026-07-22). Future edits made in the Strapi admin panel will **not** appear on the live site until someone reruns the CMS export and rebuilds/redeploys `ndc-web-main`. There is currently no automated refresh — worth adding an npm script (or a scheduled job) if the CMS is still the intended editing surface for content.

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

### `GlobalBanner` migration for Alumni/Blog/IIC/IQAC/Research/Research Forum/Sports — done

The remaining-pages migration described in an earlier draft of this doc is complete and committed (see `f2b4487`, `caf1b9a`, `a81bc3f` and the merge history into `main`): all seven pages render through `GlobalBanner`, the per-page `*Banner.tsx` components are deleted, and the supporting sections were redesigned to match the `ui/` system. Nothing outstanding here.

### Home "Campus Life" section rebuild + Library page onto `GlobalBanner` (this commit)

**`HomePage/LifeAtNDC.tsx`** (renders as the "Glimpse of Campus Life" section on `/`) was rebuilt from a single YouTube-thumbnail strip into a three-part section matching a supplied visual reference:
- Hero split: eyebrow/heading (with a script-font "Grow." accent — added `Caveat` via `next/font/google` in `layout.tsx` as `--font-script`), a stats strip (Students/Courses/Achievements/Departments), and a circular framed photo with a decorative SVG ring, an "Empowering Young Minds" badge, and a play button.
- "Moments That Matter" gallery: first built with invented photo/staff-spotlight cards, then corrected to pull directly from the CMS `videos` array (`data-export/_landing/data.json` → `CampusLife.videos`) — real YouTube thumbnails (`img.youtube.com/vi/{id}/hqdefault.jpg`), each opening the actual video in a modal player. A first pass used an arbitrary Tailwind grid template (`grid-cols-[minmax(0,320px)_1fr]`) that Tailwind failed to compile, collapsing the column to ~68px and wrapping "View All Gallery" into a circle; replaced with a plain flex layout (`lg:w-[300px]` sidebar + `flex-1` scroller).
- Feature strip (Vibrant Campus Life / Experienced Faculty / Modern Infrastructure / Placement Support).

**Library page** (`app/library/page.tsx` + `components/Library/*`) migrated onto the same `GlobalBanner` used elsewhere instead of its bespoke `LibraryBanner.tsx` (deleted):
- `GlobalBanner` gained a new optional `children` prop (opt-in, renders nothing unless passed) so a page can layer its own decorative shapes on top of the photo/gradient without changing any other page's banner. Library's banner uses it for a dot-grid patch, a dashed ring, and two blurred glow blobs, plus a real photo (`public/images/StudentCenter/AcademicEnrichment/Library/gallery_1.png` — students at the shelves, chosen because it has no baked-in text, unlike the old `library/banner.png`).
- `AboutLibrary.tsx`: two-column header (copy + illustration) with the title's last word colored orange, and the two info cards given distinct themes (navy chip / blue-gray card for "Library Services", orange chip / cream card for "Library Collection") with orange checkmark bullets instead of plain dots.
- New `LibraryIllustration.tsx` — no book-stack/graduation-cap asset existed, so it's hand-built as an inline SVG (three stacked books, tilted cap with tassel, a small potted plant, dot-grid/ring accents) using the site's existing navy/orange tokens, rather than a sourced image.
- `Resources.tsx`: list/sidebar ratio tightened from 75/25 to 66/33; added a dictionary-specific tab icon.
- `EventsRules.tsx`: added an icon chip under the "Library Rules and Regulations" heading, and replaced the oversized faded rule numbers with a bold orange number plus a small icon badge inferred per-rule by keyword (timings → clock, eligibility → users, thesis → cap, damage/loss → warning, etc.).

### Animated Activities icon system + shared background decor

New `Activities/ActivityIcons.tsx` (looping SVG icon set) driven by new keyframe/utility classes in `globals.css` (`.act-spin-origin`, `.act-pulse-dot`, `.act-breathe`, `.act-draw-check`, `.act-spark`, `.act-float-y`, `.act-heartbeat`, `.act-pop`, `.act-type-line`, `.act-bridge`), used by `KnowEverything.tsx` and other Activities components. New shared `ui/BackgroundDecor.tsx` (concentric-circle + dot-grid watermark) is now used by `Activities/CommonComponents/PageShell.tsx`. New image assets: `public/images/theatre_masks.png`, `public/images/decor/{plane,squiggle}.png`.

### Continuing editorial redesign pass

The same dot-grid + blurred-glow + navy/orange visual language introduced in `169c827` was extended further into: Home (`AboutNDC`, `Blogs`, `CertificateCourses`, `Education`, `Notifications`, `PlacementPartners`, `Yrs25`), Alumni (`Association`, `VisionMission`), Blog (`app/blog/page.tsx`, `BlogsPage/ArticleCard`, `BlogsPage/BlogCard`, `BlogsPage/Pagination`), and Activities (`AboutNDC/Council`, `Activities/CulturalActivities`, `Activities/CulturalLeadershipActivities`, `Activities/CommonComponents/About`).

### Still sitting in the working tree, not part of this commit

Same caveat as before, still unresolved — needs a decision from whoever owns the repo, left untouched: `NCET-main/` (a full separate project folder, presumably the sibling institution's site kept locally for design reference) and `samashti_source.html` (a scratch file at the repo root). Both likely belong in `.gitignore` rather than getting committed. A local Excel lock file (`~$NDC_Website_Sitemap.xlsx`) and a handful of untracked `lib-*.png` reference screenshots at the repo root are similarly pre-existing and left alone.

Content is now a frozen snapshot (taken 2026-07-22). Future edits made in the Strapi admin panel will **not** appear on the live site until someone reruns the CMS export and rebuilds/redeploys `ndc-web-main`. There is currently no automated refresh — worth adding an npm script (or a scheduled job) if the CMS is still the intended editing surface for content.

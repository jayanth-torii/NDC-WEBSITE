# data-export

A point-in-time JSON snapshot of every piece of content the site pulls from the Strapi CMS
(`https://cms.nagarjunadegreecollege.co.in/api`), captured 2026-07-22.

## Why this exists

Every rendered page in `ndc-web-main` fetches its content live from the CMS at request time —
nothing meaningful is hardcoded. This folder is a static backup/export of that live data,
organized to mirror `src/app`'s page and subpage structure.

## Layout

- One folder per route under `src/app`, each containing a `data.json` with the raw CMS
  response(s) for that page (keyed by endpoint slug).
- `_shared/` — data for components rendered across many pages, not tied to one route:
  - `footer.json` (`/api/footer`)
  - `banner.json` (`/api/headline-banner`)
- `department/data.json` — the single parameterized department-detail page
  (`src/app/department/page.tsx`) reads the `?programme=` query param and filters these
  12 endpoints client-side, so this file holds the full unfiltered data for *all* programmes,
  not just one.
- `_extraction-report.json` — the endpoint-to-page map used to generate this export, plus any
  fetch errors (there were none) and a probe of two endpoints referenced in code but never
  actually called (see below).

## Findings: hardcoded vs CMS-driven

- **Confirmed CMS-driven (live, not hardcoded):** all ~48 content endpoints below and every
  page that calls them.
- **Dead/unused hardcoded content found:** `src/app/Data/DepartmentsContent/*.ts` (11 files),
  plus `memberdata.ts`, `researchdata.ts`, `VisionMissionData.ts` — these look like legacy
  hardcoded fallback content but are **never imported by any live component**. They render
  nothing on the actual site today.
- **Dead code referencing the CMS but never executed:**
  - `src/app/question-bank/page.tsx` has a commented-out call to `/api/event` (404s live —
    endpoint doesn't exist). The page's real content comes from `QuestionBankTabs`
    (`/api/question-banks`), which does run.
  - `src/components/DepartmentTabs/DepartmentFacultyOld.tsx` references `/api/faculty-contents`
    (also 404s) but this component isn't imported anywhere.
  - `src/app/departments/ug-programmes/ai&ml/page.tsx` is an entirely commented-out stub page —
    renders nothing.

## Regenerating this export

The extraction script lives outside the repo (scratchpad). Re-run by fetching each endpoint in
`_extraction-report.json`'s `pages`/`shared` maps from `BASE_URL` and writing the JSON response
to the corresponding `file` path.

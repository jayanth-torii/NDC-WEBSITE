# ndc-admin

Admin panel for the NDC website. React + Vite + TypeScript + MUI, talking to
`ndc-backend-main`'s API. Separate app/deploy from the public site, mirroring
the sibling NCET project's architecture — see
`C:\Users\Admis\.claude\plans\systematically-go-through-this-temporal-crescent.md`
for the full design rationale.

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at the running backend
npm run dev
node ../ndc-backend-main/seed/seedAdmin.js   # creates your login (run once, in the backend)
```

## How editing works

- Every page in the left nav maps to one backend endpoint (`src/services/routes.ts`).
- Most pages use a **generic raw-JSON editor** (`src/components/JsonPageEditor.tsx`):
  it fetches the page's current content, shows it as formatted JSON, and PUTs
  whatever you edit back on Save. This is what makes every single page dynamically
  editable from day one — every field visible on the public site is a key
  somewhere in that JSON.
- A few pages have dedicated form-based editors instead:
  - **Blog Posts** (`/blogs`) — true list + create/edit/delete, with an image
    upload control and a repeatable paragraph list for the post body (the
    source content is an array of paragraph strings, not a single HTML blob).
  - **Department Details Editor** (`/department-details-editor`) — pick a
    programme, then one of the 12 tabs matching the public site's own
    `DepartmentTabs` components; edits that programme's slice of the
    corresponding collection.
  - **Activity Cells** (`/activity-cells`) — pick a group then a cell (16
    total); same JSON editor, scoped per cell.
  - **Site Settings** (`/site-settings`) — Footer and the announcement banner,
    as two tabs.
  - **Submissions inboxes** (`/submissions/apply-now-forms`,
    `/submissions/contact-us-forms`) — read-only list of form leads with a
    click-to-mark-read status chip.

Adding a nicer field-level form for any page later doesn't require a backend
change — swap that page's route from `GenericSingletonPage` to a dedicated
component in `App.tsx`.

## Auth

Single-step JWT login (`POST /api/auth/login`), token in `localStorage`,
attached automatically via an axios interceptor
(`src/services/httpClient.ts`). A 401 response anywhere clears the token and
redirects to `/login`.

## Known MUI version note

`@mui/material@9.x` (the version resolved as "latest" at the time this app
was scaffolded) has a real type-checking regression in `Stack`'s prop
overloads — a plain `<Stack direction="row" spacing={2} alignItems="center">`
fails `tsc -b`. This app is pinned to the stable `7.3.11` line instead
(`@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`), which builds
cleanly. Don't bump past v7 without first confirming the Stack overload bug
is fixed upstream.

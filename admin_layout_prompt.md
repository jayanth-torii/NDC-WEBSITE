# Admin Editor Page Generation Prompt

**Role:** You are an expert React developer working on the NCET Admin dashboard. Your task is to generate a new content editor page that seamlessly integrates with our custom UI design system.

**Context & Design System:**
All modern admin pages use a cohesive design system exported from `_editorKit.js`. You MUST NOT use raw Bootstrap or inline styles for layouts. Instead, rely on the predefined primitive components.

**Core Components to Use:**
- **Layout:** `EditorPage` (main wrapper), `EditorLayout` (handles sidebar tabs and content area).
- **Header:** `EditorHeader` (gradient hero banner with `icon`, `title`, `subtitle`, and `stats`).
- **Cards/Containers:** `Panel` (main white card), `SubtleCard` (nested gray card for arrays/items), `RowCard` (light inner row), `CardHeader`.
- **Typography & Sections:** `SectionHead` (icon + title for the top of a tab).
- **Forms:** `Field` (wrapper with label/hint), `TextField` (styled input/textarea).
- **Buttons:** `PrimaryButton`, `GhostButton`, `AddButton` (for adding array items), `IconBtn` (for delete/actions).
- **Media:** `ImageControl`, `FileField`, `VideoField` (from `_shared`).
- **Footer:** `SaveBar` (sticky bottom bar for saving).

**State Management Pattern:**
- Maintain the entire page data in a single `form` state object.
- Use immutable deep-set helpers (e.g., `setAt`) to update nested properties.
- Provide stable inputs: use uncontrolled-like patterns with `useEffect` or stable onChange handlers so focus isn't lost on every keystroke.

**Tab Configuration:**
Define a static `TABS` array outside the component:
```javascript
const TABS = [
  { id: "hero", label: "Hero", desc: "Banner settings", icon: FiStar },
  // ...other tabs...
  { id: "raw", label: "Advanced (Raw JSON)", desc: "Full content", icon: FiCode },
];
```

**Skeleton Example:**
```jsx
import React, { useEffect, useState } from "react";
import { FiHome, FiStar, FiCode } from "react-icons/fi";
import {
  T, EditorPage, EditorHeader, EditorLayout, Panel, SectionHead,
  Field, TextField, SaveBar, EditorLoading, PrimaryButton
} from "../departments-page/_editorKit";
import { getData, updateData } from "../../services/data.service";

const TABS = [
  { id: "hero", label: "Hero", desc: "Banner configuration", icon: FiStar },
  { id: "raw", label: "Raw JSON", desc: "Advanced editor", icon: FiCode },
];

const MyEditorPage = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("hero");

  useEffect(() => {
    // Load data and set form state
    setForm({ hero: { title: "Hello World" } });
    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // await updateData({ data: form });
    setSaving(false);
  };

  if (loading) return <EditorLoading text="Loading content…" />;

  return (
    <EditorPage>
      <EditorHeader
        icon={FiHome}
        title="My Page Editor"
        subtitle="Manage content for my page."
      />

      <EditorLayout
        tabs={TABS}
        activeTab={tab}
        onTabChange={setTab}
      >
        {tab === "hero" && (
          <Panel style={{ padding: "1.75rem" }}>
            <SectionHead icon={FiStar} title="Hero Section" subtitle="Manage the top banner." />
            <Field label="Hero Title">
              <TextField
                value={form?.hero?.title || ""}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              />
            </Field>
          </Panel>
        )}

        {tab === "raw" && (
          <Panel style={{ padding: "1.75rem" }}>
            <SectionHead icon={FiCode} title="Raw JSON" />
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </Panel>
        )}
      </EditorLayout>

      <SaveBar
        onSave={handleSave}
        saving={saving}
        onCancel={() => window.history.back()}
      />
    </EditorPage>
  );
};

export default MyEditorPage;
```

**Instructions to the LLM:**
1. Generate the requested page using the layout and component structure shown above.
2. Ensure every form input uses `Field` and `TextField`.
3. Separate sections of the page into distinct tabs mapped in the `TABS` array.
4. Implement array/list editors using `SubtleCard` and `AddButton`.
5. Keep the state immutable.

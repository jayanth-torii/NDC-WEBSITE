import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { JsonPageEditor } from "../components/JsonPageEditor";
import { API_ROUTES } from "../services/route";

export function SiteSettingsPage() {
  const [tab, setTab] = useState(0);
  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Footer" />
        <Tab label="Announcement Banner" />
      </Tabs>
      {tab === 0 && <JsonPageEditor title="Footer" route={API_ROUTES.FOOTER.GET} />}
      {tab === 1 && <JsonPageEditor title="Announcement Banner" route={API_ROUTES.HEADLINE_BANNER.GET} />}
    </Box>
  );
}

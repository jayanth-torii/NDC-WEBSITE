import { useState } from "react";
import { Box, Tabs } from "@chakra-ui/react";
import { PageEditor } from "../components/PageEditor";
import { Panel } from "../components/editorKit";
import { API_ROUTES } from "../services/route";

export function SiteSettingsPage() {
  const [tab, setTab] = useState("footer");
  return (
    <Box>
      <Tabs.Root value={tab} onValueChange={(e) => setTab(e.value)}>
        <Panel mb={4} px={2}>
          <Tabs.List borderBottom="none">
            <Tabs.Trigger value="footer" color="gray.500" fontWeight={600} _selected={{ color: "brand.navy", borderColor: "brand.orange" }}>
              Footer
            </Tabs.Trigger>
            <Tabs.Trigger value="banner" color="gray.500" fontWeight={600} _selected={{ color: "brand.navy", borderColor: "brand.orange" }}>
              Announcement Banner
            </Tabs.Trigger>
          </Tabs.List>
        </Panel>
      </Tabs.Root>
      {tab === "footer" && <PageEditor title="Footer" route={API_ROUTES.FOOTER.GET} eyebrow="Site Settings" />}
      {tab === "banner" && <PageEditor title="Announcement Banner" route={API_ROUTES.HEADLINE_BANNER.GET} eyebrow="Site Settings" />}
    </Box>
  );
}

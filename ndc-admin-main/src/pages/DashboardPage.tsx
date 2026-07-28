import { Stack, Text } from "@chakra-ui/react";
import { MdDashboard as DashboardIcon } from "react-icons/md";
import { Callout, EditorHeader, Panel } from "../components/editorKit";

export function DashboardPage() {
  return (
    <Stack gap={5}>
      <EditorHeader
        icon={DashboardIcon}
        eyebrow="NDC Admin"
        title="Welcome"
        subtitle="Use the left navigation to edit any page on the public NDC site."
      />
      <Panel p={6}>
        <Text mb={4}>
          Every page renders as proper fields — image previews, PDF view/download controls, repeatable lists — with
          an "Advanced: raw JSON" section underneath for anything the structured form doesn't cover.
        </Text>
        <Callout tone="blue">
          Changes save immediately to the live database, and trigger an on-demand revalidation so the public site
          picks them up within seconds.
        </Callout>
      </Panel>
    </Stack>
  );
}

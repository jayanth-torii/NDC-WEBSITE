import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function AmbedkarStudyCircle() {
  const data: any = await getActivityCell("ambedkar-study-circle");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Academic & Social Engagement Forums"
      title="Ambedkar Study Circle (ASC)"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Academic & Social Engagement Forums", path: "/activities#Academic%20%26%20Social%20Engagement%20Forums" },
        { label: "Ambedkar Study Circle" },
      ]}
    >
      <About data={data.AboutVisionMissionSections} />

      <AntiragginCommitte data={data.ForumCoordinators} />
    </ActivitiesPageShell>
  );
}

export default AmbedkarStudyCircle;

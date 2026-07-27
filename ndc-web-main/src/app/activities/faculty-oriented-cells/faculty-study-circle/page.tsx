import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function FacultyStudyCircle() {
  const data: any = await getActivityCell("faculty-study-circle");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Faculty Oriented Cells"
      title="Faculty Study Circle"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Faculty Oriented Cells", path: "/activities#Faculty%20Oriented%20Cells" },
        { label: "Faculty Study Circle" },
      ]}
    >
      <About data={data.AboutVisionMissionSections} />

      <AntiragginCommitte data={data.AntiRaggingCommitteMembers} />
    </ActivitiesPageShell>
  );
}

export default FacultyStudyCircle;

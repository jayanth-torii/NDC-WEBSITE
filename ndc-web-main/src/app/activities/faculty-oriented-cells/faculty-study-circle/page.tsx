"use client";
import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/faculty-oriented-cells/faculty-study-circle/data.json";

function FacultyStudyCircle() {
  const data: any = (pageJson["faculty-study-circle"] as any)?.data || null;

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

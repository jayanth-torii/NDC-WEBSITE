"use client";
import React from "react";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import About from "@/components/Activities/CommonComponents/About";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import pageJson from "@/data-export/activities/student-oriented-cells/women-cell/data.json";

function WomenCell() {
  const data: any = (pageJson["women-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Student Oriented Cells"
      title="Women's Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Student Oriented Cells", path: "/activities#Student%20Oriented%20Cells" },
        { label: "Women's Cell" },
      ]}
    >
      <About data={data.AboutVisionMissionSections} />

      <AntiragginCommitte data={data.antiRaggingCommitteMembers} />
    </ActivitiesPageShell>
  );
}

export default WomenCell;

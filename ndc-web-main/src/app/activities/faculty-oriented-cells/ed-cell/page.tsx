"use client";
import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Images from "@/components/Activities/CommonComponents/Images";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/faculty-oriented-cells/ed-cell/data.json";

function EDCell() {
  const data: any = (pageJson["ed-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Faculty Oriented Cells"
      title="Entrepreneurial Development Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Faculty Oriented Cells", path: "/activities#Faculty%20Oriented%20Cells" },
        { label: "ED Cell" },
      ]}
    >
      <About data={data.AboutVisionMissionSections} />

      <Images data={data.ImagesSection} />

      <AntiragginCommitte data={data.Coordinators} />
    </ActivitiesPageShell>
  );
}

export default EDCell;

import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Images from "@/components/Activities/CommonComponents/Images";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function EDCell() {
  const data: any = await getActivityCell("ed-cell");

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

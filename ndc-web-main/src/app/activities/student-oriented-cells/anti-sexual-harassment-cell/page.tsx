import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function AntiSexualHarassmentCell() {
  const data: any = await getActivityCell("anti-sexual-harassment-cell");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Student Oriented Cells"
      title="Anti Sexual-Harassment Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Student Oriented Cells", path: "/activities#Student%20Oriented%20Cells" },
        { label: "Anti Sexual-Harassment Cell" },
      ]}
    >
      <About data={data.AboutVisionMissionSections} />

      <Procedure data={data.Definitions} />
    </ActivitiesPageShell>
  );
}

export default AntiSexualHarassmentCell;

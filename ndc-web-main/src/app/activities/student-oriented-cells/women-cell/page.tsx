import React from "react";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import About from "@/components/Activities/CommonComponents/About";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function WomenCell() {
  const data: any = await getActivityCell("women-cell");

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

import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function ECOClubs() {
  const data: any = await getActivityCell("eco-clubs");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Student Oriented Cells"
      title="Eco Clubs"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Student Oriented Cells", path: "/activities#Student%20Oriented%20Cells" },
        { label: "Eco Clubs" },
      ]}
    >
      <Procedure data={data.Sections} />
    </ActivitiesPageShell>
  );
}

export default ECOClubs;

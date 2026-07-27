import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function FacultiesWelfare() {
  const data: any = await getActivityCell("faculties-welfare");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Faculty Oriented Cells"
      title="Faculties Welfare"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Faculty Oriented Cells", path: "/activities#Faculty%20Oriented%20Cells" },
        { label: "Faculties Welfare" },
      ]}
    >
      <Procedure data={data.FacultiesWelfare} />
    </ActivitiesPageShell>
  );
}

export default FacultiesWelfare;

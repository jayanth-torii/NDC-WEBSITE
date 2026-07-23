"use client";
import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import pageJson from "@/data-export/activities/faculty-oriented-cells/faculties-welfare/data.json";

function FacultiesWelfare() {
  const data: any = (pageJson["faculties-welfare"] as any)?.data || null;

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

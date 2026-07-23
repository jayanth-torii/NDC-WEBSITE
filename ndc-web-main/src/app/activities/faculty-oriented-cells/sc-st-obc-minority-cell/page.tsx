"use client";
import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/faculty-oriented-cells/sc-st-obc-minority-cell/data.json";

function SCSTOBCMinorityCell() {
  const data: any = (pageJson["sc-st-obc-minority-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Faculty Oriented Cells"
      title="SC/ST/OBC & Minority Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Faculty Oriented Cells", path: "/activities#Faculty%20Oriented%20Cells" },
        { label: "SC/ST/OBC & Minority Cell" },
      ]}
    >
      <AntiragginCommitte data={data.SCSTCommitteeMembers} />
    </ActivitiesPageShell>
  );
}

export default SCSTOBCMinorityCell;

import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function SCSTOBCMinorityCell() {
  const data: any = await getActivityCell("sc-st-obc-minority-cell");

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

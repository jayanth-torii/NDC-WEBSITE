import React from "react";
import { getActivityCell } from "@/services/data.service";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import About from "@/components/Activities/CommonComponents/About";
import Policies from "@/components/Activities/CommonComponents/Policies";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

export const revalidate = 300;

async function AntiRaggingCell() {
  const data: any = await getActivityCell("anti-ragging-cell");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Student Oriented Cells"
      title="Anti Ragging Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Student Oriented Cells", path: "/activities#Student%20Oriented%20Cells" },
        { label: "Anti Ragging Cell" },
      ]}
    >
      <About data={data.aboutSections} />
      <Policies data={data.policyAndConsiderations} />
      <AntiragginCommitte data={data.antiRaggingCommitteMembers} />
    </ActivitiesPageShell>
  );
}

export default AntiRaggingCell;

import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";

import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function NSSCell() {
  const data: any = await getActivityCell("nss-cell");

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Academic & Social Engagement Forums"
      title="NSS And Red Cross"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Academic & Social Engagement Forums", path: "/activities#Academic%20%26%20Social%20Engagement%20Forums" },
        { label: "NSS And Red Cross" },
      ]}
    >
      <Procedure data={data.Sections} />

      <Images data={data.ImagesSection} />
    </ActivitiesPageShell>
  );
}

export default NSSCell;

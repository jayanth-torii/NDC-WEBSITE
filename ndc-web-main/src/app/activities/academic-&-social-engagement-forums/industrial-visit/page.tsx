"use client";
import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import pageJson from "@/data-export/activities/academic-&-social-engagement-forums/industrial-visit/data.json";

function IndustrialVisit() {
  const data: any = (pageJson["industrial-visit"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Academic & Social Engagement Forums"
      title="Industrial Visit"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Academic & Social Engagement Forums", path: "/activities#Academic%20%26%20Social%20Engagement%20Forums" },
        { label: "Industrial Visit" },
      ]}
    >
      <Procedure data={data.IndustrialVisit} />
    </ActivitiesPageShell>
  );
}

export default IndustrialVisit;

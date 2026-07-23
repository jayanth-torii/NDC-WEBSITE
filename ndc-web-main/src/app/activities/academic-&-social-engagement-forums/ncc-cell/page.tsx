"use client";
import React from "react";

import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/academic-&-social-engagement-forums/ncc-cell/data.json";

function NCCCell() {
  const data: any = (pageJson["ncc"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Academic & Social Engagement Forums"
      title="NCC Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Academic & Social Engagement Forums", path: "/activities#Academic%20%26%20Social%20Engagement%20Forums" },
        { label: "NCC Cell" },
      ]}
    >
      <Procedure data={data.Sections} />

      {data?.NccImage && (
        <div className="mb-10 md:mb-20">
          <div className="bg-gradient-to-br from-surface-tint to-white rounded-[24px] p-8 md:p-12 border border-card-border shadow-[var(--shadow-card)] relative overflow-hidden flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange/10 rounded-full blur-3xl pointer-events-none"></div>
            <img
              src={data.NccImage}
              alt="NCC Cadet"
              className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-[var(--ease-editorial)]"
            />
          </div>
        </div>
      )}


      <Images data={data.ImagesSection} />

      <AntiragginCommitte data={data.CommitteMembers} />
    </ActivitiesPageShell>
  );
}

export default NCCCell;

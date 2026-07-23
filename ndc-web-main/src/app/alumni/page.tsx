"use client";

import React from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import VisionMission from "@/components/Alumni/VisionMission";
import Association from "@/components/Alumni/Association";
import pageJson from "@/data-export/alumni/data.json";

const Alumni = () => {
  const alumniData: any = (pageJson["alumni"] as any)?.data || null;

  if (!alumniData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={alumniData.BannerSection.eyebrow}
        title={alumniData.BannerSection.title} 
        subtitle={alumniData.BannerSection.subtitle}
        image={alumniData.BannerSection.image} 
      />

      <VisionMission data={alumniData.VisionMission} />

      <Association data={alumniData.AlumniAssciation} />
    </main>
  );
};

export default Alumni;

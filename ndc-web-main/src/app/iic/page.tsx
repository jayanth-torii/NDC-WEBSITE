"use client";

import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import IICMembers from "@/components/IIC/IICMembers";
import pageJson from "@/data-export/iic/data.json";

function IIC() {
  const IICData: any = (pageJson["iic"] as any)?.data || null;

  if (!IICData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={IICData.BannerSection.eyebrow}
        title={IICData.BannerSection.title}
        subtitle={IICData.BannerSection.subtitle}
        image={IICData.BannerSection.image}
      />

      <IICMembers data={IICData.IICMembers} />
    </main>
  );
}

export default IIC;

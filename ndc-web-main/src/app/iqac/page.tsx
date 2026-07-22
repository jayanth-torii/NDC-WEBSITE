"use client";

import React, { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import IqacBanner from "@/components/IQAC/IqacBanner";
import About from "@/components/IQAC/About";
import CompositionCell from "@/components/IQAC/CompositionCell";
import pageJson from "@/data-export/iqac/data.json";

function IQAC() {
  const iqacData: any = (pageJson["iqac"] as any)?.data || null;

  if (!iqacData) {
    return null;
  }

  return (
    <div className="m-auto w-[90%]">
      <IqacBanner data={iqacData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <About data={iqacData.AboutVisionMissionSections} />

      <CompositionCell data={iqacData.CompositionOfIQACCell} />
    </div>
  );
}

export default IQAC;

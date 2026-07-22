"use client";
import React, { Suspense } from "react";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Images from "@/components/Activities/CommonComponents/Images";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/faculty-oriented-cells/ed-cell/data.json";

function EDCell() {
  const data: any = (pageJson["ed-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <About data={data.AboutVisionMissionSections} />

      <Images data={data.ImagesSection} />

      <AntiragginCommitte data={data.Coordinators} />
    </div>
  );
}

export default EDCell;

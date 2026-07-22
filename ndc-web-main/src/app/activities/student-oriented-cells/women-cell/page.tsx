"use client";
import React, { Suspense } from "react";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import About from "@/components/Activities/CommonComponents/About";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import pageJson from "@/data-export/activities/student-oriented-cells/women-cell/data.json";

function WomenCell() {
  const data: any = (pageJson["women-cell"] as any)?.data || null;

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

      <AntiragginCommitte data={data.antiRaggingCommitteMembers} />

    </div>
  );
}

export default WomenCell;

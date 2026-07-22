"use client";
import React, { Suspense } from "react";

import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import pageJson from "@/data-export/activities/student-oriented-cells/eco-clubs/data.json";

function ECOClubs() {
  const data: any = (pageJson["eco-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      
      <Procedure data={data.Sections} />
    </div>
  );
}

export default ECOClubs;

"use client";
import React, { Suspense } from "react";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/faculty-oriented-cells/sc-st-obc-minority-cell/data.json";

function SCSTOBCMinorityCell() {
  const data: any = (pageJson["sc-st-obc-minority-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AntiragginCommitte data={data.SCSTCommitteeMembers} />
    </div>
  );
}

export default SCSTOBCMinorityCell;

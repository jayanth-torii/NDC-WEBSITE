"use client";
import React, { Suspense } from "react";
import pageJson from "@/data-export/activities/student-oriented-cells/anti-ragging-cell/data.json";

import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import About from "@/components/Activities/CommonComponents/About";
import Policies from "@/components/Activities/CommonComponents/Policies";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

function AntiRaggingCell() {
  const data: any = (pageJson["anti-ragging-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>
      <About data={data.aboutSections} />
      <Policies data={data.policyAndConsiderations} />
      <AntiragginCommitte data={data.antiRaggingCommitteMembers} />
    </div>
  );
}

export default AntiRaggingCell;

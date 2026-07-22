"use client";
import React, { Suspense } from "react";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/academic-&-social-engagement-forums/ambedkar-study-circle/data.json";

function AmbedkarStudyCircle() {
  const data: any = (pageJson["ambedkar-study-circle"] as any)?.data || null;

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

      <AntiragginCommitte data={data.ForumCoordinators} />
    </div>
  );
}

export default AmbedkarStudyCircle;

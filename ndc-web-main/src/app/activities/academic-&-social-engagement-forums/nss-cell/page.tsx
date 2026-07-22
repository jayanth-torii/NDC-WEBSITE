"use client";
import React, { Suspense } from "react";

import Banner from '@/components/Activities/CommonComponents/Banner';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import Images from "@/components/Activities/CommonComponents/Images";
import pageJson from "@/data-export/activities/academic-&-social-engagement-forums/nss-cell/data.json";


function NSSCell() {
  const data: any = (pageJson["nss-and-red-cross"] as any)?.data || null;

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

      <Images data={data.ImagesSection} />
    </div>
  );
}

export default NSSCell;

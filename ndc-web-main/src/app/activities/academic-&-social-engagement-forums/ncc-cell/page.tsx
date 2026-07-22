"use client";
import React, { Suspense } from "react";

import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import pageJson from "@/data-export/activities/academic-&-social-engagement-forums/ncc-cell/data.json";

function NCCCell() {
  const data: any = (pageJson["ncc"] as any)?.data || null;

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

     
      {data?.NccImage && (
        <div className="bg-[#F6F6F6] rounded-md p-6 mb-10 md:mb-20">
          <img
            src={data.NccImage}
            alt="NCC Cadet"
            className="m-auto w-[50%] h-auto object-contain"
          />
        </div>
      )}

     
      <Images data={data.ImagesSection} />

     
      <AntiragginCommitte data={data.CommitteMembers} />
    </div>
  );
}

export default NCCCell;

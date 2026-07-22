"use client";

import React, { Suspense } from "react";


import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import IICBanner from "@/components/IIC/IICBanner";
import IICMembers from "@/components/IIC/IICMembers";

import pageJson from "@/data-export/iic/data.json";


function IIC() {
  const IICData: any = (pageJson["iic"] as any)?.data || null;

  if (!IICData) {
    return null;
  }

  return (
    <div className="m-auto w-[90%]">
      <IICBanner data={IICData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <IICMembers data={IICData.IICMembers} />
    </div>
  );
}

export default IIC;

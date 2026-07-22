"use client";
import React, { Suspense } from "react";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";

import pageJson from "@/data-export/activities/student-oriented-cells/students-grievance-cell/data.json";

function StudentsGrievanceRedressalCell() {
  const data: any = (pageJson["students-grievance-redressal-cell"] as any)?.data || null;

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

      <Procedure data={data.proceduresSection} />

      <Images data={data.ImagesSection} />

      <AntiragginCommitte data={data.Members} />
    </div>
  );
}

export default StudentsGrievanceRedressalCell;

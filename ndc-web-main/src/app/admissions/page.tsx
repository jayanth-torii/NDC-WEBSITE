"use client";

import React, { Suspense } from "react";
import pageJson from "@/data-export/admissions/data.json";

import GlobalBanner from "@/components/GlobalBanner";
import Courses from "@/components/Admission/Courses";
import Documents from "@/components/Admission/Documents";
import Procedure from "@/components/Admission/Procedure";

const Admission = () => {
  const admissionData: any = (pageJson["admission"] as any)?.data || null;

  if (!admissionData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        title={admissionData.BannerSection?.title || "Admissions"}
        image={admissionData.BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Admissions" }
        ]}
      />

      <Suspense fallback={<p>Loading Courses...</p>}>
        <Courses data={admissionData.coursesEligibility} />
      </Suspense>

      <Suspense fallback={<p>Loading Procedure...</p>}>
        <Procedure data={admissionData.applicationProcedure} />
      </Suspense>

      <Suspense fallback={<p>Loading Documents...</p>}>
        <Documents data={admissionData.ImportentDocuments} />
      </Suspense>
    </div>
  );
};

export default Admission;

"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import Courses from "@/components/Admission/Courses";
import Documents from "@/components/Admission/Documents";
import Procedure from "@/components/Admission/Procedure";
import AdmissionBanner from "@/components/Admission/AdmissionBanner";

import pageJson from "@/data-export/admissions/data.json";

const Admission = () => {
  const admissionData: any = (pageJson["admission"] as any)?.data || null;

  if (!admissionData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
        
      <AdmissionBanner data={admissionData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Courses data={admissionData.coursesEligibility} />

      <Procedure data={admissionData.applicationProcedure} />

      <Documents data={admissionData.ImportentDocuments} />
    </Box>
  );
};

export default Admission;

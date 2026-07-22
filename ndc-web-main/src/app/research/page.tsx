"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Research from "@/components/Research/Research";
import ResearchBanner from "@/components/Research/ResearchBanner";

import researchJson from "@/data-export/research/data.json";

const ResearchPage = () => {
  const researchData: any = (researchJson["research"] as any)?.data?.[0] || null;

  if (!researchData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <ResearchBanner data={researchData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Research data={researchData.ResearchPublications} />
    </Box>
  );
};

export default ResearchPage;

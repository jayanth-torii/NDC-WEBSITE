"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AlumniBanner from "@/components/Alumni/AlumniBanner";
import VisionMission from "@/components/Alumni/VisionMission";
import Association from "@/components/Alumni/Association";

import pageJson from "@/data-export/alumni/data.json";

const Alumni = () => {
  const alumniData: any = (pageJson["alumni"] as any)?.data || null;

  if (!alumniData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <AlumniBanner data={alumniData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <VisionMission data={alumniData.VisionMission} />

      <Association data={alumniData.AlumniAssciation} />
    </Box>
  );
};

export default Alumni;

"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AboutUs from "@/components/AboutNDC/AboutUs";
import OurVisionMission from "@/components/AboutNDC/OurVisionMission";
import PrincipalMessage from "@/components/AboutNDC/PrincipalMessage";
import OurCampus from "@/components/AboutNDC/OurCampus";
import Council from "@/components/AboutNDC/Council";
import NewsLetter from "@/components/AboutNDC/NewsLetter";
import ImpConsiderations from "@/components/AboutNDC/ImpConsiderations";

import pageJson from "@/data-export/about-ndc/data.json";

const AboutNDC = () => {
  const aboutData: any = (pageJson["about-us"] as any)?.data || null;

  if (!aboutData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AboutUs data={aboutData.aboutUs} />
      <OurVisionMission data={aboutData.VisionMission} />
      <PrincipalMessage data={aboutData.principalMessage} />
      <NewsLetter data={aboutData.NewsLetter} />
      <OurCampus data={aboutData.OurCampuses} />
      <Council data={aboutData.GoverningCouncilMembers} />
      <ImpConsiderations data={aboutData.ImportantConsiderations} />
    </Box>
  );
};

export default AboutNDC;

"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import SportsBanner from "@/components/Sports/SportsBanner";
import AboutSections from "@/components/Sports/AboutSections";
import HodMessage from "@/components/Sports/HodMessage";
import Gallery from "@/components/Sports/Gallery";

import pageJson from "@/data-export/sports/data.json";

const Sports = () => {
  const sportsData: any = (pageJson["sports"] as any)?.data || null;

  if (!sportsData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <SportsBanner data={sportsData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AboutSections data={sportsData.aboutSections} />
    
      <HodMessage data={sportsData.HodMessage} />

      <Gallery data={sportsData.gallerySection} />
      
    </Box>
  );
};

export default Sports;

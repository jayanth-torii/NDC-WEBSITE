"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";
import pageJson from "@/data-export/gallery/data.json";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import GalleryBanner from "@/components/GalleryPage/GalleryBanner";
import GalleryImages from "@/components/GalleryPage/GalleryImages";

const Gallery = () => {
  const galleryData: any = (pageJson["gallery"] as any)?.data || null;

  if (!galleryData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <Suspense>
        <Breadcrumb />
      </Suspense>

      <GalleryBanner bannerData={galleryData.BannerSection} />
      <GalleryImages imageData={galleryData.imagesSection.tabImages} />
    </Box>
  );
};

export default Gallery;

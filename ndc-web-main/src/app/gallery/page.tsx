"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import GalleryBanner from "@/components/GalleryPage/GalleryBanner";
import GalleryImages from "@/components/GalleryPage/GalleryImages";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/gallery`);
        setGalleryData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryContent();
  }, []);

  if (loading || !galleryData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Gallery...
      </div>
    );
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

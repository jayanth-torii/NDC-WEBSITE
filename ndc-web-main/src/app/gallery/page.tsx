"use client";

import React from "react";
import pageJson from "@/data-export/gallery/data.json";

import GlobalBanner from "@/components/GlobalBanner";
import GalleryImages from "@/components/GalleryPage/GalleryImages";

const Gallery = () => {
  const galleryData: any = (pageJson["gallery"] as any)?.data || null;

  if (!galleryData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalBanner
        title={galleryData.BannerSection?.title || "Campus Gallery"}
        eyebrow="Memories"
        subtitle={galleryData.BannerSection?.description || "Discover the vibrant moments that define our journey — grand events, cultural festivities, and proud academic milestones, all captured in a stunning visual collection."}
        image={galleryData.BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Gallery" }
        ]}
      />

      <div className="flex-1 bg-white">
        <GalleryImages imageData={galleryData.imagesSection?.tabImages || {}} />
      </div>
    </div>
  );
};

export default Gallery;

import React from "react";

import GlobalBanner from "@/components/GlobalBanner";
import GalleryImages from "@/components/GalleryPage/GalleryImages";
import { getGallery } from "@/services/data.service";

export const revalidate = 300;

const Gallery = async () => {
  const galleryData: any = await getGallery();

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

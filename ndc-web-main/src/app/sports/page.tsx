"use client";

import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
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
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={sportsData.BannerSection.eyebrow}
        title={sportsData.BannerSection.title}
        subtitle={sportsData.BannerSection.subtitle}
        image={sportsData.BannerSection.image}
      />

      <AboutSections data={sportsData.aboutSections} />
    
      <HodMessage data={sportsData.HodMessage} />

      <Gallery data={sportsData.gallerySection} />
      
    </main>
  );
};

export default Sports;

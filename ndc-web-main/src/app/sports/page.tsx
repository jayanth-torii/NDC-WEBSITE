import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import AboutSections from "@/components/Sports/AboutSections";
import HodMessage from "@/components/Sports/HodMessage";
import Gallery from "@/components/Sports/Gallery";

import { getSports } from "@/services/data.service";

export const revalidate = 300;

const Sports = async () => {
  const sportsData: any = await getSports();

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

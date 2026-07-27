import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import About from "@/components/IQAC/About";
import CompositionCell from "@/components/IQAC/CompositionCell";
import { getIqac } from "@/services/data.service";

export const revalidate = 300;

async function IQAC() {
  const iqacData: any = await getIqac();

  if (!iqacData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={iqacData.BannerSection.eyebrow}
        title={iqacData.BannerSection.title}
        subtitle={iqacData.BannerSection.subtitle}
        image={iqacData.BannerSection.image}
      />

      <About data={iqacData.AboutVisionMissionSections} />

      <CompositionCell data={iqacData.CompositionOfIQACCell} />
    </main>
  );
}

export default IQAC;

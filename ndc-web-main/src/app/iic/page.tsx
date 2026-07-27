import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import IICMembers from "@/components/IIC/IICMembers";
import { getIic } from "@/services/data.service";

export const revalidate = 300;

async function IIC() {
  const IICData: any = await getIic();

  if (!IICData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={IICData.BannerSection.eyebrow}
        title={IICData.BannerSection.title}
        subtitle={IICData.BannerSection.subtitle}
        image={IICData.BannerSection.image}
      />

      <IICMembers data={IICData.IICMembers} />
    </main>
  );
}

export default IIC;

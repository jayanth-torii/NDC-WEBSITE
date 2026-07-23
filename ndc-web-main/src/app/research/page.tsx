"use client";

import React, { Suspense } from "react";
import researchJson from "@/data-export/research/data.json";

import GlobalBanner from "@/components/GlobalBanner";
import Research from "@/components/Research/Research";

const ResearchPage = () => {
  const researchData: any = (researchJson["research"] as any)?.data?.[0] || null;

  if (!researchData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        eyebrow={researchData.BannerSection?.eyebrow}
        title={researchData.BannerSection?.title || "Research"}
        subtitle={researchData.BannerSection?.subtitle}
        image={researchData.BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Research" }
        ]}
      />

      <Suspense fallback={<p>Loading Research Publications...</p>}>
        <Research data={researchData.ResearchPublications} />
      </Suspense>
    </div>
  );
};

export default ResearchPage;

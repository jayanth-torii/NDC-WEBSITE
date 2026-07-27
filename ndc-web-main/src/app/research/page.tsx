import React, { Suspense } from "react";

import GlobalBanner from "@/components/GlobalBanner";
import Research from "@/components/Research/Research";
import { getResearch } from "@/services/data.service";

export const revalidate = 300;

const ResearchPage = async () => {
  // Backend already unwraps the source's array-wrapping at seed time, so the  const researchData: any = await getResearch();

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

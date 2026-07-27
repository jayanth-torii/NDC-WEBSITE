import React, { Suspense } from "react";

import GlobalBanner from "@/components/GlobalBanner";
import AboutLibrary from "@/components/Library/AboutLibrary";
import Resources from "@/components/Library/Resources";
import EventsRules from "@/components/Library/EventsRules";

import { getLibrary } from "@/services/data.service";

export const revalidate = 300;

const ASSET_BASE = "https://nagarjuna-degree-college-727596873106-ap-south-2-an.s3.ap-south-2.amazonaws.com";

const Library = async () => {
  const libraryData = await getLibrary();

  if (!libraryData) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        eyebrow="Academics"
        title="Library"
        subtitle="Knowledge today, leaders tomorrow."
        image={`${ASSET_BASE}/images/StudentCenter/AcademicEnrichment/Library/gallery_1.png`}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Library" },
        ]}
      >
        {/* Dot grid, upper-left over the dark gradient */}
        <div className="absolute top-6 left-[6%] w-40 h-40 bg-dot-grid-light opacity-40 [mask-image:radial-gradient(closest-side,#000,transparent)]" />

        {/* Dashed ring accent */}
        <svg className="absolute top-10 right-[30%] w-24 h-24 opacity-30 hidden md:block" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#f6872a" strokeWidth="1.5" strokeDasharray="4 5" />
        </svg>

        {/* Soft orange glow, bottom-left */}
        <div className="absolute -bottom-16 left-[10%] w-64 h-64 rounded-full bg-orange/25 blur-[90px]" />

        {/* Soft blue glow, top-right */}
        <div className="absolute -top-20 right-[8%] w-72 h-72 rounded-full bg-[#3270fc]/20 blur-[100px]" />

        {/* Small solid accent dot */}
        <span className="absolute bottom-10 left-[32%] w-2.5 h-2.5 rounded-full bg-orange/80 hidden sm:block" />
      </GlobalBanner>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <AboutLibrary data={libraryData.aboutLibrary} />
        <Resources data={libraryData.digitalResources} />
        <EventsRules data={libraryData.EventsAndRules} />
      </div>
    </div>
  );
};

export default Library;

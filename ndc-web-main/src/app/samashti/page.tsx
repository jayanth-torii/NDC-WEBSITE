import React, { Suspense } from "react";
import SamashtiHero from "@/components/Samashti/SamashtiHero";
import SamashtiAbout from "@/components/Samashti/SamashtiAbout";
import SamashtiFeatures from "@/components/Samashti/SamashtiFeatures";
import SamashtiEditions from "@/components/Samashti/SamashtiEditions";
import SamashtiCTA from "@/components/Samashti/SamashtiCTA";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { getSamashti } from "@/services/data.service";

export const revalidate = 300;

const Samashti = async () => {
  const data: any = await getSamashti();

  if (!data) {
    return null;
  }

  const { BannerSection, About, Editions } = data;

  return (
    <main className="bg-white min-h-screen">
      <SamashtiHero data={BannerSection} />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-4">
        <Suspense>
          <Breadcrumb className="ml-0" />
        </Suspense>
      </div>

      <SamashtiAbout data={About} />
      <SamashtiFeatures />
      <SamashtiEditions data={Editions} />
      <SamashtiCTA />
    </main>
  );
};

export default Samashti;
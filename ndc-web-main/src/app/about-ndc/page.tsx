import React, { Suspense } from "react";
import { getAboutNdc } from "@/services/data.service";

import GlobalBanner from "@/components/GlobalBanner";
import AboutUs from "@/components/AboutNDC/AboutUs";
import OurVisionMission from "@/components/AboutNDC/OurVisionMission";
import PrincipalMessage from "@/components/AboutNDC/PrincipalMessage";
import OurCampus from "@/components/AboutNDC/OurCampus";
import Council from "@/components/AboutNDC/Council";
import NewsLetter from "@/components/AboutNDC/NewsLetter";
import ImpConsiderations from "@/components/AboutNDC/ImpConsiderations";

export const revalidate = 300;

const AboutNDC = async () => {
  const aboutData: any = await getAboutNdc();

  if (!aboutData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        title="About Us"
        image={aboutData.aboutUs?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" }
        ]}
      />

      <Suspense fallback={<p>Loading About Us...</p>}>
        <AboutUs data={aboutData.aboutUs} />
      </Suspense>

      <Suspense fallback={<p>Loading Vision & Mission...</p>}>
        <OurVisionMission data={aboutData.VisionMission} />
      </Suspense>

      <Suspense fallback={<p>Loading Principal's Message...</p>}>
        <PrincipalMessage data={aboutData.principalMessage} />
      </Suspense>

      <Suspense fallback={<p>Loading Governing Council...</p>}>
        <Council data={aboutData.GoverningCouncilMembers} />
      </Suspense>

      <Suspense fallback={<p>Loading Campuses...</p>}>
        <OurCampus data={aboutData.OurCampuses} />
      </Suspense>
      
      {/* Grouping Downloads section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Suspense fallback={<p>Loading Newsletter...</p>}>
              <NewsLetter data={aboutData.NewsLetter} />
            </Suspense>
            <Suspense fallback={<p>Loading Important Considerations...</p>}>
              <ImpConsiderations data={aboutData.ImportantConsiderations} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutNDC;

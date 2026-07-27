import React from 'react'

import GlobalBanner from '@/components/GlobalBanner/GlobalBanner'
import KnowEverything from '@/components/Activities/KnowEverything'
import CulturalActivities from '@/components/Activities/CulturalActivities'
import CulturalLeadershipActivities from '@/components/Activities/CulturalLeadershipActivities'

import { getActivitiesPage } from '@/services/data.service'

interface ActivitiesPageData {
  BannerSection: {
    title: string;
    image: string;
  };
  Know_Every_Thing: {
    title: string;
    description: string;
    image: string;
  };
  Activities: {
    title: string;
    description: string;
    image: string;
  };
  Cultural_And_Leadership_Activities: {
    title: string;
    Sections: any[]; // (replace 'any' with the correct structure if available)
  };
}



async function Activities() {
  const data: ActivitiesPageData | null = await getActivitiesPage()

  if (!data) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner
        eyebrow="Extracurriculars"
        title={data?.BannerSection?.title || "Activities"}
        image={data?.BannerSection?.image}
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Activities" }]}
      />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <KnowEverything data={data?.Know_Every_Thing} />

        <CulturalActivities data={data?.Activities} />

        <CulturalLeadershipActivities data={data?.Cultural_And_Leadership_Activities} />
      </div>
    </main>
  )
}

export default Activities

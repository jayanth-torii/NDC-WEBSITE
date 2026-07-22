"use client"

import React, { Suspense } from 'react'

import Breadcrumb from '@/components/CommonComponents/BreadCrumb'
import ActivitiesBanner from '@/components/Activities/ActivitiesBanner'
import KnowEverything from '@/components/Activities/KnowEverything'
import CulturalActivities from '@/components/Activities/CulturalActivities'
import CulturalLeadershipActivities from '@/components/Activities/CulturalLeadershipActivities'

import pageJson from '@/data-export/activities/data.json'

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



function Activities() {
  const data: ActivitiesPageData | null = (pageJson["activities-page"] as any)?.data || null

  if (!data) {
    return null
  }

  return (
    <div className="m-auto w-[90%]">
      <ActivitiesBanner data={data?.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <KnowEverything data={data?.Know_Every_Thing} />

      <CulturalActivities data={data?.Activities} />

      <CulturalLeadershipActivities data={data?.Cultural_And_Leadership_Activities} />
    </div>
  )
}

export default Activities

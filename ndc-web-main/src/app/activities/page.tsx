"use client"

import React, { useEffect, useState, Suspense } from 'react'
import axios from 'axios'

import Breadcrumb from '@/components/CommonComponents/BreadCrumb'
import ActivitiesBanner from '@/components/Activities/ActivitiesBanner'
import KnowEverything from '@/components/Activities/KnowEverything'
import CulturalActivities from '@/components/Activities/CulturalActivities'
import CulturalLeadershipActivities from '@/components/Activities/CulturalLeadershipActivities'

import { BASE_URL } from '@/config/apiService'

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
  const [data, setData] = useState<ActivitiesPageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/activities-page`)
        setData(res.data?.data)   
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Activities...
      </div>
    )
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

"use client"

import React, { Suspense, useEffect, useState } from "react";

import AboutNDC from "@/components/HomePage/AboutNDC"
import Education from "@/components/HomePage/Education"
import CertificateCourses from "@/components/HomePage/CertificateCourses"
import HomeHero from "@/components/HomePage/HomeHero"
import Stats from "@/components/HomePage/Records/Records"
import Yrs25 from "@/components/HomePage/Yrs25"
import LifeAtNDC from "@/components/HomePage/LifeAtNDC";
import Notifications from "@/components/HomePage/Notifications"
import Blogs from "@/components/HomePage/Blogs"
 
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

const Landing = () => {

    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchHomeContent = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/home`);
          setApiData(response?.data?.data?.[0]);
        } catch (error) {
          console.error("Error Fetching Home Data:", error);
      } finally {
        setLoading(false);
      }
      };
      fetchHomeContent();
    }, []);

    

    if (loading || !apiData) {
      return (
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading HOME...
        </div>
      );
    }

    const {
        bannerSection,
        Records,
        AboutNdcSection,
        Yrs25Section,
        ExploreCertificateCourses,
        CampusLife,
        EducationExcellence,
        NotificationsData
    } = apiData;



    return (
        <div>
            <HomeHero data={bannerSection}/>
            <Stats data={Records}/>
            <AboutNDC data={AboutNdcSection}/>
            <CertificateCourses data={ExploreCertificateCourses}/>
            <Yrs25 data={Yrs25Section}/>
            <LifeAtNDC data={CampusLife}/>
            <Education data={EducationExcellence}/>
            <Notifications data={NotificationsData}/>
            <Blogs/>
        </div>
    )

}

export default Landing
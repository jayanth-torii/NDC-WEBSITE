"use client"

import React from "react";

import AboutNDC from "@/components/HomePage/AboutNDC"
import Education from "@/components/HomePage/Education"
import CertificateCourses from "@/components/HomePage/CertificateCourses"
import HomeHero from "@/components/HomePage/HomeHero"
import Notifications from "@/components/HomePage/Notifications"
import Blogs from "@/components/HomePage/Blogs"
import PlacementPartners from "@/components/HomePage/PlacementPartners"
import Stats from "@/components/HomePage/Records/Records"
import Yrs25 from "@/components/HomePage/Yrs25"
import LifeAtNDC from "@/components/HomePage/LifeAtNDC";

import landingJson from "@/data-export/_landing/data.json";

const Landing = () => {

    const apiData: any = (landingJson["home"] as any)?.data?.[0] || null;

    if (!apiData) {
      return null;
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
        <div className="w-full overflow-hidden bg-white">
            <HomeHero data={bannerSection}/>
            <Stats data={Records}/>
            <AboutNDC data={AboutNdcSection}/>
            <CertificateCourses data={ExploreCertificateCourses}/>
            <Yrs25 data={Yrs25Section}/>
            <LifeAtNDC data={CampusLife}/>
            <Education data={EducationExcellence}/>
            <Notifications data={NotificationsData}/>
            <PlacementPartners />
            <Blogs/>
        </div>
    )

}

export default Landing
"use client"

import React from "react";

import AboutNDC from "@/components/HomePage/AboutNDC"
import Education from "@/components/HomePage/Education"
import CertificateCourses from "@/components/HomePage/CertificateCourses"
import HomeHero from "@/components/HomePage/HomeHero"
import Stats from "@/components/HomePage/Records/Records"
import Yrs25 from "@/components/HomePage/Yrs25"
import LifeAtNDC from "@/components/HomePage/LifeAtNDC";
import Notifications from "@/components/HomePage/Notifications"
import Blogs from "@/components/HomePage/Blogs"

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
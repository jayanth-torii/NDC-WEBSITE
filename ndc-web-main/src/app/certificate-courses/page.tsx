"use client";

import React, {Suspense} from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import CertificateCoursesBanner from "@/components/CertificateCourses/CertificateCoursesBanner";
import AboutCertificateCourses from "@/components/CertificateCourses/AboutCertificateCourses";
import Images from "@/components/CertificateCourses/Images";
import CoursesOutCome from "@/components/CertificateCourses/CoursesOutComes";
import pageJson from "@/data-export/certificate-courses/data.json";


const CertificateCourses = () => {
    const apiData: Record<string, any> | null = (pageJson["certificate-course"] as any)?.data || null;

    return (
        <Box style={{ margin: "auto", width: "90%" }}>

            <CertificateCoursesBanner data={apiData?.BannerSection}/>

            <Suspense>
              <Breadcrumb className="ml-0"/>
            </Suspense>

            <AboutCertificateCourses data={apiData?.AboutVisionMissionSections}/>
            <Images data={apiData?.Images}/>
            <CoursesOutCome data={apiData?.CourseOutcome}/>
            
        </Box>

    )
}

export default CertificateCourses
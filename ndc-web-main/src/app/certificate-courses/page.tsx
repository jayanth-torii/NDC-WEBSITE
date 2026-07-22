"use client";

import React, {Suspense, useEffect, useState} from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import CertificateCoursesBanner from "@/components/CertificateCourses/CertificateCoursesBanner";
import AboutCertificateCourses from "@/components/CertificateCourses/AboutCertificateCourses";
import Images from "@/components/CertificateCourses/Images";
import CoursesOutCome from "@/components/CertificateCourses/CoursesOutComes";
import axios from "axios";
import { BASE_URL } from "../../config/apiService";


const CertificateCourses = () => {
    const [apiData, setCertificateCoursesData] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        const fetchCertificateCoursesContent = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/certificate-course`);
            setCertificateCoursesData(response.data.data);
          } catch (error) {
            console.error("Error fetching fetchCertificateCourses:", error);
          }
        };
    
        fetchCertificateCoursesContent();
      }, []);

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
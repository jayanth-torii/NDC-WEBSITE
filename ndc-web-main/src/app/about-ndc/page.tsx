"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AboutUs from "@/components/AboutNDC/AboutUs";
import OurVisionMission from "@/components/AboutNDC/OurVisionMission";
import PrincipalMessage from "@/components/AboutNDC/PrincipalMessage";
import OurCampus from "@/components/AboutNDC/OurCampus";
import Council from "@/components/AboutNDC/Council";
import NewsLetter from "@/components/AboutNDC/NewsLetter";
import ImpConsiderations from "@/components/AboutNDC/ImpConsiderations";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

const AboutNDC = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/about-us`);
        setAboutData(response.data.data);
      } catch (error) {
        console.error("Error fetching About NDC data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading || !aboutData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading About Us...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AboutUs data={aboutData.aboutUs} />
      <OurVisionMission data={aboutData.VisionMission} />
      <PrincipalMessage data={aboutData.principalMessage} />
      <NewsLetter data={aboutData.NewsLetter} />
      <OurCampus data={aboutData.OurCampuses} />
      <Council data={aboutData.GoverningCouncilMembers} />
      <ImpConsiderations data={aboutData.ImportantConsiderations} />
    </Box>
  );
};

export default AboutNDC;

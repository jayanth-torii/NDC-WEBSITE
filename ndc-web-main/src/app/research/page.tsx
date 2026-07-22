"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Research from "@/components/Research/Research";
import ResearchBanner from "@/components/Research/ResearchBanner";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

const ResearchPage = () => {
  const [researchData, setResearchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearchContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/research`);
        const firstItem = response?.data?.data?.[0];
        console.log("Fetched Research Data:", firstItem);
        setResearchData(firstItem);
      } catch (error) {
        console.error("Error fetching Research data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchContent();
  }, []);

  if (loading || !researchData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Research...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <ResearchBanner data={researchData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Research data={researchData.ResearchPublications} />
    </Box>
  );
};

export default ResearchPage;

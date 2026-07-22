"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ApplyNowBanner from "@/components/ApplyNow/ApplyNowBanner";
import QueryForm from "@/components/ApplyNow/QueryForm";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

const ApplyNow = () => {
  const [applyData, setApplyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplyData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/apply-now`);
        setApplyData(response.data.data);
      } catch (error) {
        console.error("Error fetching Apply Now data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplyData();
  }, []);

  if (loading || !applyData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Apply Now...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <ApplyNowBanner data={applyData.BannerSection} />

      <QueryForm />
    </Box>
  );
};

export default ApplyNow;

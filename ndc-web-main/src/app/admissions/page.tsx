"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import Courses from "@/components/Admission/Courses";
import Documents from "@/components/Admission/Documents";
import Procedure from "@/components/Admission/Procedure";
import AdmissionBanner from "@/components/Admission/AdmissionBanner";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

const Admission = () => {
  const [admissionData, setAdmissionData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchAdmissionContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admission`);
        console.log("Fetched Admission Sections Data:", response?.data?.data);
        setAdmissionData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching Admission sections:", error);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchAdmissionContent();
  }, []);

  if (loading || !admissionData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Admissions...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
        
      <AdmissionBanner data={admissionData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Courses data={admissionData.coursesEligibility} />

      <Procedure data={admissionData.applicationProcedure} />

      <Documents data={admissionData.ImportentDocuments} />
    </Box>
  );
};

export default Admission;

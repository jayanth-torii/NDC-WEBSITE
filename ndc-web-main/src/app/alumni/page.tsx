"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AlumniBanner from "@/components/Alumni/AlumniBanner";
import VisionMission from "@/components/Alumni/VisionMission";
import Association from "@/components/Alumni/Association";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

const Alumni = () => {
  const [alumniData, setAlumniData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumniContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/alumni`);
        setAlumniData(response.data.data);
      } catch (error) {
        console.error("Error fetching Alumni sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniContent();
  }, []);

  if (loading || !alumniData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Alumni...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <AlumniBanner data={alumniData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <VisionMission data={alumniData.VisionMission} />

      <Association data={alumniData.AlumniAssciation} />
    </Box>
  );
};

export default Alumni;

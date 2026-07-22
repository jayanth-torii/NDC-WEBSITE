"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ResearchForumBanner from "@/components/ResearchForum/ResearchForumBanner";
import Forum from "@/components/ResearchForum/Forum";

import axios from "axios";
import { BASE_URL } from "../../config/apiService";

const ResearchForum = () => {
  const [ResearchForumData, setResearchForumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchResearchForumContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/research-forum`);
        setResearchForumData(response?.data?.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching ResearchForum data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchForumContent();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Research Forum...
      </div>
    );
  }

  if (error || !ResearchForumData) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load Research Forum content.
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <ResearchForumBanner data={ResearchForumData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Forum data={ResearchForumData.ResearchForum} />
    </Box>
  );
};

export default ResearchForum;

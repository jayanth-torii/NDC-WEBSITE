"use client";

import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import SportsBanner from "@/components/Sports/SportsBanner";
import AboutSections from "@/components/Sports/AboutSections";
import HodMessage from "@/components/Sports/HodMessage";
import Gallery from "@/components/Sports/Gallery";

import { BASE_URL } from "@/config/apiService";

const Sports = () => {
  const [sportsData, setSportsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchSportsContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sports`);
        setSportsData(response?.data?.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching sports data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsContent();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Sports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load sports content.
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <SportsBanner data={sportsData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AboutSections data={sportsData.aboutSections} />
    
      <HodMessage data={sportsData.HodMessage} />

      <Gallery data={sportsData.gallerySection} />
      
    </Box>
  );
};

export default Sports;

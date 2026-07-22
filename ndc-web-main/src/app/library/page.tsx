"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import LibraryBanner from "@/components/Library/LibraryBanner";
import AboutLibrary from "@/components/Library/AboutLibrary";
import Resources from "@/components/Library/Resources";
import EventsRules from "@/components/Library/EventsRules";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";
import Contact from "@/components/Library/Contact";

const Library = () => {
  const [libraryData, setLibraryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibraryContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/library`);
        setLibraryData(response.data.data);
      } catch (error) {
        console.error("Error fetching Library data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryContent();
  }, []);

  if (loading || !libraryData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Library...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <LibraryBanner data={libraryData?.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AboutLibrary data={libraryData?.aboutLibrary} />
      <Resources data={libraryData?.digitalResources} />
      <EventsRules data={libraryData?.EventsAndRules} />
      <Contact data={libraryData?.ContactUs} />
    </Box>
  );
};

export default Library;

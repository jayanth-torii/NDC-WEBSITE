"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import LibraryBanner from "@/components/Library/LibraryBanner";
import AboutLibrary from "@/components/Library/AboutLibrary";
import Resources from "@/components/Library/Resources";
import EventsRules from "@/components/Library/EventsRules";

import pageJson from "@/data-export/library/data.json";
import Contact from "@/components/Library/Contact";

const Library = () => {
  const libraryData: any = (pageJson["library"] as any)?.data || null;

  if (!libraryData) {
    return null;
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

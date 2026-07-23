"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import LibraryBanner from "@/components/Library/LibraryBanner";
import AboutLibrary from "@/components/Library/AboutLibrary";
import Resources from "@/components/Library/Resources";
import EventsRules from "@/components/Library/EventsRules";
import Contact from "@/components/Library/Contact";

import { LibraryContent } from "@/app/Data/LibraryContent";

const Library = () => {
  const [libraryData, setLibraryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate mapping local static data
    const mappedData = {
      BannerSection: LibraryContent.banner,
      aboutLibrary: {
        title: LibraryContent.aboutPlacementsSection.title,
        aboutText: LibraryContent.aboutPlacementsSection.aboutText,
        dropdowns: LibraryContent.aboutPlacementsSection.sections
      },
      digitalResources: LibraryContent.digitalResources,
      EventsAndRules: {
        title: LibraryContent.EventsRulesSection.title,
        events: LibraryContent.EventsRulesSection.aboutText,
        rulesRegulations: {
          title: LibraryContent.EventsRulesSection.rulesAndRegulations.title,
          sections: LibraryContent.EventsRulesSection.rulesAndRegulations.content
        }
      },
      // ContactUs doesn't exist in LibraryContent.tsx, providing fallback or null
      ContactUs: null
    };
    
    setLibraryData(mappedData);
    setLoading(false);
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
      {libraryData?.ContactUs && <Contact data={libraryData?.ContactUs} />}
    </Box>
  );
};

export default Library;

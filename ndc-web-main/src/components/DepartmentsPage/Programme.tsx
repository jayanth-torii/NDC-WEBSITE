"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";


const programmeOptions: Record<string, string[]> = {
  ug: [
    "B.Com",
    "B.Com-BDA",
    "BBA",
    "BCA",
    // "B.Science",
  ],
  pg: [
    "MBA",
    "MCA",
    // "M.Com"
  ],
};

const Programme = ({data}:any) => {
  const {title, description, image} = data;
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  // Set default tab based on URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace("#", ""); // Remove hash symbol
    if (hash && ["ug_programme", "pg_programme", ].includes(hash)) {
      setSelectedTab(hash.split("_")[0]); // Extract "ug", "pg", or "science"
    } else {
      setSelectedTab("ug"); // Default to UG if no valid hash
    }
  }, []);

  // Update URL hash when the tab changes
  useEffect(() => {
    if (selectedTab && window.location.hash !== `#${selectedTab}_programme`) {
      window.location.hash = `${selectedTab}_programme`;
    }
  }, [selectedTab]);

  const handleProgrammeClick = (programme: string) => {
    router.push(`/department?programme=${encodeURIComponent(programme)}`);
  };

  return (
    <div className="text-left mb-10 md:mb-20">
      {/* Header Section */}
      <header className="py-6">
        <SectionHeading title={title} />
      </header>

      {/* Tabs Section */}
      <div className="w-full mb-6">
       <Tabs value={selectedTab} onChange={setSelectedTab} className="w-full">
          <Tabs.List className="relative flex flex-col md:flex-row md:justify-start border-b-2 border-card-border">
            {["ug", "pg",  ].map((tab) => (
              <Tabs.Tab
                key={tab}
                value={tab}
                className="text-center px-6 py-3 font-semibold relative transition-none"
                style={{
                  borderBottom: selectedTab === tab ? "4px solid #f6872a" : "4px solid transparent",
                  color: selectedTab === tab ? "#0e2455" : "#53545b",
                  fontSize: "1.2rem",
                  fontWeight: selectedTab === tab ? "700" : "400",
                }}
              >
                  {  `${tab.toUpperCase()} Courses`}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>


      {/* Image and Programme List Section Responsive */}
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-[30%] flex justify-center items-center">
          <img
            src={image}
            alt="Nagarjuna Group of Institutions"
            className="w-full h-auto rounded-[18px] shadow-[var(--shadow-card)] border border-card-border"
          />
        </div>

        {/* Programme List Section */}
        <div className="w-full md:w-[70%]">
          <p className="text-justify text-lg text-body-gray font-normal my-6">
            {description}
          </p>
          <h2 className="text-2xl mb-4 text-navy font-semibold">
            Explore {selectedTab?.toUpperCase()} Programmes
          </h2>
          <RevealGroup className="space-y-3">
          {programmeOptions[selectedTab ?? "ug"]?.map((programme: string) => (
            <RevealItem key={programme}>
              <Card className="flex justify-between items-center px-4 py-3 md:px-6">
                <span className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-navy">
                  {programme}
                </span>
                <Button
                  onClick={() => handleProgrammeClick(programme)}
                  variant="primary"
                  className="!px-4 !py-2 !text-[13px] md:!text-[15px]"
                >
                  View →
                </Button>
              </Card>
            </RevealItem>
          ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
};

export default Programme;

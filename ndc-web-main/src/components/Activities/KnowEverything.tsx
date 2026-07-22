"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";
import StudentCenterContent from "@/app/Data/StudentCenterContent";
import Image from "next/image";

type Tab =
  | "Student Oriented Cells"
  | "Faculty Oriented Cells"
  | "Academic & Social Engagement Forums";

// Map child slugs -> their parent tab
const CHILD_TO_TAB: Record<string, Tab> = {
  // Student Oriented Cells
  "anti-ragging-cell": "Student Oriented Cells",
  "women-cell": "Student Oriented Cells",
  "students-grievance-cell": "Student Oriented Cells",
  "anti-sexual-harassment-cell": "Student Oriented Cells",
  "equal-opportunity-cell": "Student Oriented Cells",
  "eco-clubs": "Student Oriented Cells",

  // Faculty Oriented Cells
  "faculties-welfare": "Faculty Oriented Cells",
  "sc-st-obc-minority-cell": "Faculty Oriented Cells",
  "faculty-study-circle": "Faculty Oriented Cells",
  "ed-cell": "Faculty Oriented Cells",
  "icc-cell": "Faculty Oriented Cells",

  // Academic & Social Engagement Forums
  "ncc-cell": "Academic & Social Engagement Forums",
  "nss-cell": "Academic & Social Engagement Forums",
  "commerce-and-management-forum": "Academic & Social Engagement Forums",
  "ambedkar-study-circle": "Academic & Social Engagement Forums",
  "industrial-visit": "Academic & Social Engagement Forums",
};

// Map parent route slugs -> tab label
const parentSlugToTab: Record<string, Tab> = {
  "student-oriented-cells": "Student Oriented Cells",
  "faculty-oriented-cells": "Faculty Oriented Cells",
  "academic-and-social-engagement-forums": "Academic & Social Engagement Forums",
};

const KnowEverything = ({ data }: any) => {
  const { title, description, image } = data ?? {};
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  // Decide tab from URL hash OR pathname (parent or child) before writing hash
  useEffect(() => {
    // 1) If hash is present and valid, prefer it
    const rawHash =
      typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const hash = decodeURIComponent(rawHash);

    if (StudentCenterContent.tabsList.includes(hash as Tab)) {
      setSelectedTab(hash as Tab);
      return;
    }

    // 2) Derive from pathname
    const segments = pathname.split("/").filter(Boolean); // e.g. ["activities","student-oriented-cells","anti-ragging-cell"]

    // Parent present?
    for (const seg of segments) {
      if (parentSlugToTab[seg]) {
        setSelectedTab(parentSlugToTab[seg]);
        return;
      }
    }

    // Child present?
    for (const seg of segments) {
      if (CHILD_TO_TAB[seg]) {
        setSelectedTab(CHILD_TO_TAB[seg]);
        return;
      }
    }

    // 3) Fallback
    setSelectedTab("Student Oriented Cells");
  }, [pathname]);

  // Keep URL hash in sync with the selected tab (but don't overwrite a correct hash)
  useEffect(() => {
    if (!selectedTab) return;
    const desired = `#${selectedTab}`;
    if (typeof window !== "undefined" && window.location.hash !== desired) {
      window.location.hash = selectedTab;
    }
  }, [selectedTab]);

  const handleProgrammeClick = (programmePath: string) => {
    if (!selectedTab) return;
    const tabPath = selectedTab.toLowerCase().replace(/\s+/g, "-");
    router.push(`/activities/${tabPath}/${programmePath}`);
  };

    return (
        <div className="mb-10 md:mb-20">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455]">
                {title ?? StudentCenterContent.title}
              </h1>
            </header>

            <div className="mb-6 text-lg">
              <Tabs
                value={selectedTab ?? undefined}
                onChange={(value) => setSelectedTab(value as Tab)}
              >
                <Tabs.List className="relative flex flex-col md:flex-row border-b-2 border-[#D9D9D9] space-x-7 text-lg md:text-xl">
                  {StudentCenterContent.tabsList.map((tab) => (
                    <Tabs.Tab
                      key={tab}
                      value={tab}
                      className={`text-start py-3 !text-[#003333] !text-lg ${
                        selectedTab === tab ? "!border-b-4 !border-[#F09300] !font-bold" : ""
                      }`}
                    >
                      {tab}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-row">
              <div className="relative w-full h-72 lg:h-full">
                {/* Next 13+ prefers fill prop; layout/objectFit are legacy */}
                <Image
                  src={image ?? StudentCenterContent.imageSrc}
                  alt="Nagarjuna Group of Institutions"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              <div>
                <div className="flex flex-col w-full h-full border border-[#0E2455] p-6 justify-center">
                  <p className="text-justify text-[#0E2455] font-normal mb-8">
                    {description ?? StudentCenterContent.description}
                  </p>
                  <h2 className="text-lg md:text-xl mb-8 text-[#0E2455] border-b border-[#D9D9D9]">
                    Explore {selectedTab ?? "—"}
                  </h2>
                  <div className="space-y-2">
                    {(selectedTab
                      ? StudentCenterContent.programmeOptions[selectedTab]
                      : []
                    ).map((programme: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-[#F6F6F6] px-4 py-3 duration-200"
                      >
                        <span className="text-[#0e2455] font-medium text-lg">
                          {programme.name}
                        </span>
                        <button
                          className="flex cursor-pointer items-center border px-8 py-2 text-[#0e2455] hover:bg-[#0E2455] hover:text-white transition"
                          onClick={() => handleProgrammeClick(programme.path)}
                        >
                          View <AiOutlineArrowRight className="ml-2" />
                        </button>
                      </div>
                    ))}
                    {!selectedTab && (
                      <div className="text-sm text-[#0e2455]/70">
                        Select a tab to see available programmes.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default KnowEverything;
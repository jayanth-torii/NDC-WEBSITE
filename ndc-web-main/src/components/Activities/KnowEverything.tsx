"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import StudentCenterContent from "@/app/Data/StudentCenterContent";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
              <SectionHeading title={title ?? StudentCenterContent.title} />
            </header>

            <div className="mb-6 text-lg">
              <Tabs
                value={selectedTab ?? undefined}
                onChange={(value) => setSelectedTab(value as Tab)}
              >
                <Tabs.List className="relative flex flex-col md:flex-row border-b border-card-border gap-x-6 text-lg md:text-xl">
                  {StudentCenterContent.tabsList.map((tab) => (
                    <Tabs.Tab
                      key={tab}
                      value={tab}
                      className={`text-start !text-lg pb-3 border-b-[3px] -mb-px transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        selectedTab === tab ? "!text-navy !border-orange !font-bold" : "!text-body-gray !border-transparent hover:!text-navy"
                      }`}
                    >
                      {tab}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
            </div>

            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 flex-row rounded-[18px] border border-card-border shadow-[var(--shadow-card)] overflow-hidden">
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
                  <div className="flex flex-col w-full h-full bg-white p-6 md:p-8 justify-center">
                    <p className="text-justify text-body-gray leading-relaxed font-normal mb-8">
                      {description ?? StudentCenterContent.description}
                    </p>
                    <h2 className="text-lg md:text-xl mb-6 pb-3 text-navy font-semibold border-b border-card-border">
                      Explore {selectedTab ?? "—"}
                    </h2>
                    <div className="space-y-3">
                      {(selectedTab
                        ? StudentCenterContent.programmeOptions[selectedTab]
                        : []
                      ).map((programme: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center gap-4 rounded-[14px] border border-card-border bg-surface-tint px-4 py-3 transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover"
                        >
                          <span className="text-navy font-medium text-lg">
                            {programme.name}
                          </span>
                          <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 rounded-[8px] bg-orange px-5 py-2 text-sm font-bold text-white transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange-dark"
                            onClick={() => handleProgrammeClick(programme.path)}
                          >
                            View <ArrowRight size={16} />
                          </button>
                        </div>
                      ))}
                      {!selectedTab && (
                        <div className="text-sm text-body-gray">
                          Select a tab to see available programmes.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
        </div>
    );
};

export default KnowEverything;

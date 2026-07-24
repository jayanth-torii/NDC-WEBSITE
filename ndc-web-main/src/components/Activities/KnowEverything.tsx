"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, Users, GraduationCap, LayoutGrid } from "lucide-react";
import StudentCenterContent from "@/app/Data/StudentCenterContent";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  ACTIVITY_ICONS,
  AntiRaggingIcon,
  ActivityLoadingIcon,
} from "./ActivityIcons";

type Tab =
  | "Student Oriented Cells"
  | "Faculty Oriented Cells"
  | "Academic & Social Engagement Forums";

const CHILD_TO_TAB: Record<string, Tab> = {
  "anti-ragging-cell": "Student Oriented Cells",
  "women-cell": "Student Oriented Cells",
  "students-grievance-cell": "Student Oriented Cells",
  "anti-sexual-harassment-cell": "Student Oriented Cells",
  "equal-opportunity-cell": "Student Oriented Cells",
  "eco-clubs": "Student Oriented Cells",
  "faculties-welfare": "Faculty Oriented Cells",
  "sc-st-obc-minority-cell": "Faculty Oriented Cells",
  "faculty-study-circle": "Faculty Oriented Cells",
  "ed-cell": "Faculty Oriented Cells",
  "icc-cell": "Faculty Oriented Cells",
  "ncc-cell": "Academic & Social Engagement Forums",
  "nss-cell": "Academic & Social Engagement Forums",
  "commerce-and-management-forum": "Academic & Social Engagement Forums",
  "ambedkar-study-circle": "Academic & Social Engagement Forums",
  "industrial-visit": "Academic & Social Engagement Forums",
};

const parentSlugToTab: Record<string, Tab> = {
  "student-oriented-cells": "Student Oriented Cells",
  "faculty-oriented-cells": "Faculty Oriented Cells",
  "academic-and-social-engagement-forums": "Academic & Social Engagement Forums",
};

const TAB_BLURBS: Record<Tab, string> = {
  "Student Oriented Cells":
    "Safety, welfare, and equal-opportunity cells that support every student on campus.",
  "Faculty Oriented Cells":
    "Welfare, equity, and professional-development cells for our teaching community.",
  "Academic & Social Engagement Forums":
    "Service units, study forums, and experiential learning beyond the classroom.",
};

const TAB_ICONS: Record<Tab, any> = {
  "Student Oriented Cells": Users,
  "Faculty Oriented Cells": GraduationCap,
  "Academic & Social Engagement Forums": LayoutGrid,
};

const KnowEverything = ({ data }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstTab = useRef(true);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const rawHash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const hash = decodeURIComponent(rawHash);

    if (StudentCenterContent.tabsList.includes(hash as Tab)) {
      setSelectedTab(hash as Tab);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    for (const seg of segments) {
      if (parentSlugToTab[seg]) {
        setSelectedTab(parentSlugToTab[seg]);
        return;
      }
    }
    for (const seg of segments) {
      if (CHILD_TO_TAB[seg]) {
        setSelectedTab(CHILD_TO_TAB[seg]);
        return;
      }
    }

    setSelectedTab("Student Oriented Cells");
  }, [pathname]);

  useEffect(() => {
    if (!selectedTab) return;
    const desired = `#${selectedTab}`;
    if (typeof window !== "undefined" && window.location.hash !== desired) {
      window.location.hash = selectedTab;
    }
  }, [selectedTab]);

  useEffect(() => {
    return () => {
      if (loadTimer.current) clearTimeout(loadTimer.current);
    };
  }, []);

  const handleTabChange = (tab: Tab) => {
    if (tab === selectedTab) return;

    if (isFirstTab.current) {
      isFirstTab.current = false;
    }

    setIsLoading(true);
    setSelectedTab(tab);

    if (loadTimer.current) clearTimeout(loadTimer.current);
    loadTimer.current = setTimeout(() => setIsLoading(false), 520);
  };

  const handleProgrammeClick = (programmePath: string) => {
    if (!selectedTab) return;
    const tabPath = selectedTab.toLowerCase().replace(/\s+/g, "-");
    router.push(`/activities/${tabPath}/${programmePath}`);
  };

  const currentProgrammes = selectedTab ? StudentCenterContent.programmeOptions[selectedTab] : [];
  const activeIndex = selectedTab
    ? Math.max(0, StudentCenterContent.tabsList.indexOf(selectedTab))
    : 0;
  const skeletonCount = Math.max(currentProgrammes.length, 4);

  return (
    <section className="mb-20 md:mb-24 relative w-full font-sans">
      
      {/* Decorative Dots */}
      <div className="absolute top-10 left-[-40px] opacity-40 hidden xl:block">
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-act-left" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#F6872A" />
          </pattern>
          <rect width="80" height="80" fill="url(#dots-act-left)" />
        </svg>
      </div>
      <div className="absolute top-20 right-[-40px] opacity-40 hidden xl:block">
        <svg width="80" height="120" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-act-right" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#F6872A" />
          </pattern>
          <rect width="80" height="120" fill="url(#dots-act-right)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[2px] bg-[#F6872A] w-8 opacity-70" />
          <span className="text-[#F6872A] text-[13px] font-bold tracking-[0.2em] uppercase">Campus Life</span>
          <div className="h-[2px] bg-[#F6872A] w-8 opacity-70" />
        </div>
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#1a3668] tracking-tight mb-4">
          Activities at <span className="text-[#F6872A]">Nagarjuna Degree College</span>
        </h2>
        <p className="text-[#53545b] text-[16px] font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
          Explore the cells, forums, and committees that keep our campus safe, inclusive, and engaged.
        </p>
      </header>

      {/* Tabs */}
      <div className="relative z-20 flex justify-center mb-10">
        <div
          role="tablist"
          className="inline-flex flex-wrap justify-center gap-4 max-w-full"
        >
          {StudentCenterContent.tabsList.map((tab) => {
            const isActive = selectedTab === tab;
            const TabIcon = TAB_ICONS[tab as Tab];
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab as Tab)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-[12px] md:rounded-[20px] text-[13px] md:text-[14px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#1a3668] text-white shadow-[0_8px_20px_rgba(26,54,104,0.3)] border-2 border-[#1a3668]"
                    : "bg-white text-[#53545b] border-2 border-gray-100 hover:border-[#F6872A]/50 hover:text-[#1a3668] shadow-sm"
                }`}
              >
                <TabIcon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Container */}
      <Reveal className="relative z-10 mx-auto max-w-[1200px]">
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 px-8 py-10 pb-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#F6872A]">
                  Category
                </span>
                <span className="text-[12px] font-extrabold text-gray-300 tracking-[0.1em]">
                  {String(activeIndex + 1).padStart(2, "0")}/{String(StudentCenterContent.tabsList.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[28px] md:text-[32px] font-extrabold text-[#1a3668] tracking-tight leading-tight">
                {selectedTab}
              </h3>
              <p className="mt-2 text-[15px] font-medium text-gray-500 max-w-2xl">
                {selectedTab ? TAB_BLURBS[selectedTab] : ""}
              </p>
            </div>

            <div className="shrink-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8F3] text-[#F6872A] border border-orange-100/50 text-[13px] font-extrabold">
              {isLoading ? (
                <>
                  <ActivityLoadingIcon size={16} className="text-[#F6872A]" />
                  <span>Loading</span>
                </>
              ) : (
                <>
                  <span className="tabular-nums">{currentProgrammes.length}</span>
                  <span>{currentProgrammes.length === 1 ? "Cell" : "Cells"}</span>
                </>
              )}
            </div>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 px-8 pb-10"
              aria-busy="true"
            >
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 px-6 py-5 rounded-[20px] border border-gray-100 bg-gray-50/50"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="shrink-0 w-12 h-12 rounded-[14px] bg-white border border-gray-100 flex items-center justify-center text-gray-300">
                    <ActivityLoadingIcon size={24} />
                  </span>
                  <span className="flex-1 space-y-2.5">
                    <span className="block h-2.5 w-8 rounded-full bg-gray-200 animate-pulse" />
                    <span className="block h-4 w-[60%] rounded-full bg-gray-200 animate-pulse" />
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-white" />
                </div>
              ))}
            </div>
          ) : (
            <RevealGroup
              key={selectedTab ?? "default"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 px-8 pb-10"
            >
              {currentProgrammes.map((prog: { name: string; path: string }, i: number) => {
                const Icon = ACTIVITY_ICONS[prog.path] ?? AntiRaggingIcon;

                return (
                  <RevealItem key={prog.path}>
                    <button
                      type="button"
                      onClick={() => handleProgrammeClick(prog.path)}
                      className="group w-full h-full text-left flex items-center gap-5 px-6 py-5 rounded-[20px] border border-gray-100 bg-white hover:border-[#F6872A]/40 hover:shadow-[0_8px_30px_rgba(246,135,42,0.08)] transition-all duration-300"
                    >
                      {/* Left Thin Icon */}
                      <span className="shrink-0 w-12 h-12 rounded-[14px] bg-[#FAFAFA] text-[#1a3668] flex items-center justify-center border border-gray-100 shadow-sm group-hover:bg-[#FFF8F3] group-hover:text-[#F6872A] group-hover:border-orange-100 transition-colors duration-300">
                        <Icon size={24} />
                      </span>

                      {/* Content */}
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] font-extrabold text-[#F6872A] mb-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="block text-[16px] font-extrabold text-[#1a3668] leading-snug group-hover:text-[#F6872A] transition-colors duration-300">
                          {prog.name}
                        </span>
                      </span>

                      {/* Right Circular Arrow */}
                      <span
                        className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-400 flex items-center justify-center group-hover:border-[#F6872A] group-hover:text-[#F6872A] transition-all duration-300"
                        aria-hidden="true"
                      >
                        <ArrowRight size={16} strokeWidth={2} />
                      </span>
                    </button>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default KnowEverything;

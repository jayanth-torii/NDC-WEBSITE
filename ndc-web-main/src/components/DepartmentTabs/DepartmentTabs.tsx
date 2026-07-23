"use client";

import React, { useState, useRef, ReactNode, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import AboutCourse from "./AboutCourse";
import VisionMission from "./VisionMission";
import Objectives from "./Objectives";
import HodMessage from "./HodMessage";
import ProgrammeDetails from "./ProgrammeDetails";
import Research from "./Research";
import BooksPatients from "./BooksPatients";
import Activities from "./Activities";
import AdmissionProcess from "./AdmissionProcess";
import CourseDuration from "./CourseDuration";
import SyllabusDetails from "./SyllabusDetails";
import DepartmentFaculty from "./DepartmentFaculty";

const tabs = [
  "About Department",
  "Vision & Mission",
  "HOD'S Message",
  "Department Faculty Members",
  "Objectives",
  "Admission Process",
  "Course Duration",
  "Programme Details",
  "Research",
  "Books/Patients",
  "Activities",
  "Syllabus Details",
];

export default function DepartmentTabs() {
  const searchParams = useSearchParams();
  const department = searchParams.get("programme") || "bca";
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const [aboutOk, setAboutOk] = useState<boolean | null>(null);
  const [visionOk, setVisionOk] = useState<boolean | null>(null);
  const [hodOk, setHodOk] = useState<boolean | null>(null);
  const [facultyOk, setFacultyOk] = useState<boolean | null>(null);
  const [objectivesOk, setObjectivesOk] = useState<boolean | null>(null);
  const [admissionOk, setAdmissionOk] = useState<boolean | null>(null);
  const [courseDurationOk, setCourseDurationOk] = useState<boolean | null>(null);
  const [programmeDetailsOk, setProgrammeDetailsOk] = useState<boolean | null>(null);
  const [researchOk, setResearchOk] = useState<boolean | null>(null);
  const [booksPatientsOk, setBooksPatientsOk] = useState<boolean | null>(null);
  const [activitiesOk, setActivitiesOk] = useState<boolean | null>(null);
  const [syllabusOk, setSyllabusOk] = useState<boolean | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [department]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const components: Record<string, ReactNode> = {
    "About Department": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <AboutCourse haveContentCheck={setAboutOk} />
      </Suspense>
    ),
    "Vision & Mission": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <VisionMission haveContentCheck={setVisionOk} />
      </Suspense>
    ),
    "HOD'S Message": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <HodMessage haveContentCheck={setHodOk} />
      </Suspense>
    ),
    "Department Faculty Members": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <DepartmentFaculty haveContentCheck={setFacultyOk} />
      </Suspense>
    ),
    Objectives: (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <Objectives haveContentCheck={setObjectivesOk} />
      </Suspense>
    ),
    "Admission Process": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <AdmissionProcess haveContentCheck={setAdmissionOk} />
      </Suspense>
    ),
    "Course Duration": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <CourseDuration haveContentCheck={setCourseDurationOk} />
      </Suspense>
    ),
    "Programme Details": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <ProgrammeDetails haveContentCheck={setProgrammeDetailsOk} />
      </Suspense>
    ),
    Research: (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <Research haveContentCheck={setResearchOk} />
      </Suspense>
    ),
    "Books/Patients": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <BooksPatients haveContentCheck={setBooksPatientsOk} />
      </Suspense>
    ),
    Activities: (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <Activities haveContentCheck={setActivitiesOk} />
      </Suspense>
    ),
    "Syllabus Details": (
      <Suspense fallback={<div className="animate-pulse h-32 bg-surface-tint" />}>
        <SyllabusDetails haveContentCheck={setSyllabusOk} />
      </Suspense>
    ),
  };

  const visibleTabs = tabs.filter((tab) => {
    if (tab === "About Department" && aboutOk === false) return false;
    if (tab === "Vision & Mission" && visionOk === false) return false;
    if (tab === "HOD'S Message" && hodOk === false) return false;
    if (tab === "Department Faculty Members" && facultyOk === false) return false;
    if (tab === "Objectives" && objectivesOk === false) return false;
    if (tab === "Admission Process" && admissionOk === false) return false;
    if (tab === "Course Duration" && courseDurationOk === false) return false;
    if (tab === "Programme Details" && programmeDetailsOk === false) return false;
    if (tab === "Research" && researchOk === false) return false;
    if (tab === "Books/Patients" && booksPatientsOk === false) return false;
    if (tab === "Activities" && activitiesOk === false) return false;
    if (tab === "Syllabus Details" && syllabusOk === false) return false;
    return true;
  });

  const activeIndex = Math.max(0, visibleTabs.indexOf(activeTab));

  return (
    <div className="relative w-full scroll-mt-32">
      {/* Sticky index bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-y border-navy/10 shadow-[0_1px_0_rgba(14,36,85,0.04)]">
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex items-center gap-6 py-1">
            <div className="hidden md:flex flex-col shrink-0 py-3 pr-6 border-r border-navy/10">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-orange">
                Contents
              </span>
              <span className="text-navy font-bold text-sm tabular-nums mt-0.5">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(visibleTabs.length).padStart(2, "0")}
              </span>
            </div>

            <div className="relative flex-1 min-w-0">
              <div
                className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
                  showLeftShadow ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
                  showRightShadow ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-1 overflow-x-auto py-3 hide-scrollbar"
              >
                {visibleTabs.map((tab, idx) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleTabClick(tab)}
                      className={`relative shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-navy"
                          : "text-body-gray hover:text-navy"
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-[0.14em] text-orange/70 mr-2 tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {tab}
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content band */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 lg:px-8 pt-10 lg:pt-14 scroll-mt-40"
      >
        <div className="min-h-[420px] border border-navy/10 bg-white">
          <div className="h-1 w-full bg-gradient-to-r from-navy via-orange to-navy/20" />
          <div className="p-6 md:p-10 lg:p-12">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <div
                  key={tab}
                  className={isActive ? "block" : "hidden"}
                  aria-hidden={!isActive}
                >
                  {isActive && (components[tab] || <p>Content not available.</p>)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

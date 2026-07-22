"use client";

import React, { useState, useRef, ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

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
  "HOD’S Message",
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

// Utility to check if data is not empty
const isDataNotEmpty = (data: any): boolean => {
  if (!data) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === "object") return Object.keys(data).length > 0;
  if (typeof data === "string") return data.trim().length > 0;
  return true;
};

export default function DepartmentTabs() {

  const searchParams = useSearchParams();
  const department = searchParams.get("programme") || "bca";
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Availability flags (null = unknown yet, true = show, false = hide)
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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Scroll to content on tab change
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  const components: Record<string, ReactNode> = {
    "About Department": (
      <Suspense fallback={<p>Loading...</p>}>
        <AboutCourse haveContentCheck={setAboutOk} />
      </Suspense>
    ),
    "Vision & Mission": (
      <Suspense fallback={<p>Loading...</p>}>
        <VisionMission haveContentCheck={setVisionOk}  />
      </Suspense>
    ),
    "HOD’S Message": (
      <Suspense fallback={<p>Loading...</p>}>
        <HodMessage haveContentCheck={setHodOk}  />
      </Suspense>
    ),
    "Department Faculty Members": (
      <Suspense fallback={<p>Loading...</p>}>
        <DepartmentFaculty haveContentCheck={setFacultyOk}  />
      </Suspense>
    ),
    "Objectives": (
      <Suspense fallback={<p>Loading...</p>}>
        <Objectives haveContentCheck={setObjectivesOk}  />
      </Suspense>
    ),
    "Admission Process": (
      <Suspense fallback={<p>Loading...</p>}>
        <AdmissionProcess haveContentCheck={setAdmissionOk}  />
      </Suspense>
    ),
    "Course Duration": (
      <Suspense fallback={<p>Loading...</p>}>
        <CourseDuration haveContentCheck={setCourseDurationOk}  />
      </Suspense>
    ),
    "Programme Details": (
      <Suspense fallback={<p>Loading...</p>}>
        <ProgrammeDetails haveContentCheck={setProgrammeDetailsOk}  />
      </Suspense>
    ),
    "Research": (
      <Suspense fallback={<p>Loading...</p>}>
        <Research haveContentCheck={setResearchOk}  />
      </Suspense>
    ),
    "Books/Patients": (
      <Suspense fallback={<p>Loading...</p>}>
        <BooksPatients haveContentCheck={setBooksPatientsOk}  />
      </Suspense>
    ),
    "Activities": (
      <Suspense fallback={<p>Loading...</p>}>
        <Activities haveContentCheck={setActivitiesOk}  />
      </Suspense>
    ),
    "Syllabus Details": (
      <Suspense fallback={<p>Loading...</p>}>
        <SyllabusDetails haveContentCheck={setSyllabusOk}  />
      </Suspense>
    ),
  };

  // Same hide rules as before, expressed as a single filter pass
  const visibleTabs = tabs.filter((tab) => {
    if (tab === "About Department" && aboutOk === false) return false;
    if (tab === "Vision & Mission" && visionOk === false) return false;
    if (tab === "HOD’S Message" && hodOk === false) return false;
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

  return (
    <div className="relative flex flex-col lg:flex-row w-full min-h-screen mb-20 gap-6 lg:gap-10">

      {/* Mobile / tablet: horizontally scrollable tab strip (overflow handled via scroll, not a drawer) */}
      <nav className="lg:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-3 snap-x snap-mandatory">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`cursor-pointer snap-start shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-body-gray border-card-border hover:border-card-border-hover hover:bg-surface-tint"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop sidebar navigation */}
      <aside className="hidden lg:block lg:w-[26%] xl:w-[22%] shrink-0 self-start">
        <nav className="flex flex-col gap-1 rounded-[18px] border border-card-border bg-white p-2 shadow-[var(--shadow-card)]">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-[10px] border-l-4 px-4 py-3 text-left text-[15px] font-semibold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive
                    ? "bg-navy text-white border-l-orange"
                    : "text-body-gray border-l-transparent hover:bg-surface-tint hover:text-navy"
                }`}
              >
                <span>{tab}</span>
                <FaChevronRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main ref={contentRef} className="w-full lg:flex-1 min-w-0 px-4 lg:px-0 text-body-gray">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div
              key={tab}
              className={isActive ? "block" : "hidden"}
              aria-hidden={!isActive}
            >
              {components[tab] || <p>Content not available.</p>}
            </div>
          );
        })}
      </main>
    </div>
  );
}

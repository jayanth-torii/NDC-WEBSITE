"use client";

import React, { useState, useRef, ReactNode, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Target, Users, BookOpen, Search, BookText, Activity, MessageSquare, CheckCircle2, Clock } from "lucide-react";

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

const getTabIcon = (tab: string) => {
  switch (tab) {
    case "About Department": return <Info size={18} />;
    case "Vision & Mission": return <Target size={18} />;
    case "HOD'S Message": return <MessageSquare size={18} />;
    case "Department Faculty Members": return <Users size={18} />;
    case "Objectives": return <CheckCircle2 size={18} />;
    case "Admission Process": return <BookOpen size={18} />;
    case "Course Duration": return <Clock size={18} />;
    case "Programme Details": return <BookText size={18} />;
    case "Research": return <Search size={18} />;
    case "Books/Patients": return <BookOpen size={18} />;
    case "Activities": return <Activity size={18} />;
    case "Syllabus Details": return <BookText size={18} />;
    default: return null;
  }
};

export default function DepartmentTabs() {
  const searchParams = useSearchParams();
  const department = searchParams.get("programme") || "bca";
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative w-full scroll-mt-32">
      <div className="container mx-auto px-4 lg:px-8 pt-10 lg:pt-14">
        {/* Pills Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 md:mb-14 justify-start">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[14px] md:text-[15px] font-semibold transition-colors duration-300 border shadow-sm ${
                  isActive
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-[#5f6368] border-gray-100 hover:border-transparent hover:text-orange hover:bg-orange/10 hover:shadow-md"
                }`}
              >
                <span className={isActive ? "text-white" : "text-gray-400 transition-colors"}>
                  {getTabIcon(tab)}
                </span>
                {tab}
              </motion.button>
            );
          })}
        </div>

        {/* Content Area with Animation */}
        <div 
          ref={contentRef} 
          className="scroll-mt-40 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 min-h-[420px] p-6 md:p-10 lg:p-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {components[activeTab] || <p>Content not available.</p>}
            </motion.div>
          </AnimatePresence>

          {/* Hidden components to ensure data hooks continue to run */}
          <div className="hidden">
            {visibleTabs.map((tab) => {
              if (tab === activeTab) return null;
              return <div key={tab}>{components[tab]}</div>;
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

import React, { useState, useRef, ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaChevronRight, FaBars } from "react-icons/fa";

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
    setMenuOpen(false);
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


  return (
    <div className="relative flex flex-col md:flex-row w-full min-h-screen mb-20">

      {/* Mobile Hamburger Menu */}
      <div className="relative w-20 -mt-20 md:hidden flex justify-end px-1 self-end">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex items-center justify-center w-12 h-12 bg-[#F6F6F6] rounded-full shadow-lg focus:outline-none"
        >
          {/* Three Orange Dots */}
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1">
            <span className="w-2 h-2 bg-[#F09300] rounded-full"></span>
            <span className="w-2 h-2 bg-[#F09300] rounded-full"></span>
            <span className="w-2 h-2 bg-[#F09300] rounded-full"></span>
          </span>
        </button>
      </div>


      {/* Sidebar Navigation - Hidden on Mobile */}
      <aside
        className={`md:w-[20%] md:block ${
          menuOpen ? "absolute block shadow-lg" : "hidden"
        } md:relative w-2/3 md:w-[35%] lg:w-[20%] bg-white border-r border-gray-300 p-2 z-10`}
        style={{ alignSelf: "flex-start" }}
      >

        <nav className="flex flex-col space-y-2">
          {tabs.map((tab) => {
          // keep your hide rules based on callbacks
          if (tab === "About Department" && aboutOk === false) return null;
          if (tab === "Vision & Mission" && visionOk === false) return null;
          if (tab === "HOD’S Message" && hodOk === false) return null;
          if (tab === "Department Faculty Members" && facultyOk === false) return null;
          if (tab === "Objectives" && objectivesOk === false) return null;
          if (tab === "Admission Process" && admissionOk === false) return null;
          if (tab === "Course Duration" && courseDurationOk === false) return null;
          if (tab === "Programme Details" && programmeDetailsOk === false) return null;
          if (tab === "Research" && researchOk === false) return null;
          if (tab === "Books/Patients" && booksPatientsOk === false) return null;
          if (tab === "Activities" && activitiesOk === false) return null;
          if (tab === "Syllabus Details" && syllabusOk === false) return null;

          return (
            <button
              key={tab}
             onClick={() => handleTabClick(tab)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2 text-left w-full !text-lg ${
                activeTab === tab ? "bg-[#0E2455] text-white" : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tab}
              <FaChevronRight className="w-4 h-4" />
            </button>
          );
        })}
        </nav>
      </aside>

      {/* Main Content */}
      <main ref={contentRef} className="w-full md:w-[80%] px-4 text-[#003333]">
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

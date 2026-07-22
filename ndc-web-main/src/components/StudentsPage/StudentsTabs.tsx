"use client";

import React, { useState, ReactNode, Suspense } from "react";
import { FaChevronRight } from "react-icons/fa";

import MentoringCell from "./MentoringCell";
import RedressalCell from "./RedressalCell";
import CareerAdvancementCenter from "./CareerAdvancementCenter";
import TPICell from "./TPICell";
 
const tabs = [
  "Mentoring Cell",
  "Redressal Cell",
  "Career Advancement Center",
  "Training, Placement & Internship Cell",
];


export default function StudentsTabs({data}:any) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const tabComponents: Record<string, ReactNode> = {
    "Mentoring Cell" :  <Suspense fallback={<p>Loading...</p>}><MentoringCell MentoringCellData={data.MentoringCell} /></Suspense>,
    "Redressal Cell": <Suspense fallback={<p>Loading...</p>}><RedressalCell redressalData={data.RedRessalCellSection} /></Suspense>,
    "Career Advancement Center": <Suspense fallback={<p>Loading...</p>}><CareerAdvancementCenter data={data.CareerAdvancementCenter} /></Suspense>,
    "Training, Placement & Internship Cell": <Suspense fallback={<p>Loading...</p>}><TPICell data={data.TrainingPlacementAndInternshipCell} /></Suspense>,
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
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false); // Close menu after selection
              }}
              className={`flex cursor-pointer items-center justify-between px-4 py-2 text-left w-full text-lg ${
                activeTab === tab ? "bg-[#0E2455] text-white" : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tab}
              <FaChevronRight className="w-4 h-4" />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-[80%] p-4 text-[#003333]">
        {tabComponents[activeTab] || <p>Content not available.</p>}
      </main>
    </div>
  );
}

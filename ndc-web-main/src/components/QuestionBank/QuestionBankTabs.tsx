"use client";

import React, { useState, useEffect, ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaChevronRight, FaBars } from "react-icons/fa";
import { BASE_URL } from "@/config/apiService";
import axios from "axios";

import FindQuestionBank from "./FindQuestionBank";
import Bcom from "./Bcom";
import BcomHons from "./BcomHons";
import BCA from "./BCA";
import BBA from "./BBA";
import BSC from "./BSC";
import MCom from "./MCom";
import MBA from "./MBA";
 
const tabs = [
  "Find Question Bank",
  "B.Com",
  "B.Com (Hons)",
  "BCA",
  // "BBA",
  // "B.Sc",
  // "M.Com",
  "MBA"
];


export default function QuestionBankTabs() {
  const searchParams = useSearchParams();
  const department = searchParams.get("programme") || "Computer Science & Engineering";  
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [allData, setAllData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch all departments data
    axios.get(`${BASE_URL}/question-banks`)
      .then((response) => setAllData(response.data.data || {}))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);



  const tabComponents: Record<string, ReactNode> = {
    "Find Question Bank" :  <Suspense fallback={<p>Loading...</p>}> <FindQuestionBank data={allData}/> </Suspense>,
    "B.Com": <Suspense fallback={<p>Loading...</p>}> <Bcom data={allData["B.Com"]}/> </Suspense>,
    "B.Com (Hons)" : <Suspense fallback={<p>Loading...</p>}><BcomHons data={allData["B.Com (Hons)"]}/> </Suspense>,
    "BCA": <Suspense fallback={<p>Loading...</p>}><BCA data={allData["BCA"]}/> </Suspense>,
    "BBA": <Suspense fallback={<p>Loading...</p>}><BBA data={allData["BBA"]}/> </Suspense>,
    "B.Sc": <Suspense fallback={<p>Loading...</p>}><BSC data={allData["B.Sc"]}/> </Suspense>,
    "M.Com": <Suspense fallback={<p>Loading...</p>}><MCom data={allData["M.Com"]}/> </Suspense>,
    "MBA" : <Suspense fallback={<p>Loading...</p>}><MBA data={allData["MBA"]}/> </Suspense>,
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
              className={`cursor-pointer flex items-center justify-between px-4 py-2 text-left w-full text-lg ${
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

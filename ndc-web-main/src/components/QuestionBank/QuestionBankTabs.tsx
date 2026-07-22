"use client";

import React, { useState, ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import questionBankJson from "@/data-export/question-bank/data.json";

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

  const allData: Record<string, any> = (questionBankJson["question-banks"] as any)?.data || {};



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
    <div className="relative flex w-full min-h-screen mb-20 flex-col gap-6 md:flex-row md:gap-8">

      {/* Mobile tab bar: horizontal scroll */}
      <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              activeTab === tab
                ? "bg-orange text-white shadow-[var(--shadow-cta)]"
                : "bg-surface-light text-body-gray hover:text-navy"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Sidebar Navigation - desktop */}
      <aside className="hidden shrink-0 md:block md:w-[230px] lg:w-[260px]">
        <nav className="sticky top-24 flex flex-col gap-1.5 rounded-[18px] border border-card-border bg-white p-3 shadow-[var(--shadow-card)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex cursor-pointer items-center justify-between gap-2 rounded-[10px] px-4 py-3 text-left text-[15px] font-semibold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                activeTab === tab ? "bg-navy text-white" : "text-heading hover:bg-surface-tint"
              }`}
            >
              {tab}
              <ChevronRight className={`h-4 w-4 shrink-0 ${activeTab === tab ? "opacity-100" : "opacity-30"}`} />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 text-navy">
        {tabComponents[activeTab] || <p>Content not available.</p>}
      </main>
    </div>
  );
}

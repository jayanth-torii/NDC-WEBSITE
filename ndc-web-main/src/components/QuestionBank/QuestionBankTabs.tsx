"use client";

import React, { useState, ReactNode, Suspense } from "react";
import { FileSearch, Briefcase, Monitor, GraduationCap, Calendar } from "lucide-react";

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
  "MBA",
];

const TAB_ICONS: Record<string, any> = {
  "Find Question Bank": FileSearch,
  "B.Com": Briefcase,
  "B.Com (Hons)": Briefcase,
  BCA: Monitor,
  BBA: Briefcase,
  "B.Sc": Monitor,
  "M.Com": Briefcase,
  MBA: GraduationCap,
};

export default function QuestionBankTabs({ data }: { data?: Record<string, any> }) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const activeIndex = Math.max(0, tabs.indexOf(activeTab));

  const allData: Record<string, any> = data ?? {};

  const tabComponents: Record<string, ReactNode> = {
    "Find Question Bank": (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <FindQuestionBank data={allData} />
      </Suspense>
    ),
    "B.Com": (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <Bcom data={allData["B.Com"]} />
      </Suspense>
    ),
    "B.Com (Hons)": (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <BcomHons data={allData["B.Com (Hons)"]} />
      </Suspense>
    ),
    BCA: (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <BCA data={allData["BCA"]} />
      </Suspense>
    ),
    BBA: (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <BBA data={allData["BBA"]} />
      </Suspense>
    ),
    "B.Sc": (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <BSC data={allData["B.Sc"]} />
      </Suspense>
    ),
    "M.Com": (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <MCom data={allData["M.Com"]} />
      </Suspense>
    ),
    MBA: (
      <Suspense fallback={<p className="text-body-gray">Loading...</p>}>
        <MBA data={allData["MBA"]} />
      </Suspense>
    ),
  };

  return (
    <div className="w-full scroll-mt-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Segmented stepper */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-6 px-2 -mx-2">
          {/* Archive Block */}
          <div className="flex flex-col items-center justify-center bg-navy text-white rounded-[20px] px-6 py-4 shrink-0 min-w-[130px] shadow-xl relative overflow-hidden h-[90px]">
            {/* Watermark icon */}
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <Calendar size={70} />
            </div>
            <span className="text-orange text-[11px] font-bold tracking-[0.2em] uppercase mb-1 z-10">
              Archive
            </span>
            <span className="text-2xl font-extrabold tracking-tight z-10">
              {String(activeIndex + 1).padStart(2, "0")}/{String(tabs.length).padStart(2, "0")}
            </span>
          </div>

          {/* Tabs */}
          {tabs.map((tab, idx) => {
            const Icon = TAB_ICONS[tab] || FileSearch;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex shrink-0 items-center gap-4 h-[90px] px-8 rounded-[20px] transition-all duration-300 bg-white shadow-sm ${
                  isActive
                    ? "border-2 border-orange shadow-[0_8px_20px_rgba(246,135,42,0.15)]"
                    : "border border-gray-100 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <Icon size={24} className={isActive ? "text-navy" : "text-gray-400"} />
                <div className="flex flex-col items-start text-left">
                  <span className="text-orange text-[13px] font-extrabold tabular-nums leading-none mb-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[14px] font-bold leading-none ${isActive ? "text-navy" : "text-gray-500"}`}>
                    {tab}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-8 lg:pt-10">{tabComponents[activeTab]}</div>
      </div>
    </div>
  );
}

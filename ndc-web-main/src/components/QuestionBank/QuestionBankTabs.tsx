"use client";

import React, { useState, ReactNode, Suspense, useRef, useEffect } from "react";
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
  "MBA",
];

export default function QuestionBankTabs() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const allData: Record<string, any> =
    (questionBankJson["question-banks"] as any)?.data || {};

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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

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

  const activeIndex = Math.max(0, tabs.indexOf(activeTab));

  return (
    <div className="relative w-full scroll-mt-32">
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-y border-navy/10">
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex items-center gap-6 py-1">
            <div className="hidden md:flex flex-col shrink-0 py-3 pr-6 border-r border-navy/10">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-orange">
                Archive
              </span>
              <span className="text-navy font-bold text-sm tabular-nums mt-0.5">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(tabs.length).padStart(2, "0")}
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
                {tabs.map((tab, idx) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleTabClick(tab)}
                      className={`relative shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
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

      <div
        ref={contentRef}
        className="container mx-auto px-4 lg:px-8 pt-10 lg:pt-14 scroll-mt-40"
      >
        <div className="min-h-[420px] border border-navy/10 bg-white">
          <div className="h-1 w-full bg-gradient-to-r from-navy via-orange to-navy/20" />
          <div className="p-6 md:p-10 lg:p-12">
            {tabComponents[activeTab] || <p>Content not available.</p>}
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

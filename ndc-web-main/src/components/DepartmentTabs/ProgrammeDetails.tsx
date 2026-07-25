"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  title?: string;
  points: string[];
}

interface CourseItem {
  label: string;
  value?: string;
  sections?: Section[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const ProgrammeDetails = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);
  const [activeIndex, setActiveIndex] = useState(0);

  const apiData: Record<string, CourseItem[]> =
    (departmentJson["programme-details"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, CourseItem[]> = {};
    Object.entries(apiData || {}).forEach(([key, value]) => {
      map[normalizeKey(key)] = value as CourseItem[];
    });
    return map;
  }, [apiData]);

  const courseData = useMemo<CourseItem[] | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!courseData) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No data found for this department: <strong>{programme}</strong>
      </p>
    );
  }

  const overviewLabels = ["course name", "year of approval", "faculties", "faculty"];
  const overviewItems = courseData.filter(item => overviewLabels.includes(item.label.trim().toLowerCase()));
  const regularItems = courseData.filter(item => !overviewLabels.includes(item.label.trim().toLowerCase()));

  return (
    <Reveal>
      <div className="space-y-8">
        <header className="pb-6 mb-2 border-b border-navy/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
              Curriculum
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
              Programme Details
            </h2>
          </div>
          <button className="flex items-center gap-2 bg-navy hover:bg-orange text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors duration-300 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Syllabus
          </button>
        </header>

        {overviewItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {overviewItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</p>
                  <p className="text-navy font-bold text-base leading-tight">
                    {item.value || (item.sections && item.sections[0]?.points?.[0]) || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {regularItems.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
            {/* Sidebar */}
            <div className="md:w-1/3 lg:w-1/4 shrink-0">
              <div className="bg-blue-50/50 rounded-2xl p-3 border border-gray-100 flex flex-col gap-2">
                {regularItems.map((item, index) => {
                  const isActive = activeIndex === index;
                  const resourceCount = item.sections?.reduce((acc, sec) => acc + (sec.points?.length || 0), 0) || 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white shadow-sm border border-gray-100"
                          : "hover:bg-white/60 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? "bg-navy text-white" : "bg-white border border-gray-200 text-navy"
                        }`}>
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="text-left">
                          <p className={`text-sm font-bold tracking-tight ${isActive ? "text-navy" : "text-gray-700"}`}>
                            {item.label}
                          </p>
                          {resourceCount > 0 && (
                            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                              {resourceCount} {resourceCount === 1 ? 'item' : 'items'}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="mb-6 pb-4 border-b border-gray-100 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-navy tracking-tight">
                        {regularItems[activeIndex]?.label}
                      </h3>
                      {regularItems[activeIndex]?.value && (
                        <p className="text-[#5f6368] text-sm mt-2 font-medium">
                          {regularItems[activeIndex]?.value}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {regularItems[activeIndex]?.sections?.map((section, i) => (
                      <div key={i} className="mb-6 last:mb-0">
                        {section?.title && (
                          <h4 className="font-bold text-navy text-sm uppercase tracking-wider mb-4">
                            {section?.title}
                          </h4>
                        )}
                        <div className="flex flex-col gap-3">
                          {section?.points?.map((point, j) => (
                            <div key={j} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors duration-200 group">
                              <div className="w-10 h-10 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                  <line x1="16" y1="13" x2="8" y2="13"></line>
                                  <line x1="16" y1="17" x2="8" y2="17"></line>
                                  <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-navy leading-snug">
                                  {point}
                                </p>
                              </div>
                              <button className="shrink-0 text-[10px] font-bold text-gray-400 group-hover:text-orange transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {(!regularItems[activeIndex]?.sections || regularItems[activeIndex]?.sections?.length === 0) && !regularItems[activeIndex]?.value && (
                      <div className="p-8 text-center text-gray-500 text-sm font-medium border border-dashed border-gray-200 rounded-xl">
                        No items available for this section.
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default ProgrammeDetails;

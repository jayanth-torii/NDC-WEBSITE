"use client";

import React, { useState, useEffect } from "react";
import { Download, Calendar, FileText, ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface ProgrammeQuestionPapersProps {
  data?: Record<string, any>;
  /** Prefix before "Question Papers {year}" — e.g. "BCA-" */
  titlePrefix: string;
}

export default function ProgrammeQuestionPapers({
  data,
  titlePrefix,
}: ProgrammeQuestionPapersProps) {
  const [departmentData, setDepartmentData] = useState<any>(null);
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: string }>({});
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (data) {
      const entries = Object.entries(data).sort();
      const yearEntries = entries.map(([year, semData]) => {
        const tabs = Object.keys(semData as object);
        return { year, tabs, semData };
      });

      setDepartmentData(yearEntries);

      const initTabs: any = {};
      yearEntries.forEach((entry) => {
        initTabs[entry.year] = entry.tabs[0];
      });
      setActiveTabs(initTabs);
    }
  }, [data]);

  const openPdf = (pdf: string) => {
    window.open(pdf, "_blank", "noopener,noreferrer");
  };

  if (!departmentData) {
    return <p className="text-body-gray">Loading department data…</p>;
  }

  return (
    <div className="space-y-10">
      {departmentData.map((entry: any, yearIdx: number) => {
        const subjects = entry.semData[activeTabs[entry.year]] || [];
        const isLatestYear = yearIdx === 0;
        const isExpanded = !!expandedYears[entry.year];
        const displaySubjects = isExpanded ? subjects : subjects.slice(0, 5);
        const hasMore = subjects.length > 5;
        
        return (
          <section
            key={entry.year}
            className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                {/* Circular Calendar Icon */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center shadow-md">
                    <Calendar className="text-white" size={24} />
                  </div>
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full border-2 border-white"></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full self-start mb-2 uppercase tracking-[0.2em]">
                    Year {String(yearIdx + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-navy text-xl md:text-[22px] font-extrabold tracking-tight">
                    {titlePrefix} Question Papers {entry.year}
                  </h2>
                </div>
              </div>
              
              {/* Paper count */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 self-start sm:self-auto">
                <FileText size={16} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-600">
                  {String(subjects.length).padStart(2, "0")} Papers
                </span>
              </div>
            </div>

            {/* Semester Tabs (Pills) */}
            <div className="flex flex-wrap gap-3 py-6">
              {entry.tabs.map((tab: string, tabIdx: number) => {
                const active = activeTabs[entry.year] === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTabs((prev) => ({ ...prev, [entry.year]: tab }));
                      setExpandedYears((prev) => ({ ...prev, [entry.year]: false }));
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-300 ${
                      active
                        ? "bg-navy text-white shadow-md"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-orange tabular-nums">
                      {String(tabIdx + 1).padStart(2, "0")}
                    </span>
                    {tab.replace("semester", "Semester ")}
                  </button>
                );
              })}
            </div>

            {/* Subjects List */}
            <div className="mb-6">
              {subjects.length > 0 ? (
                <RevealGroup key={isExpanded ? "expanded" : "collapsed"} className="flex flex-col gap-2">
                  {displaySubjects.map((item: any, idx: number) => (
                    <RevealItem key={idx}>
                      <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 hover:bg-gray-50 rounded-xl transition-colors duration-300 px-2">
                        <div className="flex items-center gap-4">
                           <span className="text-orange text-[13px] font-extrabold tabular-nums shrink-0">
                             {String(idx + 1).padStart(2, "0")}
                           </span>
                           <span className="font-bold text-[14px] text-navy uppercase tracking-wide">
                             {item.subjectName}
                           </span>
                        </div>
                        {item.subjectPdf ? (
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-[12px] font-bold text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-navy cursor-pointer"
                            onClick={() => openPdf(item.subjectPdf)}
                          >
                            <Download size={14} /> View
                          </button>
                        ) : (
                          <span className="text-[12px] font-medium text-red-400">
                            No PDF available
                          </span>
                        )}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : (
                <p className="text-gray-400 py-6 text-center font-medium">No data available for this semester.</p>
              )}
            </div>
            
            {/* Footer with Dotted Pattern and View All Button */}
            <div className="flex items-center justify-center relative mt-8 pt-4">
               {/* Dotted pattern lines */}
               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-20">
                 <div className="flex gap-1.5">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className="flex flex-col gap-1.5">
                       <div className="w-1 h-1 rounded-full bg-navy/40"></div>
                       <div className="w-1 h-1 rounded-full bg-navy/40"></div>
                     </div>
                   ))}
                 </div>
                 <div className="flex gap-1.5">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className="flex flex-col gap-1.5">
                       <div className="w-1 h-1 rounded-full bg-navy/40"></div>
                       <div className="w-1 h-1 rounded-full bg-navy/40"></div>
                     </div>
                   ))}
                 </div>
               </div>
               
               {/* View All Button */}
               {hasMore && (
                 <button 
                   className="relative z-10 flex items-center gap-3 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors"
                   onClick={() => setExpandedYears((prev) => ({ ...prev, [entry.year]: !isExpanded }))}
                 >
                    <span className="text-[13px] font-extrabold text-navy pl-2">
                      {isExpanded ? "View Less" : `View All ${String(subjects.length).padStart(2, "0")} Papers`}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white transition-colors duration-300 ${isLatestYear ? 'bg-orange' : 'bg-navy'}`}>
                      <ArrowRight size={16} strokeWidth={3} className={`transition-transform duration-300 ${isExpanded ? "-rotate-90" : "rotate-90"}`} />
                    </div>
                 </button>
               )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

type Row = Record<string, any>;

interface BooksBlock {
  title?: string;
  Columns?: string[];
  BooksTable?: Row[];
}

interface PatentBlock {
  title?: string;
  Columns?: string[];
  Patient_Rights_Table?: Row[];
}

interface DeptData {
  Books?: BooksBlock;
  Patient_Right?: PatentBlock;
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const BooksPatients = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const apiData: Record<string, DeptData> =
    (departmentJson["books-patients"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, DeptData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const data = useMemo<DeptData | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!data) {
    return (
      <p className="text-center text-red-500">
        No Books/Patent data available for this department.
      </p>
    );
  }

  const hasBooks =
    Array.isArray(data.Books?.Columns) &&
    data.Books!.Columns!.length > 0 &&
    Array.isArray(data.Books?.BooksTable) &&
    data.Books!.BooksTable!.length > 0;

  const hasPatents =
    Array.isArray(data.Patient_Right?.Columns) &&
    data.Patient_Right!.Columns!.length > 0 &&
    Array.isArray(data.Patient_Right?.Patient_Rights_Table) &&
    data.Patient_Right!.Patient_Rights_Table!.length > 0;

  const tabs = [];
  if (hasBooks) {
    tabs.push({
      label: data.Books?.title || "Books Published",
      count: data.Books?.BooksTable?.length || 0,
      type: "books",
    });
  }
  if (hasPatents) {
    tabs.push({
      label: data.Patient_Right?.title || "Patent Rights",
      count: data.Patient_Right?.Patient_Rights_Table?.length || 0,
      type: "patents",
    });
  }

  if (tabs.length === 0) {
    return (
      <p className="text-center text-red-500">
        No Books/Patent data available for this department.
      </p>
    );
  }

  const activeTab = tabs[activeIndex] || tabs[0];

  return (
    <Reveal>
      <div className="space-y-8">
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Publications
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            {`Books and Publications (${programme.toUpperCase()})`}
          </h1>
        </header>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <div className="md:w-1/3 lg:w-1/4 shrink-0">
            <div className="bg-blue-50/50 rounded-2xl p-3 border border-gray-100 flex flex-col gap-2">
              {tabs.map((tab, index) => {
                const isActive = activeIndex === index;
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
                        {tab.type === "books" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        )}
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-bold tracking-tight ${isActive ? "text-navy" : "text-gray-700"}`}>
                          {tab.label}
                        </p>
                        {tab.count > 0 && (
                          <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                            {tab.count} {tab.count === 1 ? 'resource' : 'resources'}
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
          <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-navy tracking-tight">
                {activeTab.label}
              </h3>
              <p className="text-[#5f6368] text-sm mt-2 font-medium">
                {activeTab.count} {activeTab.count === 1 ? 'document' : 'documents'} available
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {activeTab.type === "books" && (() => {
                const booksList = data.Books?.BooksTable || [];
                const visibleBooks = isExpanded ? booksList : booksList.slice(0, 5);
                
                return (
                  <>
                    {visibleBooks.map((row: any, i: number) => {
                      const mainTitleCol = data.Books!.Columns!.find(col => col.toLowerCase().includes('title') || col.toLowerCase().includes('name'));
                      const mainTitle = mainTitleCol ? row[mainTitleCol] : Object.values(row)[0];
                      
                      return (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -40, y: 15 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.12,
                            type: "spring",
                            stiffness: 80,
                            damping: 12
                          }}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors duration-200 group"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-navy leading-snug">
                                {mainTitle || "Publication"}
                              </p>
                              <p className="text-[11px] font-medium text-gray-500">
                                {data.Books!.Columns!.map((col) => {
                                  if (col === mainTitleCol) return null;
                                  const key = Object.keys(row).find((k) => col.toLowerCase().includes(k.toLowerCase()));
                                  const val = row[key!];
                                  return val && val !== "-" ? `${col}: ${val}` : null;
                                }).filter(Boolean).slice(0, 2).join(" • ")}
                              </p>
                            </div>
                          </div>
                          <button className="shrink-0 text-[10px] font-bold text-gray-400 group-hover:text-orange transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            View Details
                          </button>
                        </motion.div>
                      );
                    })}
                    {booksList.length > 5 && (
                      <div className="flex justify-center mt-6">
                        <button 
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-orange text-orange font-bold text-sm hover:bg-orange hover:text-white transition-colors duration-300 group"
                        >
                          <span>{isExpanded ? "Show Less" : "Load More"}</span>
                          <svg 
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}

              {activeTab.type === "patents" && (() => {
                const patentsList = data.Patient_Right?.Patient_Rights_Table || [];
                const visiblePatents = isExpanded ? patentsList : patentsList.slice(0, 5);
                
                return (
                  <>
                    {visiblePatents.map((row: any, i: number) => {
                      const titleCol = data.Patient_Right!.Columns!.find(col => col.toLowerCase().includes('title'));
                      const mainTitle = titleCol ? row[titleCol] : (row.Patent_No ? `Patent: ${row.Patent_No}` : Object.values(row)[0]);
                      
                      return (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -40, y: 15 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.12,
                            type: "spring",
                            stiffness: 80,
                            damping: 12
                          }}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors duration-200 group"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-navy leading-snug">
                                {mainTitle || "Patent Record"}
                              </p>
                              <p className="text-[11px] font-medium text-gray-500">
                                {data.Patient_Right!.Columns!.map((col) => {
                                  if (col === titleCol) return null;
                                  if (col.toLowerCase().includes("patent & journal")) return `Published: ${row.Published_Date || 'N/A'}`;
                                  if (col.toLowerCase().includes("inventor")) return `Inventor: ${row.Inventor || 'N/A'}`;
                                  return null;
                                }).filter(Boolean).slice(0, 2).join(" • ")}
                              </p>
                            </div>
                          </div>
                          <button className="shrink-0 text-[10px] font-bold text-gray-400 group-hover:text-orange transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            View Details
                          </button>
                        </motion.div>
                      );
                    })}
                    {patentsList.length > 5 && (
                      <div className="flex justify-center mt-6">
                        <button 
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-orange text-orange font-bold text-sm hover:bg-orange hover:text-white transition-colors duration-300 group"
                        >
                          <span>{isExpanded ? "Show Less" : "Load More"}</span>
                          <svg 
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default BooksPatients;

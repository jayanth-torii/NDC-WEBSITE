"use client";

import React, { useState } from "react";
import { ChevronDown, Download, FileSearch, FileQuestion, Lightbulb, BookOpen, Search, FolderSearch, Plus } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const FindQuestionBank = ({ data }: any) => {
  const subjectsData = data || {};
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [openSemester, setOpenSemester] = useState<string | null>(null);

  const toggleSemester = (semester: string) => {
    setOpenSemester(openSemester === semester ? null : semester);
  };

  const openPdf = (pdf: string) => {
    window.open(pdf, "_blank", "noopener,noreferrer");
  };

  const departments = Object.keys(subjectsData || {});
  const years = selectedDepartment
    ? Object.keys(subjectsData[selectedDepartment] || {})
    : [];
  const semesters =
    selectedDepartment && selectedYear
      ? Object.keys(subjectsData[selectedDepartment][selectedYear] || {})
      : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[16px] border border-gray-200 shadow-lg overflow-hidden">
      {/* Filters panel */}
      <div className="lg:col-span-5 relative bg-navy text-white p-8 md:p-12 flex flex-col overflow-hidden">
        {/* Decorative dot grid, top-right */}
        <div className="absolute top-10 right-10 opacity-30 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <pattern id="qb-filter-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.1)" />
            </pattern>
            <rect width="100" height="100" fill="url(#qb-filter-dots)" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-[-30px] w-64 h-64 bg-navy-dark rounded-full blur-[80px] pointer-events-none opacity-50 z-0"></div>

        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center w-[80px] h-[80px] rounded-full border-2 border-orange text-orange mb-8 shadow-[0_0_20px_rgba(246,135,42,0.1)]">
          <div className="relative">
             <BookOpen size={32} strokeWidth={1.5} />
             <div className="absolute -bottom-2 -right-2 bg-navy rounded-full p-0.5">
               <Search size={20} strokeWidth={2.5} />
             </div>
          </div>
        </div>

        <p className="relative z-10 text-orange text-[13px] font-bold tracking-[0.2em] uppercase mb-1">
          Filters
        </p>
        <span className="relative z-10 block h-[3px] w-8 bg-orange rounded-full mb-10" />

        <label className="relative z-10 block text-[11px] font-bold tracking-[0.16em] uppercase text-white/50 mb-3">
          Select Department
        </label>
        <div className="relative z-10 mb-8">
          <select
            className="cursor-pointer w-full appearance-none rounded-xl bg-white/5 border border-white/10 text-white/90 p-4 pr-12 focus:outline-none focus:border-orange transition-colors duration-300 shadow-inner"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedYear("");
              setOpenSemester(null);
            }}
          >
            <option className="text-navy" value="">
              -- Select Department --
            </option>
            {departments.map((dept) => (
              <option className="text-navy" key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-orange pointer-events-none"
          />
        </div>

        {selectedDepartment && (
          <>
            <label className="relative z-10 block text-[11px] font-bold tracking-[0.16em] uppercase text-white/50 mb-3">
              Select Year
            </label>
            <div className="relative z-10 mb-8">
              <select
                className="cursor-pointer w-full appearance-none rounded-xl bg-white/5 border border-white/10 text-white/90 p-4 pr-12 focus:outline-none focus:border-orange transition-colors duration-300 shadow-inner"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setOpenSemester(null);
                }}
              >
                <option className="text-navy" value="">
                  -- Select Year --
                </option>
                {years.map((year) => (
                  <option className="text-navy" key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-orange pointer-events-none"
              />
            </div>
          </>
        )}

        {selectedDepartment && selectedYear && (
          <p className="relative z-10 text-white/40 text-sm tabular-nums font-semibold mb-6">
            {String(semesters.length).padStart(2, "0")} semesters available
          </p>
        )}

        <div className="relative z-10 mt-6">
          <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5">
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-orange text-orange shrink-0 mt-0.5">
              <Lightbulb size={16} />
            </span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              <span className="text-white font-bold block mb-1">Can&apos;t find what you&apos;re looking for?</span>
              Try selecting a different department or check back later.
            </p>
          </div>
        </div>
        
        {/* Bottom decorative dots */}
        <div className="absolute bottom-4 left-4 opacity-10 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <pattern id="qb-filter-dots-btm" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#ffffff" />
            </pattern>
            <rect width="100" height="100" fill="url(#qb-filter-dots-btm)" />
          </svg>
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-7 bg-white p-8 md:p-14 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
        {!selectedDepartment && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 relative z-10">
            {/* Custom Illustration */}
            <div className="relative w-[280px] h-[280px] flex items-center justify-center mb-6">
               <div className="absolute inset-0 bg-chip-bg rounded-full scale-75 opacity-100 z-0"></div>
               {/* Decorative floating crosses */}
               <Plus size={16} className="text-orange absolute top-10 right-10 opacity-70 rotate-45 z-0" />
               <Plus size={12} className="text-gray-300 absolute bottom-16 right-4 opacity-70 z-0" />
               <Plus size={12} className="text-gray-300 absolute top-20 left-10 opacity-70 rotate-45 z-0" />
               <div className="absolute top-[40%] right-8 w-2 h-2 border border-gray-300 rounded-full z-0"></div>
               <div className="absolute bottom-20 left-12 w-3 h-3 border-2 border-gray-200 rounded-full z-0"></div>
               <div className="absolute top-12 left-[45%] w-2 h-2 text-orange font-bold z-0">v</div>
               
               {/* Document box graphic */}
               <div className="relative z-10 w-[120px] h-[100px] bg-navy rounded-xl flex items-center justify-center mt-10 shadow-2xl">
                  {/* The Document */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[70px] h-[90px] bg-white rounded-t-lg rounded-bl-lg rounded-br-none border-2 border-navy shadow-md flex items-center justify-center before:content-[''] before:absolute before:top-[-2px] before:-right-[18px] before:w-0 before:h-0 before:border-b-[18px] before:border-l-[18px] before:border-b-navy before:border-l-transparent before:border-r-transparent">
                     {/* Dog ear fold */}
                     <div className="absolute top-[-2px] -right-[16px] w-[16px] h-[16px] border-l-2 border-b-2 border-navy bg-white"></div>
                     <span className="text-orange text-4xl font-extrabold pb-2">?</span>
                  </div>
                  {/* Box lip */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-navy-dark rounded-t-xl z-20"></div>
                  {/* Box handle */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[30px] h-[4px] bg-white/50 rounded-full z-20"></div>
               </div>
            </div>
            
            <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-orange mb-1">
              Start here
            </p>
            <span className="block h-[2px] w-8 bg-orange rounded-full mb-6" />
            <h3 className="text-navy text-xl md:text-2xl font-extrabold leading-snug max-w-sm mb-4">
              Choose a department and year to browse semester question papers.
            </h3>
            <p className="text-gray-500 text-[14px] font-medium max-w-sm">
              Previous year question papers at your fingertips.
            </p>
            
            {/* Bottom smiley curve */}
            <div className="mt-8">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                <path d="M5 5C15 15 25 15 35 5" stroke="#f6872a" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {selectedDepartment && !selectedYear && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <div className="relative w-20 h-20 rounded-full bg-chip-bg flex items-center justify-center mb-6">
              <FileQuestion size={34} className="text-orange" />
            </div>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange mb-2">
              Next step
            </p>
            <span className="block h-[3px] w-10 bg-orange rounded-full mb-5" />
            <h3 className="text-navy text-xl md:text-2xl font-extrabold leading-snug max-w-md">
              Select a year for <span className="text-orange">{selectedDepartment}</span> to see available semesters.
            </h3>
          </div>
        )}

        {selectedDepartment && selectedYear && (
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-6 pb-4 border-b border-card-border">
              <div>
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange mb-1">
                  Available Semesters
                </p>
                <p className="text-navy font-bold text-lg">
                  {selectedDepartment} · {selectedYear}
                </p>
              </div>
            </div>

            {semesters.map((semKey: string, semIdx: number) => {
              const open = openSemester === semKey;
              const subjects =
                subjectsData[selectedDepartment][selectedYear][semKey] || [];
              return (
                <div
                  key={semKey}
                  className="border-b border-card-border first:border-t"
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between py-5 text-left gap-4 group"
                    onClick={() => toggleSemester(semKey)}
                    aria-expanded={open}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums">
                        {String(semIdx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                          open
                            ? "text-orange"
                            : "text-navy group-hover:text-orange"
                        }`}
                      >
                        {semKey.replace("semester", "Semester ")}
                      </span>
                      <span className="text-body-gray/60 text-sm font-semibold tabular-nums">
                        {String(subjects.length).padStart(2, "0")}
                      </span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-navy/40 transition-transform duration-400 ease-[var(--ease-editorial)] ${
                        open ? "rotate-180 text-orange" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[var(--ease-editorial)] ${
                      open
                        ? "grid-rows-[1fr] opacity-100 pb-6"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-body-gray mb-3 pl-0 sm:pl-10">
                        Subjects
                      </p>
                      {subjects.length > 0 ? (
                        <RevealGroup className="divide-y divide-card-border border-y border-card-border">
                          {subjects.map((subject: any, index: number) => (
                            <RevealItem key={index}>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 group/row hover:bg-surface-light/70 transition-colors duration-300 px-2 sm:pl-10">
                                <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums shrink-0">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 font-medium text-navy leading-snug">
                                  {subject.subjectName}
                                </span>
                                {subject.subjectPdf ? (
                                  <button
                                    type="button"
                                    className="inline-flex shrink-0 items-center gap-2 self-start sm:self-auto rounded-full border border-navy/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy cursor-pointer"
                                    onClick={() => openPdf(subject.subjectPdf)}
                                  >
                                    <Download size={14} /> View
                                  </button>
                                ) : (
                                  <span className="text-sm font-medium text-red-500">
                                    No PDF
                                  </span>
                                )}
                              </div>
                            </RevealItem>
                          ))}
                        </RevealGroup>
                      ) : (
                        <p className="text-red-500 pl-0 sm:pl-10">
                          No subjects available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindQuestionBank;

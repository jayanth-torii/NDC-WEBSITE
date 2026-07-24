"use client";

import React, { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
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
    <div>
      <header className="pb-6 mb-8 border-b border-navy/10">
        <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
          Search
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
          FIND QUESTION BANK
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border border-navy/10 mb-10">
        <div className="lg:col-span-4 bg-navy text-white p-6 md:p-8">
          <p className="text-orange text-[11px] font-bold tracking-[0.22em] uppercase mb-6">
            Filters
          </p>

          <label className="block text-[11px] font-bold tracking-[0.16em] uppercase text-white/50 mb-2">
            Select Department
          </label>
          <div className="relative mb-6">
            <select
              className="cursor-pointer w-full appearance-none bg-white/5 border border-white/20 text-white p-3.5 pr-10 focus:outline-none focus:border-orange transition-colors duration-300"
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
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-orange pointer-events-none"
            />
          </div>

          {selectedDepartment && (
            <>
              <label className="block text-[11px] font-bold tracking-[0.16em] uppercase text-white/50 mb-2">
                Select Year
              </label>
              <div className="relative">
                <select
                  className="cursor-pointer w-full appearance-none bg-white/5 border border-white/20 text-white p-3.5 pr-10 focus:outline-none focus:border-orange transition-colors duration-300"
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
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange pointer-events-none"
                />
              </div>
            </>
          )}

          {selectedDepartment && selectedYear && (
            <p className="mt-8 text-white/40 text-sm tabular-nums font-semibold">
              {String(semesters.length).padStart(2, "0")} semesters available
            </p>
          )}
        </div>

        <div className="lg:col-span-8 p-6 md:p-8 bg-white min-h-[280px]">
          {!selectedDepartment && (
            <div className="h-full flex flex-col justify-center items-start py-10">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange mb-3">
                Start here
              </p>
              <p className="text-body-gray text-lg max-w-md leading-relaxed">
                Choose a department and year to browse semester question papers.
              </p>
            </div>
          )}

          {selectedDepartment && !selectedYear && (
            <div className="h-full flex flex-col justify-center items-start py-10">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange mb-3">
                Next step
              </p>
              <p className="text-body-gray text-lg max-w-md leading-relaxed">
                Select a year for{" "}
                <span className="text-navy font-semibold">{selectedDepartment}</span>{" "}
                to see available semesters.
              </p>
            </div>
          )}

          {selectedDepartment && selectedYear && (
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-6 pb-4 border-b border-navy/10">
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
                    className="border-b border-navy/15 first:border-t"
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
                          <RevealGroup className="divide-y divide-navy/10 border-y border-navy/10">
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
                                      className="inline-flex shrink-0 items-center gap-2 self-start sm:self-auto border border-navy/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy cursor-pointer"
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

    </div>
  );
};

export default FindQuestionBank;

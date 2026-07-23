"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
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
    <div>
      {departmentData.map((entry: any, yearIdx: number) => {
        const subjects = entry.semData[activeTabs[entry.year]] || [];
        return (
          <section
            key={entry.year}
            className="mb-14 last:mb-0 border border-navy/10 bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-5 md:px-8 py-5 border-b border-navy/10 bg-navy text-white">
              <div>
                <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-2">
                  Year {String(yearIdx + 1).padStart(2, "0")}
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                  {titlePrefix} Question Papers {entry.year}
                </h2>
              </div>
              <p className="text-white/50 text-sm font-semibold tabular-nums">
                {String(subjects.length).padStart(2, "0")} papers
              </p>
            </div>

            <div className="flex flex-wrap gap-0 border-b border-navy/10 px-2 md:px-4 overflow-x-auto">
              {entry.tabs.map((tab: string, tabIdx: number) => {
                const active = activeTabs[entry.year] === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() =>
                      setActiveTabs((prev) => ({ ...prev, [entry.year]: tab }))
                    }
                    className={`relative whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition-colors duration-300 ${
                      active
                        ? "text-navy"
                        : "text-body-gray hover:text-navy"
                    }`}
                  >
                    <span className="text-[10px] font-bold tracking-[0.14em] text-orange/70 mr-2 tabular-nums">
                      {String(tabIdx + 1).padStart(2, "0")}
                    </span>
                    {tab.replace("semester", "Semester ")}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-orange" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="px-2 md:px-4">
              {subjects.length > 0 ? (
                <RevealGroup className="divide-y divide-navy/10">
                  {subjects.map((item: any, idx: number) => (
                    <RevealItem key={idx}>
                      <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 px-3 md:px-4 hover:bg-surface-light/70 transition-colors duration-300">
                        <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-medium text-navy leading-snug group-hover:text-orange transition-colors duration-300">
                          {item.subjectName}
                        </span>
                        {item.subjectPdf ? (
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center gap-2 self-start sm:self-auto border border-navy/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy cursor-pointer"
                            onClick={() => openPdf(item.subjectPdf)}
                          >
                            <Download size={14} /> View
                          </button>
                        ) : (
                          <span className="text-sm font-medium text-red-500">
                            No PDF available
                          </span>
                        )}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : (
                <p className="text-body-gray py-10 text-center">No data available</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

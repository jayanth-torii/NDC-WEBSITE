"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

type Row = { name?: string; courses?: string };
type Tab = { tabName?: string; rows?: Row[] };
type DeptEntry = { title?: string; SyllabusSection?: Tab[] };

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const SyllabusDetails = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, DeptEntry> =
    (departmentJson["syllabus-details"] as any)?.data || {};

  const [activeTab, setActiveTab] = useState(0);

  const normalizedMap = useMemo(() => {
    const map: Record<string, DeptEntry> = {};
    Object.entries(apiData || {}).forEach(([k, v]) => {
      map[normalizeKey(k)] = v as DeptEntry;
    });
    return map;
  }, [apiData]);

  const dept = useMemo<DeptEntry | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  const title = dept?.title ?? "";
  const tabData = Array.isArray(dept?.SyllabusSection)
    ? dept!.SyllabusSection!
    : [];

  useEffect(() => {
    setActiveTab(0);
  }, [normalizedProgramme, tabData.length]);

  const currentTab: Tab | undefined = tabData[activeTab];

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!dept) {
    return (
      <p className="text-center text-body-gray">
        No data available for <strong>{programme}</strong>.
      </p>
    );
  }

  if (!currentTab) {
    return <p className="text-center text-body-gray">No data available.</p>;
  }

  const rows = Array.isArray(currentTab.rows) ? currentTab.rows : [];

  return (
    <Reveal>
      <div className="w-full text-body-gray">
        <header className="pb-6 mb-6 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Syllabus
          </p>
          {title && (
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
              {title}
            </h2>
          )}
        </header>

        <div className="flex flex-wrap gap-0 mb-6 border-b border-navy/15 overflow-x-auto">
          {tabData.map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative cursor-pointer whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
                activeTab === index
                  ? "text-navy"
                  : "text-body-gray hover:text-navy"
              }`}
              type="button"
            >
              <span className="text-[10px] font-bold tracking-[0.14em] text-orange/70 mr-2 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {tab.tabName}
              {activeTab === index && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange" />
              )}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto border border-navy/10">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-4 py-3.5 text-sm font-semibold tracking-wide w-1/3">
                  Name
                </th>
                <th className="px-4 py-3.5 text-sm font-semibold tracking-wide">
                  Courses
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-navy/10 hover:bg-surface-light/80 transition-colors duration-250 even:bg-surface-light/40"
                  >
                    <td className="px-4 py-3.5 font-medium text-navy align-top">
                      {row?.name ?? "-"}
                    </td>
                    <td className="px-4 py-3.5 whitespace-pre-line text-sm">
                      {row?.courses ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3.5" colSpan={2}>
                    No rows available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
};

export default SyllabusDetails;

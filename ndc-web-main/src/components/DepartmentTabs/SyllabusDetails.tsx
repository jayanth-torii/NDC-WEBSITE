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

  const apiData: Record<string, DeptEntry> = (departmentJson["syllabus-details"] as any)?.data || {};

  const [activeTab, setActiveTab] = useState(0);

  // ✅ Normalize API keys once (before any conditional returns)
  const normalizedMap = useMemo(() => {
    const map: Record<string, DeptEntry> = {};
    Object.entries(apiData || {}).forEach(([k, v]) => {
      map[normalizeKey(k)] = v as DeptEntry;
    });
    return map;
  }, [apiData]);

  // ✅ Select department entry by normalized programme
  const dept = useMemo<DeptEntry | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  const title = dept?.title ?? "";
  const tabData = Array.isArray(dept?.SyllabusSection) ? dept!.SyllabusSection! : [];

  // Keep active tab in range when programme/data changes
  useEffect(() => {
    setActiveTab(0);
  }, [normalizedProgramme, tabData.length]);

  const currentTab: Tab | undefined = tabData[activeTab];

  // ✅ Inform parent whether programme key exists in API response
  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  // ---- UI returns AFTER all hooks ----
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
        {/* Title */}
        {title && <h2 className="text-2xl font-extrabold text-navy tracking-[-0.5px] mb-4 text-center">{title}</h2>}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 overflow-x-auto pb-1">
          {tabData.map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                activeTab === index
                  ? "bg-navy text-white"
                  : "text-body-gray hover:bg-surface-tint"
              }`}
              type="button"
            >
              {tab.tabName}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-[14px] border border-card-border">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-surface-tint">
                <th className="px-4 py-3 border-b border-card-border text-navy font-semibold">Name</th>
                <th className="px-4 py-3 border-b border-card-border text-navy font-semibold">Courses</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={index} className="hover:bg-surface-tint/60 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <td className="px-4 py-3 border-b border-card-border">
                      {row?.name ?? "-"}
                    </td>
                    <td className="px-4 py-3 border-b border-card-border whitespace-pre-line">
                      {row?.courses ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-3 border-b border-card-border"
                    colSpan={2}
                  >
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

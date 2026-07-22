"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";

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
      <p className="text-center text-[#003333]">
        No data available for <strong>{programme}</strong>.
      </p>
    );
  }

  if (!currentTab) {
    return <p className="text-center text-[#003333]">No data available.</p>;
  }

  const rows = Array.isArray(currentTab.rows) ? currentTab.rows : [];

  return (
    <div className="w-full text-[#003333]">
      {/* Title */}
      {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-4 overflow-x-auto">
        {tabData.map((tab: any, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className="relative cursor-pointer pb-2 text-lg font-semibold text-[#003333]"
            type="button"
          >
            {tab.tabName}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500" />
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b border-gray-300">Name</th>
              <th className="px-4 py-2 border-b border-gray-300">Courses</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={index} className="hover:bg-[#C2C0C017]">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {row?.name ?? "-"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 whitespace-pre-line">
                    {row?.courses ?? "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-2 border-b border-gray-200"
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
  );
};

export default SyllabusDetails;


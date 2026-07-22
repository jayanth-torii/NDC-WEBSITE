"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import PdfModal from "../PdfModal";

export default function BcomHons({ data }: { data?: Record<string, any> }) {
  const [departmentData, setDepartmentData] = useState<any>(null);
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: string }>({});
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      // Convert API structure into array of year entries
      const entries = Object.entries(data).sort();
      const yearEntries = entries.map(([year, semData]) => {
        const tabs = Object.keys(semData);
        return { year, tabs, semData };
      });

      setDepartmentData(yearEntries);

      // Initialize active tab per year
      const initTabs: any = {};
      yearEntries.forEach((entry) => {
        initTabs[entry.year] = entry.tabs[0];
      });
      setActiveTabs(initTabs);
    }
  }, [data]);

  const openPdf = (pdf: string) => setSelectedPdf(pdf);
  const closePdf = () => setSelectedPdf(null);

  if (!departmentData) {
    return <p>Loading department data…</p>;
  }

  return (
    <div className="px-6">
      {departmentData.map((entry: any) => (
        <div key={entry.year} className="mb-12">
          <h2 className="text-xl font-bold mb-2">B.Com (Hons)- Question Papers {entry.year}</h2>
          <div className="border-b border-gray-300 flex flex-wrap gap-4 mb-4">
            {entry.tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTabs((prev) => ({ ...prev, [entry.year]: tab }))}
                className={`py-2 text-lg relative transition-all duration-300 ${
                  activeTabs[entry.year] === tab ? "text-[#003333] font-semibold" : "text-gray-600"
                }`}
              >
                {tab.replace("semester", "Semester ")}
                {activeTabs[entry.year] === tab && (
                  <div className="absolute left-0 bottom-0 w-full h-[4px] bg-orange-500"></div>
                )}
              </button>
            ))}
          </div>
          <div>
            {entry.semData[activeTabs[entry.year]]?.length > 0 ? (
              entry.semData[activeTabs[entry.year]].map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 mb-2 border-b-2 border-gray-300"
                >
                  <span className="text-[#0e2455] font-medium text-lg">{item.subjectName}</span>
                  {item.subjectPdf ? (
                    <button
                      className="flex items-center border border-black cursor-pointer px-5 py-0 hover:bg-[#0E2455] rounded bg-white text-[#0e2455] hover:text-white transition"
                      onClick={() => openPdf(item.subjectPdf)}
                    >
                      View <AiOutlineArrowRight className="ml-2" />
                    </button>
                  ) : (
                    <span className="text-red-500">No PDF available</span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>
      ))}
      {selectedPdf && <PdfModal pdfUrl={selectedPdf} onClose={closePdf} />}
    </div>
  );
}

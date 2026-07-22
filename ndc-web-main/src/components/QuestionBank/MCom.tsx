"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import PdfModal from "../PdfModal";
import Card from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function Mcom({ data }: { data?: Record<string, any> }) {
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
    return <p className="px-6 text-body-gray">Loading department data…</p>;
  }

  return (
    <div className="px-1 sm:px-6">
      {departmentData.map((entry: any) => (
        <div key={entry.year} className="mb-12">
          <h2 className="mb-4 border-l-4 border-orange pl-3 text-xl font-extrabold text-navy">
            Mcom- Question Papers {entry.year}
          </h2>
          <div className="mb-5 flex flex-wrap gap-1 overflow-x-auto border-b border-card-border">
            {entry.tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTabs((prev) => ({ ...prev, [entry.year]: tab }))}
                className={`relative whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] sm:text-base ${
                  activeTabs[entry.year] === tab ? "text-orange" : "text-body-gray hover:text-navy"
                }`}
              >
                {tab.replace("semester", "Semester ")}
                {activeTabs[entry.year] === tab && (
                  <span className="absolute inset-x-0 -bottom-px h-[2px] bg-orange" />
                )}
              </button>
            ))}
          </div>
          <div>
            {entry.semData[activeTabs[entry.year]]?.length > 0 ? (
              <RevealGroup className="grid gap-3">
                {entry.semData[activeTabs[entry.year]].map((item: any, idx: number) => (
                  <RevealItem key={idx}>
                    <Card
                      accent="orange-left"
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                    >
                      <span className="font-medium text-navy">{item.subjectName}</span>
                      {item.subjectPdf ? (
                        <button
                          className="inline-flex shrink-0 items-center gap-2 self-start rounded-[10px] border-2 border-navy px-4 py-2 text-sm font-bold text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white sm:self-auto"
                          onClick={() => openPdf(item.subjectPdf)}
                        >
                          <Download size={16} /> View
                        </button>
                      ) : (
                        <span className="text-sm font-medium text-red-500">No PDF available</span>
                      )}
                    </Card>
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <p className="text-body-gray">No data available</p>
            )}
          </div>
        </div>
      ))}
      {selectedPdf && <PdfModal pdfUrl={selectedPdf} onClose={closePdf} />}
    </div>
  );
}

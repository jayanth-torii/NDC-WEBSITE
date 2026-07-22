"use client"
import { useState } from "react";

export default function ProfessionalCourses({ data }: any) {
  const tabsData = data?.TabsSection || [];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto mb-10 md:mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0E2455] mb-8">
        {data?.title || "Professional Courses"}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-4">
        {tabsData.map((tab: any, index: number) => (
          <button
            key={index}
            className={`cursor-pointer py-2 px-4 text-xl font-semibold text-[#003333] transition-all duration-200 ${
              activeTab === index ? "border-b-4 border-orange-500" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.TabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 p-4 rounded shadow-md">
        <ul className="list-disc pl-5 space-y-2 text-justify text-[#0E2455]">
          {tabsData[activeTab]?.points?.map((point: string, idx: number) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

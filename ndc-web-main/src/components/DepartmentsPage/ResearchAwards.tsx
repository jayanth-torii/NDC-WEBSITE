"use client";

import { useState } from "react";

const ResearchAwards = ({ data }: any) => {
  const researchData = data
  const sections = researchData?.Sections || [];

  const [activeTab, setActiveTab] = useState(sections[0]?.TabName || "");

  const activeSection = sections.find((section: any) => section.TabName === activeTab);

  return (
    <div className="mb-30">
      <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-[#003333]">{researchData?.title}</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 mb-4">
        {sections.map((section: any) => (
          <button
            key={section.TabName}
            onClick={() => setActiveTab(section.TabName)}
            className={`pb-2 cursor-pointer !font-semibold !text-xl ${
              activeTab === section.TabName
                ? "border-b-4 border-[#FFB300] text-[#003333]"
                : "text-gray-600"
            }`}
          >
            {section.TabName}
          </button>
        ))}
      </div>

      {/* Points */}
      <div className="h-[400px] overflow-y-auto custom-scrollbar">
        {activeSection?.ListPoints?.map((item: string, idx: number) => (
          <p
            key={idx}
            className="text-[#4D4D4D] font-medium text-justify mb-2 border-b border-[#AFAFAF] py-2 pb-2"
          >
          <span>{idx+1}.</span>  {item}
          </p>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f3f3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f09300;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d87d00;
        }
      `}</style>
    </div>
  );
};

export default ResearchAwards;

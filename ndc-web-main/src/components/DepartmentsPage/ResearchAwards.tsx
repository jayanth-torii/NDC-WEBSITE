"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ResearchAwards = ({ data }: any) => {
  const researchData = data
  const sections = researchData?.Sections || [];

  const [activeTab, setActiveTab] = useState(sections[0]?.TabName || "");

  const activeSection = sections.find((section: any) => section.TabName === activeTab);

  return (
    <Reveal as="section" className="mb-30">
      <SectionHeading title={researchData?.title} className="mb-6" />

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-card-border mb-4">
        {sections.map((section: any) => (
          <button
            key={section.TabName}
            onClick={() => setActiveTab(section.TabName)}
            className={`pb-2 cursor-pointer font-semibold text-lg md:text-xl transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              activeTab === section.TabName
                ? "border-b-4 border-orange text-navy"
                : "text-body-gray hover:text-navy"
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
            className="text-body-gray font-medium text-justify mb-2 border-b border-card-border py-2 pb-2"
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
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f6872a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e5760f;
        }
      `}</style>
    </Reveal>
  );
};

export default ResearchAwards;

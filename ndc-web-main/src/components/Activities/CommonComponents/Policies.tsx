"use client";
import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2 } from "lucide-react";

interface Tab {
  title: string;
  description: string;
  points: string[];
}

interface PoliciesProps {
  data: {
    title: string;
    description?: string[];
    tabsSection: Tab[];
  };
}

const Policies: React.FC<PoliciesProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = data?.tabsSection || [];
  const activeTab = tabs[selectedIndex];

  if (!data) return null;

  return (
    <div className="mb-10 md:mb-20">
      <SectionHeading title={data?.title} className="mb-6" />

      {data?.description?.map((desc, idx) => (
        <p key={idx} className="text-lg text-body-gray leading-relaxed mb-6 bg-surface-tint p-6 rounded-[16px] border border-card-border shadow-sm">
          {desc}
        </p>
      ))}

      {/* Pill Tabs */}
      <div className="flex overflow-x-auto gap-3 mb-8 pb-2 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.title}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`whitespace-nowrap flex-shrink-0 cursor-pointer text-center px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ease-[var(--ease-editorial)] border-2 ${
              idx === selectedIndex
                ? "bg-navy text-white border-navy shadow-[0_8px_20px_rgba(14,36,85,0.2)]"
                : "bg-transparent text-body-gray border-card-border hover:border-orange hover:text-navy"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <Reveal key={activeTab?.title}>
        <div className="bg-white p-6 md:p-8 rounded-[24px] border border-card-border shadow-[var(--shadow-card)] transition-all duration-300">
          {activeTab?.description && (
            <div className="mb-8 p-6 bg-surface-light rounded-[16px] border border-orange/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-orange"></div>
               <p className="text-lg text-body-gray leading-relaxed whitespace-pre-line font-medium text-[16px] md:text-[17px]">
                 {activeTab.description}
               </p>
            </div>
          )}

          {activeTab?.points?.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTab.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-surface-tint p-4 rounded-[12px] border border-card-border transition-colors hover:border-orange/40 hover:bg-white">
                  <CheckCircle2 className="text-orange shrink-0 mt-0.5" size={20} />
                  <span className="text-[15px] md:text-[16px] text-body-gray leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default Policies;

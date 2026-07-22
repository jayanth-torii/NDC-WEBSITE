"use client";
import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

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

  return (
    <div className="mb-10 md:mb-20">
      <SectionHeading title={data?.title} className="mb-6" />

      {data?.description?.map((desc, idx) => (
        <p key={idx} className="text-lg text-body-gray leading-relaxed mb-5">
          {desc}
        </p>
      ))}

      <div className="border-b border-card-border flex flex-wrap gap-x-6 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.title}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`cursor-pointer !font-semibold text-lg md:text-xl pb-3 border-b-[3px] -mb-px transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              idx === selectedIndex
                ? "text-navy border-orange !font-bold"
                : "text-body-gray border-transparent hover:text-navy"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {activeTab?.description && (
        <p className="text-lg text-body-gray leading-relaxed mb-4 whitespace-pre-line">
          {activeTab.description}
        </p>
      )}

      {activeTab?.points?.length > 0 && (
        <ul className="list-disc pl-6 space-y-2 marker:text-orange">
          {activeTab.points.map((point, idx) => (
            <li key={idx} className="text-lg text-body-gray">
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Policies;

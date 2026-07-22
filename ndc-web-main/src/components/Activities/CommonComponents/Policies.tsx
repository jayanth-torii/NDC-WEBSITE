"use client";
import React, { useState } from "react";

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
      <h1 className="text-2xl font-bold text-[#0E2455] mb-6">{data?.title}</h1>

      {data?.description?.map((desc, idx) => (
        <p key={idx} className="text-lg text-gray-700 mb-5">
          {desc}
        </p>
      ))}

      <div className="border-b-2 border-gray-300 flex flex-wrap gap-4 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => setSelectedIndex(idx)}
            className={`cursor-pointer !font-semibold text-xl pb-2 ${
              idx === selectedIndex
                ? "border-b-5 text-[#003333] border-[#F09300] font-bold"
                : "text-[#003333]"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {activeTab?.description && (
        <p className="text-lg text-[#003333] mb-4 whitespace-pre-line">
          {activeTab.description}
        </p>
      )}

      {activeTab?.points?.length > 0 && (
        <ul className="list-disc pl-6 space-y-2">
          {activeTab.points.map((point, idx) => (
            <li key={idx} className="text-lg text-[#003333]">
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Policies;


 
"use client";

import { useState } from "react";
import { Box } from "@mantine/core";
import { admissionContent } from "@/app/Data/admissionContent";

const Documents = ({data}:any) => {
  const { title, tabs } = data;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = tabs[activeTabIndex];

  return (
    <Box className="mb-20">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003333] mb-6">{title}</h1>

      {/* Tabs */}
      <div className="flex flex-wrap border-b-2 border-gray-300 mb-10 md:mb-6 sm:gap-8">
        {tabs.map((tab: any, index: number) => (
          <button
            key={index}
            className={`cursor-pointer py-2 !text-xl text-[#003333] !font-semibold focus:outline-none ${
              activeTabIndex === index ? "border-b-4 border-[#FFB300]" : ""
            }`}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Note & Content */}
      {activeTab && (
        <div className="mt-4">
          <p className="text-[#003333] text-lg font-semibold mb-4">{activeTab.note}</p>
          <ul className="list-disc ml-6">
            {activeTab.content?.map((item: string, idx: number) => (
              <li key={idx} className="text-justify text-[#003333] mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

export default Documents;

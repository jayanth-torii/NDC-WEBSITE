"use client";

import { useState } from "react";
import { Box } from "@mantine/core";

const Courses = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, tabsCourses } = data;
  const [activeTab, setActiveTab] = useState(tabsCourses?.[0]?.tabTitle);

  const activeData =
    tabsCourses.find((tab: any) => tab.tabTitle === activeTab)?.rowContent || [];

  return (
    <Box className="mb-20 text-[#003333]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003333] mb-6">{title}</h1>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row items-start border-b-2 border-gray-300 mb-8 gap-4 md:gap-8">
        {tabsCourses?.map(({ tabTitle }: any) => (
          <button
            key={tabTitle}
            className={`cursor-pointer whitespace-nowrap py-2 !text-lg !md:text-xl !font-semibold focus:outline-none ${
              activeTab === tabTitle ? "border-b-4 border-[#FFB300]" : ""
            }`}
            onClick={() => setActiveTab(tabTitle)}
          >
            {tabTitle}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 table-fixed">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-lg">
              <th className="border border-gray-400 p-2 w-1/3">Programme</th>
              <th className="border border-gray-400 p-2 w-1/2">Eligibility</th>
              <th className="border border-gray-400 p-2 w-1/6">Duration</th>
            </tr>
          </thead>
          <tbody>
            {activeData.map(({ course, eligibility, duration }: any, index: number) => (
              <tr key={index} className="text-left text-base text-leading">
                <td className="border border-gray-400 py-2 px-4 w-1/3">{course}</td> 
                <td className="border border-gray-400 py-2 px-4 w-1/2">{eligibility}</td>
                <td className="border border-gray-400 py-2 px-4 w-1/6 text-center">{duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Courses;


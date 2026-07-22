"use client";

import { useState } from "react";
import { Box } from "@mantine/core";

type ResourceRow = {
  sn: number;
  name: string;
  link: string;
};
type DigitalResources = {
  title: string;
  tabs: string[];
  resoursesTable: Record<string, ResourceRow[]>;
};


const Courses = ({data}:any) => {
  const { title, resoursesTable }: DigitalResources = data;
  const tabs = Object.keys(resoursesTable);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Box className="mb-20 text-[#003333]">
      <h1 className="text-2xl md:text-3xl  font-bold text-[#003333] mb-6">
         {title}
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-start border-b-2 border-gray-300 mb-6 gap-4">
        {tabs?.map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer py-2 px-4 text-lg !font-semibold focus:outline-none ${
              activeTab === tab ? "border-b-4 border-orange-500 text-[#003333]" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="shadow-lg  overflow-x-auto ">
        <table className="w-full border-collapse border">
          <thead className="text-lg">
            <tr className="text-[#003333] text-start font-semibold">
            <th className="border border-gray-300 px-4 py-2 w-[50px]">SN</th>
            <th className="border border-gray-300 px-4 py-2 w-[400px] text-start">Name</th>
            <th className="border border-gray-300 px-4 py-2 w-[300px] text-start">Link</th>
            </tr>
          </thead>
          <tbody className="!text-base">
          { resoursesTable[activeTab]?.map((row: any, index:any) => (
              <tr key={row.sn} className="text-[#003333]">
                <td className="p-3 border border-gray-300 text-center">{index+1}</td>
                <td className="p-3 border border-gray-300">{row?.name}</td>
                <td className="p-3 border border-gray-300">
                  <a href={row?.link} className="text-[#003333] underline">
                   {row?.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Courses;

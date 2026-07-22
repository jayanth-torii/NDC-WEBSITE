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
    <Box className="mb-20">
      <h1 className="mb-6 text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-3xl">
         {title}
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap justify-start gap-2 border-b border-card-border">
        {tabs?.map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer rounded-t-[10px] px-4 py-2.5 text-[15px] font-semibold transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none ${
              activeTab === tab
                ? "border-b-2 border-orange text-navy"
                : "text-body-gray hover:text-navy"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
        <table className="w-full border-collapse text-[15px]">
          <thead>
            <tr className="bg-navy text-left text-white">
            <th className="w-[50px] px-4 py-3 font-semibold">SN</th>
            <th className="w-[400px] px-4 py-3 text-start font-semibold">Name</th>
            <th className="w-[300px] px-4 py-3 text-start font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
          { resoursesTable[activeTab]?.map((row: any, index:any) => (
              <tr
                key={row.sn}
                className="border-b border-card-border last:border-0 even:bg-surface-light hover:bg-chip-bg transition-colors duration-200"
              >
                <td className="p-3 text-center text-body-gray">{index+1}</td>
                <td className="p-3 text-body-gray">{row?.name}</td>
                <td className="p-3">
                  <a href={row?.link} className="text-blue-accent underline underline-offset-2 hover:text-orange">
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

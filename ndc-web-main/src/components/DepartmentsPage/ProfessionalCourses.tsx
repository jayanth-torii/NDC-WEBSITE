"use client"
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function ProfessionalCourses({ data }: any) {
  const tabsData = data?.TabsSection || [];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Reveal as="section" className="mx-auto mb-10 md:mb-20">
      <SectionHeading
        title={data?.title || "Professional Courses"}
        className="mb-8"
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-card-border">
        {tabsData.map((tab: any, index: number) => (
          <button
            key={index}
            className={`cursor-pointer py-2 px-4 text-lg md:text-xl font-semibold transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              activeTab === index
                ? "text-navy border-b-4 border-orange"
                : "text-body-gray hover:text-navy"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.TabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="p-6">
        <ul className="list-disc pl-5 space-y-2 text-justify text-body-gray">
          {tabsData[activeTab]?.points?.map((point: string, idx: number) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </Card>
    </Reveal>
  );
}

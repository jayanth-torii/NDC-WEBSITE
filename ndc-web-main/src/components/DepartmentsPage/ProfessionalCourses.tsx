"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

export default function ProfessionalCourses({ data }: any) {
  const tabsData = data?.TabsSection || [];
  const [activeTab, setActiveTab] = useState(0);

  if (!tabsData || tabsData.length === 0) return null;

  return (
    <Reveal as="section" className="relative border-b border-navy/10 bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        
        {/* Header (Restored) */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            Pathways
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-[-0.02em] leading-tight">
            {data?.title || "Professional Courses"}
          </h2>
        </div>

        {/* Horizontal Tabs with continuous bottom border */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100 mb-8 w-full justify-start lg:justify-start">
          <div className="flex w-max min-w-full lg:min-w-0 justify-between lg:justify-start lg:gap-14 px-2">
            {tabsData.map((course: any, index: number) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`relative py-4 px-2 text-[14px] md:text-[15px] whitespace-nowrap transition-colors duration-300 ${
                    isActive ? "text-navy font-bold" : "text-gray-500 hover:text-navy font-medium"
                  }`}
                >
                  {course.TabName}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Tab Content (Columns layout to prevent masonry gaps) */}
        <div 
          key={activeTab} 
          className="columns-1 lg:columns-2 gap-x-16 animate-slow-slide opacity-0"
        >
          {tabsData[activeTab]?.points?.map((point: string, idx: number) => (
            <div key={idx} className="flex items-start gap-4 md:gap-5 break-inside-avoid mb-8">
              <div className="mt-1 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md bg-blue-50 shrink-0">
                <span className="text-[10px] md:text-[11px] font-black text-navy tabular-nums tracking-wide">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[#5f6368] leading-[1.8] text-[14px] md:text-[15px] font-medium m-0">
                {point}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes slowSlideIn {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slow-slide {
          animation: slowSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </Reveal>
  );
}

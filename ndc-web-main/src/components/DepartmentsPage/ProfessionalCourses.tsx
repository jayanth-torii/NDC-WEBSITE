"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

export default function ProfessionalCourses({ data }: any) {
  const tabsData = data?.TabsSection || [];
  const [activeTab, setActiveTab] = useState(0);

  if (!tabsData || tabsData.length === 0) return null;

  return (
    <Reveal as="section" className="relative border-b border-navy/10 bg-surface-light">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
              Pathways
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-navy tracking-[-0.03em] leading-tight text-balance">
              {data?.title || "Professional Courses"}
            </h2>
          </div>
          <p className="text-body-gray text-sm tabular-nums font-semibold tracking-wide">
            {String(tabsData.length).padStart(2, "0")} courses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 lg:min-h-[420px]">
          <aside className="lg:col-span-4 xl:col-span-3 lg:border-r lg:border-navy/10 lg:pr-8">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              {tabsData.map((tab: any, index: number) => {
                const active = activeTab === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`shrink-0 flex items-center gap-3 text-left px-4 py-3.5 lg:px-0 lg:py-4 border-b-2 lg:border-b lg:border-l-2 lg:border-b-transparent transition-all duration-300 ${
                      active
                        ? "border-orange text-navy lg:border-l-orange lg:pl-4"
                        : "border-transparent text-body-gray hover:text-navy lg:border-l-transparent lg:hover:pl-2"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold tracking-[0.18em] tabular-nums ${
                        active ? "text-orange" : "text-body-gray/50"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm md:text-base font-semibold whitespace-nowrap lg:whitespace-normal">
                      {tab.TabName}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9 lg:pl-10 xl:pl-14">
            <div className="mb-8 pb-4 border-b border-navy/10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
                {tabsData[activeTab]?.TabName}
              </h3>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {tabsData[activeTab]?.points?.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-orange group-hover:scale-125 transition-transform duration-300" />
                  <p className="text-body-gray leading-relaxed text-[15px] md:text-base">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>
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
      `}</style>
    </Reveal>
  );
}

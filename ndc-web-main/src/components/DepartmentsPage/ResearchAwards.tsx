"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const ResearchAwards = ({ data }: any) => {
  const researchData = data;
  const sections = researchData?.Sections || [];

  const [activeTab, setActiveTab] = useState(sections[0]?.TabName || "");

  if (!sections || sections.length === 0) return null;

  const activeSection = sections.find(
    (section: any) => section.TabName === activeTab
  );

  return (
    <Reveal as="section" className="relative bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
              Recognition
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-navy tracking-[-0.03em] leading-tight">
              {researchData?.title || "Research & Awards"}
            </h2>
          </div>

          <div className="flex gap-0 border-b border-navy/15">
            {sections.map((section: any) => (
              <button
                key={section.TabName}
                type="button"
                onClick={() => setActiveTab(section.TabName)}
                className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === section.TabName
                    ? "text-navy"
                    : "text-body-gray hover:text-navy"
                }`}
              >
                {section.TabName}
                {activeTab === section.TabName && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                )}
              </button>
            ))}
          </div>
        </header>

        <div className="relative max-h-[480px] md:max-h-[560px] overflow-y-auto pr-2 custom-scrollbar">
          {activeSection?.ListPoints?.length > 0 ? (
            <ol className="relative border-l-2 border-navy/10 ml-3 md:ml-4 space-y-0">
              {activeSection.ListPoints.map((item: string, idx: number) => (
                <li
                  key={idx}
                  className="relative pl-6 md:pl-8 py-3 group"
                >
                  <span className="absolute left-0 top-5 -translate-x-[calc(50%+1px)] w-2.5 h-2.5 bg-white border-2 border-orange group-hover:bg-orange transition-colors duration-300 rounded-full" />
                  <div className="flex gap-4 items-start">
                    <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums pt-1 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body-gray leading-relaxed group-hover:text-navy transition-colors duration-300 text-justify text-sm md:text-[15px]">
                      {item}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="text-body-gray italic text-center py-12">
              No points available for {activeTab}.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-orange);
        }
      `}</style>
    </Reveal>
  );
};

export default ResearchAwards;

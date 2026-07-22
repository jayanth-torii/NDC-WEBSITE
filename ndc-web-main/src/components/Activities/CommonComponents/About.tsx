"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function AboutIQAC({ data }: { data: any }) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="mb-10 md:mb-20">
      {/* About Description */}

      {data?.AboutDescription?.length > 0 && (
        <Reveal>
          <div className="rounded-[18px] border border-card-border bg-surface-tint p-6 sm:p-8 mb-6 shadow-[var(--shadow-card)]">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-navy tracking-[-0.5px]">{data?.title}</h1>
            {data?.AboutDescription?.map((paragraph: string, index: number) => (
              <p key={index} className="text-justify text-body-gray leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      )}

      <RevealGroup className="space-y-3">
        {/* Vision & Mission Accordion */}

        {data?.VisionMission?.sections?.length > 0 && (
          <RevealItem>
            <div className="rounded-[14px] border border-card-border overflow-hidden transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover">
              <button
                type="button"
                className="w-full flex justify-between items-center gap-3 bg-surface-tint cursor-pointer p-4 text-left"
                onClick={() => toggleAccordion(0)}
              >
                <span className="text-navy font-semibold text-lg md:text-xl">
                  {data?.VisionMission?.title || "Our Vision & Mission"}
                </span>
                {openSections?.includes(0) ? (
                  <ChevronUp className="text-orange shrink-0" size={22} />
                ) : (
                  <ChevronDown className="text-orange shrink-0" size={22} />
                )}
              </button>
              {openSections?.includes(0) && (
                <div className="p-4 sm:p-6 bg-white space-y-5">
                  {data?.VisionMission?.sections?.map((section: any, idx: number) => (
                    <div key={idx}>
                      <h3 className="text-lg md:text-xl font-semibold text-navy mb-2">{section?.title}</h3>
                      {section?.description && (
                        <p className="text-body-gray mb-2 leading-relaxed">{section?.description}</p>
                      )}
                      {section?.points?.length > 0 && (
                        <ul className="list-disc ml-6 text-body-gray space-y-1 marker:text-orange">
                          {section?.points?.map((pt: string, i: number) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealItem>
        )}

        {/* Accordien Sections (Objectives, Functions, etc.) */}
        {data?.AccordienSection?.map((section: any, index: number) => {
          const accordionIndex = index + 1;
          const isOpen = openSections?.includes(accordionIndex);

          return (
            <RevealItem key={section.title || accordionIndex}>
              <div className="rounded-[14px] border border-card-border overflow-hidden transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover">
                <button
                  type="button"
                  className="w-full flex justify-between items-center gap-3 bg-surface-tint cursor-pointer p-4 text-left"
                  onClick={() => toggleAccordion(accordionIndex)}
                >
                  <span className="text-navy font-semibold text-lg md:text-xl">
                    {section.title || `Section ${accordionIndex}`}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="text-orange shrink-0" size={22} />
                  ) : (
                    <ChevronDown className="text-orange shrink-0" size={22} />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-6 bg-white">
                    <ul className="list-disc ml-6 space-y-1 marker:text-orange">
                      {section.ListPoints?.map((item: string, j: number) => (
                        <li key={j} className="text-justify text-body-gray">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}

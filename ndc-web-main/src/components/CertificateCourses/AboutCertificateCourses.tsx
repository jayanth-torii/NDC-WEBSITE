import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import IconChip from "@/components/ui/IconChip";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function AboutCertificateCourses({ data }: { data: any }) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="mb-20">
      {/* About Description */}
      <RevealItem>
        <div className="bg-surface-light border border-card-border rounded-2xl p-6 sm:p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-navy tracking-[-0.5px]">
            {data?.title}
          </h1>
          {data?.AboutDescription?.map((paragraph: string, index: number) => (
            <p key={index} className="text-justify text-body-gray leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </RevealItem>

      <RevealGroup className="space-y-4">
        {/* Vision & Mission Accordion */}
        <RevealItem>
          <div className="rounded-2xl border border-card-border bg-white overflow-hidden shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <div
              className="flex justify-between items-center gap-4 cursor-pointer px-5 py-4 sm:px-6"
              onClick={() => toggleAccordion(0)}
            >
              <span className="text-navy font-semibold text-lg sm:text-xl">
                {data?.VisionMission?.title || "Our Vision & Mission"}
              </span>
              <IconChip size={40} className="shrink-0">
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    openSections.includes(0) ? "rotate-180" : ""
                  }`}
                />
              </IconChip>
            </div>
            {openSections.includes(0) && (
              <div className="px-5 sm:px-6 py-5 border-t border-card-border space-y-5">
                {data?.VisionMission?.sections?.map((section: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold text-navy mb-2">{section?.title}</h3>
                    {section?.description && (
                      <p className="text-justify text-body-gray mb-2 leading-relaxed">{section.description}</p>
                    )}
                    {section?.points?.length > 0 && (
                      <ul className="list-disc ml-6 text-body-gray space-y-1">
                        {section.points.map((pt: string, i: number) => (
                          <li className="text-justify" key={i}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </RevealItem>

        {/* Accordion Sections (Objectives, Functions, etc.) */}
        {data?.AccordienSection?.map((section: any, index: number) => {
          const accordionIndex = index + 1;
          const isOpen = openSections.includes(accordionIndex);

          return (
            <RevealItem key={section.title || accordionIndex}>
              <div className="rounded-2xl border border-card-border bg-white overflow-hidden shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <div
                  className="flex justify-between items-center gap-4 cursor-pointer px-5 py-4 sm:px-6"
                  onClick={() => toggleAccordion(accordionIndex)}
                >
                  <span className="text-navy font-semibold text-lg sm:text-xl">
                    {section.title || `Section ${accordionIndex}`}
                  </span>
                  <IconChip size={40} className="shrink-0">
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </IconChip>
                </div>
                {isOpen && (
                  <div className="px-5 sm:px-6 py-5 border-t border-card-border">
                    <ul className="list-disc ml-6 space-y-1">
                      {section.ListPoints?.map((item: string, j: number) => (
                        <li key={j} className="text-justify text-body-gray leading-relaxed">
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

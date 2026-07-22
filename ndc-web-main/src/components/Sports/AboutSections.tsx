"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const EASE = "ease-[cubic-bezier(0.23,1,0.32,1)]";

const AboutSections = ({ data }: { data: any }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Combine Our Vision & Our Mission
  const vision = data.sections.find((s: any) => s.title === "Our Vision");
  const mission = data.sections.find((s: any) => s.title === "Our Mission");

  const combinedSection = {
    title: "Our Vision & Mission",
    innerSections: [
      {
        title: vision?.title || "",
        description: vision?.description || "",
        list: Array.isArray(vision?.points) ? vision.points : [],
      },
      {
        title: mission?.title || "",
        description: mission?.description || "",
        list: Array.isArray(mission?.points) ? mission.points : [],
      },
    ],
  };

  // Filter rest of sections (excluding vision & mission)
  const restSections = data.sections.filter(
    (s: any) => s.title !== "Our Vision" && s.title !== "Our Mission"
  );

  // Final accordion sections to render
  const accordionSections = [combinedSection, ...restSections];

  return (
    <div className="mb-10 md:mb-20">
      {/* Title & Description */}
      {data.title && (
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-[-0.5px] text-navy sm:text-4xl">
            {data.title}
          </h1>
        </div>
      )}

      {/* Accordion Sections */}
      <div className="space-y-4">
        {accordionSections.map((section: any, index: number) => {
          const isOpen = openSection === index;
          return (
            <div
              key={index}
              className={`overflow-hidden rounded-[14px] border bg-white shadow-[var(--shadow-card)] transition-all duration-250 ${EASE} ${
                isOpen ? "border-card-border-hover" : "border-card-border"
              }`}
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-xl font-semibold text-navy">
                  {section.title}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange transition-transform duration-250 ${EASE} ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="space-y-6 border-t border-card-border bg-surface-light px-6 py-4">
                  {/* If combined section with innerSections */}
                  {section.innerSections ? (
                    section.innerSections.map((inner: any, i: number) => (
                      <div key={i}>
                        <h3 className="mb-1 text-lg font-semibold text-navy">
                          {inner.title}
                        </h3>
                        {inner.description && (
                          <p className="mb-2 text-base text-body-gray">{inner.description}</p>
                        )}
                        {inner.list?.length > 0 && (
                          <ul className="ml-5 list-disc space-y-1 marker:text-orange">
                            {inner.list.map((item: string, j: number) => (
                              <li key={j} className="text-base text-body-gray">{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <>
                      {section.description && (
                        <p className="mb-2 text-base text-body-gray">{section.description}</p>
                      )}
                      {section.points?.length > 0 && (
                        <ul className="ml-5 list-disc space-y-1 marker:text-orange">
                          {section.points.map((item: string, i: number) => (
                            <li key={i} className="text-base text-body-gray">{item}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutSections;

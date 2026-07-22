"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const EASE = "ease-[cubic-bezier(0.23,1,0.32,1)]";

export default function AboutLibrary({ data }: { data: any }) {
  const aboutText = data?.aboutText;
  const sections = data?.dropdowns;
  const title = data?.title;

  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="mb-20 md:mb-20">
      <div>
        {/* About Library Section */}
        <div className="mb-6 rounded-[18px] border border-card-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h1 className="mb-6 text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-3xl">
            {title}
          </h1>
          {aboutText?.map((paragraph: string, index: number) => (
            <p
              key={index}
              className="mb-4 text-justify leading-relaxed text-body-gray"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections?.map((section: any, index: number) => {
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
                  <div className="border-t border-card-border bg-surface-light px-6 py-4">
                    <ul className="list-disc space-y-2 pl-5 marker:text-orange">
                      {section.points?.map((point: string, i: number) => (
                        <li key={i} className="text-justify text-body-gray">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

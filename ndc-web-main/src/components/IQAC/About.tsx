"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function AboutIQAC({ data }: { data: any }) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Reveal as="section" className="bg-white mb-10 md:mb-20">
      {/* About Description */}
      <div className="bg-surface-light p-6 sm:p-8 rounded-[18px] border border-card-border mb-3">
        <SectionHeading title={data?.title || "About IQAC"} className="mb-6" />
        {data?.AboutDescription?.map((paragraph: string, index: number) => (
          <p key={index} className="text-justify text-body-gray leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-3">
        {/* Vision & Mission Accordion */}
        <div>
          <div
            className="flex justify-between bg-surface-light border border-card-border items-center cursor-pointer p-3 rounded-[14px] transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover"
            onClick={() => toggleAccordion(0)}
          >
            <span className="text-navy pl-3 font-medium text-xl">
              {data?.VisionMission?.title || "Our Vision & Mission"}
            </span>
            <Image src={openSections.includes(0) ? UpArrow : DownArrow} height={36} width={36} alt="arrow" />
          </div>
          {openSections.includes(0) && (
            <div className="px-8 py-3 bg-surface-light border border-t-0 border-card-border mt-[-2px] rounded-b-[14px] space-y-5">
              {data?.VisionMission?.sections?.map((section: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-navy mb-2">{section?.title}</h3>
                  {section?.description && (
                    <p className="text-justify text-body-gray mb-2">{section.description}</p>
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

        {/* Accordien Sections (Objectives, Functions, etc.) */}
        {data?.AccordienSection?.map((section: any, index: number) => {
          const accordionIndex = index + 1;
          const isOpen = openSections.includes(accordionIndex);

          return (
            <div key={section.title || accordionIndex}>
              <div
                className="flex justify-between bg-surface-light border border-card-border items-center cursor-pointer p-3 rounded-[14px] transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover"
                onClick={() => toggleAccordion(accordionIndex)}
              >
                <span className="text-navy pl-3 font-medium text-xl">
                  {section.title || `Section ${accordionIndex}`}
                </span>
                <Image src={isOpen ? UpArrow : DownArrow} height={36} width={36} alt="arrow" />
              </div>
              {isOpen && (
                <div className="px-8 py-3 bg-surface-light border border-t-0 border-card-border mt-[-2px] rounded-b-[14px]">
                  <ul className="list-disc ml-6 space-y-1">
                    {section.ListPoints?.map((item: string, j: number) => (
                      <li key={j} className="text-justify text-body-gray">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

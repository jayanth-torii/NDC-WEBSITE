"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";

export default function AboutIQAC({ data }: { data: any }) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white mb-10 md:mb-20">
      {/* About Description */}
      <div className="bg-[#F6F6F6] p-6 sm:p-8 rounded-md mb-3">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">
          {data?.title || "About IQAC"}
        </h1>
        {data?.AboutDescription?.map((paragraph: string, index: number) => (
          <p key={index} className="text-justify text-[#003333] leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-3">
        {/* Vision & Mission Accordion */}
        <div>
          <div
            className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-3"
            onClick={() => toggleAccordion(0)}
          >
            <span className="text-[#0e2455] pl-3 font-medium text-xl">
              {data?.VisionMission?.title || "Our Vision & Mission"}
            </span>
            <Image src={openSections.includes(0) ? UpArrow : DownArrow} height={36} width={36} alt="arrow" />
          </div>
          {openSections.includes(0) && (
            <div className="px-8 py-3 bg-[#F6F6F6] mt-3 space-y-5">
              {data?.VisionMission?.sections?.map((section: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-[#0E2455] mb-2">{section?.title}</h3>
                  {section?.description && (
                    <p className="text-justify text-[#003333] mb-2">{section.description}</p>
                  )}
                  {section?.points?.length > 0 && (
                    <ul className="list-disc ml-6 text-[#003333] space-y-1">
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
                className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-3"
                onClick={() => toggleAccordion(accordionIndex)}
              >
                <span className="text-[#0e2455] pl-3 font-medium text-xl">
                  {section.title || `Section ${accordionIndex}`}
                </span>
                <Image src={isOpen ? UpArrow : DownArrow} height={36} width={36} alt="arrow" />
              </div>
              {isOpen && (
                <div className="px-8 py-3 bg-[#F6F6F6] mt-3">
                  <ul className="list-disc ml-6 space-y-1">
                    {section.ListPoints?.map((item: string, j: number) => (
                      <li key={j} className="text-justify text-[#003333]">
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
    </div>
  );
}

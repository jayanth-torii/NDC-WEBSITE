"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";

export default function AboutLibrary({ data }: { data: any }) {
  const aboutText = data?.aboutText;
  const sections = data?.dropdowns;
  const title = data?.title;

  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="bg-white mb-20 md:mb-20">
      <div>
        {/* About Library Section */}
        <div className="bg-[#F6F6F6] p-6 sm:p-8 rounded-md mb-3">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">
            {title}
          </h1>
          {aboutText?.map((paragraph: string, index: number) => (
            <p
              key={index}
              className="text-justify text-[#003333] leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections?.map((section: any, index: number) => (
            <div key={index}>
              <div
                className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-4"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-[#0e2455] pl-3 font-medium text-2xl">
                  {section.title}
                </span>
                <Image
                  src={openSection === index ? UpArrow : DownArrow}
                  height={42}
                  width={42}
                  alt="arrow"
                />
              </div>
              {openSection === index && (
                <div className="px-8 py-3 bg-[#F6F6F6] mt-3">
                  <ul className="list-disc pl-5 space-y-2">
                    {section.points?.map((point: string, i: number) => (
                      <li key={i} className="text-justify text-[#003333]">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

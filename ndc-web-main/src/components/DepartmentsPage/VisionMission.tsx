"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";

export default function VisionMission({ data }: { data: any }) {
  const { title, AboutDescription, VisionMission, AccordienSection } = data;

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="bg-white mb-20">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">
        {title}
      </h1>

      {/* About Section */}
      {AboutDescription?.length > 0 && (
        <div className="bg-[#F6F6F6] p-6 sm:p-8 rounded-md mb-3">
          {AboutDescription.map((desc: string, idx: number) => (
            <p
              key={idx}
              className="text-justify text-[#003333] leading-relaxed mb-4"
            >
              {desc}
            </p>
          ))}
        </div>
      )}

      {/* Vision & Mission Accordion */}
      {VisionMission?.sections?.length > 0 && (
        <div className="mb-3">
          <div
            className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-4 rounded-md"
            onClick={() => toggleAccordion(-1)}
          >
            <span className="text-[#0e2455] font-medium text-xl">
              {VisionMission.title ?? "Our Vision & Mission"}
            </span>
            <Image
              src={openAccordion === -1 ? UpArrow : DownArrow}
              height={32}
              width={32}
              alt="toggle"
            />
          </div>
          {openAccordion === -1 && (
            <div className="px-6 py-4 bg-[#F6F6F6] mt-2 rounded-md space-y-6">
              {VisionMission.sections.map((sec: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-[#003333] mb-1">
                    {sec.title}
                  </h3>
                  {sec.description && (
                    <p className="text-[#003333] mb-2 text-justify">
                      {sec.description}
                    </p>
                  )}
                  {sec.points?.length > 0 && (
                    <ul className="list-disc ml-6 space-y-2">
                      {sec.points.map((pt: string, i: number) => (
                        <li key={i} className="text-[#003333] text-justify">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Other Accordions */}
      {AccordienSection?.length > 0 && (
        <div className="space-y-3">
          {AccordienSection.map((acc: any, index: number) => (
            <div key={index}>
              <div
                className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-4 rounded-md"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-[#0e2455] font-medium text-xl">
                  {acc.title}
                </span>
                <Image
                  src={openAccordion === index ? UpArrow : DownArrow}
                  height={32}
                  width={32}
                  alt="arrow"
                />
              </div>
              {openAccordion === index && (
                <div className="px-6 py-4 bg-[#F6F6F6] mt-2 rounded-md">
                  <ul className="list-disc ml-6 space-y-2">
                    {acc.ListPoints?.map((point: string, idx: number) => (
                      <li key={idx} className="text-[#003333] text-justify">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

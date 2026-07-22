"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";

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
      <div className="rounded-md mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#003333]">
          {data.title}
        </h1>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {accordionSections.map((section: any, index: number) => (
          <div key={index} className=" rounded">
            <div
              className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-4"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-[#0e2455] font-semibold text-xl">
                {section.title}
              </span>
              <Image
                src={openSection === index ? UpArrow : DownArrow}
                height={32}
                width={32}
                alt="toggle-arrow"
              />
            </div>

            {openSection === index && (
              <div className="bg-[#F6F6F6] px-6 py-4 space-y-6">
                {/* If combined section with innerSections */}
                {section.innerSections ? (
                  section.innerSections.map((inner: any, i: number) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-[#003333] mb-1">
                        {inner.title}
                      </h3>
                      {inner.description && (
                        <p className="text-[#003333] mb-2 text-base">{inner.description}</p>
                      )}
                      {inner.list?.length > 0 && (
                        <ul className="list-disc ml-5 text-[#003333]">
                          {inner.list.map((item: string, j: number) => (
                            <li key={j} className="text-base">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {section.description && (
                      <p className="text-[#003333] text-base mb-2">{section.description}</p>
                    )}
                    {section.points?.length > 0 && (
                      <ul className="list-disc ml-5 text-[#003333]">
                        {section.points.map((item: string, i: number) => (
                          <li key={i} className="text-base">{item}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSections;

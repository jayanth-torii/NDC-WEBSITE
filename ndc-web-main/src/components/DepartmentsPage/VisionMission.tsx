"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function VisionMission({ data }: { data: any }) {
  const { title, AboutDescription, VisionMission, AccordienSection } = data;

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <Reveal as="section" className="bg-white mb-20">
      {/* Title */}
      <SectionHeading title={title} className="mb-6" />

      {/* About Section */}
      {AboutDescription?.length > 0 && (
        <div className="bg-surface-light p-6 sm:p-8 rounded-[18px] border border-card-border mb-3">
          {AboutDescription.map((desc: string, idx: number) => (
            <p
              key={idx}
              className="text-justify text-body-gray leading-relaxed mb-4 last:mb-0"
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
            className="flex justify-between bg-surface-light border border-card-border items-center cursor-pointer p-4 rounded-[14px] transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover"
            onClick={() => toggleAccordion(-1)}
          >
            <span className="text-navy font-medium text-xl">
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
            <div className="px-6 py-4 bg-surface-light border border-t-0 border-card-border mt-[-2px] rounded-b-[14px] space-y-6">
              {VisionMission.sections.map((sec: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-navy mb-1">
                    {sec.title}
                  </h3>
                  {sec.description && (
                    <p className="text-body-gray mb-2 text-justify">
                      {sec.description}
                    </p>
                  )}
                  {sec.points?.length > 0 && (
                    <ul className="list-disc ml-6 space-y-2">
                      {sec.points.map((pt: string, i: number) => (
                        <li key={i} className="text-body-gray text-justify">
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
                className="flex justify-between bg-surface-light border border-card-border items-center cursor-pointer p-4 rounded-[14px] transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-navy font-medium text-xl">
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
                <div className="px-6 py-4 bg-surface-light border border-t-0 border-card-border mt-[-2px] rounded-b-[14px]">
                  <ul className="list-disc ml-6 space-y-2">
                    {acc.ListPoints?.map((point: string, idx: number) => (
                      <li key={idx} className="text-body-gray text-justify">
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
    </Reveal>
  );
}

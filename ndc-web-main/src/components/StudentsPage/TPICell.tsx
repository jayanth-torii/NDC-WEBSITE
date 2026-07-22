"use client";
import React, { useState } from "react";
import Image from "next/image";

import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";

const TrainingPlacementAndInternshipCell = ({data}:any) => {
 
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const getMergedSections = () => {
    if (!data?.sections) return [];

    const vision = data.sections.find((s: any) => s.title === "Our Vision");
    const mission = data.sections.find((s: any) => s.title === "Our Mission");

    const combined = {
      title: "Our Vision & Mission",
      subSections: [
        {
          title: vision?.title || "Our Vision",
          description: vision?.description || "",
          list: vision?.list || [],
        },
        {
          title: mission?.title || "Our Mission",
          description: mission?.description || "",
          list: mission?.list || [],
        },
      ],
    };

    const rest = data.sections.filter(
      (s: any) => s.title !== "Our Vision" && s.title !== "Our Mission"
    );

    return [combined, ...rest];
  };

  const mergedSections = getMergedSections();

  return (
    <div className="bg-white mb-20 md:px-6">
      {/* Title & Description */}
      <div className="rounded-md mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#003333]">{data.title}</h1>
        <p className="text-justify text-[#0E2455] leading-relaxed">{data.description}</p>
      </div>

      {/* Images */}
      <div className="flex flex-col md:flex-row w-full gap-x-5 py-5 flex-wrap">
        {data.images?.map((src: string, index: number) => (
          <div key={index} className="w-full md:w-1/3 h-60">
            <img src={src} alt={`placement-${index}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {mergedSections.map((section: any, index: number) => (
          <div key={index}>
            <div
              className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-3"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-[#0e2455] pl-3 font-medium text-xl">{section.title}</span>
              <Image
                src={openSection === index ? UpArrow : DownArrow}
                height={35}
                width={35}
                alt="arrow"
              />
            </div>

            {openSection === index && (
              <div className="px-8 py-3 bg-[#F6F6F6] mt-3">
                {section.subSections ? (
                  section.subSections.map((sub: any, i: number) => (
                    <div key={i} className="mb-4">
                      <h3 className="text-xl font-semibold text-[#0E2455]">{sub.title}</h3>
                      {sub.description && <p className="text-[#003333] mt-1">{sub.description}</p>}
                      {sub.list && sub.list.length > 0 && (
                        <ul className="list-disc ml-6 text-[#003333] mt-2">
                          {sub.list.map((li: string, j: number) => (
                            <li className="text-justify" key={j}>{li}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {section.description && <p className="text-[#003333]">{section.description}</p>}
                    {section.list && section.list.length > 0 && (
                      <ul className="list-disc ml-6 text-[#003333] mt-2">
                        {section.list.map((li: string, j: number) => (
                          <li className="text-justify" key={j}>{li}</li>
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

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full border border-gray-300">
          <thead className="md:text-lg">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Sl.No</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Facilities</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.facilitiesTable?.map((row: any, idx: number) => (
              <tr key={idx} className="text-center border border-gray-300">
                <td className="py-2 px-4 border border-gray-300">{idx + 1}</td>
                <td className="py-2 px-4 border text-start border-gray-300">{row.name}</td>
                <td className="py-2 px-4 border text-start border-gray-300">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingPlacementAndInternshipCell;

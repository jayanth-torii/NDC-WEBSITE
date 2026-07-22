"use client";
import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";
 

const RedressalCell = ({redressalData}:any) => {

  const [openSection, setOpenSection] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Merge Vision and Mission
  const mergedSections = () => {
    if (!redressalData?.sections) return [];

    const vision = redressalData.sections.find((s: any) => s.title === "Our Vision");
    const mission = redressalData.sections.find((s: any) => s.title === "Our Mission");

    const combinedSection = {
      title: "Our Vision & Mission",
      innerSections: [
        {
          title: vision?.title || "",
          description: vision?.description || "",
          list: Array.isArray(vision?.list) ? vision.list : [],
        },
        {
          title: mission?.title || "",
          description: mission?.description || "",
          list: Array.isArray(mission?.list) ? mission.list : [],
        },
      ],
    };

    // Filter out vision/mission from original list
    const rest = redressalData.sections.filter(
      (s: any) => s.title !== "Our Vision" && s.title !== "Our Mission"
    );

    return [combinedSection, ...rest];
  };


  return (
    <div className="bg-white mb-20 md:mb-20 md:px-6">
      {/* Title & Description */}
      <div className="rounded-md mb-3">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">
          {redressalData.title}
        </h1>
        <p className="text-justify text-[#0E2455] leading-relaxed mb-4">
          {redressalData.description}
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {mergedSections().map((section: any, index: number) => (
          <div key={index}>
            <div
              className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-3"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-[#0e2455] pl-3 font-medium text-xl">
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
                {section.innerSections ? (
                  section.innerSections.map((inner: any, i: number) => (
                    <div key={i} className="mb-6">
                      <h3 className="text-xl font-semibold text-[#003333] mb-2">{inner.title}</h3>
                      {inner.description && (
                        <p className="text-[#003333] text-justify mb-2">{inner.description}</p>
                      )}
                      {inner.list.length > 0 && (
                        <ul className="list-disc text-[#003333] ml-5">
                          {inner.list.map((item: string, j: number) => (
                            <li key={j} className="text-justify">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {section.description && (
                      <p className="text-[#003333] text-justify mb-3">{section.description}</p>
                    )}
                    {section.list?.length > 0 && (
                      <ul className="list-disc text-[#003333] ml-5">
                        {section.list.map((item: string, i: number) => (
                          <li key={i} className="text-justify">{item}</li>
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

      {/* Procedure Section */}
      {redressalData.ProcedureSection && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">{redressalData.ProcedureSection.title}</h2>
          <ul className="list-disc text-[#0E2455] pl-6">
            {redressalData.ProcedureSection.procedurepoints.map((point: string, i: number) => (
              <li key={i} className="text-justify mb-1">{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Committee Members</h2>
        <table className="w-full border border-gray-300">
          <thead className="md:text-lg">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Sl.No</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Name & Designation</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Designation in Committee</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Email & Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {redressalData.TableSection.map((row: any, index: number) => (
              <tr key={index} className="text-center border border-gray-300">
                <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border text-start border-gray-300">
                  <strong>{row.name}</strong><br />{row.designation}
                </td>
                <td className="py-2 px-4 border text-start border-gray-300">{row.role}</td>
                <td className="py-2 px-4 border text-start border-gray-300">
                  {row.Email}<br />{row.contactNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RedressalCell;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "../../../public/images/Chevron.svg";
import UpArrow from "../../../public/images/Chevron2.svg";

export default function OurVisionMission({ data }: { data: any }) {
  const sections = data?.dropdowns || [];

  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="sm:text-justify bg-white mb-20 md:mb-20">
      <div className="space-y-3">
        {sections.map((section: any, index: number) => (
          <div key={index}>
            {/* Header */}
            <div
              className="flex justify-between bg-[#F6F6F6] items-center cursor-pointer p-3"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-[#0e2455] pl-3 font-medium text-xl">
                {section?.title}
              </span>
              <Image
                src={openSection === index ? UpArrow : DownArrow}
                height={35}
                width={35}
                alt="toggle"
              />
            </div>

            {/* Body */}
            {openSection === index && (
              <div className="px-8 py-3 bg-[#F6F6F6] mt-3 pb-10">
                {section?.content?.map((item: any, i: number) =>
                  item.type === "text" ? (
                    <p
                      key={i}
                      className={`text-justify ${
                        item.bold === "true"
                          ? "font-semibold mb-1 text-[#0E2455] mt-5 text-lg"
                          : "text-[#003333]"
                      }`}
                    >
                      {item.text}
                    </p>
                  ) : (
                    <ul key={i} className="list-disc ml-6">
                      {item.items.map((listItem: string, j: number) => (
                        <li
                          key={j}
                          className="text-justify text-[#003333]"
                        >
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

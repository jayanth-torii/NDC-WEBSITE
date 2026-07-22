"use client";

import React from "react";

export default function EventsRules({ data }: { data: any }) {
  const { title, events, rulesRegulations } = data;

  return (
    <div className="bg-[#F6F6F6] mb-20">
      {/* Title Section */}
      <div className="p-6 sm:p-8 rounded-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">
          {title}
        </h1>

        {/* Events */}
        {events?.map((paragraph: string, index: number) => (
          <p
            key={index}
            className="text-justify text-[#003333] leading-relaxed mb-2"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Rules & Regulations */}
      <div className="p-6 sm:p-8">
        <h2 className="text-[#003333] font-medium text-xl mb-4">
          {rulesRegulations?.title}
        </h2>
        <ul className="list-disc ml-6 bg-[#F6F6F6] rounded-md space-y-2">
          {rulesRegulations?.sections?.map((rule: string, index: number) => (
            <li key={index} className="text-justify text-[#003333]">
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

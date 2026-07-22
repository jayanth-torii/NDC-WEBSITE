"use client";

import React from "react";

export default function EventsRules({ data }: { data: any }) {
  const { title, events, rulesRegulations } = data;

  return (
    <div className="mb-20 rounded-[18px] border border-card-border bg-white shadow-[var(--shadow-card)]">
      {/* Title Section */}
      <div className="p-6 sm:p-8">
        <h1 className="mb-6 text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-3xl">
          {title}
        </h1>

        {/* Events */}
        {events?.map((paragraph: string, index: number) => (
          <p
            key={index}
            className="mb-2 text-justify leading-relaxed text-body-gray"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Rules & Regulations */}
      <div className="border-t border-card-border bg-surface-light p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold text-navy">
          {rulesRegulations?.title}
        </h2>
        <ul className="ml-6 list-disc space-y-2 marker:text-orange">
          {rulesRegulations?.sections?.map((rule: string, index: number) => (
            <li key={index} className="text-justify text-body-gray">
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

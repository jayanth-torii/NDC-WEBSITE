"use client";

import React, { useState } from "react";
import { ChevronDown, Eye, Target, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function VisionMission({ data }: { data: any }) {
  if (!data) return null;
  const { title, AboutDescription, VisionMission, AccordienSection } = data;

  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const getIconForSection = (sectionTitle: string) => {
    const t = sectionTitle.toLowerCase();
    if (t.includes("vision")) return <Eye className="text-orange" size={22} />;
    if (t.includes("mission")) return <Target className="text-orange" size={22} />;
    return <BookOpen className="text-orange" size={22} />;
  };

  return (
    <Reveal as="section" className="relative border-b border-navy/10 bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <header className="mb-12 lg:mb-16 max-w-3xl">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Language Department
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-navy tracking-[-0.03em] leading-tight text-balance">
            {title}
          </h2>
        </header>

        {AboutDescription?.length > 0 && (
          <div className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-1">
              <div className="hidden lg:block w-px h-full min-h-[80px] bg-gradient-to-b from-orange via-orange/40 to-transparent mx-auto" />
            </div>
            <div className="lg:col-span-10 space-y-5 border-l-2 border-orange/40 pl-6 lg:border-l-0 lg:pl-0">
              {AboutDescription.map((desc: string, idx: number) => (
                <p
                  key={idx}
                  className="text-body-gray leading-relaxed text-lg max-w-prose"
                >
                  {desc}
                </p>
              ))}
            </div>
          </div>
        )}

        {VisionMission?.sections?.length > 0 && (
          <div className="mb-14 lg:mb-20">
            <div className="flex items-baseline gap-4 mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-navy tracking-tight">
                {VisionMission.title ?? "Our Vision & Mission"}
              </h3>
              <div className="h-px flex-1 bg-navy/10 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 border border-navy/10">
              {VisionMission.sections.map((sec: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-8 md:p-10 ${
                    idx === 0
                      ? "border-b md:border-b-0 md:border-r border-navy/10 bg-surface-light/60"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 flex items-center justify-center bg-orange/10">
                      {getIconForSection(sec.title)}
                    </div>
                    <h4 className="text-xl md:text-2xl font-extrabold text-navy tracking-tight">
                      {sec.title}
                    </h4>
                  </div>

                  {sec.description && (
                    <p className="text-body-gray mb-6 leading-relaxed">
                      {sec.description}
                    </p>
                  )}

                  {sec.points?.length > 0 && (
                    <ul className="space-y-3">
                      {sec.points.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-orange" />
                          <span className="text-body-gray leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {AccordienSection?.length > 0 && (
          <div className="max-w-4xl">
            {AccordienSection.map((acc: any, index: number) => {
              const open = openAccordion === index;
              return (
                <div
                  key={index}
                  className="border-b border-navy/15 first:border-t"
                >
                  <button
                    type="button"
                    className="w-full flex justify-between items-center py-6 text-left gap-4 group"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={open}
                  >
                    <span
                      className={`font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
                        open ? "text-orange" : "text-navy group-hover:text-orange"
                      }`}
                    >
                      <span className="text-orange/70 text-sm font-bold tracking-[0.16em] mr-3 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {acc.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-navy/40 transition-transform duration-400 ease-[var(--ease-editorial)] ${
                        open ? "rotate-180 text-orange" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[var(--ease-editorial)] ${
                      open
                        ? "grid-rows-[1fr] opacity-100 pb-8"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-4 pl-0 sm:pl-12">
                        {acc.ListPoints?.map((point: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-body-gray leading-relaxed"
                          >
                            <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-orange" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Reveal>
  );
}

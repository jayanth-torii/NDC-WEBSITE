"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function VisionMission({ data }: { data: any }) {
  if (!data) return null;
  const { title, AboutDescription, VisionMission, AccordienSection } = data;

  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [visionOpen, setVisionOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <Reveal as="section" className="relative border-b border-navy/10 bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <header className="mb-6">
          <p className="text-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            Language Department
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.02em] leading-tight text-balance">
            {title}
          </h2>
        </header>

        {/* Wrap everything in Accordions as requested ("keep in dropdown only") */}
        <div className="w-full space-y-3">
          
          {/* Vision & Mission Accordion */}
          {VisionMission?.sections?.length > 0 && (
            <div className={`bg-white border rounded-xl transition-all duration-300 overflow-hidden ${
              visionOpen ? "border-navy shadow-md" : "border-gray-200 shadow-sm hover:border-navy/30"
            }`}>
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-4 md:px-6 md:py-5 text-left gap-4 group bg-white relative z-20"
                onClick={() => setVisionOpen(!visionOpen)}
                aria-expanded={visionOpen}
              >
                <span className={`font-bold text-[15px] md:text-lg tracking-tight transition-colors duration-300 ${
                  visionOpen ? "text-navy" : "text-gray-700 group-hover:text-navy"
                }`}>
                  {VisionMission.title ?? "Our Vision & Mission"}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${
                    visionOpen ? "rotate-180 text-orange" : "text-gray-400 group-hover:text-navy"
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  visionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
                    <div className="bg-navy rounded-xl p-6 md:p-8 relative overflow-hidden shadow-inner">
                      
                      {/* Concentric Circles Background Graphic */}
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-1/3 opacity-20 pointer-events-none">
                        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border-[30px] md:border-[60px] border-white/40 flex items-center justify-center">
                          <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border-[30px] md:border-[60px] border-white/40 flex items-center justify-center">
                            <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full border-[30px] md:border-[60px] border-white/40 flex items-center justify-center">
                              <div className="w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full border-[10px] md:border-[20px] border-white/40" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
                        {VisionMission.sections.map((sec: any, idx: number) => (
                          <div key={idx} className="w-full">
                            <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                              {sec.title}
                            </h4>

                            {sec.description && (
                              <p className="text-white/90 text-sm md:text-base mb-3 leading-relaxed">
                                {sec.description}
                              </p>
                            )}

                            {sec.points?.length > 0 && (
                              <ul className="space-y-3">
                                {sec.points.map((pt: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2.5 md:gap-3 text-sm md:text-[15px]">
                                    <ChevronRight className="shrink-0 text-orange mt-0.5" size={18} strokeWidth={3} />
                                    <span className="text-white/90 leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Accordion Items */}
          {AccordienSection?.length > 0 && (
            <div className="w-full space-y-3">
              {AccordienSection.map((acc: any, index: number) => {
                const open = openAccordion === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      className="w-full flex justify-between items-center px-4 py-4 md:px-6 md:py-5 text-left gap-4 group"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={open}
                    >
                      <span
                        className={`font-bold text-[15px] md:text-lg tracking-tight transition-colors duration-300 ${
                          open ? "text-orange" : "text-gray-700 group-hover:text-navy"
                        }`}
                      >
                        <span className="text-orange/70 text-xs font-bold tracking-[0.1em] mr-2 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {acc.title}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-300 ${
                          open ? "rotate-180 text-orange" : "text-gray-400"
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 md:px-6 md:pb-6">
                          <ul className="space-y-2.5 pl-0 sm:pl-6 border-t border-gray-50 pt-4">
                            {acc.ListPoints?.map((point: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-[14px] md:text-[15px] text-body-gray leading-relaxed"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-orange/40 rounded-full" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

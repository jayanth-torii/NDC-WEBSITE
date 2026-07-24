"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function AboutIQAC({ data }: { data: any }) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="mb-10 md:mb-20">
      {/* Premium Editorial About Description */}
      {data?.AboutDescription?.length > 0 && (
        <Reveal>
          <div className="relative mb-12 md:mb-16 pt-10 md:pt-14 px-6 md:px-12 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.03)]">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
            
            {/* Large Watermark Letter */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black italic text-navy opacity-[0.02] pointer-events-none select-none z-0 leading-none">
              {data?.title?.charAt(0)}
            </div>

            <div className="relative z-10 max-w-4xl mx-auto pb-10 md:pb-14">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                
                {/* Title Section */}
                <div className="w-full">
                  <div className="flex justify-center md:justify-start mb-6 md:mb-8">
                    <div className="w-16 h-1.5 bg-gradient-to-r from-orange to-orange/60 rounded-full shadow-[0_0_15px_rgba(255,165,0,0.4)]"></div>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] bg-clip-text text-transparent bg-gradient-to-br from-navy to-navy/80 drop-shadow-sm">
                    {data?.title}
                  </h1>
                </div>

                {/* Description Section */}
                <div className="w-full space-y-5">
                  {data?.AboutDescription?.map((paragraph: string, index: number) => (
                    <p 
                      key={index} 
                      className={`text-justify md:text-left leading-relaxed text-[16px] md:text-[18px] ${index === 0 ? 'text-navy/90 font-medium text-[17px] md:text-[19px]' : 'text-body-gray'}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Vision & Mission Cards instead of Accordion */}
      {data?.VisionMission?.sections?.length > 0 && (
        <Reveal className="mb-10">
           <h2 className="text-2xl text-navy font-bold mb-6">{data?.VisionMission?.title || "Our Vision & Mission"}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {data?.VisionMission?.sections?.map((section: any, idx: number) => (
               <div className="bg-white p-6 md:p-8 rounded-[20px] border border-card-border shadow-[var(--shadow-card)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-orange/30" key={idx}>
                 <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300 pointer-events-none text-navy text-8xl font-black italic">
                   {section.title.replace(/Our\s+/i, '').charAt(0)}
                 </div>
                 <h3 className="text-navy mb-4 font-bold text-2xl relative z-10 flex items-center gap-3">
                   <span className="w-2 h-8 bg-orange rounded-full inline-block"></span>
                   {section?.title}
                 </h3>
                 {section?.description && (
                   <p className="text-body-gray mb-4 leading-relaxed relative z-10">{section?.description}</p>
                 )}
                 {section?.points?.length > 0 && (
                   <ul className="list-disc ml-6 text-body-gray space-y-2 marker:text-orange relative z-10">
                     {section?.points?.map((pt: string, i: number) => (
                       <li key={i}>{pt}</li>
                     ))}
                   </ul>
                 )}
               </div>
             ))}
           </div>
        </Reveal>
      )}

      {/* Accordion Sections (Objectives, Functions, etc.) */}
      {data?.AccordienSection?.length > 0 && (
        <RevealGroup className="space-y-4">
          {data?.AccordienSection?.map((section: any, index: number) => {
            const accordionIndex = index + 1;
            const isOpen = openSections?.includes(accordionIndex);
            const shouldBeStatic = section.title?.toLowerCase().includes("function") || section.title?.toLowerCase().includes("objective");

            if (shouldBeStatic) {
              return (
                <RevealItem key={section.title || accordionIndex}>
                  <div className="mb-6 mt-8">
                    <h3 className="text-navy mb-4 font-bold text-2xl relative z-10 flex items-center gap-3">
                      <span className="w-2 h-8 bg-orange rounded-full inline-block"></span>
                      {section.title}
                    </h3>
                    <div className="p-6 md:p-8 bg-white rounded-[20px] border border-card-border shadow-[var(--shadow-card)]">
                      <ul className="list-none space-y-3">
                        {section.ListPoints?.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-justify text-body-gray leading-relaxed text-[15px] md:text-[16px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealItem>
              );
            }

            return (
              <RevealItem key={section.title || accordionIndex}>
                <div className="rounded-[16px] border border-card-border overflow-hidden transition-all duration-300 ease-[var(--ease-editorial)] hover:border-orange/40 hover:shadow-sm bg-white">
                  <button
                    type="button"
                    className="w-full flex justify-between items-center gap-4 bg-surface-light cursor-pointer p-5 md:p-6 text-left transition-colors hover:bg-surface-tint"
                    onClick={() => toggleAccordion(accordionIndex)}
                  >
                    <span className="text-navy font-bold text-lg md:text-xl flex items-center gap-3">
                      {isOpen ? (
                        <span className="w-1.5 h-6 bg-orange rounded-full inline-block transition-all"></span>
                      ) : (
                        <span className="w-1.5 h-1 bg-navy/20 rounded-full inline-block transition-all"></span>
                      )}
                      {section.title || `Section ${accordionIndex}`}
                    </span>
                    <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-orange/10' : 'bg-transparent'}`}>
                      {isOpen ? (
                        <ChevronUp className="text-orange shrink-0 transition-transform" size={20} />
                      ) : (
                        <ChevronDown className="text-body-gray shrink-0 transition-transform" size={20} />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="p-5 md:p-8 bg-white border-t border-card-border animate-in fade-in slide-in-from-top-2 duration-300">
                      <ul className="list-none space-y-3">
                        {section.ListPoints?.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-justify text-body-gray leading-relaxed text-[15px] md:text-[16px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Target, Shield, PhoneCall, Users, Scale, GraduationCap, HeartHandshake, ShieldCheck, Settings, ClipboardEdit, Lightbulb } from "lucide-react";
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
      {/* New About Description Layout */}
      {data?.AboutDescription?.length > 0 && (
        <Reveal>
          <div className="relative mb-12 md:mb-16 pt-10 md:pt-14 px-6 md:px-12 pb-24 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#FFF5ED] via-white to-[#F0F4FA] border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.03)]">
            
            {/* Background pattern dots & Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#F6872A]/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-[#1a3668]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
            
            <div className="absolute top-12 right-1/2 w-16 h-16 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(#F6872A 2px, transparent 2px)', backgroundSize: '12px 12px' }}></div>
            <div className="absolute bottom-32 right-12 w-24 h-24 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(#1a3668 2px, transparent 2px)', backgroundSize: '12px 12px' }}></div>
            
            {/* Floating decorative rings */}
            <div className="absolute top-[20%] left-[5%] w-8 h-8 rounded-full border-[3px] border-[#F6872A]/10 pointer-events-none z-0"></div>
            <div className="absolute top-[40%] right-[30%] w-4 h-4 rounded-full bg-[#1a3668]/5 pointer-events-none z-0"></div>
            
            <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-10">
              
              {/* Left Content Area */}
              <div className="flex-1 space-y-6">
                
                {/* Eyebrow & Shield Icon */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full border border-[#F6872A]/30 flex items-center justify-center bg-white shadow-sm shrink-0">
                    <Shield className="text-[#F6872A]" size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[11px] font-bold tracking-[0.2em] text-[#F6872A]">PREVENT • RESPECT • SUPPORT</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-[#1a3668]">
                  {data?.title?.split(' ').slice(0, -1).join(' ')} <span className="text-[#F6872A]">{data?.title?.split(' ').slice(-1)}</span>
                </h1>

                {/* Description Paragraphs */}
                <div className="w-full space-y-6 mt-6">
                  {data?.AboutDescription?.map((paragraph: string, index: number) => {
                    // Contact Box Logic
                    if (paragraph.startsWith("Contact")) {
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 md:p-5 rounded-[16px] border border-[#F6872A]/30 bg-white shadow-sm my-6 max-w-fit">
                          <div className="w-10 h-10 rounded-full border border-[#F6872A]/30 flex items-center justify-center shrink-0">
                            <PhoneCall size={18} className="text-[#F6872A]" />
                          </div>
                          <p className="text-[14px] md:text-[15px] font-bold text-[#1a3668]">
                            {paragraph}
                          </p>
                        </div>
                      );
                    }

                    // Second paragraph with side icon
                    if (index === 2) {
                       return (
                         <div key={index} className="flex gap-6 mt-6">
                           <div className="w-14 h-14 rounded-full border border-[#1a3668]/30 flex items-center justify-center bg-white shadow-sm shrink-0 mt-1">
                             <Users className="text-[#1a3668]" size={24} />
                           </div>
                           <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700 font-medium pt-1">
                             {paragraph}
                           </p>
                         </div>
                       );
                    }

                    return (
                      <p 
                        key={index} 
                        className="text-[14px] md:text-[15px] leading-relaxed text-[#1a3668] font-medium"
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Right Illustration Area */}
              <div className="lg:w-[400px] shrink-0 relative flex justify-center items-center h-[350px]">
                {/* Giant faint watermark */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-black italic text-[#1a3668] opacity-[0.03] pointer-events-none select-none z-0 leading-none">
                  {data?.title?.charAt(0)}
                </div>
                
                {/* 3D Graphic */}
                <img 
                  src={`/images/decor/about_${data?.title?.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.png`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/placeholders/certificate.jpg";
                  }}
                  alt="Illustration" 
                  className="relative z-10 w-full max-w-[320px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Bottom Feature Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] bg-white rounded-[24px] shadow-lg border border-gray-100 flex flex-wrap md:flex-nowrap justify-between items-center px-4 py-4 md:py-2">
               <div className="flex items-center gap-3 w-1/2 md:w-auto p-2">
                 <div className="w-10 h-10 rounded-full bg-[#1a3668] flex items-center justify-center text-white shrink-0"><Scale size={18} /></div>
                 <span className="text-[12px] font-black text-[#F6872A] leading-tight">ZERO<br/><span className="text-gray-500">TOLERANCE</span></span>
               </div>
               <div className="hidden md:block w-[1px] h-10 bg-gray-100"></div>
               <div className="flex items-center gap-3 w-1/2 md:w-auto p-2">
                 <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#F6872A] shrink-0"><GraduationCap size={20} /></div>
                 <span className="text-[12px] font-black text-[#F6872A] leading-tight">SAFE<br/><span className="text-gray-500">CAMPUS</span></span>
               </div>
               <div className="hidden md:block w-[1px] h-10 bg-gray-100"></div>
               <div className="flex items-center gap-3 w-1/2 md:w-auto p-2">
                 <div className="w-10 h-10 rounded-full bg-[#1a3668] flex items-center justify-center text-white shrink-0"><HeartHandshake size={18} /></div>
                 <span className="text-[12px] font-black text-[#1a3668] leading-tight">RESPECT<br/><span className="text-[#F6872A]">EVERYONE</span></span>
               </div>
               <div className="hidden md:block w-[1px] h-10 bg-gray-100"></div>
               <div className="flex items-center gap-3 w-1/2 md:w-auto p-2">
                 <div className="w-10 h-10 rounded-full border border-[#F6872A]/30 flex items-center justify-center text-[#F6872A] shrink-0"><ShieldCheck size={20} /></div>
                 <span className="text-[12px] font-black text-[#1a3668] leading-tight">SECURE<br/><span className="text-[#F6872A]">TOMORROW</span></span>
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
            const isObjectives = section.title?.toLowerCase() === "objectives";
            const isFunctions = section.title?.toLowerCase() === "functions";
            const shouldBeStatic = (section.title?.toLowerCase().includes("function") && !isFunctions) || isObjectives;

            if (isFunctions) {
              return (
                <RevealItem key={section.title || accordionIndex}>
                  <div className="mb-10 mt-12 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 relative overflow-hidden">
                    {/* Background faint dots */}
                    <div className="absolute top-4 right-4 w-24 h-24 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#F6872A 2px, transparent 2px)', backgroundSize: '12px 12px' }}></div>
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                         <Settings className="text-[#F6872A]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-extrabold text-[#1a3668]">{section.title}</h3>
                        <div className="w-16 h-1 bg-[#F6872A] mt-2 rounded-full"></div>
                      </div>
                    </div>

                    {/* 3 Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                       {/* Column 1 */}
                       <div className="flex flex-col sm:flex-row gap-4 md:pr-8 md:border-r border-gray-100/70">
                         <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                           <ClipboardEdit className="text-[#F6872A]" size={24} />
                         </div>
                         <div>
                           <h4 className="text-[15px] font-bold text-[#1a3668] mb-2 leading-tight">Redressal of Students’ Grievances</h4>
                           <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                             To solve their academic and administrative problems.
                           </p>
                         </div>
                       </div>

                       {/* Column 2 */}
                       <div className="flex flex-col sm:flex-row gap-4 md:pr-8 md:border-r border-gray-100/70">
                         <div className="w-12 h-12 rounded-full bg-blue-100/50 flex items-center justify-center shrink-0">
                           <Users className="text-[#1a3668]" size={24} />
                         </div>
                         <div>
                           <h4 className="text-[15px] font-bold text-[#1a3668] mb-2 leading-tight">Co-ordination</h4>
                           <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                             To co-ordinate between students and Departments / Sections to redress the grievances.
                           </p>
                         </div>
                       </div>

                       {/* Column 3 */}
                       <div className="flex flex-col sm:flex-row gap-4">
                         <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                           <Lightbulb className="text-[#F6872A]" size={24} />
                         </div>
                         <div>
                           <h4 className="text-[15px] font-bold text-[#1a3668] mb-2 leading-tight">Guidance</h4>
                           <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                             To guide ways and means to the students to redress their problems.
                           </p>
                         </div>
                       </div>
                    </div>
                    {/* Bottom orange curve */}
                    <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#F6872A] rounded-full pointer-events-none z-0"></div>
                  </div>
                </RevealItem>
              );
            }

            if (isObjectives) {
              return (
                <RevealItem key={section.title || accordionIndex}>
                  <div className="mb-10 mt-12 relative">
                    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex relative min-h-[220px]">
                      {/* Left Flap & Icon */}
                      <div className="w-[80px] md:w-[100px] relative rounded-l-[24px] flex-shrink-0 flex justify-center pt-8 z-10">
                         {/* Thick curved orange flap */}
                         <div className="absolute left-0 top-[10%] bottom-[10%] w-6 md:w-8 bg-[#F6872A] rounded-r-3xl rounded-l-[24px]"></div>
                         {/* Target Icon Circle */}
                         <div className="relative z-10 w-16 h-16 bg-white rounded-full shadow-[0_4px_15px_rgba(246,135,42,0.2)] flex items-center justify-center border-[6px] border-white -ml-4 md:ml-0">
                           <div className="w-full h-full bg-[#F6872A] rounded-full flex items-center justify-center text-white">
                             <Target size={24} />
                           </div>
                         </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="flex-1 py-8 pr-6 md:pr-10">
                         {/* Title */}
                         <div className="mb-10">
                           <h3 className="text-2xl font-extrabold text-[#1a3668]">{section.title}</h3>
                           <div className="w-12 h-1 bg-[#F6872A] mt-2 rounded-full"></div>
                         </div>
                         
                         {/* Horizontal List Grid */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                           {section.ListPoints?.map((item: string, j: number) => (
                             <div key={j} className={`flex flex-col relative ${j !== 0 && j % 2 !== 0 ? 'sm:pl-6 sm:border-l border-gray-100/70' : ''} ${j > 1 ? 'lg:pl-6 lg:border-l border-gray-100/70' : ''}`}>
                               <div className="w-8 h-8 rounded-full bg-[#F6872A] text-white flex items-center justify-center text-xs font-bold mb-4 shadow-sm">
                                 {(j + 1).toString().padStart(2, '0')}
                               </div>
                               <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed font-medium">
                                 {item}
                               </p>
                             </div>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            }

            if (shouldBeStatic) {
              return (
                <RevealItem key={section.title || accordionIndex}>
                  <div className="mb-6 mt-8">
                    <h3 className="text-[#1a3668] mb-4 font-bold text-2xl relative z-10 flex items-center gap-3">
                      <span className="w-2 h-8 bg-[#F6872A] rounded-full inline-block"></span>
                      {section.title}
                    </h3>
                    <div className="p-6 md:p-8 bg-white rounded-[20px] border border-card-border shadow-[var(--shadow-card)]">
                      <ul className="list-none space-y-3">
                        {section.ListPoints?.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-justify text-body-gray leading-relaxed text-[15px] md:text-[16px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F6872A] mt-2 flex-shrink-0"></span>
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

"use client";

import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

export default function VisionMission({ data }: { data: any }) {
  if (!data) return null;
  const { title, AboutDescription, VisionMission, AccordienSection } = data;

  return (
    <Reveal as="section" className="relative bg-[#f8f9fa] border-b border-navy/5">
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          
          {/* Sticky Left Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              <p className="text-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                Language Department
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight leading-tight">
                {title}
              </h2>
            </motion.div>
          </div>

          {/* Right Content Stream */}
          <div className="flex-1 space-y-4 md:space-y-5">
            
            {/* Vision & Mission Sections */}
            {VisionMission?.sections?.map((sec: any, idx: number) => {
              const isVision = sec.title?.toLowerCase().includes("vision");
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="px-3 py-1.5 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <span className="text-orange font-black text-lg tabular-nums leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-navy tracking-tight">
                      {sec.title}
                    </h3>
                  </div>
                  
                  {sec.description && (
                    <p className="text-[#5f6368] text-[14px] md:text-[15px] leading-relaxed font-medium">
                      {sec.description}
                    </p>
                  )}
                  
                  {sec.points?.length > 0 && (
                    <ul className="space-y-3 mt-4">
                      {sec.points.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#5f6368] leading-relaxed">
                          <span className="text-orange shrink-0 mt-0.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}

            {/* Other Accordion Sections (Aim & Milestones) */}
            {AccordienSection?.map((acc: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="px-3 py-1.5 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                    <span className="text-navy font-black text-lg tabular-nums leading-none">
                      {String((VisionMission?.sections?.length || 0) + index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy tracking-tight">
                    {acc.title}
                  </h3>
                </div>

                {acc.ListPoints?.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {acc.ListPoints.map((point: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[13px] md:text-[14px] text-[#5f6368] leading-relaxed font-medium"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-orange/60 rounded-full" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
            
          </div>
        </div>
      </div>
    </Reveal>
  );
}

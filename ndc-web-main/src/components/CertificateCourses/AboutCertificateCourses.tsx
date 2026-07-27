"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AboutCertificateCourses({ data }: { data: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return null;
  const { title, AboutDescription, VisionMission, AccordienSection } = data;

  const vision = VisionMission?.sections?.find((s: any) => s.title?.toLowerCase().includes("vision"));
  const mission = VisionMission?.sections?.find((s: any) => s.title?.toLowerCase().includes("mission"));
  
  const objectives = AccordienSection?.[0]; // Usually Objective
  const vap = AccordienSection?.[1]; // Usually How VAP supports

  // Only show first paragraph if not expanded
  const displayedDescription = isExpanded ? AboutDescription : [AboutDescription?.[0]];

  return (
    <Reveal as="section" className="mb-10 max-w-7xl mx-auto px-4 lg:px-8">
      
      {/* 1. Value Added Program Description Block */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="relative z-10 max-w-full text-left">
          <p className="text-orange text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-1">
            Program Overview
          </p>
          <h2 className="text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-extrabold text-navy tracking-tight leading-tight mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h2>
          
          <div className="space-y-4 text-[#5f6368] text-[14px] md:text-[15px] leading-relaxed text-justify mb-4">
            {displayedDescription?.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {AboutDescription?.length > 1 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-orange font-bold text-sm hover:text-navy transition-colors duration-300"
            >
              <span>{isExpanded ? "Read Less" : "Read More"}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </motion.div>

      {/* 2. Vision and Mission (Side by Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {vision && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-[1.5rem] px-8 py-6 md:px-10 md:py-8 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none text-navy text-[8rem] font-black italic leading-none group-hover:scale-110 transition-transform duration-500">
              V
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-extrabold text-navy mb-2">
                {vision.title}
              </h3>
              <p className="text-[#5f6368] text-[14px] md:text-[15px] leading-relaxed font-medium text-justify">
                {vision.description}
              </p>
            </div>
          </motion.div>
        )}

        {mission && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-100 rounded-[1.5rem] px-8 py-6 md:px-10 md:py-8 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none text-navy text-[8rem] font-black italic leading-none group-hover:scale-110 transition-transform duration-500">
              M
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-extrabold text-navy mb-2">
                {mission.title}
              </h3>
              <p className="text-[#5f6368] text-[14px] md:text-[15px] leading-relaxed font-medium text-justify">
                {mission.description}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. Objective */}
      {objectives && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#f8f9fa] border border-navy/5 rounded-[1.5rem] px-8 py-6 md:px-12 md:py-8 shadow-sm mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
              <span className="text-orange font-black text-lg tabular-nums leading-none">03</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-navy">
              {objectives.title}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {objectives.ListPoints?.map((point: string, idx: number) => (
              <div key={idx} className="flex gap-3">
                <span className="text-orange mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-[#5f6368] text-[14px] leading-relaxed text-justify font-medium">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 4. How VAP Supports */}
      {vap && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-[1.5rem] px-8 py-6 md:px-12 md:py-8 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
              <span className="text-navy font-black text-lg tabular-nums leading-none">04</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-navy">
              {vap.title}
            </h3>
          </div>

          <div className="space-y-4">
            {vap.ListPoints?.map((point: string, idx: number) => (
              <div key={idx} className="flex gap-3 p-4 bg-[#f8f9fa] rounded-[1rem] hover:bg-orange/5 transition-colors duration-300">
                <span className="text-orange mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-[#5f6368] text-[14px] leading-relaxed text-justify font-medium">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </Reveal>
  );
}

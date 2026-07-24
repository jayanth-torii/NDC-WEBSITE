"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, Camera, Mic2, Palette, Theater } from "lucide-react";

export default function CulturalActivities({ data }: any) {
  if (!data) return null;

  return (
    <Reveal>
      <div className="relative mb-20 md:mb-24 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white border border-gray-100 flex flex-col lg:flex-row min-h-[480px]">
        
        {/* The solid orange background that peeks out to form the border */}
        <div className="absolute top-0 left-0 w-full lg:w-[48%] h-full bg-[#F6872A] hidden lg:block z-10" 
             style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)" }}></div>
        
        {/* The main navy background */}
        <div className="absolute top-0 left-0 w-full lg:w-[47.5%] h-full bg-[#1a3668] hidden lg:block z-20" 
             style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)" }}></div>

        {/* Left Content Container */}
        <div className="relative w-full lg:w-[45%] p-10 md:p-12 lg:p-16 flex flex-col justify-center z-30 bg-[#1a3668] lg:bg-transparent">
           
           {/* Faint mask background SVG at the bottom right */}
           <div className="absolute bottom-10 right-16 opacity-10 hidden lg:block text-white">
              <Theater size={120} />
           </div>
           
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F6872A] font-extrabold text-[12px] uppercase tracking-[0.15em] mb-6 w-fit backdrop-blur-md">
              <Sparkles size={14} />
              <span>Life at NDC</span>
           </div>
           
           <h2 className="text-[32px] md:text-[40px] font-extrabold mb-5 leading-[1.1] tracking-tight text-white">
              {data?.title || "Cultural Activities"}
           </h2>
           
           <p className="text-white/80 leading-[1.7] text-[15px] font-medium max-w-md relative z-10">
              {data?.description || "India is a country of Tradition and Culture. This tradition finds reflection in the cultural activities at NDC. The various opportunities to showcase the hidden talents lead the students to holistic development."}
           </p>
        </div>

        {/* Right Side - Flowchart */}
        <div className="relative w-full lg:w-[55%] bg-white p-8 md:p-10 flex items-center justify-center min-h-[400px] z-0 overflow-hidden">
           {/* Dot Grid */}
           <div className="absolute inset-0 opacity-[0.35]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dots-cult" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#F6872A" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots-cult)" />
              </svg>
           </div>

           {/* Flowchart Container */}
           <div className="relative w-full max-w-[460px] aspect-video flex items-center justify-center z-10 mt-8 mb-8">
              
              {/* Center Node */}
              <div className="absolute z-20 w-[130px] h-[70px] bg-[#F6872A] rounded-full border-[5px] border-white shadow-[0_0_0_2px_#F6872A] flex items-center justify-center text-white font-extrabold text-[14px] leading-tight text-center">
                 Cultural<br/>Activity
              </div>

              {/* Top Node */}
              <div className="absolute top-0 z-20 flex items-center gap-2.5 bg-[#1a3668] px-5 py-2.5 rounded-[12px] text-white font-bold text-[13px] shadow-lg border border-[#1a3668]/50">
                 <Mic2 size={16} className="text-[#F6872A]" /> Ballad
              </div>

              {/* Bottom Node */}
              <div className="absolute bottom-0 z-20 flex items-center gap-2.5 bg-[#1a3668] px-5 py-2.5 rounded-[12px] text-white font-bold text-[13px] shadow-lg border border-[#1a3668]/50">
                 <Palette size={16} className="text-[#F6872A]" /> Face Painting
              </div>

              {/* Left Node */}
              <div className="absolute left-0 z-20 flex items-center gap-2.5 bg-[#1a3668] px-5 py-2.5 rounded-[12px] text-white font-bold text-[13px] shadow-lg border border-[#1a3668]/50">
                 <Camera size={16} className="text-[#F6872A]" /> Photography
              </div>

              {/* Right Node */}
              <div className="absolute right-0 z-20 flex items-center gap-2.5 bg-[#1a3668] px-5 py-2.5 rounded-[12px] text-white font-bold text-[13px] shadow-lg border border-[#1a3668]/50">
                 <Theater size={16} className="text-[#F6872A]" /> Skit
              </div>

              {/* Connectors (Simple Arrows) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 460 258">
                 <defs>
                   <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                     <path d="M 0 0 L 8 4 L 0 8 Z" fill="#F6872A" />
                   </marker>
                   <marker id="arrowhead-rev" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
                     <path d="M 0 0 L 8 4 L 0 8 Z" fill="#F6872A" />
                   </marker>
                 </defs>
                 
                 {/* Top */}
                 <line x1="230" y1="105" x2="230" y2="45" stroke="#F6872A" strokeWidth="2.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" />
                 {/* Bottom */}
                 <line x1="230" y1="155" x2="230" y2="215" stroke="#F6872A" strokeWidth="2.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" />
                 {/* Left */}
                 <line x1="160" y1="129" x2="135" y2="129" stroke="#F6872A" strokeWidth="2.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" />
                 {/* Right */}
                 <line x1="300" y1="129" x2="335" y2="129" stroke="#F6872A" strokeWidth="2.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" />
              </svg>
           </div>

        </div>
      </div>
    </Reveal>
  );
}

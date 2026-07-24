"use client";

import React from "react";
import { Telescope, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const VisionMission = ({ data }: { data: any }) => {
  if (!data || !data.Sections) return null;

  const { title, Sections } = data;
  
  // Find vision and mission sections dynamically
  const vision = Sections.find((s: any) => s.title.toLowerCase().includes("vision"));
  const mission = Sections.find((s: any) => s.title.toLowerCase().includes("mission"));

  // Split title if it contains '&'
  const titleParts = title.split('&');

  return (
    <section className="relative py-24 bg-white overflow-hidden font-sans">
      
      {/* Background Decorative Far Left/Right Dots */}
      <div className="absolute left-8 top-[30%] opacity-40 hidden lg:block">
        <svg width="40" height="60" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-left" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#F6872A" />
          </pattern>
          <rect width="40" height="60" fill="url(#dots-left)" />
        </svg>
      </div>
      <div className="absolute right-8 top-[40%] opacity-40 hidden lg:block">
        <svg width="60" height="80" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-right" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#0047FF" />
          </pattern>
          <rect width="60" height="80" fill="url(#dots-right)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-[#F6872A] w-8" />
              <span className="text-[#F6872A] text-[13px] font-extrabold tracking-[0.2em] uppercase">Our Core</span>
              <div className="h-px bg-[#F6872A] w-8" />
            </div>
            
            <h2 className="text-[40px] md:text-[50px] font-extrabold tracking-tight">
              {titleParts.length > 1 ? (
                <>
                  <span className="text-[#1a3668]">{titleParts[0].trim()}</span>{" "}
                  <span className="text-[#F6872A]">& {titleParts[1].trim()}</span>
                </>
              ) : (
                <span className="text-[#1a3668]">{title}</span>
              )}
            </h2>
            <div className="w-12 h-[3px] bg-[#F6872A] mx-auto mt-6 rounded-full" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
          
          {/* Vision Card */}
          {vision && (
            <Reveal delay={0.1}>
              <div className="bg-white rounded-[32px] p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col md:flex-row gap-8 h-full border border-gray-100 group transition-all hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)]">
                
                {/* Sweeping Orange SVG */}
                <div className="absolute left-0 bottom-0 pointer-events-none z-0">
                  <svg width="180" height="180" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform origin-bottom-left group-hover:scale-105 transition-transform duration-500">
                    <path d="M0 160H120C120 93.7 66.3 40 0 40V160Z" fill="#F9A45E" opacity="0.9" />
                    <path d="M0 160H80C80 115.8 44.2 80 0 80V160Z" fill="#F6872A" />
                  </svg>
                  {/* Dot overlay */}
                  <div className="absolute left-6 bottom-6 opacity-20">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="dots-vision" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#1a3668" />
                      </pattern>
                      <rect width="40" height="40" fill="url(#dots-vision)" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 shrink-0">
                  <div className="w-[85px] h-[85px] bg-white rounded-full shadow-[0_8px_24px_rgba(246,135,42,0.15)] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-[#F6872A]/20 m-[-8px]" />
                    <Telescope size={36} className="text-[#F6872A]" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="relative z-10 flex flex-col">
                  <h3 className="text-[22px] font-extrabold text-[#1a3668] uppercase tracking-wide mb-3">
                    {vision.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#1a3668] mb-5 opacity-20" />
                  <div className="space-y-4">
                    {vision.Description?.map((desc: string, i: number) => (
                      <p key={i} className="text-gray-600 text-[15px] leading-relaxed font-medium">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            </Reveal>
          )}

          {/* Mission Card */}
          {mission && (
            <Reveal delay={0.2}>
              <div className="bg-white rounded-[32px] p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col md:flex-row gap-8 h-full border border-gray-100 group transition-all hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)]">
                
                {/* Sweeping Blue SVG */}
                <div className="absolute right-0 bottom-0 pointer-events-none z-0">
                  <svg width="180" height="180" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform origin-bottom-right group-hover:scale-105 transition-transform duration-500">
                    <path d="M160 160H40C40 93.7 93.7 40 160 40V160Z" fill="#3b82f6" opacity="0.6" />
                    <path d="M160 160H80C80 115.8 115.8 80 160 80V160Z" fill="#2563eb" />
                  </svg>
                  {/* Dot overlay */}
                  <div className="absolute right-6 bottom-6 opacity-20">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="dots-mission" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#1a3668" />
                      </pattern>
                      <rect width="40" height="40" fill="url(#dots-mission)" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 shrink-0">
                  <div className="w-[85px] h-[85px] bg-white rounded-full shadow-[0_8px_24px_rgba(37,99,235,0.15)] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-[#2563eb]/20 m-[-8px]" />
                    <Target size={36} className="text-[#2563eb]" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="relative z-10 flex flex-col">
                  <h3 className="text-[22px] font-extrabold text-[#1a3668] uppercase tracking-wide mb-3">
                    {mission.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#1a3668] mb-5 opacity-20" />
                  <div className="space-y-4">
                    {mission.Description?.map((desc: string, i: number) => (
                      <p key={i} className="text-gray-600 text-[15px] leading-relaxed font-medium">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            </Reveal>
          )}

        </div>
      </div>
    </section>
  );
};

export default VisionMission;

"use client";

import React from "react";
import { Check, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const Association = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, description } = data;

  // Split description into sentences for better layout
  const sentences = description.split('. ').filter(Boolean).map((s: string) => s + (s.endsWith('.') ? '' : '.'));
  const intro = sentences[0] || description;
  const objectives = sentences.slice(1);

  // Split title if it contains a space to colorize like screenshot
  const titleParts = title.split(' ');
  const firstTitleWord = titleParts[0];
  const restTitleWords = titleParts.slice(1).join(' ');

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden font-sans">
      
      {/* Background Decorative Shapes for Section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Orange Glowing Blob Top Left */}
        <div className="absolute top-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-orange-100/50 blur-[80px] md:blur-[120px]" />
        
        {/* Soft Navy Glowing Blob Bottom Right */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#1a3668]/5 blur-[100px] md:blur-[150px]" />
        
        {/* Decorative Light Dot Grid Top Right */}
        <div className="absolute top-20 right-10 opacity-60 hidden lg:block">
          <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <pattern id="section-dots-assn" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#e2e8f0" />
            </pattern>
            <rect width="120" height="120" fill="url(#section-dots-assn)" />
          </svg>
        </div>
        
        {/* Subtle Concentric Circles Left Side */}
        <div className="absolute left-0 top-[40%] opacity-[0.03] hidden md:block">
          <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="150" r="100" stroke="#1a3668" strokeWidth="2" />
            <circle cx="0" cy="150" r="150" stroke="#1a3668" strokeWidth="2" />
            <circle cx="0" cy="150" r="200" stroke="#1a3668" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Centered Header & Intro */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-[#F6872A] w-8" />
              <span className="text-[#F6872A] text-[13px] font-extrabold tracking-[0.2em] uppercase">About the Network</span>
              <div className="h-px bg-[#F6872A] w-8" />
            </div>
            
            <h2 className="text-[40px] md:text-[50px] font-extrabold tracking-tight mb-6">
              {titleParts.length > 1 ? (
                <>
                  <span className="text-[#1a3668]">{firstTitleWord}</span>{" "}
                  <span className="text-[#F6872A]">{restTitleWords}</span>
                </>
              ) : (
                <span className="text-[#1a3668]">{title}</span>
              )}
            </h2>
            <p className="text-gray-500 text-[15px] leading-[1.8] font-medium max-w-2xl mx-auto">
              {intro}
            </p>
          </div>
        </Reveal>

        {/* Full-width Objectives Card */}
        <Reveal delay={0.2}>
          <div className="w-full max-w-[1000px] mx-auto bg-[#0b1b3d] rounded-[32px] p-10 md:p-14 relative overflow-hidden shadow-2xl mt-4 border border-[#1a3668]">
            
            {/* Top Left Sweeping Curve */}
            <div className="absolute top-0 left-0 pointer-events-none">
              <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M0 0H240C240 99.4 159.4 180 60 180H0V0Z" fill="#142b5c" opacity="0.8"/>
                 <path d="M0 0H160C160 88.4 88.4 160 0 160V0Z" fill="#1a3668" opacity="0.6"/>
              </svg>
            </div>
            
            {/* Bottom Right Sweeping Curve */}
            <div className="absolute bottom-0 right-0 pointer-events-none">
              <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M280 200H0C0 89.5 89.5 0 200 0H280V200Z" fill="#F9A45E" opacity="0.9"/>
                 <path d="M280 200H80C80 111.6 111.6 80 200 80H280V200Z" fill="#F6872A"/>
              </svg>
            </div>
            
            {/* Dot Grids */}
            <div className="absolute top-8 right-12 opacity-10 hidden md:block">
              <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dots_obj" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" fill="white" />
                </pattern>
                <rect width="80" height="60" fill="url(#dots_obj)" />
              </svg>
            </div>
            <div className="absolute bottom-8 left-12 opacity-10 hidden md:block">
              <svg width="60" height="120" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dots_obj2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" fill="white" />
                </pattern>
                <rect width="60" height="120" fill="url(#dots_obj2)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Objectives Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-[2px] bg-[#F6872A]" />
                <div className="flex items-center gap-3">
                  <Users size={28} className="text-[#F6872A]" strokeWidth={2} />
                  <h3 className="text-[22px] font-extrabold text-white tracking-wide">Our Objectives</h3>
                </div>
                <div className="w-8 h-[2px] bg-[#F6872A]" />
              </div>

              {/* Objective Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[850px]">
                {objectives.length > 0 ? (
                  objectives.map((obj: string, i: number) => (
                    <div key={i} className="bg-[#12244a]/60 backdrop-blur-sm border border-white/10 rounded-[24px] p-8 flex flex-col sm:flex-row gap-5 hover:bg-[#1a3668]/80 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                      <div className="w-[44px] h-[44px] bg-[#F6872A] rounded-full flex items-center justify-center shrink-0 shadow-lg border-4 border-[#0b1b3d]">
                        <Check size={20} className="text-white" strokeWidth={3} />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white/90 text-[14px] leading-relaxed font-medium">
                          {obj}
                        </p>
                        <div className="w-6 h-[2px] bg-[#F6872A] mt-6 opacity-80" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#12244a]/60 backdrop-blur-sm border border-white/10 rounded-[24px] p-8 flex gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                    <div className="w-[44px] h-[44px] bg-[#F6872A] rounded-full flex items-center justify-center shrink-0 shadow-lg border-4 border-[#0b1b3d]">
                      <Check size={20} className="text-white" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white/90 text-[14px] leading-relaxed font-medium">
                        To help the present students carve their careers effectively.
                      </p>
                      <div className="w-6 h-[2px] bg-[#F6872A] mt-6 opacity-80" />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Association;

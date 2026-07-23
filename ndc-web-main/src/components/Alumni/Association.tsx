"use client";

import React from "react";
import { Check, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const Association = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, description } = data;

  // Split description into sentences for better layout
  const sentences = description.split('. ').filter(Boolean).map((s: string) => s + '.');
  const intro = sentences[0] || description;
  const objectives = sentences.slice(1);

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Centered Header & Intro */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <span className="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-[2.4px] uppercase text-sm mb-4">
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
              About the Network
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2455] tracking-tight mb-8">
              {title}
            </h2>
            <p className="text-[#53545b] text-lg lg:text-xl leading-[1.7] font-medium">
              {intro}
            </p>
          </div>
        </Reveal>

        {/* Full-width Objectives Card */}
        <Reveal delay={0.2}>
          <div className="max-w-4xl mx-auto relative rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-[#0e2455] to-[#0a1a3f] shadow-[0_24px_54px_rgba(15,18,22,0.16)] overflow-hidden">
            {/* Decorative Pattern */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
              }}
            />
            
            <div className="relative z-10">
              <h3 className="flex items-center justify-center gap-3 text-white text-2xl font-extrabold mb-10 tracking-wide text-center">
                <Users className="text-orange-400" size={28} />
                Our Objectives
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {objectives.length > 0 ? (
                  objectives.map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shadow-sm border border-orange-500/20">
                        <Check size={20} strokeWidth={3} />
                      </span>
                      <span className="text-white/90 text-[15.5px] leading-[1.6] font-medium pt-1">
                        {obj}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shadow-sm border border-orange-500/20">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <span className="text-white/90 text-[15.5px] leading-[1.6] font-medium pt-1">
                      To help the present students carve their careers effectively.
                    </span>
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

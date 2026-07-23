"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles } from "lucide-react";

export default function CulturalActivities({ data }: any) {
  const newsletterData = data;

  if (!newsletterData) return null;

  return (
    <Reveal>
      <div className="relative mb-16 md:mb-24 rounded-[28px] overflow-hidden shadow-2xl group border border-card-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
          
          {/* Content Side */}
          <div className="lg:col-span-5 bg-navy text-white p-8 md:p-12 xl:p-16 flex flex-col justify-center relative z-10 overflow-hidden">
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-orange font-bold text-sm uppercase tracking-widest mb-6 backdrop-blur-md">
                <Sparkles size={16} />
                <span>Life at NDC</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-[1.1] tracking-tight">
                {newsletterData?.title}
              </h2>
              
              <p className="text-white/80 leading-relaxed text-[16px] md:text-[18px] font-medium max-w-lg">
                {newsletterData?.description}
              </p>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-7 relative w-full h-[300px] lg:h-auto overflow-hidden bg-surface-tint flex items-center justify-center p-8 md:p-12">
            <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/10 via-transparent to-transparent z-10 hidden lg:block w-24"></div>

            <img
              src={newsletterData?.image}
              alt={newsletterData?.title || "Cultural Activities"}
              className="relative z-[1] max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
            />
          </div>

        </div>
      </div>
    </Reveal>
  );
}

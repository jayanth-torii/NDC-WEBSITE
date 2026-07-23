"use client";

import React from "react";
import { Target, Activity, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function AboutIQAC({ data }: { data: any }) {
  if (!data) return null;

  const vision = data?.VisionMission?.sections?.find((s: any) => s.title === "Our Vision");
  const mission = data?.VisionMission?.sections?.find((s: any) => s.title === "Our Mission");
  const objectives = data?.AccordienSection?.find((s: any) => s.title === "Objectives");
  const functions = data?.AccordienSection?.find((s: any) => s.title === "Functions");

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* About Section */}
        <Reveal delay={0.1}>
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-[2.4px] uppercase text-sm mb-6">
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
              Overview
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2455] tracking-tight mb-8">
              {data.title || "About IQAC"}
            </h2>
            <div className="prose prose-lg mx-auto">
              {data?.AboutDescription?.map((paragraph: string, index: number) => (
                <p key={index} className="text-[#53545b] text-[18px] leading-[1.8] mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Vision Card */}
          {vision && (
            <Reveal delay={0.2}>
              <div className="h-full relative rounded-3xl p-8 lg:p-10 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#0e2455] mb-4">{vision.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{vision.description}</p>
              </div>
            </Reveal>
          )}

          {/* Mission Card */}
          {mission && (
            <Reveal delay={0.3}>
              <div className="h-full relative rounded-3xl p-8 lg:p-10 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0e2455] flex items-center justify-center mb-8">
                  <Activity size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#0e2455] mb-4">{mission.title}</h3>
                {mission.points?.length > 0 && (
                  <ul className="space-y-4">
                    {mission.points.map((pt: string, i: number) => (
                      <li key={i} className="flex gap-3 text-gray-600">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#0e2455] mt-2.5 flex-shrink-0" />
                         <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {/* Objectives */}
        {objectives && (
          <Reveal delay={0.4}>
            <div className="mb-12 relative rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-[#0e2455] to-[#0a1a3f] shadow-[0_24px_54px_rgba(15,18,22,0.16)] overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)',
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="relative z-10">
                <h3 className="text-center text-3xl font-extrabold text-white mb-10 tracking-tight">
                  {objectives.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {objectives.ListPoints?.map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shadow-sm border border-orange-500/20 mt-0.5">
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                      </span>
                      <span className="text-white/90 text-[15px] leading-relaxed font-medium">
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Functions */}
        {functions && (
          <Reveal delay={0.5}>
            <div className="relative rounded-3xl p-8 lg:p-12 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-center text-3xl font-extrabold text-[#0e2455] mb-10 tracking-tight">
                  {functions.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {functions.ListPoints?.map((func: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-50 text-[#0e2455] flex items-center justify-center shadow-sm border border-blue-100 mt-0.5">
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                      </span>
                      <span className="text-gray-700 text-[15px] leading-relaxed font-medium">
                        {func}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}

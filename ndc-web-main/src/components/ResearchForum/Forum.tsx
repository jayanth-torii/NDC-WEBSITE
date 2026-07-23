"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Microscope } from "lucide-react";

const Forum = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header and Description */}
        <Reveal>
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-[2.4px] uppercase text-sm mb-6">
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
              Overview
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2455] tracking-tight mb-8">
              {data.title}
            </h2>
            <div className="prose prose-lg mx-auto">
              {data.description?.map((desc: string, idx: number) => (
                <p key={idx} className="text-[#53545b] text-[18px] leading-[1.8] mb-6 last:mb-0">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Research Activities Grid */}
        {data.listOfPoints?.length > 0 && (
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl p-8 lg:p-12 bg-gray-50 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(rgba(14,36,85,0.4) 1.5px, transparent 1.5px)',
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {data.listOfPoints.map((point: string, idx: number) => (
                    <div key={idx} className="flex flex-col gap-4 p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-sm border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                        <Microscope size={24} strokeWidth={2} />
                      </div>
                      <span className="text-gray-800 text-[16px] leading-relaxed font-semibold">
                        {point}
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
};

export default Forum;

"use client";

import React from "react";
import { Telescope, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const VisionMission = ({ data }: { data: any }) => {
  if (!data || !data.Sections) return null;

  const { title, Sections } = data;
  
  // Find vision and mission sections dynamically (in case order is swapped)
  const vision = Sections.find((s: any) => s.title.toLowerCase().includes("vision"));
  const mission = Sections.find((s: any) => s.title.toLowerCase().includes("mission"));

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-orange-500 text-sm font-bold tracking-widest uppercase mb-3">Our Core</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2455] tracking-tight">{title}</h2>
            <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Vision Card */}
          {vision && (
            <Reveal delay={0.1}>
              <div className="group h-full flex flex-col md:flex-row gap-6 items-start rounded-3xl p-8 lg:p-10 border border-orange-50 bg-gradient-to-br from-orange-50 via-orange-50/50 to-white shadow-lg shadow-orange-100/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex-none w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Telescope size={36} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0e2455] uppercase tracking-wide mb-4">
                    {vision.title}
                  </h3>
                  <div className="space-y-4">
                    {vision.Description?.map((desc: string, i: number) => (
                      <p key={i} className="text-gray-600 leading-relaxed font-medium">
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
              <div className="group h-full flex flex-col md:flex-row gap-6 items-start rounded-3xl p-8 lg:p-10 border border-blue-50 bg-gradient-to-br from-blue-50 via-blue-50/50 to-white shadow-lg shadow-blue-100/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex-none w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Target size={36} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0e2455] uppercase tracking-wide mb-4">
                    {mission.title}
                  </h3>
                  <div className="space-y-4">
                    {mission.Description?.map((desc: string, i: number) => (
                      <p key={i} className="text-gray-600 leading-relaxed font-medium">
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

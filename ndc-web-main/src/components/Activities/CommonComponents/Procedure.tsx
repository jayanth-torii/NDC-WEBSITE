"use client";
import React from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const Procedure = ({ data }: any) => {
  if (!data || data.length === 0) return null;

  return (
    <RevealGroup className="mb-10 md:mb-20 space-y-8">
      {data.map((policy: any, index: any) => (
        <RevealItem key={index}>
          <div className="bg-white rounded-[24px] border border-card-border shadow-[var(--shadow-card)] p-6 md:p-10 relative overflow-hidden group transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-orange/40">
             {/* Step Number Background */}
             <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300 pointer-events-none text-navy text-8xl font-black italic">
                {String(index + 1).padStart(2, '0')}
             </div>
             
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-[var(--shadow-cta)]">
                   {index + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-navy">{policy.title}</h2>
             </div>

             <div className="relative z-10">
                {policy.descriptions?.map((desc: any, idx: any) => (
                  <p key={idx} className="text-justify text-body-gray leading-relaxed mb-4 text-[16px] md:text-[17px]">
                    {desc}
                  </p>
                ))}

                {policy.points?.length > 0 && (
                  <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {policy.points.map((point: any, idx: any) => (
                      <li key={idx} className="flex items-start gap-3 bg-surface-tint p-4 rounded-[12px] border border-card-border transition-colors hover:border-orange/40 hover:bg-white">
                        <span className="w-2 h-2 rounded-full bg-orange mt-2 flex-shrink-0"></span>
                        <span className="text-[15px] md:text-[16px] text-body-gray leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
             </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
};

export default Procedure;

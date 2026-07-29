"use client";
import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const StatIcon1 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
);

const StatIcon2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
    <path d="M16 2.5v4M8 2.5v4M3 10h18" />
  </svg>
);

const StatIcon3 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <circle cx="9" cy="8" r="3.1" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6.2a3 3 0 0 1 0 5.6" />
    <path d="M17 14.4A5.5 5.5 0 0 1 20.5 19" />
  </svg>
);

const SamashtiAbout = ({ data }: any) => {
  return (
    <section className="pt-[60px] pb-0 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-12 items-center">
          
          <Reveal className="relative group w-full flex justify-center" delay={0.1}>
            {/* The tilted accent rectangle sitting behind */}
            <div className="absolute top-1/2 left-1/2 w-[min(430px,88%)] h-[90%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] bg-gradient-to-br from-[#3270fc1a] to-[#f6872a1a] border-[1.5px] border-[#3270fc33] rounded-[22px] transition-transform duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 z-0" />
            
            {/* The actual image container */}
            <div className="relative z-10 w-full max-w-[420px] mx-auto p-[30px] rounded-[20px] overflow-hidden border border-[#eef1f6] bg-[radial-gradient(120%_100%_at_50%_0%,#e9f0fb_0%,#f8fafc_70%)] shadow-[0_24px_50px_rgba(14,36,85,0.16)] -rotate-[8deg] transition-transform duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 flex items-center justify-center aspect-square">
               <div className="relative w-[92%] h-full max-h-[380px] drop-shadow-[0_18px_32px_rgba(14,36,85,0.22)]">
                 <Image src="/images/samashti/10_b3f02c0b3c_5c17976750.png" alt="Nagarjuna Samashti magazine cover" fill className="object-contain" />
               </div>
            </div>
          </Reveal>

          <Reveal className="w-full" as="div" delay={0.2}>
            
            <span className="block text-[#f6872a] font-bold text-[12px] tracking-[1.5px] uppercase mb-1">
              About The Magazine
            </span>
            
            <h2 className="text-[36px] font-extrabold text-[#0e2455] leading-[1.14] tracking-[-0.6px] mb-4 mt-[6px]">
              {data?.title ? (
                <>
                  <span className="block">{data.title.substring(0, Math.floor(data.title.length / 2))}</span>
                  <span className="block">{data.title.substring(Math.floor(data.title.length / 2))}</span>
                </>
              ) : (
                <>
                  <span className="block">Voices of Innovation.</span>
                  <span className="block">Stories that Inspire.</span>
                </>
              )}
            </h2>

            {data?.description && Array.isArray(data.description) ? (
              data.description.map((desc: string, i: number) => (
                <p key={i} className="text-[15.5px] text-[#53545b] leading-[1.7] max-w-[560px] mb-4">
                  {desc}
                </p>
              ))
            ) : (
              <p className="text-[15.5px] text-[#53545b] leading-[1.7] max-w-[560px] mb-6">
                {data?.description || "Nagarjuna Samashti is more than a magazine—it's a reflection of our campus spirit. Each edition brings together ideas that challenge, achievements that inspire, and stories that connect the NCET community."}
              </p>
            )}
            
            <div className="grid grid-cols-3 gap-4 max-w-[540px]">
               <div className="bg-white border border-[#eef1f6] rounded-[14px] p-[18px_14px] text-center shadow-[0_12px_28px_rgba(15,18,22,0.05)] flex flex-col items-center">
                 <div className="w-[42px] h-[42px] rounded-[12px] bg-[#fff5ec] text-[#f6872a] flex items-center justify-center mb-[10px]">
                   <StatIcon1 />
                 </div>
                 <span className="block text-[#0e2455] text-[24px] font-extrabold leading-none">11+</span>
                 <span className="block text-[#777] text-[12.5px] font-semibold mt-[6px]">Volumes Published</span>
               </div>

               <div className="bg-white border border-[#eef1f6] rounded-[14px] p-[18px_14px] text-center shadow-[0_12px_28px_rgba(15,18,22,0.05)] flex flex-col items-center">
                 <div className="w-[42px] h-[42px] rounded-[12px] bg-[#fff5ec] text-[#f6872a] flex items-center justify-center mb-[10px]">
                   <StatIcon2 />
                 </div>
                 <span className="block text-[#0e2455] text-[24px] font-extrabold leading-none">4</span>
                 <span className="block text-[#777] text-[12.5px] font-semibold mt-[6px]">Issues Every Year</span>
               </div>

               <div className="bg-white border border-[#eef1f6] rounded-[14px] p-[18px_14px] text-center shadow-[0_12px_28px_rgba(15,18,22,0.05)] flex flex-col items-center">
                 <div className="w-[42px] h-[42px] rounded-[12px] bg-[#fff5ec] text-[#f6872a] flex items-center justify-center mb-[10px]">
                   <StatIcon3 />
                 </div>
                 <span className="block text-[#0e2455] text-[24px] font-extrabold leading-none">500+</span>
                 <span className="block text-[#777] text-[12.5px] font-semibold mt-[6px]">Campus Stories</span>
               </div>
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SamashtiAbout;

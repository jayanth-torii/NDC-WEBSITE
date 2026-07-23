"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px]">
    <path d="M12 6.4C10.8 5.6 9.2 5.2 7.5 5.2S4.2 5.6 3 6.4v13c1.2-.8 2.8-1.2 4.5-1.2s3.3.4 4.5 1.2m0-13c1.2-.8 2.8-1.2 4.5-1.2s3.3.4 4.5 1.2v13c-1.2-.8-2.8-1.2-4.5-1.2s-3.3.4-4.5 1.2m0-13v13" />
  </svg>
);

const IconCommunity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px]">
    <circle cx="9" cy="8" r="3.1" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6.2a3 3 0 0 1 0 5.6" />
    <path d="M17 14.4A5.5 5.5 0 0 1 20.5 19" />
  </svg>
);

const SamashtiCTA = () => {
  const browseEditions = () => {
    const el = document.getElementById("editions");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white pb-[64px]">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] p-[40px] grid lg:grid-cols-[1.5fr_1fr_1fr] gap-[36px] items-center bg-[radial-gradient(700px_circle_at_12%_0%,rgba(246,135,42,0.16),transparent_45%),radial-gradient(700px_circle_at_88%_100%,rgba(50,112,252,0.2),transparent_45%),linear-gradient(135deg,#0e2455_0%,#0a1a3f_100%)]">
            
            {/* Left Column */}
            <div>
               <span className="inline-block text-[#ffb978] text-[12px] font-bold tracking-[1.6px] uppercase mb-[10px]">
                 Be Part of the Story
               </span>
               <h2 className="text-white text-[30px] font-extrabold tracking-[-0.5px] m-[0_0_12px]">
                 Share. Inspire. Connect.
               </h2>
               <p className="text-[#c7d0e0] text-[14.5px] leading-[1.6] m-[0_0_20px] max-w-[340px]">
                 Have an achievement, idea, or campus moment worth sharing? We'd love to hear from you.
               </p>
               <Link href="/contact" className="relative overflow-hidden inline-flex items-center p-[11px_22px] rounded-full border-[1.5px] border-white/40 text-white text-[14px] font-bold transition-all hover:bg-white/10">
                 Submit a Story
               </Link>
            </div>

            {/* Right Columns (Links) */}
            <div className="flex items-start gap-[14px] lg:pl-[32px] lg:border-l border-white/10 max-lg:pt-[20px] max-lg:border-t">
               <div className="shrink-0 w-[52px] h-[52px] rounded-full border-[1.5px] border-white/20 text-[#ffb978] flex items-center justify-center">
                 <IconBook />
               </div>
               <div>
                 <h4 className="text-white font-extrabold text-[15px] m-[0_0_5px]">Browse All Editions</h4>
                 <p className="text-[#c7d0e0] text-[12.5px] leading-[1.5] m-[0_0_12px] max-w-[210px]">
                   Explore every volume of Samashti magazine.
                 </p>
                 <button onClick={browseEditions} className="relative overflow-hidden inline-flex items-center p-[9px_18px] rounded-full bg-[#f6872a] text-white text-[13px] font-bold transition-all hover:bg-[#e2761d]">
                   View All Editions
                 </button>
               </div>
            </div>

            <div className="flex items-start gap-[14px] lg:pl-[32px] lg:border-l border-white/10 max-lg:pt-[20px] max-lg:border-t">
               <div className="shrink-0 w-[52px] h-[52px] rounded-full border-[1.5px] border-white/20 text-[#ffb978] flex items-center justify-center">
                 <IconCommunity />
               </div>
               <div>
                 <h4 className="text-white font-extrabold text-[15px] m-[0_0_5px]">Join the Community</h4>
                 <p className="text-[#c7d0e0] text-[12.5px] leading-[1.5] m-[0_0_12px] max-w-[210px]">
                   Stay connected and never miss a new release.
                 </p>
                 <Link href="/contact" className="relative overflow-hidden inline-flex items-center p-[9px_18px] rounded-full bg-[#f6872a] text-white text-[13px] font-bold transition-all hover:bg-[#e2761d]">
                   Subscribe Now
                 </Link>
               </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SamashtiCTA;

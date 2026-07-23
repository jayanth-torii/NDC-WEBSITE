"use client";
import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const SamashtiHero = ({ data }: any) => {
  return (
    <section className="bg-[#0e1736] pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center">
        
        {/* Left Content */}
        <Reveal className="w-full lg:w-5/12 text-left z-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-orange" />
            <span className="text-orange font-bold text-xs md:text-sm tracking-[2px] uppercase">Official Magazine</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight mb-5 leading-[1.1]">
            Nagarjuna <span className="text-orange">Samashti</span>
          </h1>
          
          <p className="text-gray-400 text-[15px] md:text-[17px] leading-[1.7] max-w-lg font-medium">
            The quarterly magazine of NCET — where knowledge meets innovation. Campus stories, research deep-dives, student achievements, and faculty insights, all in one place.
          </p>
        </Reveal>

        {/* Right Content - Overlapping Images */}
        <Reveal delay={0.2} className="w-full lg:w-7/12 relative h-[300px] md:h-[400px] mt-12 lg:mt-0 flex justify-end">
           {/* Bleeding off the right edge effect */}
           <div className="absolute right-[-10%] md:right-[-20%] lg:right-[-35%] top-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-6">
             <div className="relative w-[180px] md:w-[260px] lg:w-[280px] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl opacity-70 scale-90">
                <Image src="https://cdn.nagarjunadegreecollege.co.in/4_0d2e2cd8fc_59687c85e4.png" alt="Samashti Cover" fill className="object-cover" />
             </div>
             
             <div className="relative w-[200px] md:w-[300px] lg:w-[340px] aspect-[3/4] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10">
                <Image src="https://cdn.nagarjunadegreecollege.co.in/10_b3f02c0b3c_5c17976750.png" alt="Samashti Cover" fill className="object-cover" />
             </div>

             <div className="relative w-[180px] md:w-[260px] lg:w-[280px] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl opacity-70 scale-90">
                <Image src="https://cdn.nagarjunadegreecollege.co.in/1_e71340bb17_a2de769fda.png" alt="Samashti Cover" fill className="object-cover" />
             </div>
           </div>
        </Reveal>

      </div>
    </section>
  );
};

export default SamashtiHero;
